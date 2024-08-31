import React from "react";
import Sidebar from "./Sidebar";
import { Input } from "../../components/UserInputs";

const Password = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-xl">Change Password</h2>
        <Input
          label="Previous password"
          type="password"
          placeholder="******"
          bg={true}
        />
        <Input
          label="New password"
          type="password"
          placeholder="******"
          bg={true}
        />
        <Input
          label="Confirm new password"
          type="password"
          placeholder="******"
          bg={true}
        />
        <div className="flex justify-center sm:justify-end mt-2">
          <button className="bg-main px-6 py-3 border-2 border-subMain rounded-md text-white hover:bg-subMain transitions">
            Change Password
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default Password;
