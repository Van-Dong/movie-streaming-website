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
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../components/validation/UserValidation";
import { InlineError } from "../../../components/Notifications/Error";
import { uploadMovieAction } from "../../../redux/actions/movieActions";
import { getCharactersAction } from "../../../redux/actions/characterActions";

const AddMovie = () => {
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [cast, setCast] = useState();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { characters, isSuccess } = useSelector(
    (state) => state.characterGetAll
  );

  const { isLoading, isSuccess: uploadMovieSuccess } = useSelector(
    (state) => state.movieUpload
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  useEffect(() => {
    if (castModalOpen === false) {
      setCast();
    }
    if (!isSuccess) {
      dispatch(getCharactersAction());
    }
    if (uploadMovieSuccess) {
      reset();
    }
  }, [castModalOpen, uploadMovieSuccess]);

  const uploadMovie = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    dispatch(uploadMovieAction(formData));
  };

  return (
    <>
      <CastModal
        modalOpen={castModalOpen}
        setModalOpen={setCastModalOpen}
        cast={cast}
      />
      <Sidebar>
        <form onSubmit={handleSubmit(uploadMovie)}>
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-xl">Add Movie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Movie Title"
                  type="text"
                  placeholder="Example: Star war"
                  register={register("title")}
                  bg={true}
                />
                {errors.title && <InlineError text={errors.title.message} />}
              </div>
              <Input
                label="Duration (mintues)"
                type="number"
                placeholder="Example: 120"
                register={register("duration")}
                bg={true}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Producing Country"
                type="text"
                placeholder="Example: America"
                register={register("producingCountry")}
                bg={true}
              />
              <Input
                label="Year of Release"
                type="number"
                placeholder="Example: 2020"
                register={register("yearOfRelease")}
                bg={true}
              />
            </div>

            {/* Description */}
            <Message
              label="Movie Description"
              placeholder="Make it short and sweet"
              register={register("description")}
              bg={true}
            />

            {/* Category */}
            <div className="text-sm w-full">
              <Select
                label="Movie Category"
                options={categories}
                register={register("genreIds")}
              />
            </div>

            {/* Poster */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-border font-semibold">Poster</p>
              <Uploader nameField="posterFile" setValue={setValue} />
              {/* <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                <img
                  src="/images/movies/1.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div> */}
            </div>

            {/* Trailer Video */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-border font-semibold">Trailer Video</p>
              <Uploader
                note="only .mp4 and .wmv files will be accepted"
                nameField="trailerFile"
                setValue={setValue}
              />
            </div>

            {/* Movie Video */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-border font-semibold">Movie Video</p>
              <Uploader
                note="only .mp4 and .wmv files will be accepted"
                nameField="movieFile"
                setValue={setValue}
              />
            </div>

            {/* Cast */}
            <div className="text-sm w-full">
              <Select
                label="Casts"
                options={characters}
                register={register("characterIds")}
              />
            </div>
            <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
              <button
                onClick={() => setCastModalOpen(true)}
                className="bg-main px-6 py-3 border-2 border-subMain rounded-md text-white hover:bg-subMain transitions"
              >
                Add Cast
              </button>
              {/* <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
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
              </div> */}
            </div>

            {/* Director */}
            {/* <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
              <button
                onClick={() => setCastModalOpen(true)}
                className="bg-main px-6 py-3 border-2 border-subMain rounded-md text-white hover:bg-subMain transitions"
              >
                Add Director
              </button>
            </div> */}
            {/* Submit */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full flex-rows gap-3 bg-subMain py-3 rounded text-white font-medium text-base hover:bg-opacity-50 transitions"
            >
              <ImUpload /> Publish Movie
            </button>
          </div>
        </form>
      </Sidebar>
    </>
  );
};

export default AddMovie;
