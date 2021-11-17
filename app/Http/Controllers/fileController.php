<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Uploader\UploadHandler;
use Illuminate\Http\Request;
use App\File;
use App\Event;
use App\EventUser;
use App\User;
use App\Http\Helpers\Helpers;
use Auth;
use Illuminate\Filesystem\Filesystem;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Input;
use App\Company;
use Storage;

class FileController extends Controller
{
    public function __construct()
    {
        $this->dirPath = public_path('uploads');
    }
    public function restrictAcess($hash, $file)
    {
        $requested_file = File::where('hash', $hash)->where('file', $file)->first();
        if (Auth::user() != null) {
            return $requested_file->getS3File(5, 1);
        } else {
            return "Sorry";
        }
    }
    public function handle(Request $request)
    {
        $data = $request->input();
        $uploader = new UploadHandler();
        

        // Specify the list of valid extensions, ex. array("jpeg", "xml", "bmp")
        $uploader->allowedExtensions = array(); // all files types allowed by default

        // Specify max file size in bytes.
        $uploader->sizeLimit = null;

        // Specify the input name set in the javascript.
        $uploader->inputName = "qqfile"; // matches Fine Uploader's default inputName value by default

        // If you want to use the chunking/resume feature, specify the folder to temporarily save parts.
        $uploader->chunksFolder = "chunks";

        //$method = $_SERVER["REQUEST_METHOD"];
        $method = $this->get_request_method();
        // Determine whether we are dealing with a regular ol' XMLHttpRequest, or
        // an XDomainRequest
        $_HEADERS = $this->parseRequestHeaders();
        $iframeRequest = false;
        if (!isset($_HEADERS['X-Requested-With']) || $_HEADERS['X-Requested-With'] != "XMLHttpRequest") {
            $iframeRequest = true;
        }

        /*
         * handle the preflighted OPTIONS request. Needed for CORS operation.
         */
        if ($method == "OPTIONS") {
            $this->handlePreflight();
        }

        /*
         * handle a DELETE request or a POST with a _method of DELETE.
         */
        elseif ($method == "DELETE") {
            $this->handleCorsRequest();
            $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            $tokens = explode('/', $url);
            $uuid = $tokens[sizeof($tokens)-1];
            $file = File::where('hash', $uuid)->first();
            $model = "App\\".$data["model"];
            if ($data["folder"] != null) {
                $model = "App\\".$data["folder"]."\\".$data["model"];
            }
            if ($data["multiple"] == "false") {
                $model_object = $model::where($data['field'], $file->id)->first();
                $model_object[$data['field']] = null;
                $model_object->save();
                if ($model_object->relations_array) {
                    $fieled_name = $model_object->relations_array[$data['field']]['showable_name'];
                    $section_name = $model_object->relations_array[$data['field']]['section_name'];
                } else {
                    $fieled_name = $data['field'];
                    $section_name = $model;
                }
            } else {
                $model_object = $model::where('file_id', $file->id)->first();
                //special condition for nda status
                if ($data["model"] == "VendorNdaFile") {
                    $vendor_nda_files = $model::where('vendor_id', $model_object->vendor_id)->get();
                    if (count($vendor_nda_files)==1) {
                        $vendor = User::where('id', $model_object->vendor_id)->first();
                        $vendor->nda_status_id = 2;
                        $vendor->save();
                    }
                }
                if ($model_object->relations_array) {
                    $fieled_name = $model_object->relations_array['file_id']['showable_name'];
                    $section_name = $model_object->relations_array['file_id']['section_name'];
                } else {
                    $fieled_name = 'file_id';
                    $section_name = $model;
                }
            }
            $vendor_id = null;
            if (method_exists($model_object, 'vendorId')) {
                $vendor_id = $model_object->vendorId();
                $vendor = User::getObjectById($vendor_id);
            }
            $description = Auth::user()->name.' Deleted '.$fieled_name.' named '.$file->file.' in '.$section_name. ' at ' . date('y-m-d H:i:s');
            if (isset($vendor) && $vendor->admin_show != 1) {
                $vendor_id = null;
            }

            // ($model_name, $data_id, $model_parent, $parent_id, $operation, $description , $vendor_id = null, $section_name=null , $field_name=null, $record_before= null, $record_after= null )

            Helper::init($data["model"], $model_object->id, null, null, 'delete', $description, $vendor_id, $section_name, $fieled_name);
            if ($data["multiple"] == "true") {
                $model_object->delete();
            }
            $result = $uploader->handleDelete($this->dirPath, $data);


            // iframe uploads require the content-type to be 'text/html' and
            // return some JSON along with self-executing javascript (iframe.ss.response)
            // that will parse the JSON and pass it along to Fine Uploader via
            // window.postMessage
            if ($iframeRequest == true) {
                header("Content-Type: text/html");
                echo json_encode($result)."<script src='http://10.0.2.2/jquery.fineuploader-4.1.1/iframe.xss.response-4.1.1.js'></script>";
            } else {
                echo json_encode($result);
            }
        } elseif ($method == "POST") {
            $this->handleCorsRequest();
            header("Content-Type: text/plain");
            
            // Assumes you have a chunking.success.endpoint set to point here with a query parameter of "done".
            // For example: /myserver/handlers/endpoint.php?done
            if (isset($_GET["done"])) {
                $result = $uploader->combineChunks($this->dirPath);
            }
            // Handles upload requests
            else {
                // Call handleUpload() with the name of the folder, relative to PHP's getcwd()
                
                
                $result = $uploader->handleUpload($this->dirPath);

                // To return a name used for uploaded file you can use the following line.
                $result["uploadName"] = $uploader->getUploadName();
                
                


                
                // iframe uploads require the content-type to be 'text/html' and
                // return some JSON along with self-executing javascript (iframe.ss.response)
                // that will parse the JSON and pass it along to Fine Uploader via
                // window.postMessage
                if ($iframeRequest == true) {
                    header("Content-Type: text/html");
                    echo json_encode($result)."<script src='http://{{SERVER_URL}}/{{FINE_UPLOADER_FOLDER}}/iframe.xss.response.js'></script>";
                } else {
                    echo json_encode($result);
                }
            }
        } else {
            header("HTTP/1.0 405 Method Not Allowed");
        }
    }




