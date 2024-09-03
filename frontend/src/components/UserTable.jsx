import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Head = "text-left text-sm text-main font-semibold uppercase px-6 py-3";
const Text = "text-left text-sm text-white leading-6 px-5 py-2";

const Row = ({ item, index, onDelete }) => {
  return (
    <tr>
      <td className={`${Text}`}>{index}</td>
      <td className={`${Text}`}>{item.username}</td>
      <td className={`${Text}`}>{item.firstName}</td>
      <td className={`${Text}`}>{item.lastName}</td>
      <td className={`${Text}`}>{item.email}</td>
      <td className={`${Text}`}>{item.roles.length == 0 ? "User" : "Admin"}</td>
      <td className={`${Text}`}>{item.dob}</td>
      <td className={`${Text}`}>
        <div className="float-right flex items-center gap-2">
          <button className="flex gap-2 items-center bg-dry border border-border rounded px-2 py-1 hover:opacity-70 transitions">
            Edit
            <FaEdit className="text-green-600" />
          </button>
          {item.roles.length == 0 && (
            <button
              onClick={() => onDelete(item.id)}
              className="bg-subMain text-white text-base w-7 h-7 rounded-md flex-colo hover:bg-opacity-70 transitions"
            >
              <MdDelete />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const UserTable = ({ data, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto overflow-hidden">
      <table className="w-full table-auto border border-border ">
        <thead>
          <tr className="bg-dryGray">
            <th className={`${Head}`}>STT</th>
            <th className={`${Head}`}>Username</th>
            <th className={`${Head}`}>First Name</th>
            <th className={`${Head}`}>Last Name</th>
            <th className={`${Head}`}>Email</th>
            <th className={`${Head}`}>Type Account</th>
            <th className={`${Head}`}>Date of Birth</th>
            <th className={`${Head} text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((item, index) => (
            <Row item={item} key={index} index={index} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
