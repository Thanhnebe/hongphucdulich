import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICities, IHotel } from "../../interface/hotel"; // Nhập loại FormData của bạn
import { hotelCT } from "../../context/hotel"; // Nhập context của bạn
import { getallCitys } from "../../services/cities";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user_id: number;
}

const AddHotels = () => {
  const { onAdd } = useContext(hotelCT); // Giả sử onAdd dùng để thêm khách sạn
  const [city, setCity] = useState<ICities[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IHotel>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setValue("user_id", decoded.user_id); // Gán user_id vào form
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
      }
    }
  }, [setValue]);

  const onSubmit = (data: IHotel) => {
    const formData = new FormData();

    // Thêm tất cả các trường vào FormData
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

    onAdd(formData);
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Thêm Mới Khách Sạn
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Tên khách sạn */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-semibold text-gray-800 mb-2">
            Tên Khách Sạn
          </label>
          <input
            type="text"
            placeholder="Tên khách sạn"
            {...register("name", {
              required: "Tên không để trống",
              minLength: { value: 6, message: "Tên phải dài hơn 6 ký tự" },
            })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-600 text-sm mt-2">{errors.name.message}</span>
          )}
        </div>

        {/* Địa chỉ */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-lg font-semibold text-gray-800 mb-2">
            Địa Chỉ
          </label>
          <input
            type="text"
            placeholder="Địa chỉ"
            {...register("address", {
              required: "Địa chỉ không được để trống",
            })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && (
            <span className="text-red-600 text-sm mt-2">{errors.address.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-600 text-sm mt-2">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-lg font-semibold text-gray-800 mb-2">
            Số Điện Thoại
          </label>
          <input
            type="tel"
            placeholder="Số điện thoại"
            {...register("phone", {
              required: "Số điện thoại không được để trống",
            })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <span className="text-red-600 text-sm mt-2">{errors.phone.message}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label htmlFor="rating" className="text-lg font-semibold text-gray-800 mb-2">
            Rating
          </label>
          <input
            type="number"
            placeholder="Rating"
            {...register("rating", { required: "Rating không được để trống" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rating && (
            <span className="text-red-600 text-sm mt-2">{errors.rating.message}</span>
          )}
        </div>

        {/* Mô tả */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-semibold text-gray-800 mb-2">
            Mô Tả
          </label>
          <textarea
            placeholder="Mô tả"
            {...register("description", {
              required: "Mô tả không được để trống",
            })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <span className="text-red-600 text-sm mt-2">{errors.description.message}</span>
          )}
        </div>

        {/* Ảnh */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-lg font-semibold text-gray-800 mb-2">
            Ảnh
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Vui lòng chọn ảnh" })}
            className="border p-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.image && (
            <span className="text-red-600 text-sm mt-2">{errors.image.message}</span>
          )}
        </div>

        {/* Thành phố */}
        <div className="flex flex-col">
          <label htmlFor="city_id" className="text-lg font-semibold text-gray-800 mb-2">
            Thành Phố
          </label>
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
          {errors.city_id && (
            <span className="text-red-600 text-sm mt-2">{errors.city_id.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Thêm Mới
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotels;
