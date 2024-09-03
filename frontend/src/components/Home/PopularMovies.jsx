import React from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import { Movies } from "./../../data/MovieData";
import Movie from "../Movie";
import Loader from "../Notifications/Loader";
import Empty from "../Notifications/Empty";

const PopularMovies = ({ movies, isLoading }) => {
  return (
    <div className="my-16">
      <Titles title={"Popular Movies"} Icon={BsCollectionFill} />

      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid mt-6 sm:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {movies.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <Empty message="No movie found" />
        </div>
      )}
    </div>
  );
};

export default PopularMovies;
