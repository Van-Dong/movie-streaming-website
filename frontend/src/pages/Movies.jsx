import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Layout from "../layout/Layout";
import Filters from "../components/Filters";
import { Movies } from "../data/MovieData";
import Movie from "../components/Movie";
import { CgSpinner } from "react-icons/cg";

const MoviesPage = () => {
  const maxPage = 3;
  const [page, setPage] = useState(maxPage);
  const handleLoadingMore = () => {
    setPage(page + maxPage);
  };
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 mb-6">
        <Filters />
        <p className="text-lg font-medium my-6">
          Total <span className="font-bold text-subMain">{Movies?.length}</span>{" "}
          items Found
        </p>
        <div className="grid mt-6 sm:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {Movies.slice(0, page)?.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>

        {/* Loading More */}
        <div className="w-full flex-colo md:my-20 my-10">
          <button
            onClick={handleLoadingMore}
            className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain"
            ref={(node) => {
              if (page >= Movies.length) node.remove();
            }}
          >
            Loading More <CgSpinner className="animate-spin" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

// MoviesPage.propTypes = {};

export default MoviesPage;
