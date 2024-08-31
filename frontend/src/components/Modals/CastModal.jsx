import MainModal from "./MainModal";
import { Input } from "../UserInputs";
import Uploader from "../Uploader";

const CastModal = ({ modalOpen, setModalOpen, cast }) => {
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
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-6 mt-6 text-left"
        >
          <Input
            label="Cast Name"
            type="text"
            placeholder="Example: John Doe"
            value={cast ? cast.name : ""}
            bg={false}
          />

          <div className="flex flex-col gap-2">
            <p className="text-sm text-border font-semibold">Portrait Cast</p>
            <Uploader />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src="/images/movies/1.jpg"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
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
