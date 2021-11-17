<?php

namespace App\Traits;

trait CommonUser
{

    /**
     * @return mixed
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role', 'user_role', 'user_id', 'role_id');
    }

    /**
     * @param $roles array of roles where each role is string (role name) OR string
     * @return bool
     */
    public function hasAnyRole($roles)
    {
        if (is_array($roles)) {
            foreach ($roles as $role) {
                if ($this->hasRole($role)) {
                    return true;
                }
            }
        } else {
            if ($this->hasRole($roles)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param $role string
     * @return bool
     */
    public function hasRole($role)
    {
        if ($this->roles()->where('name', $role)->first()) {
            return true;
        }
        return false;
    }


    /**
     * @param $roles array of roles where each role is string (role name) OR string
     * @return bool
     */
    public function signedInAs($roles)
    {
        if (empty($roles)) {
            return true;
        }

        if (is_array($roles) && count($roles) != 0) {
            foreach ($roles as $role) {
                if ($role == "") {
                    return true;
                }
                $current_role = Role::where('name', $role)->first();
                if ($current_role->id == $this->getLoggedInRoleID()) {
                    return true;
                }
            }
        } else {
            $current_role = Role::where('name', $roles)->first();
            if ($current_role->id == $this->getLoggedInRoleID()) {
                return true;
            }
        }
        return false;
    }


    /**
     * @return \Illuminate\Session\SessionManager|\Illuminate\Session\Store|mixed|null
     */
    public function getLoggedInRoleID()
    {
        if (session()->has('logged_in_role_id')) {
            return session('logged_in_role_id');
        }

        return null;
    }

    /**
     * @param $role_id integer
     */
    public function setLoggedInRoleID($role_id)
    {
        session(['logged_in_role_id' => $role_id]);
    }


    /**
     * Get the entity's notifications.
     * @return mixed
     */
    public function userNotifications()
    {
        if ($this->getLoggedInRoleID() == null) {
            return $this->hasMany('App\UserNotification', 'user_id', 'id')->where('role_id', null);
        } else {
            return $this->hasMany('App\UserNotification', 'user_id', 'id')
                ->where(function ($query) {
                    $query->where('role_id', $this->getLoggedInRoleID())
                        ->orWhere('role_id', null);
                });
        }
    }

    /**
     * @return mixed
     */
    public function userNotificationsPaginated()
    {
        $notification = $this->userNotifications();

        $notifications = $notification->orderBy('id', 'desc')->paginate(3);
        return $notifications;
    }


    /**
     * Get the entity's read notifications.
     * @return mixed
     */
    public function readNotifications()
    {
        return $this->userNotifications()
            ->whereNotNull('read_at');
    }


    /**
     * Get the entity's unread notifications.
     * @return mixed
     */
    public function unreadNotifications()
    {
        return $this->userNotifications()
            ->whereNull('read_at');
    }
}
