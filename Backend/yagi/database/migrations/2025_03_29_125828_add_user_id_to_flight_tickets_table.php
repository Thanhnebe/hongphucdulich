<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdToFlightTicketsTable extends Migration
{
    public function up()
    {
        Schema::table('flight_tickets', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable(); // Add user_id column
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Foreign key to users table
        });
    }

    public function down()
    {
        Schema::table('flight_tickets', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // Drop foreign key
            $table->dropColumn('user_id'); // Drop the user_id column
        });
    }
}
