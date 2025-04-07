import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BikeDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Sử dụng để điều hướng
    const bikes = location.state?.bikes; // Lấy danh sách xe từ state

    if (!bikes || bikes.length === 0) {
        return <p>Không tìm thấy thông tin xe.</p>;
    }

    const handleRentBike = (bike: any) => {
        // Chuyển hướng đến trang nhập thông tin thuê xe và truyền dữ liệu xe qua state
        navigate("/rental-form", { state: { bike } });
    };

    return (
        <div className="container mx-auto px-4 py-32">
            {bikes.map((bike: any) => (
                <div key={bike.id} className="box-fields mb-8">
                    <div className="flex flex-wrap car-rental-step-2-box-fields border-1 border-gray-300  shadow rounded-lg p-4">
                        {/* Hình ảnh xe */}
                        <div className="col-md-3 col-sm-3 col-xs-12 car-rental-step-2-image-column">
                            <img
                                src={`https://files-europe.caagcrm.com/tenants/1f9a864b-051d-4690-b2ac-218db7244bda/files/xvukur8x-r9e6-pqfk-x0sq-bpw5jnnwvhwf/redirect/1713955457/timestamp?size=1000`}
                                alt={bike.bike_name}
                                className="img-responsive w-[310px] object-cover"
                            />
                        </div>

                        {/* Thông tin chi tiết xe */}
                        <div className="col-md-6 col-sm-6 col-xs-12 car-rental-step-2-description-column">
                            <h4 className="font-bold text-[2rem] text-gray-800">
                                {bike.bike_name}
                            </h4>
                            <p>Model: {bike.bike_model}</p>
                            <p>Loại xe: {bike.bike_type}</p>
                            <p>Dung tích động cơ: {bike.engine_capacity}cc</p>
                            <p>Nhiên liệu: {bike.fuel_type}</p>
                            <p>Tiêu hao nhiên liệu: {bike.fuel_consumption}L/100km</p>
                            <p>Mô tả: {bike.description}</p>
                        </div>

                        {/* Giá thuê */}
                        <div className="col-md-3 col-sm-3 col-xs-12 text-center car-rental-step-2-price-column selectable">
                            <h2 className="safari-bold-400" style={{ fontSize: "1.8em" }}>
                                {parseFloat(bike.price_per_day).toLocaleString()} VNĐ
                                <small className="day-label"> / ngày</small>
                            </h2>
                            <button
                                className="btn btn-success"
                                onClick={() => handleRentBike(bike)} // Gọi hàm khi nhấn nút
                            >
                                Thuê Xe
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default BikeDetails;