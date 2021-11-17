<?php

namespace App\Http\Controllers;

use App\DatatableColumnInvisible;
use App\Helpers\Helper;
use App\Log;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Facades\Schema;
use Auth;
use Artisan;
use File;
use SplFileInfo;

//uses
class AdminController extends Controller
{

    /**
     * Add any code you need to run when deploying the project
     */
    public function deploy()
    {
        Artisan::call("key:generate");
        Artisan::call('migrate', array('--path' => 'database/migrations'));
        try {
            Artisan::call("db:seed");
        } catch (\Exception $e) {
        }
    }

    public function index(Request $request)
    {
        $data = [];
        //@@some-data@@
        $data['partialView'] = 'files.edit';
        $data['model_name'] = $request->model_name;
        $data['model_field'] = $request->model_field;
        $data['multiple'] = $request->multiple;
        $data['id'] = $request->id;
        return view('files.base', $data);
    }


    public function choose_role_view()
    {
        $data = [];
        $data['roles'] = Auth::user()->roles;
        $data['partialView'] = '/.choose_role';
        return view('user.base', $data);
    }

    /**
     * set the logged in user role using its id
     * @param $role_id integer [role id in the DB]
     * @return bool|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function choose_role($role_id)
    {
        // if a guest is signed in to take a quiz
        if (session()->has('external_agency_quiz_token')) {
            return false;
        } else {
            Auth::user()->setLoggedInRoleID($role_id);
            return redirect(route('home'));
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
    public function init($id, $parent_model_name, $model_name, $method, $table_name, Request $request)
    {
        $data = Helper::initElement($id, $parent_model_name, $model_name, $method, $table_name);
        return response()->json($data['data']);
    }

    /**
     * delete record from DB
     * @param $id integer [primary key]
     * @param $model string [model name where the record existed]
     */
    public function delete($id, $model)
    {
        $delete = Helper::deleteElement($id, $model);

        return $delete;
    }

    public function home()
    {
        if (Auth::user()) {
            return view('admin.master');
        }
    }

    /**
     * returns data table columns visibility
     * @param Request $request
     * @return mixed
     */
    public function datatableInvisibleColumns(Request $request)
    {
        $data = $request->input();
        return DatatableColumnInvisible::where(['user_id' => Auth::user()->id, 'datatable' => $data['datatable']])->get();
    }

    /** Add and Edit data table columns visibility
     * @param Request $request
     */
    public function datatableVisibility(Request $request)
    {
        $data = $request->input();
        if ($data['visibility'] == 'true') {
            DatatableColumnInvisible::where(['user_id' => Auth::user()->id, 'datatable' => $data['datatable'], 'column_name' => $data['column_name']])->delete();
        } else {
            $datatable = new DatatableColumnInvisible();
            $datatable->user_id = Auth::user()->id;
            $datatable->datatable = $data['datatable'];
            $datatable->column_name = $data['column_name'];
            $datatable->save();
        }
    }
    //functions
    public function deletePublicFiles()
    {
        $public_folders = [
                'name' => '../public',
        ];

        $app_folders =[
                'name' => '../resources',
                'base_ext' => 'php,css,js,png,jpg',
        ];

        $files_extentions = $this->getFilesExtentions($public_folders);
        // dump($files_extentions );
        $this->checkIfBaseFileExsit($app_folders, $public_folders);
        
        $public_folders_with_extentions = [
            'name' =>public_path(''),
            // 'name' => '../public/assets/admin/layout4',
            'ext' => $files_extentions,
        ];

        $this->checkIfFileExsitInPublic($public_folders_with_extentions);
    }

    public function checkIfFileExsitInPublic($public_folders_with_extentions)
    {
        dump('checkIfFileExsitInPublic');
        
        $extentions =$public_folders_with_extentions['ext'] ;
     
        $public_files = new \RecursiveDirectoryIterator($public_folders_with_extentions['name']);
        $public_files2 = new \RecursiveDirectoryIterator($public_folders_with_extentions['name']);
       
        $first_loop = new \RecursiveIteratorIterator($public_files);
        foreach ($first_loop as $file) {
            $public_file_info = new SplFileInfo($file);
            $public_file_name = $public_file_info->getFilename();
            $public_file_path = $public_file_info->getLinkTarget();
            
            if (!is_dir($public_file_path) && in_array($file->getExtension(), $extentions)) {
                $file_exist = 0;
                $second_loop = new \RecursiveIteratorIterator($public_files2);
                foreach ($second_loop as $public_file) {
                    $p_info = new SplFileInfo($public_file);
                    $f_name = $p_info->getFilename();
                    $f_path = $p_info->getLinkTarget();

                                        
                    if (!is_dir($f_path) && strpos(file_get_contents($f_path), $public_file_name) == true) {
                        $file_exist = 1;
                        // dump('public_file: '.$public_file_name.' app_path: '.$public_file_path);
                    }
                }
                if ($file_exist != 1) {
                    if ($public_file_name != '.htaccess') {
                        dump('deleted_public_file: '.$public_file_name.' ----- deleted_path: '.$public_file_path);
                        File::delete($public_file_path);
                    }
                }
            }
        }
        
        dump('checkIfFileExsit_InPublic --- done');
    }
    
    public function checkIfBaseFileExsit($app_folders, $public_folders)
    {
        dump('checkIfBaseFileExsit');
        $app_base_extentions = explode(",", $app_folders['base_ext']);
        $public_files = new \RecursiveDirectoryIterator($public_folders['name']);
       
        foreach (new \RecursiveIteratorIterator($public_files) as $file) {
            if (in_array($file->getExtension(), $app_base_extentions)) {
                $public_file_info = new SplFileInfo($file);
                $public_file_name = $public_file_info->getFilename();
                $public_file_path = $public_file_info->getLinkTarget();

                // dump($public_file_name); // ely hshofw mst8dm wla f le project
                $app_files = new \RecursiveDirectoryIterator($app_folders['name']);
                $file_exist = 0;
                foreach (new \RecursiveIteratorIterator($app_files) as $app_file) {
                    $app_file_info = new SplFileInfo($app_file);
                    $app_file_name = $app_file_info->getFilename();
                    $app_file_path = $app_file_info->getLinkTarget();
                    
                    if (!is_dir($app_file_path)) {
                        if (strpos(file_get_contents($app_file_path), $public_file_name) == true) {
                            $file_exist = 1;
                            // dump('public_file: '.$public_file_name.' app_path: '.$app_file_path);
                        }
                    }
                }
                if ($file_exist != 1) {
                    if ($public_file_path != 'C:\wamp64\www\S2\public\index.php') {
                        dump('deleted_public_file: '.$public_file_name.' ----- deleted_app_path: '.$public_file_path);
                        File::delete($public_file_path);
                    }
                }
            }
        }

        dump('checkIfBaseFileExsit_outPublic --- done');
    }



    public function getFilesExtentions($public_folders)
    {
        $extentions=array();
        $folder_files = new \RecursiveDirectoryIterator($public_folders['name']);
        foreach (new \RecursiveIteratorIterator($folder_files) as $file) {
            $file_info = new SplFileInfo($file);
            $file_name = $file_info->getFilename();
                        
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            if (!in_array($ext, $extentions) && $ext != 'js' && $ext != 'css' && $ext != 'php' && $ext != 'png' && $ext != 'jpg') {
                array_push($extentions, $ext);
            }
        }
    
        return $extentions;
    }
}
