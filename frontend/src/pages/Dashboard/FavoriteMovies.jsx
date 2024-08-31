import Table from "../../components/Table";
import { Movies } from "../../data/MovieData";
import Sidebar from "./Sidebar";

const FavoriteMovies = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-2">
          <h2 className="font-bold text-xl">Favorite Movies</h2>
          <button className="bg-main px-4 py-2 border-2 border-subMain rounded-md text-sm text-white hover:bg-subMain transitions">
            Delete All
          </button>
        </div>
        <Table data={Movies} admin={false} />
      </div>
    </Sidebar>
  );
};

export default FavoriteMovies;
