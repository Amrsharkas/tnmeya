<?php
namespace App\Traits;

trait CommonUserNotificationTrait
{
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
    public function notification()
    {
        return $this->belongsTo('App\Notification', 'notification_id');
    }
    public function approvalsNotification()
    {
        return $this->belongsTo('App\Notification', 'notification_id')->where('type', 'approvals');
    }
}
