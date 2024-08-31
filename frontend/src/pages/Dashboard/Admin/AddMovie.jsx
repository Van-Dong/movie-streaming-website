import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Input, Message, Select } from "../../../components/UserInputs";
import Uploader from "../../../components/Uploader";
import { CategoriesData } from "../../../data/CategoriesData";
import { UserData } from "../../../data/UserData";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { ImUpload } from "react-icons/im";
import CastModal from "../../../components/Modals/CastModal";

const AddMovie = () => {
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [cast, setCast] = useState();

  useEffect(() => {
    if (castModalOpen === false) {
      setCast();
    }
  }, [castModalOpen]);

  return (
    <>
      <CastModal
        modalOpen={castModalOpen}
        setModalOpen={setCastModalOpen}
        cast={cast}
      />
      <Sidebar>
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-xl">Add Movie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Movie Title"
              type="text"
              placeholder="Example: Star war"
              bg={true}
            />
            <Input
              label="Hours"
              type="text"
              placeholder="Example: 2"
              bg={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Language"
              type="text"
              placeholder="Example: English"
              bg={true}
            />
            <Input
              label="Year of Release"
              type="number"
              placeholder="Example: 2020"
              bg={true}
            />
          </div>
          {/* Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-border font-semibold">
                Image without Title
              </p>
              <Uploader />
              <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                <img
                  src="/images/movies/1.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-border font-semibold">
                Image with Title
              </p>
              <Uploader />
              <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                <img
                  src="/images/movies/2.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>
          {/* Description */}
          <Message
            label="Movie Description"
            placeholder="Make it short and sweet"
          />

          {/* Category */}
          <div className="text-sm w-full">
            <Select label="Movie Category" options={CategoriesData} />
          </div>

          {/* Movie Video */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-border font-semibold">
              Image without Title
            </p>
            <Uploader />
          </div>

          {/* Cast */}
          <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
            <button
              onClick={() => setCastModalOpen(true)}
              className="bg-main px-6 py-3 border-2 border-subMain rounded-md text-white hover:bg-subMain transitions"
            >
              Add Cast
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
              {UserData.slice(0, 5).map((user, i) => (
                <div
                  key={i}
                  className="p-2 italic text-xs text-text flex-colo gap-3 bg-main border border-border rounded"
                >
                  <img
                    src="/images/movies/1.jpg"
                    alt={user.name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <p>{user.name}</p>
                  <div className="flex gap-2">
                    <button className="w-6 h-6 flex-colo bg-dry border border-border rounded text-sm hover:bg-opacity-30 transitions text-subMain">
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setCast(user);
                        setCastModalOpen(true);
                      }}
                      className="w-6 h-6 flex-colo bg-dry border border-border rounded text-sm hover:bg-opacity-30 transitions text-green-600"
                    >
                      <BiEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full flex-rows gap-3 bg-subMain py-3 rounded text-white font-medium text-base hover:bg-opacity-50 transitions"
          >
            <ImUpload /> Publish Movie
          </button>
        </div>
      </Sidebar>
    </>
  );
};

export default AddMovie;
