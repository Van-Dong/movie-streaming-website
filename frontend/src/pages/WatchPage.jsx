import React, { useEffect, useState } from "react";
import Layout from "./../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Movies } from "../data/MovieData";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { BsPlayBtn, BsPlayBtnFill } from "react-icons/bs";

const WatchPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = Movies.find((movie) => movie.name === id);
  useEffect(() => {
    if (!movie) {
      navigate("/not-found");
    }
  });
  const [play, setPlay] = useState(false);
  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <Link
            to={`/movie/${movie?.name}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack />
            {movie?.name}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button className="bg-white bg-opacity-30 hover:text-subMain transitions rounded px-4 py-3 text-sm text-white">
              <FaHeart />
            </button>
            <button className="flex-rows gap-2 bg-subMain hover:text-subMain hover:text-black transitions rounded px-4 py-3 text-sm text-white">
              <FaCloudDownloadAlt /> Download
            </button>
          </div>
        </div>

        {/* Watch video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-screen rounded">
            <source
              src="/images/movie.mp4"
              type="video/mp4"
              title={movie?.name}
            />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
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
                movie?.image
                  ? `/images/movies/${movie.image}`
                  : "/images/image_default.webp"
              }
              alt={movie?.image}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/image_default.webp";
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WatchPage;
