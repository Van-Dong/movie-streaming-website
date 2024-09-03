import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Movies } from "../../../data/MovieData";
import CategoryTable from "../../../components/CategoryTable";
import { CategoriesData } from "../../../data/CategoriesData";
import { FaPlusCircle } from "react-icons/fa";
import CategoryModal from "../../../components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getAllCategoriesAction,
} from "../../../redux/actions/categoryActions";
import Loader from "../../../components/Notifications/Loader";
import Empty from "../../../components/Notifications/Empty";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const { categories, isLoading, isSuccess } = useSelector(
    (state) => state.categoryGetAll
  );

  const { isError } = useSelector((state) => state.categoryDelete);

  const dispatch = useDispatch();

  const deleteCategoryHandle = async (id) => {
    window.confirm("Are you sure you want to delete this category ?") &&
      dispatch(deleteCategoryAction(id));
  };

  const onEditFunction = (name) => {
    setModalOpen(!modalOpen);
    setCategory(name);
  };

  useLayoutEffect(() => {
    if (!isSuccess) {
      dispatch(getAllCategoriesAction());
    }
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch]);

  return (
    <Sidebar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="flex gap-4 items-center bg-subMain px-4 py-2 rounded-md text-sm text-white hover:bg-main transitions"
          >
            <FaPlusCircle />
            Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories.length > 0 ? (
          <CategoryTable
            data={categories}
            onEditFunction={onEditFunction}
            onDeleteCategory={deleteCategoryHandle}
          />
        ) : (
          <Empty message="You have no favorite movies" />
        )}
      </div>
    </Sidebar>
  );
};

export default Categories;