    public function get_request_method()
    {
        global $HTTP_RAW_POST_DATA;

        // This should only evaluate to true if the Content-Type is undefined
        // or unrecognized, such as when XDomainRequest has been used to
        // send the request.
        if (isset($HTTP_RAW_POST_DATA)) {
            parse_str($HTTP_RAW_POST_DATA, $_POST);
        }

        if (isset($_POST["_method"]) && $_POST["_method"] != null) {
            return $_POST["_method"];
        }

        return $_SERVER["REQUEST_METHOD"];
    }


    public function parseRequestHeaders()
    {
        $headers = array();
        foreach ($_SERVER as $key => $value) {
            if (substr($key, 0, 5) <> 'HTTP_') {
                continue;
            }
            $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
            $headers[$header] = $value;
        }
        return $headers;
    }

    public function handleCorsRequest()
    {
        header("Access-Control-Allow-Origin: *");
    }

    /*
     * handle pre-flighted requests. Needed for CORS operation
     */
    public function handlePreflight()
    {
        handleCorsRequest();
        header("Access-Control-Allow-Methods: POST, DELETE");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Cache-Control");
    }

    public function saveFile(Request $request)
    {
        $data = $request->input();
        //Handle database
        $file = new File();
        $file->file = $data['name'];
        if (Auth::user()) {
            $file->user_id = Auth::user()->id;
        }
        $file->hash = $data["uuid"];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $file_extension = pathinfo($data['name'])['extension'];
        $audio_extensions = ["mp3","wav","ogg"];
        if (file_exists($this->dirPath.DIRECTORY_SEPARATOR.$data["uuid"].DIRECTORY_SEPARATOR.$data['name']) || env('APP_ENV') == "local") {
            $mime = finfo_file($finfo, $this->dirPath.DIRECTORY_SEPARATOR.$data["uuid"].DIRECTORY_SEPARATOR.$data['name']);
        } else {
            $mime = Storage::disk('s3')->mimeType($data["uuid"].DIRECTORY_SEPARATOR.$data['name']);
        }
        $file->file_type = $mime;
        $file->save();
        if (in_array($file_extension, $audio_extensions)) {
            Helper::handleAudioFile($file->id);
        }
        $data['field'] = str_replace('"', "", $data['field']);
        if (isset($data['folder'])) {
            $model_name = 'App\\' .$data['folder']."\\". $data['model'];
        } else {
            $model_name = 'App\\' . $data['model'];
        }
        
        // If single file uploaded
        if ($data['multiple'] == "false") {
            $record = $model_name::find($data['entity_id']);
            $record->{$data['field']} = $file->id;
            if ($record->relations_array) {
                $fieled_name = $record->relations_array[$data['field']]['showable_name'];
                $section_name = $record->relations_array[$data['field']]['section_name'];
            } else {
                $fieled_name = $data['field'];
                $section_name = $data['model'];
            }
        }
        // if many to many needed
        else {
            $record = new $model_name();
            $record->file_id = $file->id;
            $record->{$data['field']} = $data['entity_id'];

            //special condition for nda status
            if ($data['model'] == "VendorNdaFile") {
                $record->company_group_id = Auth::user()->company_group_id;
                $record->save();
                $vendor_nda_files = $model_name::where('vendor_id', $record->vendor_id)->get();
                if (count($vendor_nda_files) != 0) {
                    $vendor = User::where('id', $record->vendor_id)->first();
                    $vendor->nda_status_id = 1;
                    $vendor->save();
                }
            }
            if ($record->relations_array) {
                $fieled_name = $record->relations_array['file_id']['showable_name'];
                $section_name = $record->relations_array['file_id']['section_name'];
            } else {
                $fieled_name = 'file';
                $section_name = $data['model'];
            }
        }

        $vendor_id = null;
        if (method_exists($record, 'vendorId')) {
            $vendor_id = $record->vendorId();
            $vendor = User::getObjectById($vendor_id);
        }
        $description = Auth::user()->name.' Uploaded new '.$fieled_name.' named '.$file->file.' in '.$section_name. ' at ' . date('y-m-d H:i:s');
        if (isset($vendor) && $vendor->admin_show != 1) {
            $vendor_id = null;
        }
        Helper::init($model_name, $data['entity_id'], null, null, 'save', $description, $vendor_id, $section_name, $fieled_name);
        $record->save();

        // handle youtube videos
        if (strpos($file->file_type, 'video') !== false) {
            if ($data['youtube_videos']) {
                $file->processed = 2;
                $file->save();
            }
        }

        // Handle file encryption
        if ($data['encrypt_files']) {
            //encrypt files here
            $file->encrypted = 1;
            $file->save();
        }
        return $file->id;
    }
    public function getFileInfo(Request $request)
    {
        $data = $request->input();
        $file = File::find($data['id']);
        return response()->json([
                    'processed'=>$file->processed,
                    'href'=>'https://www.youtube.com/watch?v='.$file->youtube_id,
                    'img' => 'https://img.youtube.com/vi/'.$file->youtube_id.'/0.jpg'

                    ]);
    }


