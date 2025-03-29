<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRentalsTable extends Migration
{
    public function up()
    {
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('car_id'); // Khoá ngoại tới bảng cars
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->date('pickup_date');
            $table->date('return_date');
            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['pending', 'rented', 'returned'])->default('pending');
            $table->timestamps();

            $table->foreign('car_id')->references('id')->on('car_rentals')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('rentals');
    }
}
