import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-xs text-left leading-6 whitespace-nowrap px-5 py-3";
const Rows = (movie, key, admin) => {
  return (
    <tr key={key}>
      <td className={`${Text}`}>
        <div className="w-12 h-12 p-1 bg-dry border border-border rounded overflow-hidden">
          <img
            className="h-full w-full rounded-full object-contain"
            src={`/images/movies/${movie.image}`}
            alt={movie?.name}
          />
        </div>
      </td>
      <td className={`${Text}`}>{movie.name}</td>
      <td className={`${Text}`}>{movie.category}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.year}</td>
      <td className={`${Text}`}>{movie.time}</td>
      <td className={`${Text}`}>
        <div className="float-right flex gap-2 items-center">
          {admin && (
            <button className="flex-rows gap-2 bg-dry border border-border rounded text-border py-1 px-2 ">
              Edit <FaEdit className="text-green-600" />
            </button>
          )}
          <Link
            to={`/movie/${movie.name}`}
            className="text-sm bg-subMain text-white p-2 rounded-full hover:bg-opacity-70 transitions"
          >
            <GoEye />
          </Link>
          <button className="bg-subMain p-1.5 rounded text-base text-white hover:bg-opacity-70 transitions">
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Table = ({ data, admin }) => {
  return (
    <div className="overflow-x-auto overflow-hidden w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-right`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((item, index) => Rows(item, index, admin))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
