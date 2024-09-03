import axios from "axios";
import { clearStorage, getData, removeData } from "../services/Storage.service";
import { environment } from "../environments/environment";
import { toastError } from "../services/Toaster.service";
import { SetIsLoggedIn, SetToken } from "../redux/actions/action";

const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInterceptors = (dispatch) => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getData("token");
        if (token) {
          config.headers.Authorization = token;
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response, // Directly return response for successful requests
    async (error) => {
      const errorMessage = error?.response?.data?.message;

      const errorCode = error?.response?.data?.code;
      const errorCodes = error?.response?.data?.status;

      console.error("Interceptor Error:", errorMessage);

      if (errorMessage === "Please login." && errorCode === "401") {
        dispatch(SetIsLoggedIn(false));
        dispatch(SetToken(null));
        await removeData("token");
        await removeData("employeeId");
        toastError("Please Login");
      } else if (!error?.response?.data?.success && errorMessage) {
        toastError(errorMessage);
      }

      return Promise.reject(error);
    }
  );
};

export { axiosInstance, AxiosInterceptors };
