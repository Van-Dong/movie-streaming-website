import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { addFavoriteMovieAction } from "../redux/actions/favoriteActions";

// Movie is liked ??
export const useIsLiked = () => {
  const { linkedMovies } = useSelector((state) => state.getFavoriteMovies);
  const isLiked = (movie) => {
    return linkedMovies?.some((m) => m?.movie?.id === movie.id);
  };
  return { isLiked };
};

// like movie function
export const likeMovie = (movie, dispatch, auth) => {
  return auth?.refreshToken && movie?.id
    ? dispatch(addFavoriteMovieAction(movie.id))
    : toast.error("Please login to add to favorites");
};
