import MainModal from "./MainModal";
import { Input, Message } from "../UserInputs";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryValidation } from "../../components/validation/UserValidation";
import { InlineError } from "../Notifications/Error";
import { useLayoutEffect } from "react";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../redux/actions/categoryActions";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categoryValidation),
  });

  const onSubmit = (data) => {
    if (category) {
      dispatch(updateCategoryAction(category?.id, data));
    } else {
      dispatch(createCategoryAction(data));
    }
    setModalOpen(false);
  };

  useLayoutEffect(() => {
    setValue("name", category?.name);
    setValue("description", category?.description);
  });

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div
        className="inline-block border border-border  sm:w-4/5 md:w-3/5 lg:w-2/5 w-full align-middle p-10 
      overflow-y-auto h-full bg-main text-white rounded-2xl"
      >
        <h2 className="text-3xl font-bold">
          {category ? "Update Category" : "Create Category"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 text-left"
        >
          <div className="w-full">
            <Input
              label="Category Name"
              type="text"
              placeholder="Example: Thriller"
              register={register("name", { value: category?.name })}
              bg={false}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <Message
            label="Description"
            placeholder="Enter description of category"
            register={register("description", { value: category?.description })}
            bg={false}
          />

          <button
            type="submit"
            className="w-full py-4 bg-subMain rounded text-white text-base font-semibold hover:bg-opacity-70 transitions"
          >
            {category ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CategoryModal;
