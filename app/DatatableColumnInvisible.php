<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CommonDatatableColumnInvisibleTrait;
class DatatableColumnInvisible extends Model {

    use CommonDatatableColumnInvisibleTrait;
    protected $table = 'datatable_column_invisibles';
}
