import axios from "axios";
import { environment } from "../environments/environment";
import { axiosInstance } from "../axios/interceptor";
import { toastError } from "./Toaster.service";

export const registerAPI = async (payload) => {
  try {
    return await axios.post(`${environment?.apiUrl}user/signUp`, payload);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const loginAPI = async (payload) => {
  try {
    const response = await axios.post(
      `${environment?.apiUrl}emloyee/login`,
      payload
    );
    return response?.data;
  } catch (error) {
    if (!error?.response?.data?.success) {
      if (error?.response?.data?.message) {
        toastError(error?.response?.data?.message);
      }
      // dispatch(SetLoader("loader", false));
    }
  }
};

export const markAttendanceAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}attend/create`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error:markAttendanceAPI ", error);
  }
};

export const getAllAttendanceAPI = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}attend/getAllAttendance`
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const formatPrice = (price) => {
  if (!price) return "";
  // Remove commas and spaces, then convert to number
  const number = parseFloat(price.replace(/,/g, "").trim());
  // Check if it's a valid number
  return isNaN(number) ? price : number.toFixed(3);
};
