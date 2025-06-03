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
        Schema::create('employees', function (Blueprint $table) {
            $table->id('id_employee')->primary();
            $table->string('firstname')();
            $table->string('lastname');
            $table->string('email')->unique();
            $table->date('birthdate');
            $table->date('hire_date');
            $table->double('salary');
            $table->double('costs');
            $table->int('cpf')->unique();
            $table->int('rg')->nullable();
            $table->int('phone')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('contract');
            $table->unsignedBigInteger('absence_id');
            $table->foreignId('position_id')->constrained()->onDelete('cascade');
            $table->foreignId('tags_id')->constrained()->onDelete('cascade');  
            $table->city('city_id');
            $table->unsignedBigInteger('labor_rights');
            $table->unsignedBigInteger('work_shift_id');
            $table->timestamps('created_at');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
