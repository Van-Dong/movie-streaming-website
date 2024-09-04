import { useEffect } from "react";
import Sidebar from "../Sidebar";
import FavoriteTable from "../../../components/FavoriteTable";
import { Movies } from "../../../data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieByIdAction,
  getAllMoviesAction,
} from "../../../redux/actions/movieActions";
import Loader from "../../../components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import MovieTable from "../../../components/MovieTable";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const MovieList = () => {
  const { isLoading, isSuccess, movies, page } = useSelector(
    (state) => state.movieGetAll
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!isSuccess) {
    //   dispatch(getAllMoviesAction({}));
    // }
    dispatch(getAllMoviesAction({}));
  }, [dispatch]);

  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        page: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        page: page - 1,
      })
    );
  };

  const handleDelete = (id) => {
    window.confirm("You are sure you want delete this movie ?") &&
      dispatch(deleteMovieByIdAction(id));
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">Movies</h2>
          <button className="bg-main px-4 py-2 border-2 border-subMain rounded-md text-sm text-white hover:bg-subMain transitions">
            Delete All
          </button>
        </div>
        {/* <Table data={Movies} admin={true} /> */}
        {isLoading ? (
          <div className="w-full flex-colo gap-6 min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <MovieTable data={movies} onDelete={handleDelete} />
        ) : (
          <div className="w-full flex-colo gap-6 min-h-screen">
            <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">No movies has found</p>
          </div>
        )}
      </div>
      <div className="w-full flex-rows gap-6 md:my-20 my-10">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain disabled:hover:bg-main"
        >
          <TbPlayerTrackPrev className="text-xl" />
        </button>
        <button
          onClick={nextPage}
          disabled={movies?.length < 1}
          // disabled={movies?.length < 10}
          className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain disabled:hover:bg-main"
        >
          <TbPlayerTrackNext className="text-xl" />
        </button>
      </div>
    </Sidebar>
  );
};

export default MovieList;
