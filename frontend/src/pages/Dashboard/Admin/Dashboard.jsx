import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import FavoriteTable from "../../../components/FavoriteTable";
import { Movies } from "../../../data/MovieData";
import { FaListAlt, FaUser } from "react-icons/fa";
import { BiCategoryAlt, BiSolidCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllUsersAction } from "../../../redux/actions/userActions";
import { getAllCategoriesAction } from "../../../redux/actions/categoryActions";
import { getAllMoviesAction } from "../../../redux/actions/movieActions";
import MovieTable from "../../../components/MovieTable";
import Loader from "../../../components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading: moviesLoading, movies } = useSelector(
    (state) => state.movieGetAll
  );
  const { isLoading: categoriesLoading, categories } = useSelector(
    (state) => state.categoryGetAll
  );
  const { isLoading: usersLoading, users } = useSelector(
    (state) => state.adminGetAllUsers
  );

  const dashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaListAlt,
      title: "Total Movies",
      total: moviesLoading ? "Loading..." : movies?.length || 0,
    },
    {
      bg: "bg-blue-600",
      icon: BiSolidCategory,
      title: "Total Categories",
      total: categoriesLoading ? "Loading..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: usersLoading ? "Loading..." : users?.length || 0,
    },
  ];

  useEffect(() => {
    dispatch(adminGetAllUsersAction());
  }, [dispatch]);
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-xl">Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData.map((data, index) => (
            <div
              key={index}
              className="p-4 grid grid-cols-4 gap-4 bg-main rounded-sm"
            >
              <div
                className={`${data.bg} rounded-full flex-colo w-12 h-12 col-span-1`}
              >
                <data.icon />
              </div>
              <div className="col-span-3 flex flex-col">
                <h4 className="text-base">{data.title}</h4>
                <p className="text-base font-bold">{data.total}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-border text-base">Recent Movies</h3>
        {/* <MovieTable data={movies} /> */}
        {moviesLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <MovieTable data={movies.slice(0, 5)} />
        ) : (
          <div className="w-full flex-colo gap-6 min-h-96">
            <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">No movies has found</p>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default Dashboard;
