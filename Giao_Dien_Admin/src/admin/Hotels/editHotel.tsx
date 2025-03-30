import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICities, IHotel } from "../../interface/hotel"; // Import your FormData type
import { hotelCT } from "../../context/hotel"; // Import your context
import { getallCitys } from "../../services/cities";
import { useParams } from "react-router-dom";
import { GetHotelByID } from "../../services/hotel";

const EditHotels = () => {
  const { onUpdate } = useContext(hotelCT); // Assuming onAdd is used to add the hotel
  const [city, setCity] = useState<ICities[]>([]); // For categories or any other needed data
  const [hotelData, setHotelData] = useState<IHotel | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IHotel>(); // Using the FormData type for form handling
  const param = useParams();

  useEffect(() => {
    (async () => {
      const hotel = await GetHotelByID(param?.id as number | string);
      setHotelData(hotel);
      reset(hotel);
    })();
  }, []);

  const onSubmit = (data: IHotel) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("rating", data.rating.toString());
    formData.append("description", data.description);
    formData.append("map", data.map);
    formData.append("status", data.status);
    formData.append("user_id", data.user_id.toString());
    formData.append("city_id", data.city_id.toString());

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    formData.append("_method", "PUT");

    onUpdate(formData, param?.id as number | string);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getallCitys();
        setCity(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu thành phố");
      }
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Sửa Thông Tin Khách Sạn
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Hotel Name */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Tên Khách Sạn</label>
          <input
            type="text"
            placeholder="Tên khách sạn"
            {...register("name", { required: "Tên không để trống", minLength: 6 })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-600 text-sm mt-2">{errors.name.message}</span>}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Địa Chỉ</label>
          <input
            type="text"
            placeholder="Địa chỉ"
            {...register("address", { required: "Địa chỉ không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <span className="text-red-600 text-sm mt-2">{errors.address.message}</span>}
        </div>

        {/* Map */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Bản Đồ</label>
          <input
            type="text"
            placeholder="Link bản đồ"
            {...register("map", { required: "Bản đồ không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.map && <span className="text-red-600 text-sm mt-2">{errors.map.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-600 text-sm mt-2">{errors.email.message}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Số Điện Thoại</label>
          <input
            type="tel"
            placeholder="Số điện thoại"
            {...register("phone", { required: "Số điện thoại không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <span className="text-red-600 text-sm mt-2">{errors.phone.message}</span>}
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Đánh Giá</label>
          <input
            type="number"
            placeholder="Đánh giá"
            {...register("rating", { required: "Đánh giá không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rating && <span className="text-red-600 text-sm mt-2">{errors.rating.message}</span>}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Mô Tả</label>
          <textarea
            placeholder="Mô tả về khách sạn"
            {...register("description", { required: "Mô tả không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && <span className="text-red-600 text-sm mt-2">{errors.description.message}</span>}
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Ảnh</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {hotelData && hotelData.image && (
          <img
            src={`http://localhost:8000/storage/${hotelData.image}`}
            alt="Hotel Image"
            className="w-40 h-40 object-cover rounded-md mt-4"
          />
        )}

        {/* City */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-800 mb-2">Chọn Thành Phố</label>
          <select
            {...register("city_id", { required: "Vui lòng chọn thành phố" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn tỉnh thành</option>
            {city.map((cityItem) => (
              <option key={cityItem.id} value={cityItem.id}>
                {cityItem.name}
              </option>
            ))}
          </select>
          {errors.city_id && <span className="text-red-600 text-sm mt-2">{errors.city_id.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Cập Nhật Khách Sạn
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHotels;
