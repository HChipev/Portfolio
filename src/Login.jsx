import { useState } from "react";
import ApiService from "./services/ApiService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./store/auth/authSlice";
import { errorNotifications } from "./Notifications";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLockHover, setLockHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkForAuthentication = (success) => {
    success
      ? dispatch(setIsAuthenticated(true))
      : dispatch(setIsAuthenticated(false));
  };

  const handleLockHoverToggle = () => {
    setLockHover(!isLockHover);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await ApiService.login({
      email: email,
      password: password,
    }).catch((error) => {
      errorNotifications(
        error.response.data
          ? error.response.data.title ?? error.response.data
          : error.response.statusText
      );

      checkForAuthentication(false);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      return null;
    });

    if (!res) return;

    checkForAuthentication(true);

    localStorage.setItem("token", res.headers["access-token"]);
    localStorage.setItem("refreshToken", res.headers["refresh-token"]);

    const refreshToken = async (expirationTime) =>
      await setTimeout(async () => {
        const res = await ApiService.refreshToken({
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken"),
        }).catch((error) => {
          errorNotifications(
            error.response.data
              ? error.response.data.title ?? error.response.data
              : error.response.statusText
          );

          checkForAuthentication(false);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");

          return null;
        });

        if (!res) return;

        checkForAuthentication(true);
        localStorage.setItem("token", res.headers["access-token"]);

        await refreshToken(
          jwtDecode(res.headers["access-token"]).exp * 1000 - Date.now() + 5000
        );
      }, expirationTime);
    await refreshToken(
      jwtDecode(res.headers["access-token"]).exp * 1000 - Date.now() + 5000
    );

    setPassword("");
    setEmail("");

    navigate("/admin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white py-6 px-12 rounded-lg shadow-lg">
        <div
          className="flex justify-between"
          onMouseEnter={handleLockHoverToggle}>
          <h2 className="text-3xl font-bold mb-4 text-amber-500">Login</h2>
          <FontAwesomeIcon
            icon={isLockHover ? "fa-solid fa-lock" : "fa-solid fa-lock-open"}
            className={`text-2xl text-amber-500 ${
              isLockHover ? "rotate-0" : "rotate-[25deg]"
            } transition-transform duration-300 ease-linear`}
          />
        </div>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-2 text-zinc-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium mb-2 text-zinc-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              className="border rounded-lg py-2 px-3 w-full focus:outline-none border-amber-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors duration-300 focus:outline-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
