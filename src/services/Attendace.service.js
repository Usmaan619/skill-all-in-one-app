// attendance

import { environment } from "../environments/environment";
import { axiosInstance } from "../axios/interceptor";

export const addAttendanceAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment.apiUrl}attendance/mark`,
      payload
    );

    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getAttendanceAPI = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment.apiUrl}attendance/get`
    );

    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
