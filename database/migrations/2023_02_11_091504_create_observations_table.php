<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('observations', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('latin_name', 255);

            $table->decimal('latitude', 16, 13);
            $table->decimal('longitude', 16, 13);

            $table->unsignedInteger('count');

            $table->timestamp('observed_at');
            $table->timestamp('observed_at_week');

            $table->string('observer_name');
            $table->string('locality');

            $table->index(['name', 'latin_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('observations');
    }
};
