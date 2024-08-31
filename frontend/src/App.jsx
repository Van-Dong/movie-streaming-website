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
import Profile from "./pages/Dashboard/Profile";
import Aos from "aos";
import Password from "./pages/Dashboard/Password";
import FavoriteMovies from "./pages/Dashboard/FavoriteMovies";
import MovieList from "./pages/Dashboard/Admin/MovieList";
import Dashboard from "./pages/Dashboard/Admin/Dashboard";
import Categories from "./pages/Dashboard/Admin/Categories";
import Users from "./pages/Dashboard/Admin/Users";
import Example from "./components/Example";
import AddMovie from "./pages/Dashboard/Admin/AddMovie";
import ScrollOnTop from "./ScrollOnTop";
import DrawerContext from "./context/DrawerContext";

const App = () => {
  Aos.init();
  return (
    <>
      <DrawerContext>
        <ScrollOnTop>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/favorite" element={<FavoriteMovies />} />
            <Route path="/admin/movieList" element={<MovieList />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/category" element={<Categories />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/addmovie" element={<AddMovie />} />
            <Route path="/test" element={<Example />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
};

export default App;
