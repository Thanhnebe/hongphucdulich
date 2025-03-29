<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Flight;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class FlightController extends Controller
{
    // Lấy danh sách tất cả chuyến bay
    public function index()
    {
        return response()->json(Flight::all(), Response::HTTP_OK);
    }

    // Tạo mới một chuyến bay
    public function store(Request $request)
    {
        $request->validate([
            'flight_number' => 'required|string|max:10',
            'airline' => 'required|string|max:50',
            'departure' => 'required|string',
            'destination' => 'required|string',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:Scheduled,Delayed,Cancelled,Completed',
        ]);

        $flight = Flight::create($request->all());

        return response()->json($flight, Response::HTTP_CREATED);
    }

    // Lấy thông tin một chuyến bay theo ID
    public function show($id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Chuyến bay không tồn tại'], Response::HTTP_NOT_FOUND);
        }
        return response()->json($flight, Response::HTTP_OK);
    }

    // Cập nhật thông tin chuyến bay
    public function update(Request $request, $id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Chuyến bay không tồn tại'], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'flight_number' => 'sometimes|string|max:10',
            'airline' => 'sometimes|string|max:50',
            'departure' => 'sometimes|string',
            'destination' => 'sometimes|string',
            'departure_time' => 'sometimes|date',
            'arrival_time' => 'sometimes|date',
            'price' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:Scheduled,Delayed,Cancelled,Completed',
        ]);

        $flight->update($request->all());

        return response()->json($flight, Response::HTTP_OK);
    }

    // Xóa chuyến bay
    public function destroy($id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Chuyến bay không tồn tại'], Response::HTTP_NOT_FOUND);
        }

        $flight->delete();

        return response()->json(['message' => 'Xóa chuyến bay thành công'], Response::HTTP_OK);
    }

    // Tìm kiếm chuyến bay theo điểm đi, điểm đến và ngày đi
    public function search(Request $request)
    {
        Log::info("📢 Tìm kiếm chuyến bay với thông tin:", $request->all());

        // Xác thực đầu vào
        $request->validate([
            'departure' => 'required|string',
            'destination' => 'required|string',
            'departure_time' => 'required|date'
        ]);

        $departure = $request->departure;
        $destination = $request->destination;
        $departureDate = $request->departure_time;

        // Chuyển ngày đi thành ngày bắt đầu và kết thúc (startOfDay và endOfDay)
        $startOfDay = Carbon::parse($departureDate)->startOfDay();
        $endOfDay = Carbon::parse($departureDate)->endOfDay();

        // Tìm kiếm chuyến bay khớp hoàn toàn
        $flights = Flight::where('departure', $departure)
            ->where('destination', $destination)
            ->whereBetween('departure_time', [$startOfDay, $endOfDay])
            ->get();

        // Kiểm tra và trả kết quả
        if ($flights->isEmpty()) {
            Log::warning("🚫 Không tìm thấy chuyến bay phù hợp!", compact('departure', 'destination', 'departureDate'));
            return response()->json(['message' => 'Không tìm thấy chuyến bay phù hợp'], Response::HTTP_NOT_FOUND);
        }

        Log::info("✅ Tìm thấy chuyến bay:", $flights->toArray());

        return response()->json($flights, Response::HTTP_OK);
    }
}
