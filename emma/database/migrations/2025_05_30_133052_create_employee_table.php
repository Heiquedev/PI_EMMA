<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employee', function (Blueprint $table) {
            $table->id('id_employee')->primary();
            $table->string('name_eployee');
            $table->string('email');
            $table->date('birthdate');
            $table->date('joined_at');
            $table->double('salary');
            $table->double('costs');
            $table->int('cpf');
            $table->int('cellphone');
            $table->text('description');
            $table->unsignedBigInteger('contract');
            $table->unsignedBigInteger('absence_id');
            $table->unsignedBigInteger('departament_id');
            $table->unsignedBigInteger('tags_id');  
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('labor_rights');
            $table->unsignedBigInteger('shift');
            $table->timestamps('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee');
    }
};
