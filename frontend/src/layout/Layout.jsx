import React from "react";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-main text-white">
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
