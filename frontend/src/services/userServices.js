import Axios from "./api";

// register new user API call
const registerService = async (user) => {
  const { data } = await Axios.post("/api/user/sign-up", user);
  return data?.result;
};

// logout user
const logoutService = async () => {
  const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;
  if (auth?.refreshToken) {
    try {
      await Axios.post("/auth/logout", { token: auth.refreshToken });
    } catch (error) {
      console.log(error);
    }
  }
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
        accessToken: data.result.token,
        tokenType: data.result.tokenType,
        refreshToken: token.token,
      })
    );
  }
  return data;
};

// Get profile api
async function getProfileService() {
  const { data } = await Axios.get("/api/user/profile");
  localStorage.setItem("userInfo", JSON.stringify(data.result));
  return data;
}

// Update profile api
const updateProfileService = async (updatedUser) => {
  const { data } = await Axios.put("/api/user/profile", updatedUser);
  localStorage.setItem("userInfo", JSON.stringify(data.result));
  return data;
};

// change password api
const changePasswordService = async (password) => {
  const { data } = await Axios.put("/api/user/newPassword", password);
  return data;
};

// delete account api
const deleteAccountService = async () => {
  const { data } = await Axios.post("/api/user/deleteAccount");
  return data;
};

// admin: get all users
const getAllUsersService = async () => {
  const { data } = await Axios.get("/api/admin/users");
  return data;
};

// admin: delete user
const deleteUserService = async (id) => {
  const { data } = await Axios.delete(`/api/admin/users/${id}`);
  return data;
};

export {
  registerService,
  loginService,
  logoutService,
  refreshTokenService,
  getProfileService,
  updateProfileService,
  changePasswordService,
  deleteAccountService,
  getAllUsersService,
  deleteUserService,
};
