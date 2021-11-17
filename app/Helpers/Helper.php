<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\File;
use Illuminate\Filesystem\Filesystem;
use App\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use ReflectionClass;
use ReflectionMethod;

class Helper
{
    /**
     * get array of id, class, request file name, inputs name and value from the form request
     * @param $form_inputs_array array [contains form inputs and the data send from the js file( forms.js)]
     * @return array
     */
    public static function getFormDataArray($form_inputs_array)
    {
        $form_inputs = [];
        foreach ($form_inputs_array as $field) {
            if (key($field) == 'id') {
                $field_id = $field->id;
                $form_inputs['id'] = $field_id;
            } elseif (key($field) == 'class') {
                $li_class = $field->class;
                $form_inputs['class'] = $li_class;
            } elseif (key($field) == 'request_file_name') {
                $request_file_name = $field->request_file_name;
                $form_inputs['request_file_name'] = $request_file_name;
            } elseif (isset($field->name) && isset($field->value)
                && !in_array($field->name, ['_token', 'new', 'update'])
            ) {
                $form_inputs[$field->name] = $field->value;
            }
        }
        return $form_inputs;
    }

    /**
     * validate form requests including nested forms in form using loop
     * @param $data JSON encoded string with all the form reuest data
     * @param $id integer [the primary key]
     * @return array
     * If the validation passes it returns 1 else it returns the validation data with inputs errors
     */
    public static function validateFormsRequests($data, $id)
    {
        $pass = 1;
        $validate_data = Helper::validateForm($data, $id);
        if ($validate_data['status'] == 'error') {
            $pass = 0;
        }
        if (isset($data['multi_forms_variable_names'])) {
            $multi_forms_variable_names = json_decode($data['multi_forms_variable_names']);
            foreach ($multi_forms_variable_names as $multi_forms_variable_name) {
                $form_validation = [];
                $multi_form_validation = [];
                foreach (json_decode($data[$multi_forms_variable_name]) as $multi_form_data) {
                    $form_inputs = Helper::getFormDataArray($multi_form_data);

                    $form_validation = Helper::validateForm($form_inputs, $form_inputs['id']);
                    if ($form_validation['status'] == 'error') {
                        $pass = 0;
                    }
                    $multi_form_validation[]= $form_validation;
                }
                $validate_data[] = $multi_form_validation;
            }
        }
        if ($pass === 0) {
            return ['validate_data' => $validate_data, 'pass' => $pass];
        }
        return ['pass' => $pass];
    }

    /**
     * validate a form separately
     * @param $data array with form inputs
     * @param $id integer [the primary key]
     * @return array
     * If validation fails it returns array with the errors other wise it returns success
     * @throws \ReflectionException
     */
    public static function validateForm($data, $id)
    {
        $class = $data['request_file_name'];
        $class = str_replace('/', '\\', $class);
        $my_request = new $class();
        $reflection = new ReflectionClass($class);
        $validator = Validator::make($data, $my_request->rules(), $my_request->messages());
        $validator->setAttributeNames($my_request->attributes());
        $static_functions = $reflection->getMethods(ReflectionMethod::IS_STATIC);
        $errors = [];
        $action_chain = "";

        if (method_exists($class, 'ServerSideValidation')) {
            $data['id']=$id;
            $further_validation = $my_request::ServerSideValidation($data);
            if ($further_validation['success'] == false) {
                foreach ($further_validation['errors'] as $key => $error) {
                    $errors[$error['input_selector']] = array($error['msg'], $error);
                }
            }
        }


        $errors = array_merge($errors, $validator->getMessageBag()->toArray());
        if ($validator->fails() || count($errors) > 0) {
            $response = [];
            if (isset($data['class'])) {
                $response['class'] = $data['class'];
            }
            $response['id'] = $id;
            $response['status'] = 'error';
            $response['errors'] = $errors;
        } else {
            $response['status'] = 'success';
        }
        return $response;
    }

    /**
     * Initialized record in logs table
     * @param $model_name string [the model name where the change takes place]
     * @param $data_id integer [the primary key of the changed record]
     * @param $model_parent string [the parent model name where the change takes place]
     * @param $parent_id integer [the primary key of the parent model of the changed record]
     * @param $operation string [the operation type save, update, delete,... ]
     * @param $description string [describes the operation that takes place]
     * @param $record_before JSON encoded string [record from DB(before the change)]
     * @param $record_after JSON encoded string [record after the change]
     * @return mixed [log record id]
     */
    public static function initLogRecord($model_name, $data_id, $model_parent, $parent_id, $operation, $description, $record_before, $record_after)
    {
        $log = new Log();
        $log->model_name = $model_name;
        $log->data_id = $data_id;
        $log->model_parent = $model_parent;
        $log->parent_id = $parent_id;
        if (Auth::user()) {
            $log->user_id = Auth::user()->id;
        }
        $log->operation = $operation;
        $log->description = $description;
        $log->record_before = $record_before;
        $log->record_after = $record_after;
        $log->save();
        return $log->id;
    }

