import React, { useEffect, useLayoutEffect } from "react";
import Layout from "../layout/Layout";
import { Input } from "../components/UserInputs";
import { FiLogIn } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginValidation } from "../components/validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../components/Notifications/Error";
import { getDetailUserAction, loginAction } from "../redux/actions/userActions";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, auth } = useSelector(
    (state) => state.userLogin
  );

  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  // on submit
  const onSubmit = async (data) => {
    dispatch(loginAction(data));
  };

  useLayoutEffect(() => {
    // if (userInfo?.isAdmin) {
    //   navigate("/dashboard");
    // } else if (userInfo) {
    //   navigate("/profile");
    // }
    if (isSuccess) {
      toast.success(`welcome back to my website`);
    }

    if (auth) {
      navigate("/profile");
    }

    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [auth, isSuccess, isError, navigate, dispatch]);

  if (auth) return <Navigate to="/profile" />;

  return (
    <Layout>
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
              // name="username"
              register={register("username")}
              bg={true}
            />
            {errors.username && <InlineError text={errors.username.message} />}
          </div>
          {console.log("login page re-render")}
          <div className="w-full">
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              // name="password"
              register={register("password")}
              bg={true}
            />

            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-black flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <FiLogIn /> Sign In
              </>
            )}
          </button>
          <p className="text-center text-border">
            Don't have an account?
            <Link to="/register" className="text-dryGray font-semibold ml-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
