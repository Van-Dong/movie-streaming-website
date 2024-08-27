import React from "react";
import Titles from "../Titles";
import { FaRegBookmark } from "react-icons/fa";
import { BsBookmarkStarFill } from "react-icons/bs";

const MovieRates = ({ movie }) => {
  return (
    <div className="my-12">
      <Titles title="Casts" Icon={BsBookmarkStarFill} />
    </div>
  );
};

export default MovieRates;
