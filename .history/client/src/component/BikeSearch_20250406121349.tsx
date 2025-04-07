import React, { useState } from "react";

const BikeSearch: React.FC = () => {
    const [pickUpLocation, setPickUpLocation] = useState<string>("");
    const [returnLocation, setReturnLocation] = useState<string>("");
    const [pickUpDate, setPickUpDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [sameReturn, setSameReturn] = useState<boolean>(true);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            pickUpLocation,
            returnLocation: sameReturn ? pickUpLocation : returnLocation,
            pickUpDate,
            returnDate,
            email,
        });
        alert("Tìm kiếm thành công!");
    };

    return (
        <div
            className="relative bg-cover bg-center h-screen"
            style={{
                backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Thay bằng URL hình nền của bạn
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Lớp phủ tối */}
            <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col md:flex-row items-center justify-between">
                {/* Phần bên trái: Văn bản giới thiệu */}
                <div className="text-white md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl font-bold mb-4">Dịch vụ thuê xe máy</h1>
                    <p className="text-lg leading-relaxed">
                        Chúng tôi hiểu cảm giác của người đi thuê xe máy phải bỏ ra một số tiền để có được một chiếc xe đủ tốt, không gặp rắc rối khi đi trên đường.
                        MOTOGO - tiên phong trở thành đơn vị số 1 về cung cấp dịch vụ thuê xe máy tự lái tại Việt Nam.
                    </p>
                </div>

                {/* Phần bên phải: Form tìm kiếm */}
                <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tìm kiếm xe máy</h2>
                    <form onSubmit={handleSearch} className="space-y-6">
                        {/* Điểm nhận xe */}
                        <div>
                            <label htmlFor="pickUpLocation" className="block text-sm font-medium text-gray-700">
                                Điểm nhận xe
                            </label>
                            <select
                                id="pickUpLocation"
                                value={pickUpLocation}
                                onChange={(e) => setPickUpLocation(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Chọn điểm nhận xe</option>
                                <option value="Hà Giang">Địa điểm của bạn tại Hà Giang</option>
                                <option value="Hà Nội">Địa chỉ của bạn tại Hà Nội</option>
                                <option value="Lâm Đồng">Thôn Lâm Đồng, Xã Phương Thiện, Hà Giang</option>
                                <option value="Nội Bài">MOTOGO gần sân bay Nội Bài - HN</option>
                                <option value="Cầu Giấy">81 Nguyễn Khả Trạc, Mai Dịch, Cầu Giấy, Hà Nội</option>
                                <option value="Hoàn Kiếm">1081 Hồng Hà, Hoàn Kiếm, Hà Nội</option>
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
                                    <option value="Hà Giang">Địa điểm của bạn tại Hà Giang</option>
                                    <option value="Hà Nội">Địa chỉ của bạn tại Hà Nội</option>
                                    <option value="Lâm Đồng">Thôn Lâm Đồng, Xã Phương Thiện, Hà Giang</option>
                                    <option value="Nội Bài">MOTOGO gần sân bay Nội Bài - HN</option>
                                    <option value="Cầu Giấy">81 Nguyễn Khả Trạc, Mai Dịch, Cầu Giấy, Hà Nội</option>
                                    <option value="Hoàn Kiếm">1081 Hồng Hà, Hoàn Kiếm, Hà Nội</option>
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

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập email của bạn"
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
        </div>
    );
};

export default BikeSearch;