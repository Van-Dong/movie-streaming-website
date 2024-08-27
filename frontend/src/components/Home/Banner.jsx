import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies } from "./../../data/MovieData";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative w-full">
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
        {Movies.slice(0, 6).map((movie, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={`/images/movies/${movie.image}`}
              alt={movie.titleImage}
              className="w-full h-full object-cover"
            />
            <div className="absolute linear-bg top-0 bottom-0 right-0 left-0 pl-8 sm:pl-32 xl:pl-52 flex flex-col justify-center gap-4 lg:gap-5 xl:gap-8">
              <h1 className="font-sans truncate capitalize text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                {movie.name}
              </h1>
              <div className="flex justify-start items-center gap-5 text-dryGray">
                <FlexMovieItems movie={movie} />
              </div>
              <div className="flex items-center gap-5">
                <Link
                  to={`/movie/${movie.name}`}
                  className="bg-subMain px-8 py-3 rounded font-medium text-xs sm:text-sm text-white hover:text-main transitions"
                >
                  Watch
                </Link>
                <button className="bg-white px-3 py-3 rounded font-medium text-sm text-white bg-opacity-30 hover:text-subMain transitions">
                  <FaHeart />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
