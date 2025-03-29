import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../config/axios";

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

const FlightManagement: React.FC = () => {
    const [flights, setFlights] = useState<IFlight[]>([]);
    const [editingFlight, setEditingFlight] = useState<IFlight | null>(null);
    const { register, handleSubmit, reset } = useForm<IFlight>();

    // Fetch danh sách chuyến bay từ API
    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await api.get("/api/flight/flights");
            setFlights(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách chuyến bay", error);
        }
    };

    // Thêm hoặc cập nhật chuyến bay
    const onSubmit = async (data: IFlight) => {
        try {
            console.log(data);

            if (editingFlight) {
                // Cập nhật chuyến bay
                await axios.put(`http://localhost:8000/api/flight/flights/${editingFlight.id}`, data);
                alert("Cập nhật chuyến bay thành công!");
            } else {
                // Thêm mới chuyến bay
                await api.post("/api/flight/flights", data);
                alert("Thêm chuyến bay thành công!");
            }
            reset();
            setEditingFlight(null);
            fetchFlights();
        } catch (error) {
            console.error("Lỗi khi thêm/cập nhật chuyến bay", error);
            alert("Có lỗi xảy ra!");
        }
    };

    // Xóa chuyến bay
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa chuyến bay này?")) {
            try {
                await axios.delete(`http://localhost:8000/api/flight/flights/${id}`);
                alert("Xóa chuyến bay thành công!");
                fetchFlights();
            } catch (error) {
                console.error("Lỗi khi xóa chuyến bay", error);
                alert("Có lỗi xảy ra!");
            }
        }
    };

    // Chỉnh sửa chuyến bay
    const handleEdit = (flight: IFlight) => {
        setEditingFlight(flight);
        reset(flight);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">
                Quản lý chuyến bay ✈️
            </h1>

            {/* Form thêm / chỉnh sửa */}
            <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">{editingFlight ? "Chỉnh sửa chuyến bay" : "Thêm chuyến bay"}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input {...register("flight_number", { required: true })} className="border p-2 rounded-md" placeholder="Mã chuyến bay" />
                    <input {...register("airline", { required: true })} className="border p-2 rounded-md" placeholder="Hãng bay" />
                    <input {...register("departure", { required: true })} className="border p-2 rounded-md" placeholder="Sân bay đi" />
                    <input {...register("destination", { required: true })} className="border p-2 rounded-md" placeholder="Sân bay đến" />
                    <input type="datetime-local" {...register("departure_time", { required: true })} className="border p-2 rounded-md" />
                    <input type="datetime-local" {...register("arrival_time", { required: true })} className="border p-2 rounded-md" />
                    <input type="number" {...register("price", { required: true, min: 0 })} className="border p-2 rounded-md" placeholder="Giá vé" />
                    <select {...register("status", { required: true })} className="border p-2 rounded-md">
                        <option value="Scheduled">Scheduled</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        {editingFlight ? "Cập nhật" : "Thêm"}
                    </button>
                </form>
            </div>

            {/* Bảng danh sách chuyến bay */}
            <div className="mt-6">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Mã</th>
                            <th className="border p-2">Hãng</th>
                            <th className="border p-2">Đi</th>
                            <th className="border p-2">Đến</th>
                            <th className="border p-2">Giờ đi</th>
                            <th className="border p-2">Giờ đến</th>
                            <th className="border p-2">Giá</th>
                            <th className="border p-2">Trạng thái</th>
                            <th className="border p-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight.id}>
                                <td className="border p-2">{flight.flight_number}</td>
                                <td className="border p-2">{flight.airline}</td>
                                <td className="border p-2">{flight.departure}</td>
                                <td className="border p-2">{flight.destination}</td>
                                <td className="border p-2">{flight.departure_time}</td>
                                <td className="border p-2">{flight.arrival_time}</td>
                                <td className="border p-2">{flight.price}</td>
                                <td className="border p-2">{flight.status}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(flight)} className="bg-yellow-500 text-white p-1 rounded-md mr-2">Sửa</button>
                                    <button onClick={() => handleDelete(flight.id!)} className="bg-red-500 text-white p-1 rounded-md">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlightManagement;
