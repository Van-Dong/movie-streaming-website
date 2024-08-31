import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Head = "text-sm text-main font-semibold uppercase text-left px-6 py-2";
const Text = "text-sm text-white  leading-6 text-left px-5 py-2";

const Row = ({ item, onEditFunction }) => {
  return (
    <tr>
      <td className={`${Text}`}>{item._id}</td>
      <td className={`${Text}`}>{item.title}</td>
      <td className={`${Text}`}>
        <div className="float-right flex items-center gap-2">
          <button
            onClick={() => onEditFunction(item)}
            className="flex gap-2 items-center bg-dry border border-border rounded px-2 py-1 hover:opacity-70 transitions"
          >
            Edit
            <FaEdit className="text-green-600" />
          </button>
          <button className="bg-subMain text-white text-base w-7 h-7 rounded-md flex-colo hover:bg-opacity-70 transitions">
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

const CategoryTable = ({ data, onEditFunction }) => {
  return (
    <div className="overflow-x-auto overflow-hidden w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th className={`${Head}`}>ID</th>
            <th className={`${Head}`}>Title</th>
            <th className={`${Head} text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((item, index) => (
            <Row item={item} key={index} onEditFunction={onEditFunction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
