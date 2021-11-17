<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Http\Requests;
use Auth;
use App\Helpers\Helper;
use App\Traits\AllModels;
use Spatie\Permission\Contracts\Role as Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use AllModels;
    use HasRoles;

    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    
    public function files()
    {
        return $this->hasMany('App\File');
    }

  //  public function roles()
  //  {
   //     return $this->belongsToMany('App\Role', 'user_role', 'user_id', 'role_id');
   // }

  //  public function hasAnyRole($roles)
  //  {
    //    if (is_array($roles)) {
     //       foreach ($roles as $role) {
     //           if ($this->hasRole($role)) {
     //               return true;
     //           }
     //       }
     //   } else {
     //       if ($this->hasRole($roles)) {
     //           return true;
     //       }
     //   }
  //      return false;
  //  }

  //  public function hasRole($role)
 //   {
   //     if ($this->roles()->where('name', $role)->first()) {
   //         return true;
   //     }
  //      return false;
  //  }


    public function signedInAs($roles)
    {
        if (empty($roles)){
            return true;
        }

        if (is_array($roles) && count($roles) != 0) {
            foreach ($roles as $role) {
                if($role == ""){
                    return true;
                }
                $current_role = Role::where('name',$role)->first();
                if ($current_role->id == $this->getLoggedInRoleID()) {
                    return true;
                }
            }
        } else {
            $current_role = role::where('name',$roles)->first();
                if ($current_role->id == $this->getLoggedInRoleID()) {
                    return true;
                }

        }
        return false;
    }


    public function getLoggedInRoleID()
    {

        if(session()->has('logged_in_role_id')) {

            return session('logged_in_role_id');
        }

        return null;
    }

    public function setLoggedInRoleID($role_id)
    {
        session(['logged_in_role_id' => $role_id]);
    }
    /**
     * Get the entity's notifications.
     */

    public function userNotifications()
    {
        if($this->getLoggedInRoleID() == null){
            return $this->hasMany('App\UserNotification','user_id','id')->where('role_id', null);

        }else{
            return $this->hasMany('App\UserNotification','user_id','id')
                ->where(function($query){
                    $query->where('role_id', $this->GetLoggedInRoleID())
                        ->orWhere('role_id',Null);
                });

        }

    }

    public function userNotificationsPaginated()
    {
        $notification = $this->userNotifications();

        $notifications = $notification->orderBy('id','desc')->paginate(3);
        return $notifications;

    }
    /**
     * Get the entity's read notifications.
     */
    public function readNotifications()
    {
        return $this->userNotifications()
            ->whereNotNull('read_at');
    }

    /**
     * Get the entity's unread notifications.
     */
    public function unreadNotifications()
    {
        return $this->userNotifications()
            ->whereNull('read_at');
    }


//relations


}
