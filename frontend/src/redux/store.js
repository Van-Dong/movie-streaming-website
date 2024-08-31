import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as user from "./reducers/userReducers";

const rootReducer = combineReducers({
  userLogin: user.userLoginReducer,
  userRegister: user.userRegisterReducer,
  userDetail: user.userDetailReducer,
  userUpdateProfile: user.userUpdateProfileReducer,
  userChangePassword: user.userChangePasswordReducer,
  userDeleteAccount: user.userDeleteAccountReducer,
});

const authInfoFromStorage = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { auth: authInfoFromStorage },
  userDetail: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: true,
});
