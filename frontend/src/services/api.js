import axios from "axios";
import { refreshTokenService } from "./userServices";

const Axios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3000, // Quá 5s thì trả về lỗi
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null;
    if (token?.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, originConfig } = error;

    if (response && response.status == 401) {
      const auth = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : null;

      if (auth?.refreshToken) {
        try {
          const data = await refreshTokenService({ token: auth.refreshToken });
          originConfig.headers.Authorization = `Bearer ${data.token}`;
          return axios(originConfig);
        } catch (refreshError) {
          // Handle the refresh token failure
          localStorage.removeItem("auth");
          localStorage.removeItem("userInfo");

          // Optionally redirect to login or handle as needed
          return Promise.reject(refreshError);
        }
      }

      // localStorage.removeItem("auth");
      // localStorage.removeItem("userInfo");
      // Nên để cho chỗ ErrorHandler hay để ở đây ?
    }
    return Promise.reject(error);
  }
);

export default Axios;
