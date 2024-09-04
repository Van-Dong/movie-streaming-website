import React from "react";
import Titles from "../Titles";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

const MovieCrews = ({ title, icon, data }) => {
  return (
    <div className="my-12">
      <Titles title={title} Icon={icon} />
      <div className="mt-10">
        {data?.length > 0 ? (
          <Swiper
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            loop={true}
            speed={1000}
            module={[Autoplay]}
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {data?.map((cast, index) => (
              <SwiperSlide key={index}>
                <div className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
                  <img
                    src={
                      cast?.portraitUrl ? cast?.portraitUrl : "/images/404.svg"
                    }
                    alt={cast?.name}
                    className="w-full h-64 object-cover rounded mb-2"
                  />
                  <p>{cast?.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MovieCrews;
