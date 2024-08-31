import MainModal from "./MainModal";
import { Input } from "../UserInputs";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
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
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6 mt-6 text-left"
        >
          <Input
            label="Category Name"
            type="text"
            placeholder="Example: Thriller"
            value={category ? category.title : ""}
            bg={false}
          />
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
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
