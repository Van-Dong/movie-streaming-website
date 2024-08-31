import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { Input } from "../components/UserInputs";
import { FiLogIn } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../components/validation/UserValidation";
import { InlineError } from "../components/Notifications/Error";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../redux/actions/userActions";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userRegister
  );

  const { auth } = useSelector((state) => state.userLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
  });

  const onSubmit = (data) => {
    const newData = { ...data };
    delete newData.confirmPassword;
    dispatch(registerAction(newData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register success!");
      navigate("/login");
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  });

  if (auth) {
    return <Navigate to="/profile" />;
  }

  return (
    <Layout>
      {console.log("Error: ", errors)}
      {console.log("re-render")}
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 md:w-3/5 gap-8 flex flex-col p-14 bg-dry rounded-lg border border-border"
        >
          <img
            src="/images/logo.svg"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <div className="w-full">
            <Input
              label="Username"
              placeholder="Enter your username"
              type="text"
              register={register("username")}
              bg={true}
            />
            {errors.username && <InlineError text={errors.username.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              register={register("email")}
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              register={register("password")}
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Confirm Password"
              placeholder="Enter your password"
              type="password"
              register={register("confirmPassword")}
              bg={true}
            />
            {errors.confirmPassword && (
              <InlineError text={errors.confirmPassword.message} />
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-black flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {isLoading ? (
              "...Loading"
            ) : (
              <>
                <FiLogIn /> Sign up
              </>
            )}
          </button>
          <p className="text-center text-border">
            Already have an account?
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
