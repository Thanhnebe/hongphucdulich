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

    const handleSubmit = (e: React.FormEvent) => {
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
        console.log("Form Data Submitted:", formData);
        alert("Thông tin đã được gửi!");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit}>
                {/* Hidden Inputs */}
                <input id="id" name="id" type="hidden" value="" />
                <input id="customer_email" name="customer_email" type="hidden" value={email} />
                <input id="customer_phone_number" name="customer_phone_number" type="hidden" value={phone} />
                <input id="reservation_pick_up_date" name="reservation_pick_up_date" type="hidden" value="2025-04-07" />
                <input id="reservation_return_date" name="reservation_return_date" type="hidden" value="2025-04-09" />
                <input id="reservation_pick_up_time" name="reservation_pick_up_time" type="hidden" value="19:54:00" />
                <input id="reservation_return_time" name="reservation_return_time" type="hidden" value="19:54:00" />

                {/* Returning Customer Section */}
                <div className="box box-open">
                    <div className="box-summary">
                        <h2>Đang Quay Lại Khách hàng?</h2>
                    </div>
                    <div className="box-fields">
                        <div id="returning-customer-form">
                            <div className="row">
                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label htmlFor="return_customer_driver_license_number" className="control-label">
                                        Bằng lái xe số
                                    </label>
                                    <input
                                        className="form-control"
                                        id="return_customer_driver_license_number"
                                        name="return_customer_driver_license_number"
                                        type="text"
                                        value={driverLicenseNumber}
                                        onChange={(e) => setDriverLicenseNumber(e.target.value)}
                                    />
                                </div>

                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                    <label htmlFor="return_customer_birthday" className="control-label">
                                        Ngày sinh
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-addon hidden-xs calendar-picker-group-addon">
                                            <i className="fas fa-calendar-alt" title=""></i>
                                        </span>
                                        <input
                                            className="datepicker form-control"
                                            id="return_customer_birthday"
                                            name="return_customer_birthday"
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="finalbuttons">
                                <button type="button" className="btn btn-primary">
                                    Tìm thông tin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div id="contact-form-html" className="car-rental-customer-container">
                    <div className="box box-open">
                        <div className="box-summary">
                            <h2>Tổng quan</h2>
                        </div>
                        <div className="box-fields">
                            <div className="row">
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="first_name" className="control-label">
                                        Họ
                                    </label>
                                    <input
                                        className="form-control"
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="last_name" className="control-label">
                                        Tên
                                    </label>
                                    <input
                                        className="form-control"
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="email" className="control-label">
                                        Email
                                    </label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="phone" className="control-label">
                                        Số điện thoại
                                    </label>
                                    <input
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="address" className="control-label">
                                        Địa chỉ
                                    </label>
                                    <input
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-6 col-sm-6">
                                    <label htmlFor="city" className="control-label">
                                        Tỉnh / Thành Phố
                                    </label>
                                    <select
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <option value="TP HCM">TP HCM</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="Đà Nẵng">Đà Nẵng</option>
                                        <option value="Hải Phòng">Hải Phòng</option>
                                        <option value="Cần Thơ">Cần Thơ</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="note" className="control-label">
                                    Ghi chú bổ sung
                                </label>
                                <textarea
                                    className="form-control"
                                    id="note"
                                    name="note"
                                    rows={3}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Buttons */}
                <div className="finalbuttons">
                    <button type="submit" className="btn btn-primary">
                        Bước tiếp theo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RentalForm;