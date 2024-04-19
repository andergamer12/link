<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('turistas', function (Blueprint $table) {
        $table->bigInteger('id')->unsigned();
        $table->string('dni');
        $table->string('tel');
        $table->bigInteger('CodPais');
        $table->timestamps();

        $table->primary('id');
        $table->foreign('id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('CodPais')->references('CodPais')->on('Pais');
    });
    
}

    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turistas');
    }
};
