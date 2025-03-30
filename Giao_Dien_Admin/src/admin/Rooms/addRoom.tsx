import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IHotel } from "../../interface/hotel"; // Import your FormData type
import { IRoomsDetail, IType_Room } from "../../interface/rooms";
import { roomCT } from "../../context/room";
import { getallHotels } from "../../services/hotel";
import { getallTypeRoom } from "../../services/typeRoom";

const AddRooms = () => {
  const { onAdd } = useContext(roomCT); // Assuming onAdd is used to add the room
  const [typeRoom, setTypeR] = useState<IType_Room[]>([]);
  const [hotels, setHotel] = useState<IHotel[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRoomsDetail>(); // Using the FormData type for form handling

  const onSubmit = (data: IRoomsDetail) => {
    const formData = new FormData();

    formData.append("room_id", data.room_id.toString());
    formData.append("hotel_id", data.hotel_id.toString());
    formData.append("price", data.price.toString());
    formData.append("price_surcharge", data.price_surcharge.toString());
    formData.append("available_rooms", data.available_rooms.toString());
    formData.append("description", data.description);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    onAdd(formData); // Handle form submission
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getallHotels();
        setHotel(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu khách sạn");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getallTypeRoom();
        setTypeR(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu loại phòng");
      }
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Thêm Mới Phòng
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Type Room */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Loại Phòng</label>
          <select
            {...register("room_id", { required: "Vui lòng chọn loại phòng" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn loại phòng</option>
            {typeRoom.map((TypeR) => (
              <option key={TypeR.id} value={TypeR.id}>
                {TypeR.type_room}
              </option>
            ))}
          </select>
          {errors.room_id && <span className="text-red-600 text-sm mt-2">{errors.room_id.message}</span>}
        </div>

        {/* Hotel */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Khách Sạn</label>
          <select
            {...register("hotel_id", { required: "Vui lòng chọn khách sạn" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn khách sạn</option>
            {hotels.map((Hotels) => (
              <option key={Hotels.id} value={Hotels.id}>
                {Hotels.name}
              </option>
            ))}
          </select>
          {errors.hotel_id && <span className="text-red-600 text-sm mt-2">{errors.hotel_id.message}</span>}
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Giá</label>
          <input
            type="number"
            placeholder="Giá phòng"
            {...register("price", { required: "Giá không được để trống", min: 0 })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && <span className="text-red-600 text-sm mt-2">{errors.price.message}</span>}
        </div>

        {/* Price Surcharge */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Phụ Thu</label>
          <input
            type="number"
            placeholder="Phụ thu (nếu có)"
            {...register("price_surcharge")}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Available Rooms */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Phòng còn trống</label>
          <input
            type="text"
            placeholder="Số phòng còn trống"
            {...register("available_rooms", { required: "Số phòng còn trống không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.available_rooms && <span className="text-red-600 text-sm mt-2">{errors.available_rooms.message}</span>}
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Ảnh Phòng</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Vui lòng chọn ảnh phòng" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.image && <span className="text-red-600 text-sm mt-2">{errors.image.message}</span>}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Mô Tả Phòng</label>
          <textarea
            placeholder="Mô tả về phòng"
            {...register("description", { required: "Mô tả không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && <span className="text-red-600 text-sm mt-2">{errors.description.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Thêm Mới Phòng
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRooms;
