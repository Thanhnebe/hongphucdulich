import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const services = [
  {
    title: "Thuê Xe Tự Lái",
    description:
      "Dịch vụ cho thuê xe tự lái với nhiều dòng xe hiện đại, tiện nghi, phù hợp cho mọi nhu cầu di chuyển.",
    image: "https://thuexedongduong.com/wp-content/uploads/2021/05/thue-xe-4-cho-tphcm-5-1.jpg",
    link: "/carrental",
  },
  {
    title: "Đặt Vé Máy Bay",
    description:
      "Đặt vé máy bay giá rẻ, nhanh chóng, tiện lợi với nhiều hãng hàng không uy tín.",
    image: "https://dulichhangkhong.com.vn/ve-may-bay/vnt_upload/news/08_2021/888-1578475996-4245-1578566639.png_1.png",
    link: "/findflight",
  },
];

const Service = (props: Props) => {
  return (
    <div className="w-full bg-gray-100">
      {/* Banner */}
      <div className="relative h-[400px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("src/upload/dichvu.jpeg")' }}>
        <p className="text-white text-5xl font-bold italic">Dịch Vụ</p>
      </div>

      {/* Dịch Vụ */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-semibold text-center mb-12 text-gray-800">Các Dịch Vụ Của Chúng Tôi</h1>
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
                <p className="text-gray-600 mt-3">{service.description}</p>
                <Link to={service.link} className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Xem Chi Tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
