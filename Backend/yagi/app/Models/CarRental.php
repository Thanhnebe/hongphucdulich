<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarRental extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_name',            // Tên xe
        'car_model',           // Model xe
        'car_number',          // Biển số xe
        'price_per_day',       // Giá thuê theo ngày
        'car_type',            // Loại xe
        'seats',               // Số ghế
        'transmission',        // Truyền động (số tự động/số sàn)
        'fuel_type',           // Loại nhiên liệu (xăng/diesel/điện)
        'fuel_consumption',    // Tiêu hao nhiên liệu (L/100km)
        'description',         // Mô tả xe
        'location',            // Vị trí xe
        'status',              // Trạng thái (available, rented, maintenance)
    ];
}
