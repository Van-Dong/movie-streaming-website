import PropTypes from "prop-types";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const FlexMovieItems = ({ movie }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-dryGray">
          {movie.genres.length > 0 ? movie.genres[0].name : ""}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium text-dryGray">
          {movie.yearOfRelease}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegClock className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium text-dryGray">
          {movie.duration} min
        </span>
      </div>
    </>
  );
};

FlexMovieItems.propTypes = {
  movie: PropTypes.object,
};

export default FlexMovieItems;
