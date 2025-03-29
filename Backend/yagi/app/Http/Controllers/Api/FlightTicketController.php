<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\FlightTicket;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class FlightTicketController extends Controller
{
    /**
     * API đặt vé chuyến bay
     */
    public function bookFlight(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'passenger_name' => 'required|string|max:255',
            'passport_number' => 'nullable|string|max:255',
            'flight_number' => 'required|string|max:255',
            'departure' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'departure_time' => 'required|date',
            'seat_number' => 'nullable|integer',
            'price' => 'required|numeric|min:0',
            'user_id' => 'required|integer|exists:users,id', // Ensure user_id is an integer and exists in the users table
        ]);

        // Nếu xác thực không hợp lệ, trả về lỗi
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ!',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Tạo bản ghi đặt vé
        $ticket = FlightTicket::create([
            'passenger_name' => $request->passenger_name,
            'passport_number' => $request->passport_number,
            'flight_number' => $request->flight_number,
            'departure' => $request->departure,
            'destination' => $request->destination,
            'departure_time' => $request->departure_time,
            'seat_number' => $request->seat_number,
            'price' => $request->price,
            'status' => 'pending',
            'user_id' => $request->user_id,  // Store the user_id in the ticket
        ]);

        // Trả về kết quả thành công
        return response()->json([
            'status' => 'success',
            'message' => 'Đặt vé thành công!',
            'data' => $ticket,
        ], 201);
    }
}
