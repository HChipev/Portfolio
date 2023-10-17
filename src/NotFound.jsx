import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-lightGray w-full flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center min-h-screen w-4/5 p-4 my-20">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-amber-500">
            404 - Not Found
          </h2>
          <p className="text-gray-700 mb-4">
            Oops! It seems like the page you are looking for does not exist.
          </p>
          <Link to="/" className="text-blue hover:underline focus:outline-none">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
