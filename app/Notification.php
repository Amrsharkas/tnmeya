<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Traits\CommonNotificationTrait;
class  Notification extends Model
{
    use CommonNotificationTrait;
    protected $table = 'notifications';
    protected $fillable=['type', 'type','administration_url','reviewer_url','supplier_agency_url', 'notification', 'user_id','project_id', 'subproject_id', 'progress_id', 'invoice_id', 'manager_id'];
//relations
}
