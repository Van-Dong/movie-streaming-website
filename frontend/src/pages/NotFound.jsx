import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex-colo text-2xl min-h-screen bg-main text-white p-10">
      <img src="/images/404.svg" className="w-full h-96 object-contain" />
      <h1 className="text-xl md:text-2xl my-8 font-bold">Page not found</h1>
      <p className="text-sm font-medium italic text-gray-600">
        The page you are looking for does not exist. You may have mistyped the
        URL
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-subMain rounded-md flex-rows gap-4 mt-4 md:text-xl text-sm"
      >
        <FaHome /> Home
      </Link>
    </div>
  );
};

export default NotFound;
