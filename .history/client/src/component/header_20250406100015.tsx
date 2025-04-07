import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
  userName: string | null;
};

const Header: React.FC<Props> = ({ isLoggedIn, userName, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="http://localhost:8000/images/logo.png"
              alt="Logo"
              className="w-[150px] h-[60px] md:w-[214px] md:h-[85px]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-500 transition">
            Trang chủ
          </Link>
          <Link to="/About" className="hover:text-blue-500 transition">
            Về chúng tôi
          </Link>
          <Link to="/Services" className="hover:text-blue-500 transition">
            Dịch vụ
          </Link>
          <Link to="/News" className="hover:text-blue-500 transition">
            Tin tức
          </Link>
          <Link to="/Contact" className="hover:text-blue-500 transition">
            Liên hệ
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenuAlt3 className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* User Account */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <FaUserCircle className="w-8 h-8 text-gray-700" />
              <span className="text-gray-700">{userName}</span>
              <button
                onClick={onLogout}
                className="text-sm text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-500 transition">
              Trang chủ
            </Link>
            <Link to="/About" className="hover:text-blue-500 transition">
              Về chúng tôi
            </Link>
            <Link to="/Services" className="hover:text-blue-500 transition">
              Dịch vụ
            </Link>
            <Link to="/News" className="hover:text-blue-500 transition">
              Tin tức
            </Link>
            <Link to="/Contact" className="hover:text-blue-500 transition">
              Liên hệ
            </Link>
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="text-sm text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;