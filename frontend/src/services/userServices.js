import Axios from "./api";

// register new user API call
const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// logout user
const logoutService = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("userInfo");
  return null;
};

// login user API call
const loginService = async (user) => {
  const { data } = await Axios.post("/auth/token", user);
  if (data) {
    localStorage.setItem("auth", JSON.stringify(data.result));
  }
  return data;
};

// refresh token API call
const refreshTokenService = async (token) => {
  const { data } = await Axios.post("/auth/refresh", token);
  if (data) {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        accessToken: data.token,
        tokenType: data.tokenType,
        refreshToken: token.token,
      })
    );
  }
  return data;
};

const getProfile = async () => {
  const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;
  if (auth) {
    const { data } = await Axios.get("/api/user/profile");
    localStorage.setItem("userInfo", JSON.stringify(data.result));
    return data;
  }
  return null;
};

export {
  registerService,
  loginService,
  logoutService,
  refreshTokenService,
  getProfile,
};
