import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Loader from "../Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { likeMovie, useIsLiked } from "../../context/Functionalities";

const Banner = ({ movies, isLoading }) => {
  const dispatch = useDispatch();
  const { isLoading: addFavoriteLoading } = useSelector(
    (state) => state.addFavoriteMovie
  );
  const { auth } = useSelector((state) => state.userLogin);

  const { isLiked } = useIsLiked();

  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className="w-full xl:h-96 bg-dry lg:h-64 h-48">
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <Swiper
          direction="horizontal"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1000}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="w-full xl:h-96 bg-dry lg:h-64 h-48"
        >
          {movies.map((movie, index) => (
            <SwiperSlide
              key={index}
              className="relative rounded overflow-hidden"
            >
              <img
                src={
                  movie?.posterUrl ? movie?.posterUrl : `/images/movies/1.jpg`
                }
                alt={movie?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute linear-bg top-0 bottom-0 right-0 left-0 pl-8 sm:pl-32 xl:pl-52 flex flex-col justify-center gap-4 lg:gap-5 xl:gap-8">
                <h1 className="font-sans truncate capitalize text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                  {movie?.title}
                </h1>
                <div className="flex justify-start items-center gap-5 text-dryGray">
                  <FlexMovieItems movie={movie} />
                </div>
                <div className="flex items-center gap-5">
                  <Link
                    to={`/movie/${movie?.id}`}
                    className="bg-subMain px-8 py-3 rounded font-medium text-xs sm:text-sm text-white hover:text-main transitions"
                  >
                    Watch
                  </Link>
                  <button
                    onClick={() => likeMovie(movie, dispatch, auth)}
                    disabled={isLiked(movie) || addFavoriteLoading}
                    className={`bg-white px-3 py-3 rounded font-medium text-sm bg-opacity-30 hover:text-subMain transitions 
                      ${isLiked(movie) ? "text-subMain" : "text-white"}
                      `}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="w-full flex-colo gap-6 xl:h-96 lg:h-64 h-48">
          <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">No movies has found</p>
        </div>
      )}
    </div>
  );
};

export default Banner;
