import api from "../config/axios";
import { IFlight } from "../interface/ticket";

// Lấy danh sách tất cả chuyến bay
export const getAllFlights = async () => {
    try {
        const { data } = await api.get("api/flight/flights");
        return data;
    } catch (error) {
        throw new Error("Lỗi khi lấy danh sách chuyến bay");
    }
};
// Lấy danh sách tất cả chuyến bay
export const getAllFlightsChuyen = async () => {
    try {
        const { data } = await api.get("api/flight/flights-chuyen");
        return data;
    } catch (error) {
        throw new Error("Lỗi khi lấy danh sách chuyến bay");
    }
};
// Lấy thông tin chuyến bay theo ID
export const getFlightById = async (id: string | number) => {
    try {
        const { data } = await api.get(`api/flight/flights/${id}`);
        return data.data;
    } catch (error) {
        throw new Error("Không thể lấy dữ liệu chuyến bay.");
    }
};

// Thêm một chuyến bay mới
export const addFlight = async (flightData: IFlight) => {
    try {
        const { data } = await api.post("api/flight/flights", flightData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        throw new Error("Lỗi khi thêm chuyến bay");
    }
};

// Xóa một chuyến bay theo ID
export const deleteFlight = async (id: number | string) => {
    try {
        const { data } = await api.delete(`api/flight/flights/${id}`);
        return data;
    } catch (error) {
        throw new Error("Lỗi khi xóa chuyến bay");
    }
};

// Cập nhật thông tin chuyến bay theo ID
export const updateFlight = async (flightData: IFlight, id: number | string) => {
    try {
        const { data } = await api.post(`api/flight/flights/${id}`, flightData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        throw new Error("Lỗi khi cập nhật chuyến bay");
    }
};
