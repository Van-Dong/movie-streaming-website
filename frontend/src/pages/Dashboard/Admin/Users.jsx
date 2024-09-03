import Sidebar from "../Sidebar";
import UserTable from "../../../components/UserTable";
import { UserData } from "../../../data/UserData";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteUserAction,
  adminGetAllUsersAction,
} from "../../../redux/actions/userActions";
import { useEffect } from "react";
import Loader from "../../../components/Notifications/Loader";
import Empty from "../../../components/Notifications/Empty";

const Users = () => {
  const { isLoading, users } = useSelector((state) => state.adminGetAllUsers);
  const dispatch = useDispatch();

  const handleDeleteUser = (id) => {
    window.confirm("Are you sure you want delete this user ?") &&
      dispatch(adminDeleteUserAction(id));
  };

  useEffect(() => {
    dispatch(adminGetAllUsersAction());
  }, [dispatch]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-xl">Users</h2>
        {isLoading ? (
          <Loader />
        ) : users.length > 0 ? (
          <UserTable data={users} onDelete={handleDeleteUser} />
        ) : (
          <Empty message="You have no user" />
        )}
      </div>
    </Sidebar>
  );
};

export default Users;
