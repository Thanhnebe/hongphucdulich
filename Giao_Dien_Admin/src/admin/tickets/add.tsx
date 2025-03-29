import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllFlightsChuyen } from "../../services/ticketService";
import { ticketCT } from "../../context/TicketContext";

const AddTicket = () => {
    const { onAdd } = useContext(ticketCT);
    const [flights, setFlights] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        (async () => {
            try {
                const data = await getAllFlightsChuyen();
                setFlights(data.data);
            } catch (error) {
                alert("Lỗi khi lấy dữ liệu chuyến bay");
            }
        })();
    }, []);

    const onSubmit = (data: any) => {
        const selectedFlight = flights.find((f) => f.id === data.flight_id);

        if (!selectedFlight) {
            alert("Chuyến bay không hợp lệ");
            return;
        }

        const newTicket = {
            passenger_name: data.passenger_name,
            passport_number: data.passport_number || null, // Có thể không bắt buộc
            flight_number: selectedFlight.flight_number,
            departure: selectedFlight.departure_airport,
            destination: selectedFlight.arrival_airport,
            departure_time: selectedFlight.departure_time,
            seat_number: Number(data.seat_number),
            price: Number(data.price),
            status: data.status, // pending, confirmed, cancelled
        };

        onAdd(newTicket);
    };

    return (
        <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Thêm vé máy bay</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Chọn chuyến bay */}
                <div>
                    <label>Chuyến bay:</label>
                    <select {...register("flight_id", { required: "Vui lòng chọn chuyến bay" })} className="border p-2 w-full rounded-md">
                        <option value="">Chọn chuyến bay</option>
                        {flights?.map((flight) => (
                            <option key={flight.id} value={flight.id}>
                                {flight.flight_number} - {flight.airline}
                            </option>
                        ))}
                    </select>
                    {errors.flight_id && <span className="text-red-600 text-sm">{errors.flight_id.message}</span>}
                </div>

                {/* Tên hành khách */}
                <div>
                    <label>Tên hành khách:</label>
                    <input type="text" placeholder="Nhập tên hành khách" {...register("passenger_name", { required: "Tên không được để trống" })} className="border p-2 w-full rounded-md" />
                    {errors.passenger_name && <span className="text-red-600 text-sm">{errors.passenger_name.message}</span>}
                </div>

                {/* Số hộ chiếu (tuỳ chọn) */}
                <div>
                    <label>Số hộ chiếu (nếu có):</label>
                    <input type="text" placeholder="Nhập số hộ chiếu" {...register("passport_number")} className="border p-2 w-full rounded-md" />
                </div>

                {/* Số ghế */}
                <div>
                    <label>Số ghế:</label>
                    <input type="number" placeholder="Số ghế" {...register("seat_number", { required: "Số ghế không được để trống", min: 1 })} className="border p-2 w-full rounded-md" />
                    {errors.seat_number && <span className="text-red-600 text-sm">{errors.seat_number.message}</span>}
                </div>

                {/* Giá vé */}
                <div>
                    <label>Giá vé:</label>
                    <input type="number" placeholder="Giá vé" {...register("price", { required: "Giá không được để trống", min: 0 })} className="border p-2 w-full rounded-md" />
                    {errors.price && <span className="text-red-600 text-sm">{errors.price.message}</span>}
                </div>

                {/* Trạng thái vé */}
                <div>
                    <label>Trạng thái vé:</label>
                    <select {...register("status", { required: "Vui lòng chọn trạng thái" })} className="border p-2 w-full rounded-md">
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="cancelled">Đã huỷ</option>
                    </select>
                    {errors.status && <span className="text-red-600 text-sm">{errors.status.message}</span>}
                </div>

                {/* Nút Submit */}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                    Thêm vé
                </button>
            </form>
        </div>
    );
};

export default AddTicket;
