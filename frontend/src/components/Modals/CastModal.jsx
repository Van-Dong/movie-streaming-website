import MainModal from "./MainModal";
import { Input } from "../UserInputs";
import Uploader from "../Uploader";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../Notifications/Error";
import { createCharacterAction } from "../../redux/actions/characterActions";
import { castValidation } from "../validation/UserValidation";
import { useEffect } from "react";

const CastModal = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(
    (state) => state.characterCreate
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(castValidation),
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    console.log(data);
    dispatch(createCharacterAction(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      setValue("name", "");
      setValue("portraitFile", null);
      setModalOpen(false);
    }
  }, [isSuccess]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        className="inline-block border border-border  sm:w-4/5 md:w-3/5 lg:w-2/5 w-full align-middle p-10 
      overflow-y-auto h-full bg-main text-white rounded-2xl"
      >
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 text-left"
        >
          <div>
            <Input
              label="Cast Name"
              type="text"
              placeholder="Example: John Doe"
              register={register("name")}
              // value={cast ? cast.name : ""}
              bg={false}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-border font-semibold">Portrait Cast</p>
            <Uploader setValue={setValue} nameField="portraitFile" />
            {cast ? (
              <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                <img
                  src={cast?.portraitUrl}
                  alt={cast.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-subMain rounded text-white text-base font-semibold hover:bg-opacity-70 transitions"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastModal;
