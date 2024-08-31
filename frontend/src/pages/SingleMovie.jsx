import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import { Movies } from "../data/MovieData";
import MovieInfo from "../components/Single/MovieInfo";
import MovieCasts from "../components/Single/MovieCasts";
import MovieRates from "../components/Single/MovieRates";
import Titles from "../components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../components/Movie";
import ShareMovieModal from "../components/Modals/ShareMovieModal";

const SingleMovie = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { id } = useParams();
  const movie = Movies.find((movie) => movie.name === id);
  const relatedMovies = Movies.filter((m) => (m.category = movie.category));

  return (
    <Layout>
      <ShareMovieModal
        modalOpen={shareModalOpen}
        setModalOpen={setShareModalOpen}
        movie={movie}
      />
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieInfo movie={movie} setModalOpen={setShareModalOpen} />
      </div>
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts />
        <MovieRates movie={movie} />
        <div className="my-16">
          <Titles title="Related Movies" Icon={BsCollectionFill} />
          <div className="grid mt-6 sm:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {relatedMovies.slice(0, 4)?.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleMovie;
