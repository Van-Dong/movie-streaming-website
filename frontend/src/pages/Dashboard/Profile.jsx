import Uploader from "../../components/Uploader";
import Sidebar from "./Sidebar";
import { Input } from "./../../components/UserInputs";

const Profile = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <Uploader />
        <Input
          label="Username"
          type="text"
          placeholder="Enter new username"
          bg={true}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter new email"
          bg={true}
        />

        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          bg={true}
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          bg={true}
        />

        <div className="w-full flex gap-4 sm:flex-row flex-col-reverse justify-between mt-4">
          <button className="px-6 py-3 bg-subMain text-white text-base font-medium rounded-md hover:bg-main transitions">
            Delete Account
          </button>
          <button className="px-6 py-3 bg-main text-white text-base font-medium rounded-md border-2 border-subMain hover:bg-subMain transitions">
            Update Profile
          </button>
        </div>
      </div>
    </Sidebar>
  );
};
export default Profile;
