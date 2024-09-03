import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import Layout from "../layout/Layout";
import Filters from "../components/Filters";
import { Movies } from "../data/MovieData";
import Movie from "../components/Movie";
import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../redux/actions/categoryActions";
import { getAllMoviesAction } from "../redux/actions/movieActions";
import { RiMovie2Line } from "react-icons/ri";
import Loader from "../components/Notifications/Loader";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { CountriesData, RatesData, YearData } from "../data/FiltersData";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const { search } = useParams();
  const [category, setCategory] = useState({ name: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [country, setCountry] = useState(CountriesData[0]);
  const [rates, setRates] = useState(RatesData[0]);

  const { isSuccess: categorySuccess, categories } = useSelector(
    (state) => state.categoryGetAll
  );
  const { isLoading, isSuccess, movies, page } = useSelector(
    (state) => state.movieGetAll
  );
  const dispatch = useDispatch();

  const queries = useMemo(() => {
    const params = {
      genreId: category?.name === "All Categories" ? "" : category?.id,
      producingCountry:
        country?.name === CountriesData[0].name ? "" : country?.name,
      yearOfRelease:
        year?.name === YearData[0].name ? "" : year?.name.slice(0, 4),
      title: search ? search : "",
    };
    return params;
  }, [category, country, year, search]); // title note state

  useEffect(() => {
    if (!categorySuccess) {
      dispatch(getAllCategoriesAction());
    }

    dispatch(getAllMoviesAction(queries));
    // if (!isSuccess) {
    //   dispatch(getAllMoviesAction({}));
    // }
  }, [dispatch, queries]);

  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        page: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        page: page - 1,
      })
    );
  };

  const data = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    year: year,
    setYear: setYear,
    country: country,
    setCountry: setCountry,
    rates: rates,
    setRates: setRates,
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 mb-6">
        <Filters data={data} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          items Found {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full flex-colo gap-6 min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <div className="grid mt-6 sm:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {movies?.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="w-full flex-colo gap-6 min-h-screen">
            <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">No movies has found</p>
          </div>
        )}

        {/* Loading More */}
        {/* <div className="w-full flex-colo md:my-20 my-10">
          <button
            onClick={handleLoadingMore}
            className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain"
            ref={(node) => {
              if (page >= Movies.length) node.remove();
            }}
          >
            Loading More <CgSpinner className="animate-spin" />
          </button>
        </div> */}

        <div className="w-full flex-rows gap-6 md:my-20 my-10">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain disabled:hover:bg-main"
          >
            <TbPlayerTrackPrev className="text-xl" />
          </button>
          <button
            onClick={nextPage}
            // disabled={movies?.length < 10}
            disabled={movies?.length < 1}
            className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain disabled:hover:bg-main"
          >
            <TbPlayerTrackNext className="text-xl" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

// MoviesPage.propTypes = {};

export default MoviesPage;
