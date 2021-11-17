<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::updateOrCreate(['id'=>1],[
            'id'=>1,
            'name'=>'Super',
            'email'=>'super@nour.com',
            'password'=>bcrypt('123456'),
        ]);
    }
}
