import { useDispatch, useSelector } from "react-redux";
import FavoriteTable from "../../components/FavoriteTable";
import Sidebar from "./Sidebar";
import {
  deleteAllFavoriteMoviesAction,
  deleteFavoriteMovieAction,
  getFavoriteMoviesAction,
} from "../../redux/actions/favoriteActions";
import { useEffect } from "react";
import Loader from "../../components/Notifications/Loader";
import Empty from "../../components/Notifications/Empty";

const FavoriteMovies = () => {
  const { isLoading, linkedMovies } = useSelector(
    (state) => state.getFavoriteMovies
  );

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    window.confirm("Are you sure you want to delete favorite movie ?") &&
      dispatch(deleteFavoriteMovieAction(id));
  };

  const handleDeleteAll = () => {
    window.confirm("Are you sure you want to delete all favorite movie ?") &&
      dispatch(deleteAllFavoriteMoviesAction());
  };

  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
  }, [dispatch]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">Favorite Movies</h2>
          <button
            onClick={handleDeleteAll}
            className="bg-main px-4 py-2 border-2 border-subMain rounded-md text-sm text-white hover:bg-subMain transitions"
          >
            Delete All
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : linkedMovies.length > 0 ? (
          <FavoriteTable data={linkedMovies} onDelete={handleDelete} />
        ) : (
          <Empty message="You have no favorite movies" />
        )}
      </div>
    </Sidebar>
  );
};

export default FavoriteMovies;
