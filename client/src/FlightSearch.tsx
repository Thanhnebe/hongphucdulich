import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaExchangeAlt, FaCheckCircle } from "react-icons/fa";
import api from "./config/axios";

const FlightSearch: React.FC = () => {
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Tìm kiếm chuyến bay
    const searchFlights = async () => {
        if (!departure || !destination || !departureDate) {
            setError("⚠️ Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        setError("");

        try {
            const response = await api.get("/api/flight/flights/search", {
                params: {
                    departure,
                    destination,
                    departure_time: departureDate,
                }
            });
            const flights = response.data;

            if (flights.length === 0) {
                setError("Không tìm thấy chuyến bay nào phù hợp!");
            } else {
                navigate("/flight-results", { state: { flights } });
            }
        } catch (error) {
            console.error("Lỗi khi tìm chuyến bay:", error);
            setError("Không thể tải chuyến bay.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-40">
            <div className="flex justify-between items-center py-4 border-b">
                <h3 className="text-xl font-semibold">Thông tin tìm vé</h3>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Điểm khởi hành</label>
                <div className="flex items-center border p-2 rounded-lg">
                    <input
                        type="text"
                        placeholder="Tp. Hồ Chí Minh"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                    />
                    <FaExchangeAlt className="text-gray-500 mx-2" size={20} />
                    <input
                        type="text"
                        placeholder="Hà Nội"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Ngày đi</label>
                <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Hành khách</label>
                <div className="flex items-center border p-2 rounded-lg">
                    <input
                        type="text"
                        placeholder="1 người lớn"
                        className="flex-1 p-2 border rounded-md"
                        readOnly
                    />
                    <FaCheckCircle className="text-gray-500 mx-2" size={20} />
                </div>
            </div>

            <div className="mt-4 flex justify-center items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm font-semibold text-gray-700">Tìm vé rẻ nhất</label>
            </div>

            <div className="mt-6">
                <button
                    onClick={searchFlights}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    🔍 Tìm kiếm
                </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default FlightSearch;