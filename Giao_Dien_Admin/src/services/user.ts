import axios from "../config/axios";
import api from "../config/axios";
import { FormUser, IUser, User } from "../interface/user";
import { UserStatus } from "../interface/userStatus";

export const GetAllUsers = async () => {
  try {
    const { data } = await api.get("/api/users");
    // console.log("Fetched data from API:", data); // Kiểm tra cấu trúc dữ liệu trả về
    return data[0]; // Trả về mảng dữ liệu trực tiếp (không cần lấy [0])
  } catch (error) {
    console.error("Error fetching users from API:", error); // Log lỗi nếu có
    throw new Error("Error fetching users");
  }
};

export const SearchUser = async (criteria: { name?: string; email?: string }) => {
  try {
    const { data } = await api.post(`/api/user/search`, criteria, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data.data; // Trả về mảng người dùng
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error("Lỗi tìm kiếm người dùng");
  }
};

export const GetUserByID = async (id: number | string) => {
  try {
    const { data } = await api.get(`/api/users/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};

export const LoginUser = async (UserData: IUser) => {
  try {
    const { data } = await api.post(`login`, UserData);
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};
export const UpdateUser = async (UserData: FormUser, id: number | string) => {
  try {
    const { data } = await api.put(`api/users/${id}`, UserData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};

// Hàm cập nhật trạng thái người dùng
export const Updatestatus = async (id: number | string, status: UserStatus) => {
  try {
    const { data } = await api.put(
      `api/users/${id}/status`,
      { status }, // Body của request
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lỗi cập nhật trạng thái');       
  }
};


export const loginUser = async (email: string, password: string): Promise<User> => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
