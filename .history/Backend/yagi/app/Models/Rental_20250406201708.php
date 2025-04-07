<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'bike_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'pick_up_date',
        'return_date',
        'pick_up_location_id',
        'return_location_id',
        'driver_license_number',
        'note',
        'status',
    ];

    public function bike()
    {
        return $this->belongsTo(BikeRental::class, 'bike_id');
    }
}