    public function signNow($model, $field, $id)
    {
        $data = [];
        $data['partialView'] = 'signature.signature_pad';
        $data['model'] = $model;
        $data['field'] = $field;
        $data['id'] = $id;
        return view('signature.base', $data);
    }

    public function addSignature(Request $request)
    {
        list($type, $data) = explode(';', $request->image);
        list(, $data)      = explode(',', $data);
        $decocedData = base64_decode($data);
        $uuid =trim(Uuid::uuid4());
        $dir = new Filesystem();
        $dir->makeDirectory('./uploads/'.$uuid);
        $dir->put('./uploads/'.$uuid.'/signature.png', $decocedData);
//        file_put_contents('/uploads/'.$uuid.'/karim.png' , $decocedData );
        return $uuid;
    }

    //Saving
    public function postFiles(Request $request, $multiple, $model_name, $model_field, $id)
    {
        $app='App\\'.$model_name;
        if ($multiple =='false') {
            $element = $app::where('id', $id)->update([$model_field =>$request->uploaded_file]);
        } else {//Upload Multiple Files
            $files = $request->uploaded_files;
            foreach ($files as $file_id) {
                $created = $app::where([$model_field=>$id , 'file_id'=>$file_id])->first();
                if ($created == null) {
                    $element = new $app();
                    $element->$model_field = $id;
                    $element->file_id = $file_id;
                    $element->save();
                }
            }
        }
        return response()->json(['status' => 'success', 'msg' => 'Files updated successfully']);
    }
    public function crop_photo($uuid, $id, $file)
    {
        $data = [];
        $data['partialView'] = 'cropper.crop_photo';
        $data['uuid'] = $uuid;
        $data['id'] = $id;
        $data['file'] = $file;
        return view('cropper.base', $data);
    }
    public function upload_cropped_photo(Request $request)
    {
        $data = $request->input();
        if ($request->hasFile('croppedImage')) {
            $image = $request->file('croppedImage');
            $hash = trim(Uuid::uuid4());
            $dirPath = public_path('uploads/'.$hash);
            Input::file('croppedImage')->move($dirPath, 'cropped_signature.png');
            $file = new File();
            $file->user_id = Auth::user()->id;
            $file->hash = $hash;
            $file->file = 'cropped_signature.png';
            $file->file_type = 'image/png';
            $file->save();
            return ['file_id'=>$file->id,'request'=>$request->file('croppedImage'),'hash'=>$file->hash,'file'=>$file->file];
            // $data['file'] = $file;
        // $data['partialView'] = 'signature.test';
        // return view('signature.base',$data);
        }
        return response()->json(['status' => 'error','request'=>$request->input() ,'msg' => 'failed']);
    }
    public function upload_user_photo($user_id, $file_id)
    {
        $user_signature = User::findOrFail($user_id);
        $original_file_id=$user_signature->file_id;
        $cropped_file=File::where('id', $file_id)->first();
        $original_file=File::where('id', $original_file_id)->first();
        $original_hash=$original_file->hash;
        $original_file->file = $cropped_file->file;
        $original_file->hash = $cropped_file->hash;
        $original_file->file_type = $cropped_file->file_type;
        $original_file->save();
        $dir = new Filesystem();
        if (env('APP_ENV') == "local") {
            $delete_file = $dir->deleteDirectory('./uploads/'.$original_hash);
        } else {
            $result = Storage::disk('s3')->deleteDirectory($original_hash);
        }
        $cropped_file->delete();
        return response()->json(['status' => 'success', 'msg' => 'Files updated successfully']);
    }

