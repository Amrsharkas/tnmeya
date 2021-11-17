<?php
namespace App\Traits;

trait AllModels
{

    /**
     * @param $id
     * @return mixed
     */
    public static function GetByID($id)
    {
        return self::findOrFail($id);
    }
}
