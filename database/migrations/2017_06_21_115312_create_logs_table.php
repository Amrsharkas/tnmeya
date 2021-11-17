<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('model_name')->nullable();
            $table->integer('data_id')->nullable();
            $table->string('model_parent')->nullable();
            $table->integer('parent_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('operation')->nullable();
            $table->text('description')->nullable();
            $table->text('record_before')->nullable();
            $table->text('record_after')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
    }
}
