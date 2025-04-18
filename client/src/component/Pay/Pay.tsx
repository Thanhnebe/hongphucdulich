import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import { PaymentContext } from "../../context/paymentCT";
import { toast } from "react-toastify";
import { IRoomsDetail } from "../../interface/room";

const Pay = () => {
  const paymentContext = useContext(PaymentContext);
  if (!paymentContext) return <div>Loading...</div>;

  const { bookedRooms, resetPayment } = paymentContext;
  const [roomDetail, setroomDetail] = useState<IRoomsDetail[]>([]);
  const [formState, setFormState] = useState({
    firstName :"",
    lastName:"",
    phone: "",
    paymentMethod: "MoMo",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser) {
      setFormState((prev) => ({
        ...prev,
        lastName: storedUser.name.split(" ").slice(0, -1).join(" ") || "",
        firstName: storedUser.name.split(" ").slice(-1).join(" ") || "",
        phone: storedUser.phone || "",
      }));
    }
  }, []);
  
  
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = bookedRooms.reduce((total, room) => {
        const dates = room.dates ?? "";
        const [checkIn, checkOut] = dates.split(" - ") || ["", ""];
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const numberOfDays =
          (checkOutDate.getTime() - checkInDate.getTime()) /
          (1000 * 60 * 60 * 24);

        const roomDetails = roomDetail.find((detail) => detail.id === room.id);

        if (roomDetails && roomDetails.into_money) {
          return total + roomDetails.into_money * numberOfDays * room.quantity;
        }

        return total;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [bookedRooms]);


  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formState.lastName.trim()) errors.lastName = "Họ không được để trống.";
    if (!formState.firstName.trim())
      errors.firstName = "Tên không được để trống.";
    if (!/^\d{10,11}$/.test(formState.phone))
      errors.phone = "Số điện thoại phải có 10-11 chữ số.";

    return errors;
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const prepareFormData = () =>
    bookedRooms.map((room) => {
      const dates = room.dates ?? "";
      const [checkIn, checkOut] = dates.split(" - ") || ["", ""];

      const guests = room.guests ?? "";
      const [roomCount, guestCount] = guests.split(" - ") || ["", ""];
      const totalGuests = parseInt(guestCount.split(" ")[0] || "0", 10);
      const quantity = parseInt(roomCount.split(" ")[0] || "0", 10);

      return {
        detail_room_id: room.id,
        check_in: checkIn || "",
        check_out: checkOut || "",
        adult: totalGuests || 0,
        children: 0,
        quantity: quantity || 0,
        method: formState.paymentMethod,
        firstname: formState.firstName,
        lastname: formState.lastName,
        phone: formState.phone,
      };
    });
  // hiển thị tóm tắt đặt phòng
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Nếu form đang được gửi, ngăn không cho thực hiện lại.
    if (isSubmitting) return;
  
    setIsSubmitting(true);
  
    if (!bookedRooms || bookedRooms.length === 0) {
      toast.error("Bạn phải chọn phòng để thanh toán.");
      setIsSubmitting(false);
      return;
    }
  
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
  
    setFormErrors({});
  
    try {
      const formData = [prepareFormData().slice(-1)[0]];
      console.log("FormData:", formData);
  
      const payUrls = await Promise.all(
        formData.map(async (data) => {
          const response = await api.post("/api/payment/create", data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          console.log("API Response:", response);
          return response.data.payUrl;
        })
      );
  
      toast.success("Thanh toán thành công!");
      resetPayment();
  
      if (payUrls[0]) {
        window.location.href = payUrls[0];
      }
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Thông tin thanh toán
        </h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-6 flex gap-8">
            {/* Các trường thông tin */}
            <div className="w-1/2">
              <label htmlFor="lastName" className="font-medium">
                Họ <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                className={`p-2 border ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-lg w-full`}
                placeholder="Nhập họ"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm">{formErrors.lastName}</p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="firstName" className="font-medium">
                Tên <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                className={`p-2 border ${
                  formErrors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-lg w-full`}
                placeholder="Nhập tên"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm">{formErrors.firstName}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="font-medium">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className={`p-2 border ${
                formErrors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg w-full`}
              placeholder="Nhập số điện thoại"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>


          {/* Tóm tắt đặt phòng */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg ml-8">
            <h2 className="text-lg font-bold mb-4">Tóm tắt đặt phòng</h2>
            {bookedRooms.length > 0 && (
              <div
                key={bookedRooms[bookedRooms.length - 1].id}
                className="flex items-center mb-4 border-b pb-4"
              >
                <img
                  src={`http://localhost:8000/storage/${bookedRooms[bookedRooms.length - 1].image}`}
                  alt={bookedRooms[bookedRooms.length - 1].name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{bookedRooms[bookedRooms.length - 1].name}</span>
                  <span className="text-gray-600 text-sm">{bookedRooms[bookedRooms.length - 1].dates}</span>
                  <span className="text-gray-600 text-sm">{bookedRooms[bookedRooms.length - 1].guests}</span>
                  <span className="text-blue-600 font-semibold mt-2">
                    {bookedRooms[bookedRooms.length - 1].price.toLocaleString("vi-VN")} VND
                  </span>
                </div>
              </div>
            )}


            {/* <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold">Tổng tiền</h3>
                            <span className="text-xl font-bold text-blue-800">
                                {totalPrice.toLocaleString('vi-VN')} VND
                            </span>
                        </div> */}
          </div>
          <div className="mb-6">
            <h2 className="font-semibold text-lg">Phương thức thanh toán</h2>
            <div className="mt-4 space-y-4">
              
                <label key="MoMo" className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="MoMo"
                    src=""
                    checked={formState.paymentMethod === "MoMo"}
                    onChange={() =>
                      setFormState({ ...formState, paymentMethod: "MoMo" })
                    }
                  />
                  <span>MoMo</span>
                  
                  <img className="w-[70px] h-[50px]" src="src/assets/img/momo.png" alt="" />
                </label>
                <label key="VNPAY" className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="VNPAY"
                    src=""
                    checked={formState.paymentMethod === "VNPAY"}
                    onChange={() =>
                      setFormState({ ...formState, paymentMethod: "VNPAY" })
                    }
                  />
                  <span>VNPAY</span>
                  
                  <img  className="w-[70px] h-[50px]" src="src/assets/img/vnpay.png" alt="" />
                </label>
              
            </div>
          </div>

          <button
  type="submit"
  className={`bg-blue-500 text-white px-6 py-3 rounded-lg w-full ${
    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
  }`}
  disabled={isSubmitting}
>
  {isSubmitting ? "Đang xử lý..." : "THANH TOÁN"}
</button>

        </form>
      </div>
    </div>
  );
};

export default Pay;
