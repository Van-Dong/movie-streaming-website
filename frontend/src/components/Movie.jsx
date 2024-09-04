import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { likeMovie, useIsLiked } from "../context/Functionalities";
import { useDispatch, useSelector } from "react-redux";

const Movie = ({ movie }) => {
  const dispatch = useDispatch();
  const { isLiked } = useIsLiked();
  const { isLoading } = useSelector((state) => state.addFavoriteMovie);
  const { auth } = useSelector((state) => state.userLogin);
  return (
    <div className="border border-border rounded overflow-hidden p-1 hover:scale-95 transitions relative">
      <Link to={`/movie/${movie?.id}`} className="w-full">
        <img
          src={movie?.posterUrl ? movie.posterUrl : `/images/movies/1.jpg`}
          alt={movie?.title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="absolute bottom-0 right-0 left-0 flex justify-between items-center bg-main bg-opacity-60 text-white px-4 py-3">
        <h3 className="font-semibold truncate">{movie?.title}</h3>
        <button
          disabled={isLoading || isLiked(movie)}
          onClick={() => likeMovie(movie, dispatch, auth)}
          className={`p-3 text-white rounded-md border-2 border-subMain hover:bg-subMain ${
            isLiked(movie) ? "bg-subMain" : "bg-black/30"
          }`}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default Movie;
