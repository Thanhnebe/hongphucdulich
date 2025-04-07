import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarById, rentCar } from "./api/apicar"; // Import API để lấy dữ liệu xe và thuê xe

const BikeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [bike, setBike] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [pickupDate, setPickupDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [customerName, setCustomerName] = useState<string>("");
    const [customerPhone, setCustomerPhone] = useState<string>("");

    useEffect(() => {
        const getBikeDetail = async () => {
            try {
                const data = await fetchCarById(Number(id)); // Fetch thông tin xe theo id
                setBike(data?.data);
            } catch (err) {
                setError("Không thể lấy thông tin chi tiết xe máy");
            } finally {
                setLoading(false);
            }
        };

        getBikeDetail();
    }, [id]);

    const calculateTotalPrice = () => {
        if (pickupDate && returnDate) {
            const pickup = new Date(pickupDate);
            const returnDay = new Date(returnDate);
            const timeDiff = returnDay.getTime() - pickup.getTime();
            const days = timeDiff / (1000 * 3600 * 24); // Số ngày giữa ngày nhận và trả xe

            setTotalPrice(days * bike?.price_per_day); // Tính tổng tiền theo số ngày
        }
    };

    const handleRentBike = async () => {
        if (!customerName || !customerPhone || !pickupDate || !returnDate) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const rentalData = {
            customer_name: customerName,
            customer_phone: customerPhone,
            pickup_date: pickupDate,
            return_date: returnDate,
        };

        try {
            const response = await rentCar(bike.id, rentalData); // Gọi API thuê xe
            if (response.status === "success") {
                alert("Thuê xe thành công!");
            } else {
                alert("Đặt xe thất bại, vui lòng thử lại.");
            }
        } catch (err) {
            setError("Không thể thực hiện thuê xe. Vui lòng thử lại.");
        }
    };

    if (loading) return <p className="text-center text-gray-600">Đang tải thông tin chi tiết...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Hình ảnh xe */}
                <div className="flex-1">
                    <img
                        src={bike?.image ? `http://127.0.0.1:8000/storage/${bike.image}` : "https://via.placeholder.com/150"}
                        alt={bike?.bike_name}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Thông tin chi tiết xe */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800">{bike?.bike_name}</h2>
                    <p className="text-lg text-gray-600 mt-2">{bike?.bike_model} - {bike?.bike_type}</p>
                    <p className="text-sm text-gray-700 mt-4">{bike?.description}</p>

                    <div className="mt-4 space-y-2">
                        <p className="text-sm">
                            <span className="font-semibold">Biển số:</span> {bike?.bike_number}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Dung tích động cơ:</span> {bike?.engine_capacity}cc
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Nhiên liệu:</span> {bike?.fuel_type} ({bike?.fuel_consumption}L/100km)
                        </p>
                        <p className="text-lg font-semibold text-green-500 mt-4">{parseFloat(bike?.price_per_day).toLocaleString()} VNĐ/ngày</p>
                    </div>
                </div>
            </div>

            {/* Form thuê xe */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800">Thông tin thuê xe</h3>
                <div className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="customerName" className="block text-sm font-medium">Tên khách hàng</label>
                        <input
                            type="text"
                            id="customerName"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customerPhone" className="block text-sm font-medium">Số điện thoại</label>
                        <input
                            type="text"
                            id="customerPhone"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pickupDate" className="block text-sm font-medium">Ngày nhận xe</label>
                        <input
                            type="date"
                            id="pickupDate"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="returnDate" className="block text-sm font-medium">Ngày trả xe</label>
                        <input
                            type="date"
                            id="returnDate"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalPrice" className="block text-sm font-medium">Tổng tiền</label>
                        <input
                            type="text"
                            id="totalPrice"
                            value={`${totalPrice.toLocaleString()} VNĐ`}
                            readOnly
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                </div>

                <button
                    onClick={calculateTotalPrice}
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 w-full"
                >
                    Tính Tổng Tiền
                </button>

                <button
                    onClick={handleRentBike}
                    className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 w-full"
                >
                    Chọn Thuê Xe
                </button>
            </div>
        </div>
    );
};

export default BikeDetail;