<?php
//Route::Auth();
Route::mixin(new \Laravel\Ui\AuthRouteMethods());
Auth::routes();
Route::get('/logout', 'Auth\LoginController@logout');
Route::get('/', 'Auth\LoginController@login');
Route::get('/deploy', ['uses' => 'AdminController@deploy'])->name('deploy');

Route::group(['middleware' => ['auth'], 'prefix' => "files", 'as' => "files."], function () {
    Route::post('/endpoint', 'fileController@handle')->name('endpoint');
    Route::post('/save_file', 'fileController@saveFile')->name('save_file');
    Route::delete('/endpoint/{file}', 'fileController@handle')->name('delete_endpoint');
    Route::post('/get_file_info', 'fileController@getFileInfo')->name('get_file_info');
    Route::get('{model}/{field}/{id}/sign_now', 'fileController@signNow')->name('sign_now');
    Route::post('/addSignature', 'fileController@addSignature')->name('addSignature');
    Route::delete('{id}/{model}/{file_column}/delete_file', 'fileController@deleteFile')->name('delete_file');
    Route::get('/getFiles', ['uses' => 'fileController@getUserFiles', 'middleware' => 'authorize', 'roles' => []])->name('getFiles');
    Route::post('{multiple}/{model_name}/{model_field}/{id}/getFiles', ['uses' => 'fileController@postFiles', 'middleware' => 'authorize', 'roles' => []])->name('getFiles');
    Route::get('/', ['uses' => 'AdminController@index', 'middleware' => 'authorize', 'roles' => []])->name('index');

    /*--routes@@files*/
});

Route::group(['middleware' => ['auth', /*'chooseRole'*/] ], function () {

    Route::get('create_token/{token}', 'NotificationController@createToken');
    Route::get('trial', 'NotificationController@trial');
    Route::get('send', 'NotificationController@send');
    Route::get('get_notifications', 'NotificationController@getNotifications');
    Route::post('read_notification/{id}', 'NotificationController@read_notification');
    Route::post('read_notifications', 'NotificationController@read_notifications');
    /*--routes@@notifications*/
});

Route::get('/choose_role_view', ['uses' => 'AdminController@choose_role_view', 'middleware' => 'auth', 'roles' => []])->name('choose_role_view');
Route::get('{role_id}/choose_role', ['uses' => 'AdminController@choose_role', 'middleware' => 'auth', 'roles' => []])->name('choose_role');
//home
Route::get('home', ['uses' => 'AdminController@home', 'middleware' => 'auth', 'roles' => []])->name('home');
Route::get('/', ['uses' => 'AdminController@home', 'middleware' => 'auth', 'roles' => []]);

Route::post('{id}/{staff}/{model}/{method}/{table}/init', 'AdminController@init')->name('init');

//datatable visibility
Route::post('datatable_visibility', 'AdminController@datatableVisibility')->name('datatableVisibility');
Route::post('datatable_invisible_columns', 'AdminController@datatableInvisibleColumns')->name('datatableInvisibleColumns');

Route::group(['middleware' => ['auth'], 'prefix' => "log", 'as' => "log."], function () {
    Route::get('/', ['uses' => 'logController@index'])->name('index');
    /*--routes@@log*/
});
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//--routes--