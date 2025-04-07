<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BikeRental extends Model
{
    use HasFactory;

    protected $fillable = [
        'bike_name',           // Tên xe máy
        'bike_model',          // Model xe máy
        'bike_number',         // Biển số xe máy
        'price_per_day',       // Giá thuê theo ngày
        'bike_type',           // Loại xe máy (tay ga, số, côn tay)
        'engine_capacity',     // Dung tích động cơ (cc)
        'fuel_type',           // Loại nhiên liệu (xăng/điện)
        'fuel_consumption',    // Tiêu hao nhiên liệu (L/100km)
        'description',         // Mô tả xe máy
        'location',            // Vị trí xe máy
        'status',
        'image',              // Hình ảnh xe máy,

    ];
}
