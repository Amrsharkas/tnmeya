<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type')->nullable();
            $table->string('administration_url')->nullable();
            $table->string('reviewer_url')->nullable();
            $table->string('supplier_agency_url')->nullable();
            $table->text('notification')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('project_id')->nullable();
            $table->integer('subproject_id')->nullable();
            $table->integer('progress_id')->nullable();
            $table->integer('invoice_id')->nullable();
            $table->integer('manager_id')->nullable();
            $table->integer('admin_show')->default(0);

            $table->integer('stuff_order')->default(0);

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
        Schema::dropIfExists('notifications');
    }
}
