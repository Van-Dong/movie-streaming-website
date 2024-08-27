import React, { useState } from "react";
import Titles from "../Titles";
import {
  BsBookmarkStarFill,
  BsCaretLeft,
  BsCaretLeftFill,
  BsCaretRight,
  BsCaretRightFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Movies } from "./../../data/MovieData";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Stars";

const TopRated = () => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title={"Top Rated"} Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          direction="horizontal"
          navigation={{ prevEl, nextEl }}
          spaceBetween={40}
          autoplay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
        >
          {Movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="group p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden relative">
                <img
                  src={`/images/movies/${movie.image}`}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 px-4 hidden group-hover:flex transitions flex-col items-center justify-center gap-6">
                  <button className="w-12 h-12 flex-colo transitions bg-white bg-opacity-30 text-white hover:bg-subMain rounded-full">
                    <FaHeart />
                  </button>
                  <Link
                    to={`/movie/${movie.name}`}
                    className="font-semibold text-xl truncate line-clamp-2"
                  >
                    {movie.name}
                  </Link>
                  <div className="flex gap-2 text-star">
                    <Rating value={movie.rate} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
