import axios from "axios";
import { environment } from "../environments/environment";
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

export const signMCheckAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}sign_m`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const signUpCheckAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}sign_check`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getSingleProductAPI = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}product?id=${id}`
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const postAddressAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}address`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const contactUsAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}contact`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const orderDataPostAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}order_data`,
      payload
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
