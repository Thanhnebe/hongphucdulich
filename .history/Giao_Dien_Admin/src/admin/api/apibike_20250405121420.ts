import api from "../../config/axios";

// Lấy tất cả xe
export const fetchBike = async () => {
    const response = await api.get('/api/car-rentals');
    return response.data;
};

// Thêm xe mới
export const addBike = async (carData: FormData) => {
    const response = await api.post('/api/car-rentals', carData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Đảm bảo gửi đúng định dạng
        },
    });
    return response.data;
};
// Lấy thông tin xe
export const fetchBikeById = async (id: number) => {
    const response = await api.get(`/api/car-rentals/${id}`);
    return response.data;
};

// Cập nhật xe
export const updateBike = async (id: number, carData: FormData) => {
    const response = await api.put(`/api/car-rentals/${id}`, carData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Đảm bảo gửi đúng định dạng
        },
    });
    return response.data;
};
// Xóa xe
export const deleteBike = async (id: number) => {
    const response = await api.delete(`/api/car-rentals/${id}`);
    return response.data;
};

// Tìm kiếm xe
export const searchBike = async (searchParams: any) => {
    const response = await api.get('/api/car-rentals/search', {
        params: searchParams
    });
    return response.data;
};

// Đặt thuê xe
export const rentBike = async (carId: number) => {
    const response = await api.post(`/api/car-rentals/rent/${carId}`);
    return response.data;
};
