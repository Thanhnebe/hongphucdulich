import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBike, deleteBike, fetchBike, updateBike } from './api/apibike';

interface BikeData {
    id?: number;
    bike_name: string;
    bike_model: string;
    bike_number: string;
    price_per_day: number;
    bike_type: string;
    engine_capacity: string;
    fuel_type: string;
    fuel_consumption: string;
    description: string;
    location: string;
    status: string;
    image: File | string;
}

const BikeManagement: React.FC = () => {
    const [bikeList, setBikeList] = useState<BikeData[]>([]);
    const [bikeToEdit, setBikeToEdit] = useState<BikeData | null>(null);
    const [bikeData, setBikeData] = useState<BikeData>({
        bike_name: '',
        bike_model: '',
        bike_number: '',
        price_per_day: 0,
        bike_type: '',
        engine_capacity: '',
        fuel_type: '',
        fuel_consumption: '',
        description: '',
        location: '',
        status: 'available',
        image: ''
    });

    useEffect(() => {
        const getBikes = async () => {
            const response = await fetchBike();
            if (Array.isArray(response.data)) {
                setBikeList(response.data);
            } else {
                console.error("Invalid bike data:", response);
                setBikeList([]);
            }
        };
        getBikes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBikeData({ ...bikeData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBikeData({ ...bikeData, image: file });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(bikeData).forEach((key) => {
            if (key === 'image' && bikeData.image instanceof File) {
                formData.append(key, bikeData.image); // Thêm file hình ảnh
            } else {
                formData.append(key, String((bikeData as any)[key]));
            }
        });

        try {
            if (bikeToEdit?.id) {
                await updateBike(bikeToEdit.id, formData);
                toast.success('Xe máy được cập nhật thành công!');
            } else {
                await addBike(formData);
                toast.success('Thêm xe máy thành công!');
            }
            resetForm();
            await reloadBikeList();
        } catch (error) {
            toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    const handleDelete = async (bikeId: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa xe máy này không?')) {
            try {
                await deleteBike(bikeId);
                toast.success('Xóa xe máy thành công!');
                await reloadBikeList();
            } catch (error) {
                toast.error('Đã xảy ra lỗi khi xóa xe máy!');
            }
        }
    };

    const handleEdit = (bike: BikeData) => {
        setBikeToEdit(bike);
        setBikeData(bike);
    };

    const reloadBikeList = async () => {
        const response = await fetchBike();
        setBikeList(response.data);
    };

    const resetForm = () => {
        setBikeToEdit(null);
        setBikeData({
            bike_name: '',
            bike_model: '',
            bike_number: '',
            price_per_day: 0,
            bike_type: '',
            engine_capacity: '',
            fuel_type: '',
            fuel_consumption: '',
            description: '',
            location: '',
            status: 'available',
            image: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                {bikeToEdit ? 'Chỉnh sửa xe máy' : 'Thêm xe máy mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        name="bike_name"
                        placeholder="Tên xe"
                        value={bikeData.bike_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        name="bike_model"
                        placeholder="Model xe"
                        value={bikeData.bike_model}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        name="bike_number"
                        placeholder="Biển số xe"
                        value={bikeData.bike_number}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="number"
                        name="price_per_day"
                        placeholder="Giá thuê mỗi ngày"
                        value={bikeData.price_per_day}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        name="bike_type"
                        placeholder="Loại xe"
                        value={bikeData.bike_type}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="number"
                        name="engine_capacity"
                        placeholder="Dung tích động cơ"
                        value={bikeData.engine_capacity}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        name="fuel_type"
                        placeholder="Loại nhiên liệu"
                        value={bikeData.fuel_type}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="number"
                        name="fuel_consumption"
                        placeholder="Mức tiêu thụ nhiên liệu"
                        value={bikeData.fuel_consumption}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-2 border rounded-lg"
                        type="text"
                        name="location"
                        placeholder="Vị trí xe"
                        value={bikeData.location}
                        onChange={handleChange}
                        required
                    />
                    <select
                        className="w-full p-2 border rounded-lg"
                        name="status"
                        value={bikeData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="available">Có sẵn</option>
                        <option value="rented">Đã thuê</option>
                        <option value="maintenance">Bảo trì</option>
                    </select>
                </div>
                <textarea
                    className="w-full p-2 border rounded-lg"
                    name="description"
                    placeholder="Mô tả"
                    value={bikeData.description}
                    onChange={handleChange}
                />
                <input
                    className="w-full p-2 border rounded-lg"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    {bikeToEdit ? 'Chỉnh sửa' : 'Thêm mới'}
                </button>
            </form>
            <table className="w-full mt-6 border-collapse border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Tên xe</th>
                        <th className="p-2 border">Model</th>
                        <th className="p-2 border">Biển số</th>
                        <th className="p-2 border">Giá /ngày</th>
                        <th className="p-2 border">Loại xe</th>
                        <th className="p-2 border">Dung tích động cơ</th>
                        <th className="p-2 border">Vị trí xe</th>
                        <th className="p-2 border">Trạng thái</th>
                        <th className="p-2 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {bikeList.map((bike) => (
                        <tr key={bike.id} className="text-center hover:bg-gray-50">
                            <td className="p-2 border">{bike.bike_name}</td>
                            <td className="p-2 border">{bike.bike_model}</td>
                            <td className="p-2 border">{bike.bike_number}</td>
                            <td className="p-2 border">${bike.price_per_day}</td>
                            <td className="p-2 border">{bike.bike_type}</td>
                            <td className="p-2 border">{bike.engine_capacity}</td>
                            <td className="p-2 border">{bike.location}</td>
                            <td className="p-2 border">{bike.status}</td>
                            <td className="p-2 border flex justify-center space-x-2">
                                <button onClick={() => handleEdit(bike)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Edit</button>
                                <button onClick={() => handleDelete(bike.id!)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BikeManagement;