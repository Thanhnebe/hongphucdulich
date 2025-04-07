import React from "react";
import { useLocation } from "react-router-dom";

const BikeDetails: React.FC = () => {
    const location = useLocation();
    const bikes = location.state?.bikes; // Lấy danh sách xe từ state

    if (!bikes || bikes.length === 0) {
        return <p>Không tìm thấy thông tin xe.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {bikes.map((bike: any) => (
                <div key={bike.id} className="box-fields mb-8">
                    <div className="row car-rental-step-2-vehicle-class-container">
                        {/* Hình ảnh xe */}
                        <div className="col-md-3 col-sm-3 col-xs-12 car-rental-step-2-image-column">
                            <img
                                src={`http://127.0.0.1:8000/storage/${bike.image}`}
                                alt={bike.bike_name}
                                className="img-responsive"
                            />
                        </div>

                        {/* Thông tin chi tiết xe */}
                        <div className="col-md-6 col-sm-6 col-xs-12 car-rental-step-2-description-column">
                            <h4 className="no-margin-top safari-bold-400 car-rental-step-2-class-name">
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
                            <button className="btn btn-success">Thuê Xe máy</button>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default BikeDetails;