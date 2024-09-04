import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../components/Single/MovieInfo";
import MovieCrews from "../components/Single/MovieCrews";
import Titles from "../components/Titles";
import { BsBookmarkStarFill, BsCollectionFill } from "react-icons/bs";
import Movie from "../components/Movie";
import ShareMovieModal from "../components/Modals/ShareMovieModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getMovieByIdAction,
} from "../redux/actions/movieActions";
import Loader from "../components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import MovieComments from "../components/Single/MovieComments";

const SingleMovie = () => {
  const { id } = useParams();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const dispatch = useDispatch();

  // const movie = Movies.find((movie) => movie.name === id);
  // const relatedMovies = Movies.filter((m) => (m.category = movie.category));

  const { isLoading, movie, isError } = useSelector(
    (state) => state.movieGetById
  );
  const { isLoading: moviesLoading, movies } = useSelector(
    (state) => state.movieGetAll
  ); // dùng cho related movie

  useEffect(() => {
    dispatch(getMovieByIdAction(id));
    dispatch(getAllMoviesAction());
  }, [dispatch]);
  // console.log(movie);

  return (
    <Layout>
      {isLoading ? (
        <div className="w-full flex-colo gap-6 min-h-screen">
          <Loader />
        </div>
      ) : movie ? (
        <>
          <ShareMovieModal
            modalOpen={shareModalOpen}
            setModalOpen={setShareModalOpen}
            movie={movie}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieInfo movie={movie} setModalOpen={setShareModalOpen} />
          </div>
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCrews
              title="Casts"
              icon={FaUserFriends}
              data={movie?.characters}
            />
            <MovieCrews
              title="Directors"
              icon={BsBookmarkStarFill}
              data={movie?.directors}
            />
            <MovieComments movieId={movie?.id} />
            <div className="my-16">
              <Titles title="Related Movies" Icon={BsCollectionFill} />
              {moviesLoading ? (
                <Loader />
              ) : movies?.length > 0 ? (
                <div className="grid mt-6 sm:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {movies?.slice(0, 4)?.map((movie, index) => (
                    <Movie key={index} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="w-full flex-colo gap-6 min-h-64">
                  <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
                    <RiMovie2Line />
                  </div>
                  <p className="text-border text-sm">Movie not found</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex-colo gap-6 min-h-screen">
          <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">{isError}</p>
        </div>
      )}
    </Layout>
  );
};

export default SingleMovie;
