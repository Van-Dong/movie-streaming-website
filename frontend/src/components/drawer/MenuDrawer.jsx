import React from "react";
import MainDrawer from "./MainDrawer";
import { Link, NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";

const MenuDrawer = ({ children, drawerOpen, toggleDrawer }) => {
  const links = [
    {
      name: "Movies",
      link: "/movies",
      icon: BsCollectionPlay,
    },
    {
      name: "About Us",
      link: "/about-us",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      icon: BiPhoneCall,
    },
  ];

  const inActive = "flex items-center gap-6 text-white text-sm px-10 py-4";
  const hover = "hover:bg-dry transitions";
  const active = "text-red-500 bg-dry";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
        <div className="w-full flex-btn h-16 px-6 py-4 bg-dry">
          <Link onClick={toggleDrawer} to="/">
            <img
              src="/images/logo.svg"
              alt="log"
              className="w-12 h-12 object-contain"
            />
          </Link>
          <button
            onClick={toggleDrawer}
            type="button"
            className="inline-flex transitions justify-center px-4 py-2 text-base font-medium text-white bg-subMain rounded-full hover:bg-white hover:text-subMain"
          >
            x
          </button>
        </div>

        {/* Menu links */}
        <div className="w-full overflow-y-auto flex-grow mt-2">
          {links.map((link, index) => (
            <NavLink
              to={link.link}
              key={index}
              onClick={toggleDrawer}
              className={Hover}
            >
              <link.icon className="text-lg" /> {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </MainDrawer>
  );
};

export default MenuDrawer;
