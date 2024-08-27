import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";

const NavBar = () => {
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);
  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/logo.svg"
                alt="logo"
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>

          {/* Search Form */}
          <div className="col-span-3">
            <form className="w-full text-sm bg-dryGray rounded flex justify-between items-center gap-4">
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search Movie Name from here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent px-2 text-black"
              />
            </form>
          </div>

          {/* Menus */}
          <div className="col-span-3 font-medium text-sm hidden lg:flex items-center justify-between xl:gap-14 xl:justify-end 2xl:gap-20 lg:pr-4">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink to="/login" className={Hover}>
              <CgUser className="w-8 h-8" />
            </NavLink>
            <NavLink
              to="/favorite"
              className={(isActive) => `${Hover(isActive)} relative`}
            >
              <FaHeart className="w-6 h-6" />
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                3
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
