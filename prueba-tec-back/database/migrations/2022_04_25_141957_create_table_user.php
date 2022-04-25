<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('name');
            $table->string('last_name');
            $table->foreignId('type_identification_id');
            $table->string('identification');
            $table->dateTime('birth_date');
            $table->string('password');
            $table->timestamps();

            $table->foreign('type_identification_id')->references('id')->on('identification_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
