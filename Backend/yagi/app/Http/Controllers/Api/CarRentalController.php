<?php

namespace App\Http\Controllers\Api;

use App\Models\CarRental;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Rental;
use Illuminate\Support\Facades\Validator;

class CarRentalController extends Controller
{
    // Liệt kê tất cả xe cho thuê
    public function index()
    {
        $cars = CarRental::all();  // Lấy tất cả các xe cho thuê
        return response()->json([
            'status' => 'success',
            'data' => $cars
        ]);
    }

    // Thêm mới một xe cho thuê
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'car_name' => 'required|string|max:255',
            'car_model' => 'required|string|max:255',
            'car_number' => 'required|string|max:20',
            'price_per_day' => 'required|numeric|min:0',
            'car_type' => 'required|string|max:255',
            'seats' => 'required|integer|min:2|max:50',
            'transmission' => 'required|string',
            'fuel_type' => 'required|string',
            'fuel_consumption' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'status' => 'required|string|in:available,rented,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ!',
                'errors' => $validator->errors(),
            ], 422);
        }

        $car = CarRental::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Xe đã được thêm thành công!',
            'data' => $car,
        ], 201);
    }

    // Lấy thông tin chi tiết một xe cho thuê
    public function show($id)
    {
        $car = CarRental::find($id);

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
        $car = CarRental::find($id);

        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Xe không tồn tại!',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'car_name' => 'sometimes|string|max:255',
            'car_model' => 'sometimes|string|max:255',
            'car_number' => 'sometimes|string|max:20',
            'price_per_day' => 'sometimes|numeric|min:0',
            'car_type' => 'sometimes|string|max:255',
            'seats' => 'sometimes|integer|min:2|max:50',
            'transmission' => 'sometimes|string',
            'fuel_type' => 'sometimes|string',
            'fuel_consumption' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
            'location' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|in:available,rented,maintenance',
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
        $car = CarRental::find($id);

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

        $car = CarRental::find($rental->car_id);
        $car->status = 'available';
        $car->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Trả xe thành công!',
        ]);
    }

    
}
