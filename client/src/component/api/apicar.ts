import api from "../config/axios";

// Lấy tất cả xe
export const fetchCars = async () => {
    const response = await api.get('/api/car-rentals');
    return response.data;
};

// Thêm xe mới
export const addCar = async (carData: any) => {
    const response = await api.post('/api/car-rentals', carData);
    return response.data;
};

// Lấy thông tin xe
export const fetchCarById = async (id: number) => {
    const response = await api.get(`/api/car-rentals/${id}`);
    return response.data;
};
// Cập nhật xe
export const updateCar = async (id: number, carData: any) => {
    const response = await api.put(`/api/car-rentals/${id}`, carData);
    return response.data;
};

// Xóa xe
export const deleteCar = async (id: number) => {
    const response = await api.delete(`/api/car-rentals/${id}`);
    return response.data;
};

// Tìm kiếm xe
export const searchCars = async (searchParams: any) => {
    const response = await api.get('/api/car-rentals/search', {
        params: searchParams
    });
    return response.data;
};


// Đặt thuê xe
export const rentCar = async (carId: number, rentalData: any) => {
    const response = await api.post(`/api/car-rentals/cars/${carId}/rent`, rentalData); // Đảm bảo đúng endpoint
    return response.data;
};

// Trả xe
export const returnCar = async (rentalId: number) => {
    const response = await api.post(`/api/car-rentals/rentals/${rentalId}/return`); // Đảm bảo đúng endpoint
    return response.data;
};
