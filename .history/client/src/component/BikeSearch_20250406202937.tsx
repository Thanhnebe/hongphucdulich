import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BikeSearch: React.FC = () => {
    const [pickUpLocations, setPickUpLocations] = useState<any[]>([]); // Danh sách địa điểm nhận xe
    const [returnLocations, setReturnLocations] = useState<any[]>([]); // Danh sách địa điểm trả xe
    const [pickUpLocation, setPickUpLocation] = useState<string>(""); // Địa điểm nhận xe
    const [returnLocation, setReturnLocation] = useState<string>(""); // Địa điểm trả xe
    const [pickUpDate, setPickUpDate] = useState<string>(""); // Ngày nhận xe
    const [returnDate, setReturnDate] = useState<string>(""); // Ngày trả xe
    const [sameReturn, setSameReturn] = useState<boolean>(true); // Checkbox nhận và trả xe cùng địa điểm
    const [searchResults, setSearchResults] = useState<any[]>([]); // Kết quả tìm kiếm
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null); // Lỗi nếu có
    const navigate = useNavigate();
    // Lấy danh sách địa điểm nhận xe khi component được mount
    useEffect(() => {
        const fetchPickUpLocations = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/locations");
                const data = await response.json();
                setPickUpLocations(data.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách địa điểm nhận xe:", err);
            }
        };

        fetchPickUpLocations();
    }, []);

    // Lấy danh sách địa điểm trả xe khi chọn địa điểm nhận xe
    const handlePickUpLocationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLocation = e.target.value;
        setPickUpLocation(selectedLocation);

        if (sameReturn) {
            setReturnLocation(selectedLocation); // Nếu checkbox "Nhận, trả xe cùng địa điểm" được chọn
        } else {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/locations/${selectedLocation}/return`);
                const data = await response.json();
                setReturnLocations(data.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách địa điểm trả xe:", err);
            }
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const requestData = {
            pick_up_location: pickUpLocation,
            return_location: sameReturn ? pickUpLocation : returnLocation,
            pick_up_date: pickUpDate,
            return_date: returnDate,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/car-rentals/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Đã xảy ra lỗi khi tìm kiếm xe máy.");
            }

            const data = await response.json();
            if (data.data.length > 0) {
                navigate("/bike-details", { state: { bikes: data.data } }); // Chuyển hướng đến trang chi tiết xe với toàn bộ dữ liệu
            } else {
                setError("Không tìm thấy xe phù hợp.");
            }
        } catch (err: any) {
            setError(err.message || "Đã xảy ra lỗi không xác định.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative bg-cover bg-center h-screen"
            style={{
                backgroundImage: "url('https://motogo.vn/wp-content/themes/motogo/images/MOTOGO-cho-thue-xe-may-Ha-Noi.jpg')", // Thay bằng URL hình nền của bạn
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Lớp phủ tối */}
            <div className="container mx-auto px-4 py-32 relative z-10 flex flex-col md:flex-row items-center justify-between">
                {/* Phần bên trái: Văn bản giới thiệu */}
                <div className="text-white md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl font-bold mb-4">Dịch vụ thuê xe máy</h1>
                    <p className="text-lg leading-relaxed">
                        Chúng tôi hiểu cảm giác của người đi thuê xe máy phải bỏ ra một số tiền để có được một chiếc xe đủ tốt, không gặp rắc rối khi đi trên đường.
                        MOTOGO - tiên phong trở thành đơn vị số 1 về cung cấp dịch vụ thuê xe máy tự lái tại Việt Nam.
                    </p>
                </div>

                {/* Phần bên phải: Form tìm kiếm */}
                <div className="bg-[#00000085] shadow-lg rounded-lg p-6 ">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tìm kiếm xe máy</h2>
                    <form onSubmit={handleSearch} className="space-y-6 w-[385px]">
                        {/* Điểm nhận xe */}
                        <div>
                            <label htmlFor="pickUpLocation" className="block text-sm font-medium text-gray-700">
                                Điểm nhận xe
                            </label>
                            <select
                                id="pickUpLocation"
                                value={pickUpLocation}
                                onChange={handlePickUpLocationChange}
                                className="mt-1 block w-full border border-none outline-none p-4"
                                required
                            >
                                <option value="">Chọn điểm nhận xe</option>
                                {pickUpLocations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Checkbox nhận và trả xe cùng địa điểm */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="sameReturn"
                                checked={sameReturn}
                                onChange={(e) => setSameReturn(e.target.checked)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="sameReturn" className="ml-2 text-sm text-gray-700">
                                Nhận, trả xe cùng địa điểm
                            </label>
                        </div>

                        {/* Điểm trả xe */}
                        {!sameReturn && (
                            <div>
                                <label htmlFor="returnLocation" className="block text-sm font-medium text-gray-700">
                                    Điểm trả xe
                                </label>
                                <select
                                    id="returnLocation"
                                    value={returnLocation}
                                    onChange={(e) => setReturnLocation(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Chọn điểm trả xe</option>
                                    {returnLocations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Ngày nhận xe */}
                        <div>
                            <label htmlFor="pickUpDate" className="block text-sm font-medium text-gray-700">
                                Ngày nhận xe
                            </label>
                            <input
                                type="date"
                                id="pickUpDate"
                                value={pickUpDate}
                                onChange={(e) => setPickUpDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Ngày trả xe */}
                        <div>
                            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                                Ngày trả xe
                            </label>
                            <input
                                type="date"
                                id="returnDate"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Nút tìm kiếm */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                            >
                                TÌM KIẾM
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Hiển thị kết quả tìm kiếm */}
            <div className="container mx-auto px-4 py-8">
                {loading && <p className="text-center text-gray-600">Đang tải dữ liệu...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {searchResults.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchResults.map((bike) => (
                            <div key={bike.id} className="bg-white shadow-lg rounded-lg p-4">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${bike.image}`}
                                    alt={bike.bike_name}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-bold mt-2">{bike.bike_name}</h3>
                                <p className="text-sm text-gray-600">{bike.bike_model}</p>
                                <p className="text-sm text-green-500">{bike.price_per_day} VNĐ/ngày</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BikeSearch;