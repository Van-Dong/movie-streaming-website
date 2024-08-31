import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import Sidebar from "../Sidebar";
import { Movies } from "../../../data/MovieData";
import CategoryTable from "../../../components/CategoryTable";
import { CategoriesData } from "../../../data/CategoriesData";
import { FaPlusCircle } from "react-icons/fa";
import CategoryModal from "../../../components/Modals/CategoryModal";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();

  const onEditFunction = (name) => {
    setModalOpen(!modalOpen);
    setCategory(name);
  };

  useEffect(() => {
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen]);

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
        <CategoryTable data={CategoriesData} onEditFunction={onEditFunction} />
      </div>
    </Sidebar>
  );
};

export default Categories;
