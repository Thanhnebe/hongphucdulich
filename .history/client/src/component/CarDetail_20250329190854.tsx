import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarById, rentCar } from "./api/apicar"; // Import API để lấy dữ liệu xe và thuê xe

const CarDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [pickupDate, setPickupDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [customerName, setCustomerName] = useState<string>("");
    const [customerPhone, setCustomerPhone] = useState<string>("");

    useEffect(() => {
        const getCarDetail = async () => {
            try {
                const data = await fetchCarById(Number(id)); // Fetch thông tin xe theo id
                setCar(data?.data);
            } catch (err) {
                setError("Không thể lấy thông tin chi tiết xe");
            } finally {
                setLoading(false);
            }
        };

        getCarDetail();
    }, [id]);

    const calculateTotalPrice = () => {
        if (pickupDate && returnDate) {
            const pickup = new Date(pickupDate);
            const returnDay = new Date(returnDate);
            const timeDiff = returnDay.getTime() - pickup.getTime();
            const days = timeDiff / (1000 * 3600 * 24); // Số ngày giữa ngày nhận và trả xe

            setTotalPrice(days * car?.price_per_day); // Tính tổng tiền theo số ngày
        }
    };

    const handleRentCar = async () => {
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
            const response = await rentCar(car.id, rentalData); // Gọi API thuê xe
            if (response.status === "success") {
                alert("Thuê xe thành công!");
            } else {
                alert("Đặt xe thất bại, vui lòng thử lại.");
            }
        } catch (err) {
            setError("Không thể thực hiện thuê xe. Vui lòng thử lại.");
        }
    };

    if (loading) return <p>Đang tải thông tin chi tiết...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 my-52">
            <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold">{car?.car_name}</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-yellow-500 text-lg">⭐ {car?.rating}</span>
                    <span className="text-gray-500 ml-2">{car?.seats} Ghế</span>
                </div>
            </div>

            <div className="flex gap-6 mt-6">
                <div className="flex-1">
                    <img
                        src={car?.image_url ? car.image_url : "https://trungthucauto.vn/wp-content/uploads/2024/02/trang-2-1024x578.png"}
                        alt={car?.car_name}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="flex-1">
                    <p className="text-lg font-semibold">{car?.car_model} - {car?.car_type}</p>
                    <p className="text-sm mt-2 text-gray-700">{car?.description}</p>
                    <div className="mt-4">
                        <p className="font-semibold text-gray-600">
                            <span className="text-gray-500">Biển số:</span> {car?.car_number}
                        </p>
                        <p className="font-semibold text-gray-600">
                            <span className="text-gray-500">Truyền động:</span> {car?.transmission}
                        </p>
                        <p className="font-semibold text-gray-600">
                            <span className="text-gray-500">Nhiên liệu:</span> {car?.fuel_type} ({car?.fuel_consumption})
                        </p>
                        <p className="mt-2 text-lg font-semibold text-green-500">{car?.price_per_day} VNĐ/ngày</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold">Thông tin thuê xe</h3>
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
                    onClick={handleRentCar}
                    className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 w-full"
                >
                    Chọn Thuê Xe
                </button>
            </div>
        </div>
    );
};

export default CarDetail;
