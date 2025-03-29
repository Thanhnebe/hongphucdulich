<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->string('name'); // Tên xe
            $table->integer('seats'); // Số ghế
            $table->string('transmission'); // Truyền động
            $table->string('fuel_type'); // Loại nhiên liệu
            $table->decimal('fuel_consumption', 5, 2); // Tiêu hao nhiên liệu (L/100km)
            $table->text('description')->nullable(); // Mô tả xe
            $table->string('location'); // Vị trí xe
        });
    }

    public function down()
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn([
                'name',
                'seats',
                'transmission',
                'fuel_type',
                'fuel_consumption',
                'description',
                'location'
            ]);
        });
    }
};
