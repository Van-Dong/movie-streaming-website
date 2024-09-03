import toast from "react-hot-toast";
import { logoutAction } from "./actions/userActions";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    // dispatch(logoutAction());
  }
  toast.error(message);
  return dispatch({ type: action, payload: message });
};
