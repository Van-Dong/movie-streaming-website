import React from "react";
import Sidebar from "../Sidebar";
import UserTable from "../../../components/UserTable";
import { UserData } from "../../../data/UserData";

const Users = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-xl">Users</h2>
        <UserTable data={UserData} />
      </div>
    </Sidebar>
  );
};

export default Users;
