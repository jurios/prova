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
            $table->string('family');
            $table->enum('taxonomy', [\App\Taxonomy::Aus->value]);

            $table->decimal('latitude', 16, 13);
            $table->decimal('longitude', 16, 13);

            $table->unsignedInteger('count');

            $table->timestamp('observed_at');
            $table->unsignedInteger('year');

            $table->string('observer_name');
            $table->string('locality');
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
