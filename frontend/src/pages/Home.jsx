import React, { useLayoutEffect } from "react";
import Layout from "../layout/Layout";
import Banner from "../components/Home/Banner";
import PopularMovies from "../components/Home/PopularMovies";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/TopRated";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    navigate("/profile");
  }, []);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner />
        <PopularMovies />
        <Promos />
        <TopRated />
      </div>
    </Layout>
  );
};

export default Home;
