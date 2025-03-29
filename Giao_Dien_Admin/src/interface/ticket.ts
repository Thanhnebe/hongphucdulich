
export interface IFlight {
    id?: number; // ID tự động tăng
    passengerName: string; // Tên hành khách
    passportNumber?: string | null; // Số hộ chiếu (có thể null)
    flightNumber: string; // Mã chuyến bay
    departure: string; // Sân bay đi
    destination: string; // Sân bay đến
    departureTime: string; // Thời gian khởi hành (ISO format)
    seatNumber?: number | null; // Số ghế (có thể null)
    price: number; // Giá vé
    status: "pending" | "confirmed" | "cancelled"; // Trạng thái vé
    createdAt?: string; // Ngày tạo
    updatedAt?: string; // Ngày cập nhật
}


export interface ITicket {
    destination: string;
    id: number;
    flight_number: string;
    airline: string;
    departure_airport: string;
    arrival_airport: string;
    departure_time: string; // ISO format
    arrival_time: string; // ISO format
    price: number;
    seat_class: string;
    available_seats: number;
}

export interface FormTicket {
    flight_number: string;
    airline: string;
    departure_airport: string;
    arrival_airport: string;
    departure_time: string;
    arrival_time: string;
    price: number;
    seat_class: string;
    available_seats: number;
}