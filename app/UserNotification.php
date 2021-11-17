<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use Auth;
use App\Traits\CommonUserNotificationTrait;
class UserNotification extends Model
{
    use CommonUserNotificationTrait;
    protected $table = 'user_notifications';
    protected $fillable=[ 'user_id', 'role_id' , 'notification_id','read_at', 'read'];
}
