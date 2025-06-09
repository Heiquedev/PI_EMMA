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
        Schema::create('labor_rights', function (Blueprint $table) {
            $table->id();
            $table->boolean('fgts')->default(true);
            $table->boolean('inss')->default(true);
            $table->boolean('decimo_terceiro')->default(true);
            $table->boolean('ferias')->default(true);
            $table->boolean('vale_transporte')->default(false);
            $table->boolean('vale_refeicao')->default(false);
            $table->boolean('vale_alimentacao')->default(false);
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('labor_rights');
    }
};
