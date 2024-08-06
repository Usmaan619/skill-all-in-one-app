import axios from "axios";
import { environment } from "../environments/environment";
import { setData } from "./Storage.service";
import { SetToken } from "../redux/actions/action";
import { axiosInstance } from "../axios/interceptor";

export const registerAPI = async (payload) => {
  try {
    return await axios.post(`${environment?.apiUrl}user/signUp`, payload);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const loginAPI = async (payload) => {
  try {
    const response = await axios.post(`${environment?.apiUrl}login`, payload);
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}product?id=${id}`
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
