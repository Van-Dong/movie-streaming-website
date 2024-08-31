import React, { useContext } from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { CgMenu, CgMenuBoxed } from "react-icons/cg";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import MenuDrawer from "../../components/drawer/MenuDrawer";
import { SidebarContext } from "../../context/DrawerContext";

const MobileFooter = () => {
  const { mobileDrawer, toggleDrawer } = useContext(SidebarContext);
  const active = "bg-dryGray text-subMain";
  const hover = "hover:bg-main";
  const inActive =
    "flex items-center gap-4 p-4 rounded-md font-medium text-sm transitions";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <>
      <div className="flex flex-col h-full w-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-auto flex-grow">
        <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="flex items-center justify-between bg-dry p-1">
          <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay className="text-xl" />
          </NavLink>
          <NavLink
            to="/favorite"
            className={(isActive) => `${Hover(isActive)} relative`}
          >
            <FiHeart className="text-xl" />
            <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute top-0 right-0">
              3
            </div>
          </NavLink>
          <NavLink to="/profile" className={Hover}>
            <FiUserCheck className="text-xl" />
          </NavLink>
          <button onClick={toggleDrawer} className={`${inActive} ${hover}`}>
            <CgMenuBoxed className="text-2xl" />
          </button>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
