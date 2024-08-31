import Uploader from "../../components/Uploader";
import Sidebar from "./Sidebar";
import { Input } from "./../../components/UserInputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileValidation } from "../../components/validation/UserValidation";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  updateProfileUserAction,
  userDeleteAccountAction,
} from "../../redux/actions/userActions";
import toast from "react-hot-toast";
import * as userConstants from "../../redux/constants/userConstants";
import { InlineError } from "../../components/Notifications/Error";
import Imagepreview from "../../components/Imagepreview";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userDetail);
  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.userUpdateProfile
  );

  const {
    isLoading: deleteLoading,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useSelector((state) => state.userDeleteAccount);
  const [imageUrl, setImageUrl] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileValidation),
  });

  const onSubmit = (data) => {
    dispatch(updateProfileUserAction(data));
  };

  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your account ?") &&
      dispatch(userDeleteAccountAction());
  };

  useLayoutEffect(() => {
    if (userInfo) {
      setValue("username", userInfo?.username);
      setValue("email", userInfo?.email);
      setValue("firstName", userInfo?.firstName);
      setValue("lastName", userInfo?.lastName);
    }

    if (isSuccess || deleteSuccess) {
      toast.success("Successfully");
      dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
    }

    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
      dispatch({ type: userConstants.USER_DELETE_ACCOUNT_RESET });
    }
  }, [
    userInfo,
    isSuccess,
    isError,
    deleteSuccess,
    deleteError,
    setValue,
    dispatch,
  ]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid lg:grid-cols-12 gap-6">
            <div className="col-span-10">
              <Uploader />
            </div>
            <div className="col-span-2">
              <Imagepreview
                imageUrl={imageUrl}
                name={userInfo ? userInfo.username : "portrait"}
              />
            </div>
          </div>

          <Input
            label="Username"
            type="text"
            register={register("username")}
            disabled={true}
            placeholder="Enter new username"
            bg={true}
          />

          <div className="w-full">
            <Input
              label="Email"
              type="email"
              register={register("email")}
              placeholder="Enter new email"
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>

          <div className="w-full">
            <Input
              label="First Name"
              type="text"
              register={register("firstName")}
              placeholder="Enter your first name"
              bg={true}
            />
            {errors.firstName && (
              <InlineError text={errors.firstName.message} />
            )}
          </div>

          <div className="w-full">
            <Input
              label="Last Name"
              type="text"
              register={register("lastName")}
              placeholder="Enter your last name"
              bg={true}
            />

            {errors.lastName && <InlineError text={errors.lastName.message} />}
          </div>

          <div className="w-full flex gap-4 sm:flex-row justify-between flex-col-reverse mt-4">
            <button
              type="button"
              onClick={deleteProfile}
              disabled={deleteLoading}
              className="px-6 py-3 bg-subMain text-white text-base font-medium rounded-md hover:bg-main transitions"
            >
              {deleteLoading ? "...Deleting" : "Delete Account"}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-main text-white text-base font-medium rounded-md border-2 border-subMain hover:bg-subMain transitions"
            >
              {isLoading ? "...Updating" : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
};
export default Profile;
