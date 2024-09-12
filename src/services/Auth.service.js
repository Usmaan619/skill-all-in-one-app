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

export const adminLoginAPI = async (payload) => {
  try {
    const response = await axios.post(
      `${environment?.apiUrl}user/login`,
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

export const checkOuAttendanceAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}attend/updateAttendanceTimeOut`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error:markAttendanceAPI ", error);
  }
};

export const updateEmployeeAPI = async (id, payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}emloyee/updateEmployee/${id}`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error:updateEmployeeAPI ", error);
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

export const getAllEmployeeAPI = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}emloyee/getAllEmployees`
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getEmployeeByIdAPI = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}emloyee/getEmployeeById/${id}`
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getFilteredAttendanceAPI = async (year, month, id) => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}attend/getFilteredAttendance?year=${year}&month=${month}&employeeId=${id}`
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// export const getAllAttendanceAPI = () => {
//   return async dispatch => {
//     try {
//       dispatch(SetLoader('loader', true));
//       const response = await axiosInstance.get(
//         `${environment.apiUrl}attend/getAllAttendance`,
//       );
//       dispatch(SetLoader('loader', false));
//       return response?.data?.data;
//     } catch (error) {
//       dispatch(SetLoader('loader', false));
//       return error?.response?.data;
//     }
//   };
// };

export const formatPrice = (price) => {
  if (!price) return "";
  // Remove commas and spaces, then convert to number
  const number = parseFloat(price.replace(/,/g, "").trim());
  // Check if it's a valid number
  return isNaN(number) ? price : number.toFixed(3);
};
