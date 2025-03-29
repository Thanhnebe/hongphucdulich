import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "./config/axios";
import { ArrowRightIcon, DotIcon } from "lucide-react";

// Interface cho chuyến bay
interface IFlight {
    id?: number;
    flight_number: string;
    airline: string;
    departure: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    price: number;
    status: "Scheduled" | "Delayed" | "Cancelled" | "Completed";
}

interface IBooking {
    passenger_name: string;
    passport_number: string;
    seat_number: string;
    user_id: string;
}

const FlightResults: React.FC = () => {
    const { state } = useLocation();
    const { flights, departure, destination, departureDate } = state || {};
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedFlight, setSelectedFlight] = React.useState<IFlight | null>(null);
    const [totalPrice, setTotalPrice] = React.useState<number>(0);

    // Chọn chuyến bay
    const selectFlight = (flight: IFlight) => {
        setSelectedFlight(flight);
        setTotalPrice(flight.price);  // Set giá vé khi chọn chuyến bay
    };

    // Xử lý đặt vé
    const handleBooking = async (data: IBooking) => {
        if (!data.passenger_name) {
            alert("Vui lòng nhập họ tên!");
            return;
        }

        try {
            const response = await api.post("/api/flight/book-flight", {
                ...data,
                flight_number: selectedFlight?.flight_number,
                departure: selectedFlight?.departure,
                destination: selectedFlight?.destination,
                departure_time: selectedFlight?.departure_time,
                price: totalPrice,
            });

            if (response.data.status === "success") {
                alert("Đặt vé thành công!");
                setSelectedFlight(null);
            } else {
                alert("Đặt vé thất bại: " + response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi đặt vé:", error);
            alert("Lỗi khi kết nối đến hệ thống!");
        }
    };
    const formatTime = (timeString: string) => {
        const date = new Date(timeString);
        const hours = date.getHours().toString().padStart(2, '0'); // Lấy giờ, thêm 0 nếu cần
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Lấy phút, thêm 0 nếu cần
        return `${hours}:${minutes}`;
    };

    return (
        <div className="max-w-[1290px]  flex  mx-auto p-6 bg-white shadow-lg rounded-lg mt-40">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg ">

            </div>

            {/* Hiển thị kết quả tìm kiếm */}
            <div className="p-5 bg-white">
                {flights && flights.length > 0 ? (
                    flights.map((flight: IFlight) => (
                        <>
                            <div className="bg-white py-5 rounded-t-lg">
                                <div className="flex justify-between items-center">
                                    {/* Thông tin Điểm khởi hành */}
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold">{flight?.destination}</h3>
                                        <span className="text-sm text-gray-600">{flight.airline}</span>
                                    </div>

                                    {/* Mũi tên giữa các điểm */}
                                    <div className="flex items-center">
                                        <ArrowRightIcon className="text-red-500" size={24} />
                                    </div>

                                    {/* Thông tin Điểm đến */}
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold">{flight.departure}</h3>
                                        <span className="text-sm text-gray-600">{flight.airline}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 max-w-4xl">
                                {/* Chuyến bay thông tin */}
                                <div className="flex justify-between items-center py-4 border-b">
                                    <div className="text-lg font-semibold">
                                        <span className="font-bold">{flight?.flight_number}</span>
                                    </div>
                                    <div className="text-xl font-semibold">
                                        {/* Hiển thị giờ đến và giờ khởi hành */}
                                        <span>{formatTime(flight?.arrival_time)}</span>
                                        <span className="text-sm text-gray-500"> Đến </span>
                                        <span>{formatTime(flight?.departure_time)}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <span>{flight?.airline}</span>
                                        <span className="mx-2">-</span>
                                        <span className="text-red-500 font-bold">Bay thẳng</span>
                                    </div>
                                </div>

                                {/* Thông tin trạng thái vé */}
                                <div className="flex justify-between items-center py-4 border-b">
                                    {/* Hết chỗ */}
                                    <div className="flex items-center gap-2">
                                        <img src="/static/media/noflight.cee84207.svg" alt="No Flight" className="w-6 h-6" />
                                        <p className="font-bold text-gray-600">{flight.status}</p>
                                    </div>

                                    {/* Giá vé */}
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <p className="font-bold text-xl">{flight.price}</p>
                                            <p className="text-sm text-gray-500">000 VND</p>
                                        </div>
                                        <button
                                            onClick={() => selectFlight(flight)}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                        >
                                            ✅ Chọn
                                        </button>
                                        <button className="text-red-500 text-xl">
                                            <span>&#10003;</span>
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </>

                    ))
                ) : (
                    <p className="text-gray-500 text-center">Không có chuyến bay nào phù hợp.</p>
                )}
            </div>

            {/* Form đặt vé */}
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                {/* Form nhập thông tin đặt vé */}
                {selectedFlight && (
                    <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">📝 Nhập thông tin đặt vé</h3>
                        <form onSubmit={handleSubmit(handleBooking)}>
                            {/* Họ và tên */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    {...register("passenger_name", { required: "Họ tên là bắt buộc", maxLength: 255 })}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.passenger_name && <p className="text-red-500 text-sm">{errors.passenger_name.message}</p>}
                            </div>

                            {/* Số hộ chiếu */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Số hộ chiếu (không bắt buộc)</label>
                                <input
                                    type="text"
                                    placeholder="Số hộ chiếu"
                                    {...register("passport_number", { maxLength: 255 })}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            {/* Số ghế */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Số ghế</label>
                                <input
                                    type="number"
                                    placeholder="Số ghế"
                                    {...register("seat_number", { valueAsNumber: true })}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            {/* Hiển thị tổng giá vé */}
                            <div className="mt-2 text-lg font-semibold mb-4">
                                <p>Tổng giá vé: {totalPrice.toLocaleString()} VND</p>
                            </div>

                            {/* Nút xác nhận */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            >
                                ✈️ Xác nhận
                            </button>
                        </form>
                    </div>
                )}

                {/* Thông tin chuyến bay */}
                {selectedFlight && (
                    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Thông tin chuyến bay</h3>
                        <div className="mb-4">
                            <p className="font-semibold">Chuyến bay: {selectedFlight.flight_number}</p>
                            <p><strong>Khởi hành:</strong> {new Date(selectedFlight.departure_time).toLocaleString()}</p>
                            <p><strong>Đến nơi:</strong> {new Date(selectedFlight.arrival_time).toLocaleString()}</p>
                            <p><strong>{selectedFlight.departure} → {selectedFlight.destination}</strong></p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-gray-500"><strong>Trạng thái:</strong> {selectedFlight.status}</p>
                                <p className="text-gray-500"><strong>Giá vé:</strong> {selectedFlight.price.toLocaleString()} VND</p>
                            </div>
                            <button
                                onClick={() => setSelectedFlight(null)}
                                className="text-red-500 font-bold hover:underline"
                            >
                                Hủy chọn
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightResults;
