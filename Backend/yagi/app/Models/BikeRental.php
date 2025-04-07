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
        'status',              // Trạng thái xe máy
        'image',               // Hình ảnh xe máy
        'pick_up_location',    // Điểm nhận xe
        'return_location',     // Điểm trả xe
    ];
    public function rentals()
    {
        return $this->hasMany(Rental::class, 'bike_id');
    }
    public function pickUpLocation()
    {
        return $this->belongsTo(Location::class, 'pick_up_location_id');
    }

    public function returnLocation()
    {
        return $this->belongsTo(Location::class, 'return_location_id');
    }
}
