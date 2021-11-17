<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CommonRoleTrait;

class Role extends Model {
    use CommonRoleTrait;
    protected $table = 'roles';
}