import React from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import MobileFooter from "./Footer/MobileFooter";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <NavBar />
        {children}
        <Footer />
        <MobileFooter />
      </div>
    </>
  );
};

export default Layout;
