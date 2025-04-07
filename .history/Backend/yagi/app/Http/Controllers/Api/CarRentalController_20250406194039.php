<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\BikeRental;
use App\Models\Location;
use App\Models\Rental;
use Illuminate\Support\Facades\Storage;
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
    public function getPickUpLocations()
    {
        $locations = Location::all(); // Lấy tất cả địa điểm
        return response()->json([
            'status' => 'success',
            'data' => $locations,
        ]);
    }
    public function getReturnLocations($pickUpLocationId)
    {
        // Lấy danh sách các địa điểm trả xe dựa trên địa điểm nhận xe
        $returnLocations = Location::where('id', '!=', $pickUpLocationId)->get();

        return response()->json([
            'status' => 'success',
            'data' => $returnLocations,
        ]);
    }
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
            'pick_up_location' => 'required|string|max:255',
            'return_location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ!',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Xử lý lưu hình ảnh
        $data = $request->all();
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/bikes', 'public');
            $data['image'] = $imagePath;
        }

        $bike = BikeRental::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Xe đã được thêm thành công!',
            'data' => $bike,
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
            'pick_up_location' => 'required|string|max:255',
            'return_location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ!',
                'errors' => $validator->errors(),
            ], 422);
        }

        $bike = BikeRental::findOrFail($id);

        // Xử lý lưu hình ảnh
        $data = $request->all();
        if ($request->hasFile('image')) {
            // Xóa hình ảnh cũ nếu có
            if ($bike->image) {
                Storage::disk('public')->delete($bike->image);
            }
            $imagePath = $request->file('image')->store('images/bikes', 'public');
            $data['image'] = $imagePath;
        }

        $bike->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Xe đã được cập nhật thành công!',
            'data' => $bike,
        ], 200);
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
    public function search(Request $request)
    {
        // Validate dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'pick_up_location' => 'required|integer|exists:locations,id', // Địa điểm nhận xe
            'pick_up_date' => 'required|date', // Ngày nhận xe
            'return_location' => 'nullable|integer|exists:locations,id', // Địa điểm trả xe
            'return_date' => 'nullable|date', // Ngày trả xe
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu không hợp lệ!',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Lấy dữ liệu từ request
        $pickUpLocation = $request->input('pick_up_location');
        $pickUpDate = $request->input('pick_up_date');
        $returnLocation = $request->input('return_location');
        $returnDate = $request->input('return_date');

        // Tìm kiếm xe phù hợp
        $bikes = BikeRental::where('pick_up_location_id', $pickUpLocation)
            ->where('status', 'available') // Chỉ lấy xe có trạng thái 'available'
            ->whereDoesntHave('rentals', function ($query) use ($pickUpDate, $returnDate) {
                $query->where(function ($q) use ($pickUpDate, $returnDate) {
                    $q->where('pick_up_date', '<=', $returnDate)
                        ->where('return_date', '>=', $pickUpDate);
                });
            });

        // Nếu có địa điểm trả xe, lọc thêm theo địa điểm trả xe
        if ($returnLocation) {
            $bikes->where('return_location_id', $returnLocation);
        }

        $bikes = $bikes->get();

        return response()->json([
            'status' => 'success',
            'data' => $bikes,
        ]);
    }
}
