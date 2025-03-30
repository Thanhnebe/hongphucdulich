import React from "react";

const CreateLocationForm: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans leading-normal overflow-x-hidden">
      <main className="flex-1 p-8">
        <section className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Thêm Mới Khách Sạn
          </h2>
          <form>
            {/* Location Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <legend className="text-lg font-medium">Thông Tin Khách Sạn</legend>
                <p className="text-xs text-red-500">Bắt Buộc Nhập</p>
              </div>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Tên Khách Sạn</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="name"
                    placeholder="Tên khách sạn"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Địa Chỉ</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="address"
                    placeholder="Địa chỉ khách sạn"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Bản Đồ</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="map"
                    placeholder="Link bản đồ"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Email</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    name="email"
                    placeholder="contact@hotel.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Số Điện Thoại</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Đánh Giá</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    name="rating"
                    placeholder="Đánh giá (1-5)"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">Miêu Tả Khách Sạn</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Miêu tả về khách sạn..."
                rows={4}
              />
            </div>

            {/* Status Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <legend className="text-lg font-medium">Trạng Thái</legend>
              </div>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Trạng Thái Khách Sạn</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="status"
                    placeholder="Trạng thái (tùy chọn)"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">ID Người Dùng</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="user_id"
                    placeholder="ID người dùng (tùy chọn)"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700">Chọn Tỉnh Thành</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="city_id"
                  >
                    <option value="">Chọn tỉnh thành</option>
                    <option value="1">Hà Nội</option>
                    <option value="2">Hồ Chí Minh</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="mb-6">
              <div className="space-y-2">
                <legend className="text-lg font-medium">Thêm Ảnh</legend>
              </div>
              <div>
                <input
                  className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg"
                  type="file"
                  name="cover_image"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mb-6 text-center">
              <input
                className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
                value="Tạo Khách Sạn"
              />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateLocationForm;
