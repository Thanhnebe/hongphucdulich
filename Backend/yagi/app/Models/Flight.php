<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $table = 'flights'; // Tên bảng

    protected $fillable = [
        'flight_number',
        'airline',
        'departure',
        'destination',
        'departure_time',
        'arrival_time',
        'price',
        'status',
    ];

    protected $casts = [
        'departure_time' => 'datetime',
        'arrival_time' => 'datetime',
        'price' => 'decimal:2',
        'status' => 'string',
    ];
}
