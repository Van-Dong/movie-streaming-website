import React from "react";
// Head About Us
const Head = ({ title }) => {
  return (
    <div className="w-full bg-dryGray h-40 lg:h-64 overflow-hidden rounded-md relative">
      <img
        src="/images/head.png"
        alt="about-us"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 right-0 bottom-0 left-0 flex-colo">
        <h1 className="text-2xl lg:text-h1 text-white font-bold">
          {title && title}
        </h1>
      </div>
    </div>
  );
};

export default Head;
