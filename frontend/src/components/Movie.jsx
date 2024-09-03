import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <div className="border border-border rounded overflow-hidden p-1 hover:scale-95 transitions relative">
      <Link to={`/movie/${movie?.id}`} className="w-full">
        <img
          src={movie?.posterUrl ? movie.posterUrl : `/images/movies/1.jpg`}
          alt={movie?.title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="absolute bottom-0 right-0 left-0 flex justify-between items-center bg-main bg-opacity-60 text-white px-4 py-3">
        <h3 className="font-semibold truncate">{movie?.title}</h3>
        <button className="p-3 bg-subMain text-white rounded-md border-2 border-subMain hover:bg-transparent">
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default Movie;
