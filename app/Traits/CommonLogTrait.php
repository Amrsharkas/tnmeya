<?php
namespace App\Traits;

trait CommonLogTrait
{
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
