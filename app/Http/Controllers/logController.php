<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Log;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Facades\Schema;
use Auth;

//uses
class logController extends Controller
{
    public function index()
    {
        $data = [];
        //@@some-data@@
        $data['partialView'] = 'log.index';
        $data['logs'] = Log::orderBy('created_at', 'asc')->get();
        return view('log.base', $data);
    }
    //functions
}
