import React from "react";
import Sidebar from "../Sidebar";
import FavoriteTable from "../../../components/FavoriteTable";
import { Movies } from "../../../data/MovieData";
import { FaListAlt, FaUser } from "react-icons/fa";
import { BiCategoryAlt, BiSolidCategory } from "react-icons/bi";

const dashboardData = [
  {
    bg: "bg-orange-600",
    icon: FaListAlt,
    title: "Total Movies",
    total: 90,
  },
  {
    bg: "bg-blue-600",
    icon: BiSolidCategory,
    title: "Total Categories",
    total: 8,
  },
  {
    bg: "bg-green-600",
    icon: FaUser,
    title: "Total Users",
    total: 80,
  },
];

const Dashboard = () => {
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
        <FavoriteTable data={Movies.slice(0, 5)} />
      </div>
    </Sidebar>
  );
};

export default Dashboard;
