import React from "react";
import {
  BiLogOut,
  BiSolidCategory,
  BiSolidDashboard,
  BiSolidMovie,
  BiSolidUserAccount,
} from "react-icons/bi";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import Layout from "../../layout/Layout";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/userActions";

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const sideLinks = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: BiSolidDashboard,
    },
    {
      name: "Movie List",
      link: "/admin/movieList",
      icon: FaListAlt,
    },
    {
      name: "Add movie",
      link: "/admin/addmovie",
      icon: BiSolidMovie,
    },
    {
      name: "Categories",
      link: "/admin/category",
      icon: BiSolidCategory,
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: FaUsers,
    },
    {
      name: "Update Profile",
      link: "/profile",
      icon: FiSettings,
    },
    {
      name: "Favorites",
      link: "/favorite",
      icon: FaHeart,
    },
    {
      name: "Change password",
      link: "/password",
      icon: RiLockPasswordFill,
    },
  ];

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const active = "bg-dryGray text-subMain";
  const hover = "hover:bg-main";
  const inActive =
    "flex items-center gap-4 p-4 rounded-md font-medium text-sm transitions";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;
  return (
    <Layout>
      <div className="h-min-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start py-6">
          {/* Sidebar */}
          <div className="col-span-2 sticky bg-dry p-6 border border-gray-800 rounded-md xl:mb-0 mb-4">
            {sideLinks.map((link, index) => (
              <NavLink key={index} to={link.link} className={Hover}>
                <link.icon /> <p>{link.name}</p>
              </NavLink>
            ))}
            <NavLink to="/" className={Hover} onClick={handleLogout}>
              <BiLogOut /> <p>Logout</p>
            </NavLink>
          </div>

          {/* Content */}
          <div
            className="col-span-6 bg-dry p-6 border border-gray-800 rounded-md"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sidebar;
