<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;
use App\Traits\AllModels;
use App\Traits\CommonLogTrait;

class Log extends Model
{
    use AllModels;
    use CommonLogTrait;
    protected $table = 'logs';
    protected $fillable=[ 'model_name', 'data_id' , 'model_parent' , 'parent_id' , 'user_id' , 'operation' , 'description', 'record_before', 'record_after'  ];
}
