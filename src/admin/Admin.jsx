import Educations from "./Educations";
import Frameworks from "./Frameworks";
import Languages from "./Languages";
import Tools from "./Tools";
import Works from "./Works";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Admin = () => {
  return (
    <div className="mt-24 w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-center text-amber-500 font-semibold">
          Admin
        </h1>
        <div className="flex w-full justify-end p-3 mb-4">
          <button className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors duration-300 focus:outline-none">
            Logout{" "}
            <FontAwesomeIcon className="ml-2" icon="fa-solid fa-sign-out-alt" />
          </button>
        </div>
        <Languages />
        <Frameworks />
        <Tools />
        <Educations />
        <Works />
      </div>
    </div>
  );
};

export default Admin;
