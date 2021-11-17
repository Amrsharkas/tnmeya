<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use Auth;
use App\Traits\CommonFileTrait;
class File extends Model {

    use CommonFileTrait;
    protected $table = 'files';
    protected $fillable=[ 'user_id', 'file' , 'hash' , 'file_type' ];

    public function user()
    {
        return $this->belongsTo('App\User' , 'user_id' );
    }

//relations
}
