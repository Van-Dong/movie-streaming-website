import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import MoviesPage from "./pages/Movies";
import SingleMovie from "./pages/SingleMovie";
import WatchPage from "./pages/WatchPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToastContainer from "./components/Notifications/ToastContainer";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
