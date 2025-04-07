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
        'customer_phone',
        'pickup_date',
        'return_date',
        'total_price',
        'status',
    ];

    public function car()
    {
        return $this->belongsTo(BikeRental::class, 'bike_id');
    }
}
