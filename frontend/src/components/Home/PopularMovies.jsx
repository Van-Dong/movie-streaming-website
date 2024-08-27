import React from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import { Movies } from "./../../data/MovieData";
import Movie from "../Movie";

const PopularMovies = () => {
  return (
    <div className="my-16">
      <Titles title={"Popular Movies"} Icon={BsCollectionFill} />
      <div className="grid mt-6 sm:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {Movies.slice(0, 8).map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
