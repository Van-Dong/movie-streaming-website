import React from "react";

const Titles = ({ title, Icon }) => {
  return (
    <div className="w-full flex gap-4 sm:gap-8 items-center">
      <Icon className="text-subMain w-4 h-4 sm:w-6 sm:h-6" />
      <h2 className="font-bold text-white capitalize text-lg sm:text-xl">
        {title}
      </h2>
    </div>
  );
};

export default Titles;
