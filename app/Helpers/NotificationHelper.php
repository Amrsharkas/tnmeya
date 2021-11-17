<?php

namespace App\Helpers;

use App\Firebase;
use App\Notification;
use App\Role;
use App\User;
use App\UserNotification;
use App\UserRole;
use Auth;

class NotificationHelper
{
    public static function submitSignature()
    {
        $message = '<username> has submitted his signature for review';
        $notification = new Notification();
        $notification->type = 'approvals';
        $notification->administration_url = '/approvals';
        $notification->notification = $message;
        $notification->user_id = Auth::user()->id;
        $notification->save();
        $message = Auth::user()->name . ' has submitted his signature for review';

        self::notifyAdministration($notification, $message);
    }

    public static function notifyAdministration($notification, $message)
    {
        $users = User::where('admin_show', 1)->get();
        foreach ($users as $user) {
            if ($user->hasAnyRole(["Super Admin", "Manager", "Team Leader"])) {
                $user_role = UserRole::where('user_id', $user->id)->where('status', 'active')->whereIn('role_id', [1, 2, 3])->first();
                self::addNotification($user, $notification, $message, $user_role->role_id);
            }
        }
    }


    public static function addNotification($user, $notification, $message, $role_id)
    {
        if ($user->id != Auth::user()->id) {
            $user_notification = new UserNotification();
            $user_notification->user_id = $user->id;
            $user_notification->notification_id = $notification->id;
            $user_notification->role_id = $role_id;
            $user_notification->save();
            // $ch = curl_init();
            // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            // curl_setopt($ch, CURLOPT_URL, "http://linguistix.devlopment:8084/send");
            // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            // curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n  \"notification\": \" $message\" ");
            // curl_setopt($ch, CURLOPT_POST, 1);

            // $headers = array();
            // $headers[] = "Authorization: key=AAAAMLlhlhc:APA91bF36oex9h0ebceL92I_KglvBn5kFtv5UE84dfEohK4IYVoaOcYhY2C-B62XxhoTdrXvWnErMQBwaZfUpGvK7CcGBbZYTkxEzXooGMWzCYtLE8qT5F9UEqYTFWQiWZrl45FLOJGI";
            // $headers[] = "Content-Type: application/json";
            // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            // $result = curl_exec($ch);
            // if (curl_errno($ch)) {
            //     echo 'Error:' . curl_error($ch);
            // }
            // curl_close($ch);

            // self::sendBrowserNotification($message, $user->id);
        }
    }

    public static function sendBrowserNotification($message, $notify_user_id)
    {
        $notify_user_token = Firebase::where('user_id', $notify_user_id)->first();

        if ($notify_user_token) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_URL, "https://fcm.googleapis.com/fcm/send");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n  \"notification\": {\n    \"title\": \" $message\",\n    \"body\": \" \"\n\n  },\n  \"to\": \"$notify_user_token->token\"\n}");
            curl_setopt($ch, CURLOPT_POST, 1);

            $headers = array();
            $headers[] = "Authorization: key=AAAAMLlhlhc:APA91bF36oex9h0ebceL92I_KglvBn5kFtv5UE84dfEohK4IYVoaOcYhY2C-B62XxhoTdrXvWnErMQBwaZfUpGvK7CcGBbZYTkxEzXooGMWzCYtLE8qT5F9UEqYTFWQiWZrl45FLOJGI";
            $headers[] = "Content-Type: application/json";
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            $result = curl_exec($ch);
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            }
            curl_close($ch);
        }
    }

    //function
}
