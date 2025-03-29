<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightTicket extends Model
{
    use HasFactory;

    protected $table = 'flight_tickets';

    protected $fillable = [
        'passenger_name',
        'passport_number',
        'flight_number',
        'departure',
        'destination',
        'departure_time',
        'seat_number',
        'price',
        'status',
        'user_id', // Add 'user_id' here
    ];

    protected $casts = [
        'departure_time' => 'datetime',  // Automatically cast to Carbon instance
    ];

    // Optional: Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
