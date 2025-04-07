import React, { useState } from "react";

const RentalForm: React.FC = () => {
    const [driverLicenseNumber, setDriverLicenseNumber] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("TP HCM");
    const [note, setNote] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            driverLicenseNumber,
            birthday,
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            note,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/rentals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Thuê xe thành công!");
            } else {
                alert("Đã xảy ra lỗi khi thuê xe.");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi khi thuê xe.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Thông tin thuê xe</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bằng lái xe và ngày sinh */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="driverLicenseNumber" className="block text-sm font-medium text-gray-700">
                            Bằng lái xe số
                        </label>
                        <input
                            type="text"
                            id="driverLicenseNumber"
                            value={driverLicenseNumber}
                            onChange={(e) => setDriverLicenseNumber(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                            Ngày sinh
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Họ và tên */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            Họ
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Tên
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Email và số điện thoại */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Địa chỉ và thành phố */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Tỉnh / Thành Phố
                        </label>
                        <select
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="TP HCM">TP HCM</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Hải Phòng">Hải Phòng</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                        </select>
                    </div>
                </div>

                {/* Ghi chú */}
                <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                        Ghi chú bổ sung
                    </label>
                    <textarea
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                    ></textarea>
                </div>

                {/* Nút xác nhận */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RentalForm;