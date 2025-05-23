<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailRoom extends Model
{
    use HasFactory;
    // protected $table = 'DetailRooms';
    protected $fillable = ['room_id', 'hotel_id', 'name', 'price', 'price_surcharge', 'available', 'description', 'image', 'gallery_id', 'into_money', 'available_rooms', 'is_active'];
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function gallery()
    {
        return $this->hasMany(gallery::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
    public function services()
    {
        return $this->hasMany(service::class);
    }
    public function cartDetails()
    {
        return $this->hasMany(CartDetail::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function roomType()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
    public function roomAvailabilities()
    {
        return $this->hasMany(RoomAvailability::class);
    }
  
}