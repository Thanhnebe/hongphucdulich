import React, { useEffect, useState } from "react";
import { fetchCars } from "./api/apicar"; // Đảm bảo bạn đã có API fetchBike
import { Link } from "react-router-dom"; // Đảm bảo bạn đã import Link

const BikeCard = ({ bike }: { bike: any }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64">
        <img
            src={bike.image ? `http://127.0.0.1:8000/${bike.image}` : "https://via.placeholder.com/150"}
            alt={bike.bike_name}
            className="w-full h-40 object-cover"
        />
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900">{bike.bike_name}</h3>
            <p className="text-sm text-gray-600">{bike.bike_model} - {bike.bike_type}</p>

            <div className="mt-2">
                <p className="text-sm">
                    <span className="font-semibold">Biển số:</span> {bike.bike_number}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Dung tích động cơ:</span> {bike.engine_capacity}cc
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Nhiên liệu:</span> {bike.fuel_type} ({bike.fuel_consumption}L/100km)
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Mô tả:</span> {bike.description}
                </p>
            </div>

            <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">{bike.location}</span>
                <span className="text-sm font-semibold text-green-500">{parseFloat(bike.price_per_day).toLocaleString()} VNĐ/ngày</span>
            </div>

            <p className={`mt-2 text-xs font-bold ${bike.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                {bike.status === 'available' ? "Sẵn sàng thuê" : "Không khả dụng"}
            </p>
        </div>
    </div>
);

const BikeList = () => {
    const [bikes, setBikes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getBikes = async () => {
            try {
                const data = await fetchCars();
                setBikes(data); // Đảm bảo cấu trúc của data đúng
            } catch (err) {
                setError("Lỗi khi tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };

        getBikes();
    }, []);

    if (loading) return <p className="text-center">Đang tải danh sách xe máy...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="my-10">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Danh sách xe máy</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bikes.map((bike) => (
                    <Link to={`/bike-detail/${bike.id}`} key={bike.id}> {/* Link động tới trang chi tiết */}
                        <BikeCard bike={bike} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BikeList;