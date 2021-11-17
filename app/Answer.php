<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;
use Yajra\DataTables\Facades\DataTables;
use App\Helpers\Helper;
use App\Traits\AllModels;

class  Answer extends Model
{
    use AllModels;

    protected $table = 'answers';


    
    public function entry()
    {
        return $this->belongsTo('App\Entry' , 'entry_id' );
    }

    public function question()
    {
        return $this->belongsTo('App\Question' , 'question_id' );
    }

//relations
}
