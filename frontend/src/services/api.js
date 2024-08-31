import axios from "axios";
import { refreshTokenService } from "./userServices";

const Axios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3000, // Quá 5s thì trả về lỗi
});

const public_endpoint = [
  "/auth/refresh",
  "/auth/token",
  "/auth/logout",
  "/api/user/sign-up",
];

Axios.interceptors.request.use(
  (config) => {
    if (!public_endpoint.includes(config.url)) {
      const token = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : null;
      if (token?.accessToken) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshingToken = false;
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (
      response &&
      response.status == 401 &&
      !config.url.includes("/auth/token")
    ) {
      if (!isRefreshingToken) {
        isRefreshingToken = true;

        const auth = localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth"))
          : null;

        if (auth?.refreshToken) {
          try {
            const data = await refreshTokenService({
              token: auth.refreshToken,
            });
            console.log(config);
            config.headers.Authorization = `Bearer ${data.result.token}`;

            isRefreshingToken = false;
            return axios(config);
          } catch (refreshError) {
            // Handle the refresh token failure
            localStorage.removeItem("auth");
            localStorage.removeItem("userInfo");
            window.location.href = "/login";

            // Optionally redirect to login or handle as needed
            isRefreshingToken = false;
            return Promise.reject(refreshError);
          }
        } else {
          console.log("not forn refreshToken in auth");
          localStorage.removeItem("auth");
          localStorage.removeItem("userInfo");
          isRefreshingToken = false;
          // Nên để cho chỗ ErrorHandler hay để ở đây ?

          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
