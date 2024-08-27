import React from "react";
import { CgUser } from "react-icons/cg";
import { FiUser } from "react-icons/fi";

const Promos = () => {
  return (
    <div className="my-20 py-10 px-8 md:px-20 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex flex-col gap-6 lg:gap-10">
          <h1 className="text-xl xl:text-3xl capitalize font-medium font-sans text-white xl:leading-relaxed">
            Download Your Movies Watch Offline. <br /> Enjoy on Your Mobile
          </h1>
          <p className="text-sm xl:text-base text-text leading-6 xl:leading-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </p>
          <div className="flex items-center gap-4 text-subMain text-sm md:text-lg">
            <div className="px-6 py-3 bg-black rounded-md flex-colo font-bold">
              HD 4K
            </div>
            <div className="px-6 py-3 bg-black rounded-md flex-rows gap-4 font-bold">
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <div>
          <img
            src="/images/mobile.png"
            alt="Mobile app"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Promos;
