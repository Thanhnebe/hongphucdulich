import React, { useState, useEffect } from 'react';
import { addCar, deleteCar, fetchCars, updateCar } from './api/apicar';

interface CarData {
    id?: number;
    car_name: string;
    car_model: string;
    car_number: string;
    price_per_day: number;
    car_type: string;
    seats: number;
    transmission: string;
    fuel_type: string;
    fuel_consumption: string;
    description: string;
    location: string;
    status: string;
}

const CarManagement: React.FC = () => {
    const [carList, setCarList] = useState<CarData[]>([]);
    const [carToEdit, setCarToEdit] = useState<CarData | null>(null);
    const [carData, setCarData] = useState<CarData>({
        car_name: '',
        car_model: '',
        car_number: '',
        price_per_day: 0,
        car_type: '',
        seats: 4,
        transmission: '',
        fuel_type: '',
        fuel_consumption: '',
        description: '',
        location: '',
        status: 'available',
    });

    useEffect(() => {
        const getCars = async () => {
            const response = await fetchCars();
            if (Array.isArray(response.data)) {
                setCarList(response.data);
            } else {
                console.error("Invalid car data:", response);
                setCarList([]);
            }
        };
        getCars();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCarData({ ...carData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (carToEdit?.id) {
            await updateCar(carToEdit.id, carData);
            alert('Xe được update thành công!');
        } else {
            await addCar(carData);
            alert('Thêm xe thành công!');
        }
        resetForm();
        await reloadCarList();
    };

    const handleDelete = async (carId: number) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            await deleteCar(carId);
            alert('Xóa xe thành công!');
            await reloadCarList();
        }
    };

    const handleEdit = (car: CarData) => {
        setCarToEdit(car);
        setCarData(car);
    };

    const reloadCarList = async () => {
        const response = await fetchCars();
        setCarList(response.data);
    };

    const resetForm = () => {
        setCarToEdit(null);
        setCarData({
            car_name: '',
            car_model: '',
            car_number: '',
            price_per_day: 0,
            car_type: '',
            seats: 4,
            transmission: '',
            fuel_type: '',
            fuel_consumption: '',
            description: '',
            location: '',
            status: 'available',
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                {carToEdit ? 'Chỉnh sửa xe' : 'Thêm xe mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(carData).map((key) => (
                    key !== 'id' && (
                        <input
                            key={key}
                            className="w-full p-2 border rounded-lg"
                            type={key === 'price_per_day' || key === 'seats' ? 'number' : 'text'}
                            name={key}
                            placeholder={key.replace('_', ' ').toUpperCase()}
                            value={(carData as any)[key]}
                            onChange={handleChange}
                            required
                        />
                    )
                ))}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    {carToEdit ? 'Chỉnh sửa' : 'Thêm mới'}
                </button>
            </form>
            <table className="w-full mt-6 border-collapse border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Tên xe</th>
                        <th className="p-2 border">Số hiệu</th>
                        <th className="p-2 border">Số</th>
                        <th className="p-2 border">Giá /ngày</th>
                        <th className="p-2 border">Số ghế</th>
                        <th className="p-2 border">Vị trí xe</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {carList.map((car) => (
                        <tr key={car.id} className="text-center hover:bg-gray-50">
                            <td className="p-2 border">{car.car_name}</td>
                            <td className="p-2 border">{car.car_model}</td>
                            <td className="p-2 border">{car.car_number}</td>
                            <td className="p-2 border">${car.price_per_day}</td>
                            <td className="p-2 border">{car.seats}</td>
                            <td className="p-2 border">{car.location}</td>
                            <td className="p-2 border">{car.status}</td>
                            <td className="p-2 border flex justify-center space-x-2">
                                <button onClick={() => handleEdit(car)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Edit</button>
                                <button onClick={() => handleDelete(car.id!)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarManagement;