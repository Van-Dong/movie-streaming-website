import PropTypes from "prop-types";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const FlexMovieItems = ({ movie }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-dryGray">
          {movie.category}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium text-dryGray">{movie.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegClock className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium text-dryGray">{movie.time}</span>
      </div>
    </>
  );
};

FlexMovieItems.propTypes = {
  movie: PropTypes.object,
};

export default FlexMovieItems;
