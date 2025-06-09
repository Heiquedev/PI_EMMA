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
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->date('date_of_birth')->nullable();
            $table->date('hire_date');
            $table->double('salary');
            $table->double('costs');
            $table->integer('absence')->default(0); 
            $table->integer('cpf')->unique();
            $table->integer('rg')->nullable();
            $table->integer('phone')->nullable();
            $table->text('description')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('position_id')->constrained()->onDelete('cascade');
            $table->foreignId('tags_id')->constrained()->onDelete('cascade');  
            $table->enum('employment_status', ['active', 'on_leave', 'terminated'])->default('active');
            $table->timestamps();

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
