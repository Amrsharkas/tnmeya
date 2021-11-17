<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;
use Yajra\DataTables\Facades\DataTables;
use App\Helpers\Helper;
use App\Traits\AllModels;

class  Entry extends Model
{
    use AllModels;

    protected $table = 'entries';


    
    public function answers()
    {
        return $this->hasMany('App\Answer');
    }


//relations
}