    //get user files to be used in cute-file-browser
    public function getUserFiles()
    {
        $user_files = Helper::getUserFiles();
        return $user_files;
    }
    

    public static function downloadFile($file_id)
    {
        $file = File::findOrFail($file_id);
        if (env('APP_ENV') == "local") {
            return response()->download(public_path("uploads" . DIRECTORY_SEPARATOR . $file->hash . DIRECTORY_SEPARATOR . $file->file));
        } else {
            $file_hash = $file->hash;
            $file_name  = $file->file;
            ;
            $file_url = $file_hash.DIRECTORY_SEPARATOR. $file_name;
            $mime = Storage::disk('s3')->mimeType($file_url);
            $size = Storage::disk('s3')->getDriver()->getSize($file_url);

            $response =  [
              'Content-Type' => $mime,
              'Content-Length' => $size,
              'Content-Description' => 'File Transfer',
              'Content-Disposition' => "attachment; filename={$file_name}",
              'Content-Transfer-Encoding' => 'binary',
            ];
            //ob_end_clean();

            return \Response::make(Storage::disk('s3')->get($file_url), 200, $response);
        }
    }

    public function deleteFile($id, $folder, $model, $file_column)
    {
        Helper::deleteFile($id, $folder, $model, $file_column);
    }
}
