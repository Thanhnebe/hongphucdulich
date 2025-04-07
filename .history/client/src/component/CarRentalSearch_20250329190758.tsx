import React, { useEffect, useState } from "react";
import { fetchCars } from "./api/apicar";
import { Link } from "react-router-dom"; // Đảm bảo bạn đã import Link

const CarCard = ({ car }: { car: any }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64">
        <img src={car.image_url ? car.image_url : "https://trungthucauto.vn/wp-content/uploads/2024/02/trang-2-1024x578.png"} alt={car.car_name} className="w-full h-40 object-cover" /> {/* Thêm ảnh vào đây */}
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900">{car.car_name}</h3>
            <p className="text-sm text-gray-600">{car.car_model} - {car.car_type}</p>

            <div className="mt-2">
                <p className="text-sm">
                    <span className="font-semibold">Biển số:</span> {car.car_number}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Ghế:</span> {car.seats}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Truyền động:</span> {car.transmission}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Nhiên liệu:</span> {car.fuel_type} ({car.fuel_consumption}L/100km)
                </p>
            </div>

            <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">{car.location}</span>
                <span className="text-sm font-semibold text-green-500">{car.price_per_day} VNĐ/ngày</span>
            </div>

            <p className={`mt-2 text-xs font-bold ${car.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                {car.status === 'available' ? "Sẵn sàng thuê" : "Không khả dụng"}
            </p>
        </div>
    </div>
);

const CarList = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCars = async () => {
            try {
                const data = await fetchCars();
                setCars(data?.data); // Đảm bảo cấu trúc của data đúng (data?.data)
            } catch (err) {
                setError("Lỗi khi tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };

        getCars();
    }, []);

    if (loading) return <p className="text-center">Đang tải danh sách xe...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className=" my-56 ">
            <h1 className="from-black font-bold text-center font-medium">Xe dành cho bạn</h1>

            <div className="flex gap-4 overflow-x-auto py-8">
                {cars.map((car) => (
                    <Link to={`/car-detail/${car.id}`} key={car.id}>  {/* Link động tới trang chi tiết */}
                        <CarCard car={car} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CarList;
