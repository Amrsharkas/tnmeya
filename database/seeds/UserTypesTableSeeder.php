<?php

use Illuminate\Database\Seeder;

class UserTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user=\App\User::find(1);
\Spatie\Permission\Models\Role::updateOrCreate(['name'=>'Admin']);
$user->assignRole('Admin');

    }
}
