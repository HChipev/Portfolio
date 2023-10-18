import ApiService from "../services/ApiService";
import Certificates from "./Certificates";
import Educations from "./Educations";
import Frameworks from "./Frameworks";
import Languages from "./Languages";
import Portfolios from "./Portfolios";
import Tools from "./Tools";
import Works from "./Works";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { errorNotifications } from "../Notifications";
import { setIsAuthenticated } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    const res = await ApiService.logout().catch((error) => {
      errorNotifications(
        error.response.data
          ? error.response.data.title ?? error.response.data
          : error.response.statusText
      );

      return null;
    });

    if (!res) return;

    dispatch(setIsAuthenticated(false));

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <div className="mt-24 w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-center text-amber-500 font-semibold">
          Admin
        </h1>
        <div className="flex w-full justify-end p-3 mb-4">
          <button
            onClick={logout}
            className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors duration-300 focus:outline-none">
            Logout{" "}
            <FontAwesomeIcon className="ml-2" icon="fa-solid fa-sign-out-alt" />
          </button>
        </div>
        <Languages />
        <Frameworks />
        <Tools />
        <Educations />
        <Works />
        <Certificates />
        <Portfolios />
      </div>
    </div>
  );
};

export default Admin;
