import * as userConstants from "../constants/userConstants";
import * as userApi from "../../services/userServices";
// import toast from "react-host-toast";
import { ErrorsAction } from "../ErrorHandler";

// login action
const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const { result } = await userApi.loginService(data);

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => async (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
  dispatch({ type: userConstants.USER_DETAIL_RESET });
};

// refresh action: vấn đề api.js cập nhật refresh vào localStorage nhưng chưa cập nhật vào redux ?
// Không cần thiết bởi ta có bao giờ lấy từ redux đâu

// get detail user action
const getDetailUserAction = () => async (dispatch) => {
  dispatch({ type: userConstants.USER_DETAIL_REQUEST });
  try {
    const response = await userApi.getProfile();
    dispatch({
      type: userConstants.USER_DETAIL_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DETAIL_FAIL);
  }
};

// Update profile user action
const updateProfileUserAction = (data) => async (dispatch) => {
  dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });

  try {
    const response = await userApi.updateProfile(data);
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response.result,
    });
    dispatch({
      type: userConstants.USER_DETAIL_SUCCESS,
      payload: response.result,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// user change password action
const userChangePasswordAction = (data) => async (dispatch) => {
  dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
  try {
    await userApi.changePassword(data);
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

// user delete account action
const userDeleteAccountAction = () => async (dispatch) => {
  dispatch({ type: userConstants.USER_DELETE_ACCOUNT_REQUEST });
  try {
    await userApi.deleteAccount();
    dispatch({ type: userConstants.USER_DELETE_ACCOUNT_SUCCESS });
    dispatch(logoutAction());
    dispatch({ type: userConstants.USER_DELETE_ACCOUNT_RESET });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_ACCOUNT_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  getDetailUserAction,
  updateProfileUserAction,
  userChangePasswordAction,
  userDeleteAccountAction,
};
