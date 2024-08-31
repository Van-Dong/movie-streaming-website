import React, { useLayoutEffect } from "react";
import Sidebar from "./Sidebar";
import { Input } from "../../components/UserInputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordValidation } from "../../components/validation/UserValidation";
import { InlineError } from "../../components/Notifications/Error";
import { userChangePasswordAction } from "../../redux/actions/userActions";
import toast from "react-hot-toast";
import * as userConstants from "../../redux/constants/userConstants";

const Password = () => {
  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.userChangePassword
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordValidation),
  });

  const onSubmit = (data) => {
    dispatch(userChangePasswordAction(data));
  };

  useLayoutEffect(() => {
    if (isSuccess) {
      toast.success("Change password successfully");
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
      setValue("oldPassword", "");
      setValue("newPassword", "");
      setValue("confirmNewPassword", "");
    }

    if (isError) {
      toast.error(isError);
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
    }
  }, [isSuccess, isError, dispatch, setValue]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-xl">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <Input
              label="Previous password"
              type="password"
              placeholder="******"
              register={register("oldPassword")}
              bg={true}
            />
            {errors.oldPassword && (
              <InlineError text={errors.oldPassword.message} />
            )}
          </div>
          <div className="w-full">
            <Input
              label="New password"
              type="password"
              placeholder="******"
              register={register("newPassword")}
              bg={true}
            />
            {errors.newPassword && (
              <InlineError text={errors.newPassword.message} />
            )}
          </div>
          <div className="w-full">
            <Input
              label="Confirm new password"
              type="password"
              placeholder="******"
              register={register("confirmNewPassword")}
              bg={true}
            />
            {errors.confirmNewPassword && (
              <InlineError text={errors.confirmNewPassword.message} />
            )}
          </div>
          <div className="flex justify-center sm:justify-end mt-2">
            <button
              type="submit"
              className="bg-main px-6 py-3 border-2 border-subMain rounded-md text-white hover:bg-subMain transitions"
            >
              {isLoading ? "...Loading" : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
};

export default Password;
