import { config } from "../config/config";
import axios from "axios";


const API_URL = config.app.BASE_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // No errors, return response
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and retry hasn't happened
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      console.log("Access token expired. Attempting to refresh...");

      try {
        // Call the refresh token endpoint
        await axios.post(
          `${API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        await new Promise((resolve) => setTimeout(resolve, 100)); 
        // Retry the original request after refreshing the access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        clearPersistData("persist:auth");
        window.location.href = "/login"; // Redirect to login if refresh fails
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 403 ) {
      
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/login"; 
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
