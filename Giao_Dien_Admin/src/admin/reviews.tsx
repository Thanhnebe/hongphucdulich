import React, { useContext, useState } from "react";
import { ReviewCT } from "../context/review";
import { IReview } from "../interface/review";

const Reviews = () => {
  const { review, deleteReview } = useContext(ReviewCT);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 20;

  // Calculate the total pages
  const totalPages = Math.ceil(review.length / reviewsPerPage);

  // Get reviews for the current page
  const currentReviews = review.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Handle page navigation
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full mx-auto">
      <nav className="flex justify-between items-center mb-4">
        <div>
          <nav aria-label="breadcrumb" className="text-sm text-gray-500 flex items-center gap-2">
            <a href="#" className="hover:text-blue-500">Dashboard</a>
            <span>/</span>
            <p className="font-semibold text-gray-800">Quản Lý Đánh Giá</p>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Quản Lý Đánh Giá</h1>
        </div>
      </nav>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">STT</th>
              <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">Tên Khách Hàng</th>
              <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">Nội Dung</th>
              <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">Điểm Đánh Giá</th>
              <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">Ngày Đánh Giá</th>
              <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">Khách Sạn Đánh Giá</th>
              <th className="py-3 px-6 text-xs font-medium text-gray-700 uppercase">Chức Năng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentReviews.length > 0 ? (
              currentReviews.map((item: IReview, index: number) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-900">{(currentPage - 1) * reviewsPerPage + index + 1}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{item.user?.name || "N/A"}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{item.comment}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{item.rating}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{new Date(item.created_at).toLocaleDateString("vi-VN")}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{item.hotel?.name || "N/A"}</td>
                  <td className="py-4 px-6 flex gap-2 justify-center">
                    <button
                      onClick={() => deleteReview(item.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 px-6 text-sm font-medium text-gray-900">
                  Không có đánh giá nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium ${currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
            } rounded-lg transition duration-300`}
        >
          Trước
        </button>

        <span className="text-sm text-gray-600">
          Trang {currentPage} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium ${currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
            } rounded-lg transition duration-300`}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Reviews;
