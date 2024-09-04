import { useEffect, useState } from "react";
import Layout from "./../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMovieUrlByIdAction } from "../redux/actions/movieActions";
import Loader from "../components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { addFavoriteMovieAction } from "../redux/actions/favoriteActions";
import toast from "react-hot-toast";
import { likeMovie, useIsLiked } from "../context/Functionalities";

const WatchPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, movie } = useSelector(
    (state) => state.movieGetUrl
  );

  const { isLiked } = useIsLiked();
  const { isLoading: addFavoriteLoading } = useSelector(
    (state) => state.addFavoriteMovie
  );
  const { auth } = useSelector((state) => state.userLogin);

  const [play, setPlay] = useState(false);

  const addFavorite = (movieId) => {
    if (auth?.refreshToken && movieId) {
      dispatch(addFavoriteMovieAction(movieId));
    } else {
      toast.error("Please login to add to favorites");
    }
  };

  useEffect(() => {
    dispatch(getMovieUrlByIdAction(id));
  }, [dispatch]);

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        {!isError && (
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <Link
                  to={movie?.id ? `/movie/${movie?.id}` : "/movies"}
                  className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
                >
                  <BiArrowBack />
                  {movie?.title}
                </Link>
                <div className="flex-btn sm:w-auto w-full gap-5">
                  <button
                    disabled={addFavoriteLoading || isLiked(movie)}
                    onClick={() => likeMovie(movie, dispatch, auth)}
                    className={`bg-white bg-opacity-30 hover:text-subMain transitions rounded px-4 py-3 text-sm ${
                      isLiked(movie) ? "text-subMain" : "text-white"
                    }`}
                  >
                    <FaHeart />
                  </button>
                  <button className="flex-rows gap-2 bg-subMain hover:text-black transitions rounded px-4 py-3 text-sm text-white">
                    <FaCloudDownloadAlt /> Download
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Watch video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-screen rounded">
            <source
              src={movie?.movieUrl}
              type="video/mp4"
              title={movie?.title}
            />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div>
                <Loader />
              </div>
            ) : isError ? (
              <div className="w-full flex-colo gap-6 min-h-screen bg-main">
                <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
                  <RiMovie2Line />
                </div>
                <p className="text-border text-sm">{isError}</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="flex-colo border border-subMain bg-white hover:text-main transitions text-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={
                    movie?.posterUrl
                      ? movie?.posterUrl
                      : "/images/image_default.webp"
                  }
                  alt={movie?.title}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/image_default.webp";
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WatchPage;
