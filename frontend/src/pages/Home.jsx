import Layout from "../layout/Layout";
import Banner from "../components/Home/Banner";
import PopularMovies from "../components/Home/PopularMovies";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/TopRated";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMoviesAction,
} from "../redux/actions/movieActions";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading: randomLoading, movies: randomMovies } = useSelector(
    (state) => state.movieGetRandom
  );
  const { isLoading: topRatedLoading, movies: topRatedMovies } = useSelector(
    (state) => state.movieGetTopRated
  );
  const { isLoading, movies } = useSelector((state) => state.movieGetAll);

  useEffect(() => {
    dispatch(getRandomMoviesAction());
    dispatch(getTopRatedMoviesAction());
    dispatch(getAllMoviesAction());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topRatedMovies} isLoading={topRatedLoading} />
      </div>
    </Layout>
  );
};

export default Home;
