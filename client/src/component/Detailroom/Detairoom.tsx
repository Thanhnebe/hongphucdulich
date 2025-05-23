import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaHotel,
  FaBed,
  FaWifi,
  FaBath,
  FaChevronDown,
  FaPlus,
  FaMinus,
  FaShoppingCart,
} from "react-icons/fa";
import CartContext from "../../context/cartCT"; // Đảm bảo import đúng
import { PaymentContext } from "../../context/paymentCT";
import { roomCT } from "../../context/roomCT";
import { IRoomsDetail, IType_Room } from "../../interface/room";
import { v4 as uuidv4 } from "uuid";

const ServiceCard = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md transition-transform hover:scale-105">
    <Icon className="text-[24px] text-blue-600" />
    <span className="text-[16px] text-blue-800 ml-3 font-medium">{label}</span>
  </div>
);

const RoomCounter = ({
  label,
  value,
  increment,
  decrement,
}: {
  label: string;
  value: number;
  increment: () => void;
  decrement: () => void;
}) => (
  <div className="flex flex-col items-center mb-2">
    <label className="block text-[16px] font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex items-center gap-2">
      <button
        onClick={decrement}
        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center shadow-sm"
      >
        <FaMinus />
      </button>
      <input
        type="number"
        value={value}
        readOnly
        className="w-16 text-center border border-gray-300 rounded-md text-lg font-semibold"
      />
      <button
        onClick={increment}
        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center shadow-sm"
      >
        <FaPlus />
      </button>
    </div>
  </div>
);

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID phòng từ URL
  const { rooms, typeRoom } = useContext(roomCT);
  const paymentContext = useContext(PaymentContext);
  const { addRoom } = paymentContext || { addRoom: () => {} }; // Kiểm tra context
  const { addToCart } = useContext(CartContext);
  const [roomDetail, setRoomDetail] = useState<IRoomsDetail | null>(null);
  const [roomTypeDetail, setRoomTypeDetail] = useState<IType_Room | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState<string>(today);
  const [checkOutDate, setCheckOutDate] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0]
  );
  const [numRooms, setNumRooms] = useState<number>(1);
  const [availableRoomsData, setAvailableRoomsData] = useState<any[]>([]);

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/room/show`);
      const data = await response.json();
      setAvailableRoomsData(data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phòng:", error);
      setErrorMessage("Không thể tải thông tin phòng trống.");
    }
  };

  const checkRoomAvailability = (
    checkIn: string,
    checkOut: string,
    roomsNeeded: number
  ) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    for (let d = checkInDate; d < checkOutDate; d.setDate(d.getDate() + 1)) {
      const dateStr = new Date(d).toISOString().split("T")[0];
      const roomForDate = availableRoomsData.find(
        (room: any) =>
          room.detail_room_id === parseInt(id || "0") && room.date === dateStr
      );

      if (!roomForDate || roomForDate.available_rooms < roomsNeeded) {
        return {
          available: false,
          message: `Ngày ${dateStr} chỉ còn ${
            roomForDate?.available_rooms || 0
          } phòng trống.`,
        };
      }
    }

    return { available: true, message: "" };
  };
  useEffect(() => {
    if (id) {
      const room = rooms.find((room: IRoomsDetail) => room.id === parseInt(id));
      setRoomDetail(room || null);

      if (room) {
        const type = typeRoom.find(
          (type: IType_Room) => type.id === room.room_id
        );
        setRoomTypeDetail(type || null);
      }
    }
    fetchAvailableRooms();
  }, [id]);
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);

    if (new Date(checkOutDate) <= new Date(newCheckInDate)) {
      const newCheckOut = new Date(newCheckInDate);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setCheckOutDate(newCheckOut.toISOString().split("T")[0]);
    }
  };
  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOutDate = e.target.value;
    const newCheckOut = new Date(newCheckOutDate);
    const newCheckIn = new Date(checkInDate);

    if (newCheckOut <= newCheckIn) {
      // Ngày check-out trùng hoặc nhỏ hơn ngày check-in, tự động đặt lại
      const adjustedCheckOut = new Date(newCheckIn);
      adjustedCheckOut.setDate(newCheckIn.getDate() + 1); // Tăng 1 ngày
      setCheckOutDate(adjustedCheckOut.toISOString().split("T")[0]);
    } else {
      setCheckOutDate(newCheckOutDate);
    }
  };
  useEffect(() => {
    setCheckInDate(today);
    setCheckOutDate(
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0]
    );
    setNumRooms(0);
    setAdults(1);
    setChildren(0);
    setErrorMessage(null);
    if (id) {
      const room = rooms.find((room: IRoomsDetail) => room.id === parseInt(id));
      setRoomDetail(room || null);
      if (room) {
        const type = typeRoom.find(
          (type: IType_Room) => type.id === room.room_id
        );
        setRoomTypeDetail(type || null);
      }
    }
  }, [id, rooms, typeRoom]);

  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const totalGuests = adults + children;

  const incrementRooms = () => {
    if (!roomDetail) return;

    // Kiểm tra tính khả dụng của phòng
    const { available, message } = checkRoomAvailability(
      checkInDate,
      checkOutDate,
      numRooms + 1 // Kiểm tra với số lượng phòng tăng thêm 1
    );

    if (!available) {
      setErrorMessage(message); // Hiển thị lỗi nếu không khả dụng
      return; // Dừng thực thi nếu không khả dụng
    }

    // Nếu còn phòng trống, tiếp tục tăng số phòng
    if (numRooms < roomDetail.available_rooms) {
      setNumRooms(numRooms + 1);
      setErrorMessage(null); // Xóa thông báo lỗi
    } else {
      setErrorMessage(
        `Phòng này chỉ còn ${roomDetail?.available_rooms} phòng trống.`
      );
    }
  };

  const decrementRooms = () => {
    if (numRooms > 1) {
      setNumRooms(numRooms - 1);
      setErrorMessage(null);
    }
  };

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    const maxGuestsAllowed = (roomTypeDetail?.bed || 0) * 2 * numRooms;
    if (totalGuests > maxGuestsAllowed) {
      setErrorMessage(
        `Số người phải <= ${maxGuestsAllowed} (mỗi giường tối đa 2 người).Vui lòng tăng số phòng.`
      );
      return false;
    }
    setter((prev) => prev + 1);
  };

  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) =>
    setter((prev) => (prev > 0 ? prev - 1 : 0));

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
    return differenceInTime / (1000 * 3600 * 24);
  };

  const numberOfNights =
    checkInDate && checkOutDate
      ? calculateNights(checkInDate, checkOutDate)
      : 0;
  const validateSelection = () => {
    const { available, message } = checkRoomAvailability(
      checkInDate,
      checkOutDate,
      numRooms + 1
    );

    if (!available) {
      setErrorMessage(message); // Hiển thị lỗi nếu không khả dụng
      return; // Dừng thực thi nếu không khả dụng
    }
    if (numRooms < 1) {
      setErrorMessage("Vui lòng chọn ít nhất 1 phòng.");
      return false;
    }
    const maxGuestsAllowed = (roomTypeDetail?.bed || 0) * 2 * numRooms;
    if (totalGuests > maxGuestsAllowed) {
      setErrorMessage(
        `Quá số lượng khách. Mỗi giường tối đa 2 người, tối đa ${maxGuestsAllowed} khách.`
      );
      return false;
    }
    return true;
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateSelection()) return;
    if (!roomDetail || !checkInDate || !checkOutDate) {
      setErrorMessage("Vui lòng chọn ngày check-in và check-out.");
      return;
    }

    const products = [
      {
        detail_room_id: roomDetail.id,
        quantity: numRooms,
        check_in: checkInDate,
        check_out: checkOutDate,
        adult: adults,
        children: children,
      },
    ];

    try {
      await addToCart({ products });
      navigate("/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setErrorMessage("Thêm vào giỏ hàng không thành công.");
    }
  };
  const resetRoom = () => {
    setRoomDetail(null);
    setCheckInDate("");
    setCheckOutDate("");
    setNumRooms(1);
    setAdults(0);
    setErrorMessage("");
  };
  const handleAddToPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { available, message } = checkRoomAvailability(
      checkInDate,
      checkOutDate,
      numRooms
    );
    if (!available) {
      setErrorMessage(message);
      return;
    }
    if (roomDetail && checkInDate && checkOutDate) {
      const checkInDateObj = new Date(checkInDate);
      const checkOutDateObj = new Date(checkOutDate);
      const numberOfNights =
        (checkOutDateObj.getTime() - checkInDateObj.getTime()) /
        (1000 * 60 * 60 * 24);
      const surcharge = roomDetail?.price_surcharge || 0;
      const price1 = roomDetail?.into_money;
      const totalPrice = price1 * numberOfNights * numRooms;
      const room = {
        id: roomDetail.id,
        name: roomDetail.description,
        dates: `${checkInDate} - ${checkOutDate}`,
        guests: `${numRooms} phòng - ${totalGuests} người`,
        price: totalPrice, // Tính toán tổng giá
        image: roomDetail.image,
        quantity: numRooms,
      };

      addRoom(room);

      navigate("/pay");
    } else {
      setErrorMessage("Vui lòng chọn ngày check-in và check-out.");
    }
  };

  if (!roomDetail) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center py-[170px]">
      <div className="flex items-center justify-center w-full max-w-5xl px-6 py-4 bg-white shadow-md rounded-lg mb-6">
        <div className="absolute left-6">
          <Link
            className="text-blue-600 text-lg font-semibold hover:underline"
            to="/"
          >
            Quay lại
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-blue-800 text-center">
          Thông tin chi tiết phòng
        </h1>
      </div>

      <main className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">
          {roomDetail.description}
        </h2>
        {roomTypeDetail && (
          <h3 className="text-lg text-center mb-4">
            Loại phòng: {roomTypeDetail.type_room} - Số giường:{" "}
            {roomTypeDetail.bed}
          </h3>
        )}
        {/* Room Gallery */}
        <section className="flex justify-center gap-4 mb-8">
          <img
            src={`http://localhost:8000/storage/${roomDetail.image}`}
            alt={`Room ${roomDetail.id}`}
            className="w-1/3 rounded-lg shadow-md hover:scale-105 transform transition-transform"
          />
        </section>

        {/* Services */}
        <section>
          <h2 className="text-xl font-bold text-center mb-4">Dịch vụ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <ServiceCard icon={FaHotel} label="15m²" />
            <ServiceCard icon={FaBed} label="Giường đơn" />
            <ServiceCard icon={FaWifi} label="Wifi miễn phí" />
            <ServiceCard icon={FaBath} label="Vòi sen và bồn tắm" />
            <ServiceCard icon={FaBath} label="Máy sấy" />
            <ServiceCard icon={FaBath} label="Đồ dùng vệ sinh cá nhân" />
          </div>
        </section>

        {/* Check-in/out */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-center mb-4">Check In-Out</h2>
          <div className="flex gap-4 justify-center">
            <input
              type="date"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-blue-500 text-gray-700"
              value={checkInDate}
              min={today} // Ngày nhỏ nhất là hôm nay
              onChange={handleCheckInChange}
            />
            <input
              type="date"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-blue-500 text-gray-700"
              value={checkOutDate}
              min={checkInDate} // Ngày nhỏ nhất là ngày check-in
              onChange={handleCheckOutChange}
            />
          </div>
          <div className="text-center mt-2">
            {calculateNights(checkInDate, checkOutDate) > 0 && (
              <p>{calculateNights(checkInDate, checkOutDate)} đêm</p>
            )}
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mt-2">{errorMessage}</div>
          )}
        </section>

        {/* Room and Guest Selector */}
        <section className="mt-8 ">
          <h2 className="text-xl  font-bold text-center mb-4">
            Số lượng phòng và người
          </h2>
          <div className=" relative w-64  mx-auto">
            <div
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>
                {numRooms} phòng - {totalGuests} khách
              </span>
              <FaChevronDown />
            </div>
            {isOpen && (
              <div className="absolute bg-white  mt-1 p-2 left-20 shadow-lg z-10">
                <RoomCounter
                  label="Số phòng"
                  value={numRooms}
                  increment={incrementRooms}
                  decrement={decrementRooms}
                />
                <RoomCounter
                  label="Người lớn"
                  value={adults}
                  increment={() => increment(setAdults)}
                  decrement={() => decrement(setAdults)}
                />
                <RoomCounter
                  label="Trẻ em"
                  value={children}
                  increment={() => increment(setChildren)}
                  decrement={() => decrement(setChildren)}
                />
                <button
                  onClick={() => {
                    if (validateSelection()) {
                      setIsOpen(false);
                    }
                  }}
                  className="mt-1 w-full bg-blue-500 text-white py-1 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Xác nhận
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-40">
          <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-md">
            <span className="font-bold text-gray-700">
              GIÁ PHÒNG:(đã bao gồm phụ phí)
            </span>
            <span className="text-lg font-bold text-blue-700">
              {Number(roomDetail.into_money).toLocaleString()} VND/đêm
            </span>
          </div>
          <div className="mt-4 flex justify-between items-center bg-yellow-400 text-white p-4 rounded-lg shadow-md">
            <span className="text-lg font-bold">TỔNG TIỀN:</span>
            <span className="text-xl font-bold">
              {Number(
                roomDetail.into_money * numRooms * numberOfNights
              ).toLocaleString()}{" "}
              VND
            </span>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            Thêm Vào Giỏ Hàng
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600"
            onClick={handleAddToPay}
          >
            Đặt ngay
          </button>
        </div>
      </main>
    </div>
  );
};

export default RoomDetail;
