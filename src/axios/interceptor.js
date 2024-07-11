import axios from "axios";
import { getData } from "../services/Storage.service";
import { toastError } from "../services/Toaster.service";
import { SetLoader } from "../redux/actions/loader.action";
import { environment } from "../environments/environment";

let axiosInstance = axios.create({
  baseURL: environment.apiUrl,
});
const AxiosInterceptors = (dispatch) => {
  // Add a request interceptor

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getData("token");

      if (token) config.headers.Authorization = token;
      config.headers["Content-Type"] = "application/json";
      // instance.defaults.headers.common['Authorization'] = token;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      //
      // if (token) {
      //   setData(response.data.token);
      // }

      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    // function (error) {
    (error) => {
      if (!error?.response?.data?.success) {
        if (error?.response?.data?.message) {
          toastError(error?.response?.data?.message);
        }
        dispatch(SetLoader("loader", false));
      }

      return Promise.reject(error);

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // return Promise.reject(error);
    }
  );
  // instance.interceptors.request.clear(); // Removes interceptors from requests
  // instance.interceptors.response.clear(); // Removes interceptors from responses
};

export { axiosInstance, AxiosInterceptors };
