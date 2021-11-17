<?php
namespace App\Traits;

trait CommonNotificationTrait
{
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function message()
    {
        $notification = $this->notification;
        /*if ($this->user_id){
            $user = User::where('id', $this->user_id)->first();
            $notification =   str_replace('<username>', $user->name, $notification);
        }
       */
        return $notification;
    }

    public function url()
    {
        return $this->administration_url;
        if (Auth::user()->SignedInAs(["Super Admin","Manager","Team Leader"])) {
        }
        if (Auth::user()->SignedInAs(["Reviewer"])) {
            return $this->reviewer_url;
        }
        if (Auth::user()->SignedInAs(["Supplier","Agency"])) {
            return $this->supplier_agency_url;
        }
        return ;
    }
}
