import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text =
  "max-w-48 text-xs text-left leading-6 whitespace-nowrap px-5 py-3 overflow-hidden truncate";
const Row = ({ movie, onDelete }) => {
  return (
    <tr>
      <td className={`${Text}`}>
        <div className="w-12 h-12 p-1 bg-dry border border-border rounded overflow-hidden">
          <img
            className="h-full w-full rounded object-cover"
            src={movie?.posterUrl ? movie.posterUrl : `/images/movies/1.jpg`}
            alt={movie?.title}
          />
        </div>
      </td>
      <td className={`${Text}`}>{movie?.title}</td>
      <td className={`${Text}`}>{movie?.description}</td>
      <td className={`${Text}`}>
        {movie?.genres
          ? movie?.genres.map((genre) => genre.name).join(", ")
          : ""}
      </td>
      <td className={`${Text}`}>{movie?.producingCountry}</td>
      <td className={`${Text}`}>{movie?.yearOfRelease}</td>
      <td className={`${Text}`}>
        {movie?.duration ? `${movie?.duration} minutes` : ""}
      </td>
      <td className={`${Text}`}>
        <div className="float-right flex gap-2 items-center">
          <Link
            to={`/movie/${movie?.id}`}
            className="text-sm bg-subMain text-white p-2 rounded-full hover:bg-opacity-70 transitions"
          >
            <GoEye />
          </Link>
          <button className="flex gap-2 items-center bg-dry border border-border rounded px-2 py-1 hover:opacity-70 transitions">
            Edit
            <FaEdit className="text-green-600" />
          </button>
          <button
            onClick={() => onDelete(movie?.id)}
            className="bg-subMain p-1.5 rounded text-base text-white hover:bg-opacity-70 transitions"
          >
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

const MovieTable = ({ data, onDelete }) => {
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
              Description
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Producing Country
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Duration
            </th>
            <th scope="col" className={`${Head} text-right`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((item, index) => (
            <Row key={index} movie={item} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
