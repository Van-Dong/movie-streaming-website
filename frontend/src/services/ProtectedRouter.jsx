import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// auth router
export const ProtectedRouter = () => {
  const { auth } = useSelector((state) => state.userLogin);

  return auth?.refreshToken ? <Outlet /> : <Navigate to="/login" />;
};

// admin router
export const AdminProtectedRouter = () => {
  const { auth } = useSelector((state) => state.userLogin);
  const { userInfo } = useSelector((state) => state.userDetail);
  return auth?.refreshToken ? (
    userInfo?.roles.some((role) => role.name === "ADMIN") ? (
      <Outlet />
    ) : (
      <Navigate to="/*" />
    )
  ) : (
    <Navigate to="/login" />
  );
};
