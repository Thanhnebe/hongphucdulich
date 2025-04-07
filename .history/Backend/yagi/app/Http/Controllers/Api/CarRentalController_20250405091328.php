<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\BikeRental;
use App\Models\Rental;
use Illuminate\Support\Facades\Validator;

class CarRentalController extends Controller
{
    // Liệt kê tất cả xe cho thuê
    public function index()
    {
        $cars = BikeRental::all();  // Lấy tất cả các xe cho thuê
        return response()->json([
            'status' => 'success',
            'data' => $cars
        ]);
    }

    // Thêm mới một xe cho thuê
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bike_name' => 'required|string|max:255',
            'bike_model' => 'required|string|max:255',
            'bike_number' => 'required|string|max:20',
            'price_per_day' => 'required|numeric|min:0',
            'bike_type' => 'required|string|max:255',
            'engine_capacity' => 'required|numeric|min:0',
            'fuel_type' => 'required|string|max:255',
            'fuel_consumption' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'status' => 'required|string|in:available,rented,maintenance',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra định dạng hình ảnh

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ!',
                'errors' => $validator->errors(),
            ], 422);
        }

        $car = BikeRental::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Xe đã được thêm thành công!',
            'data' => $car,
        ], 201);
    }

    // Lấy thông tin chi tiết một xe cho thuê
    public function show($id)
    {
        $car = BikeRental::find($id);

        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Xe không tồn tại!',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $car
        ]);
    }

    // Cập nhật thông tin xe cho thuê
    public function update(Request $request, $id)
    {
        $car = BikeRental::find($id);

        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Xe không tồn tại!',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'bike_name' => 'required|string|max:255',
            'bike_model' => 'required|string|max:255',
            'bike_number' => 'required|string|max:20',
            'price_per_day' => 'required|numeric|min:0',
            'bike_type' => 'required|string|max:255',
            'engine_capacity' => 'required|numeric|min:0',
            'fuel_type' => 'required|string|max:255',
            'fuel_consumption' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'status' => 'required|string|in:available,rented,maintenance',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra định dạng hình ảnh

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ!',
                'errors' => $validator->errors(),
            ], 422);
        }

        $car->update($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Thông tin xe đã được cập nhật!',
            'data' => $car,
        ]);
    }

    // Xóa xe cho thuê
    public function destroy($id)
    {
        $car = BikeRental::find($id);

        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Xe không tồn tại!',
            ], 404);
        }

        $car->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Xe đã được xóa thành công!',
        ]);
    }
    public function returnCar($id)
    {
        $rental = Rental::find($id);

        if (!$rental) {
            return response()->json([
                'status' => 'error',
                'message' => 'Thuê xe không tồn tại!',
            ], 404);
        }

        // Thay đổi trạng thái của thuê xe và xe
        $rental->status = 'returned';
        $rental->save();

        $car = BikeRental::find($rental->car_id);
        $car->status = 'available';
        $car->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Trả xe thành công!',
        ]);
    }
}
