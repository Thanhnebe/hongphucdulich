<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('flight_tickets', function (Blueprint $table) {
            $table->id();
            $table->string('passenger_name');
            $table->string('passport_number')->nullable();
            $table->string('flight_number');
            $table->string('departure');
            $table->string('destination');
            $table->dateTime('departure_time');
            $table->integer('seat_number')->nullable();
            $table->decimal('price', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->timestamps(0); // Created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('flight_tickets');
    }
};