    /**
     * updates the data for the forms nested in a from
     * @param $nested_forms_data JSON encoded string
     */
    public static function updateNestedFormsData($nested_forms_data)
    {
        $nested_forms_data = json_decode($nested_forms_data);
        foreach ($nested_forms_data as $nested_forms_datum) {
            $form_inputs = [];
            foreach ($nested_forms_datum as $field) {
                if (key($field) == 'id') {
                    $field_id = $field->id;
                }
                if (key($field) == 'model_name') {
                    $field_model_name = $field->model_name;
                } elseif (key($field) == 'function_name') {
                    $model_function_name = $field->function_name;
                } elseif (isset($field->name) && isset($field->value)
                    && !in_array($field->name, ['_token', 'new', 'update'])
                ) {
                    $form_inputs[$field->name] = $field->value;
                }
            }
            $model_path = 'App\\' . $field_model_name;
            $model_object = $model_path::findOrFail($field_id);
            $model_object->$model_function_name($form_inputs);
        }
    }

    /**
     * resize image with certain width and height
     * @param $file_id integer
     * @param $image_height integer
     * @param $image_width integer
     * @return string [image path]
     */
    public static function getImage($file_id, $image_height, $image_width)
    {
        $file = File::where('id', $file_id)->first();
        $dir = new Filesystem();
        if ($file) {
            if ($dir->exists('./uploads/' . $file->hash . '/' . $image_height . 'x' . $image_width . '.jpg')) {
                return '/uploads/' . $file->hash . '/' . $image_height . 'x' . $image_width . '.jpg';
            } else {
                $image = Image::make('./uploads/' . $file->hash . '/' . $file->file . '')
                    ->resize($image_height, $image_width);
                $image->save('./uploads/' . $file->hash . '/' . $image_height . 'x' . $image_width . '.jpg');
                return substr($image->dirname, 1) . '/' . $image->basename;
            }
        } else {
            return '//';
        }
    }


    /**
     * get authenticated user previously  uploaded files
     * @return array [files ids, paths, sizes, names and types]
     */
    public static function getUserFiles()
    {
        $files = [];
        $user_files = File::where('user_id', Auth::user()->id)->get();
        foreach ($user_files as $file) {
            // It is a file
            $files[] = array(
                "id" => $file->id,
                "name" => $file->file,
                "type" => "file",
                "path" => 'uploads/' . $file->hash . '/' . $file->file,
                "size" => filesize('uploads/' . $file->hash . '/' . $file->file) // Gets the size of this file
            );
        }
        return array(
            "name" => "uploads",
            "type" => "folder",
            "path" => 'uploads',
            "items" => $files
        );
    }


    /**
     * delete file from the DB and uploads directory
     * if single file it will update the field with null
     * if multiple files it will delete the record
     * @param $model_id integer [the primary key of the record to remove file from]
     * @param $model string [the model name where the file takes place]
     * @param $file_column string
     */
    public static function deleteFile($model_id, $model, $file_column)
    {
        $model = 'App\\' . $model;
        if ($file_column == "0") { //many to many
            $file_id = $model::where('id', $model_id)->delete();
        } else {
            $file_id = $model::where('id', $model_id)->first()->$file_column;
            $file = File::where('id', $file_id)->first();
            $dir = new Filesystem();
            $file->delete();
            $delete_file = $dir->deleteDirectory('./uploads/' . $file->hash);

            $model::where('id', $model_id)->update([$file_column => null]);
        }
    }

    /**
     * @param $id integer [the primary key of the parent record]
     * @param $parent_model_name string [parent model name]
     * @param $model_name string [model name]
     * @param $method string [Fn name]
     * @param $table_name string [table name where you will save the record]
     * @return array with the saved data
     */
    public static function initElement($id, $parent_model_name, $model_name, $method, $table_name)
    {
        $parent = 'App\\' . $parent_model_name;
        $app = 'App\\' . $model_name;
        $parent_staff = $parent::findOrFail($id);
        $element = new $app();

        if (Schema::hasColumn($table_name, 'parent_id')) {
            if ($element->parent_id == null) {
                $element->stuff_type = $parent_model_name;
                $element->parent_id = 0;
            }
        }

        $parent_staff->$method()->save($element);
        $data = [];
        $data['id'] = $element->id;
        $data['remove'] = route('delete', ['id' => $element->id, 'model' => $model_name]);

        $record_before = json_encode([]);
        $record_after = $element;

        if (Auth::user()) {
            $description = Auth::user()->name . ' saved ' . $model_name . ' record';
            $operation = 'save';
        } else {
            $description = ' saved ' . $model_name . ' record';
            $operation = 'save';
        }

        Helper::initLogRecord($model_name, $element->id, null, null, $operation, $description, $record_before, $record_after);
        $data['status'] = 'success';

        return ['data' => $data];
    }

    /**
     * delete record from DB
     * @param $id integer [primary key]
     * @param $model string [model name where the record existed]
     */
    public static function deleteElement($id, $model)
    {
        $app = 'App\\' . $model;
        $app::destroy($id) or abort(404);
    }

    //functions
}
