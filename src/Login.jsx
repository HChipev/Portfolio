import { useState } from "react";
import ApiService from "./services/ApiService";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { set } from "./store/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLockHover, setLockHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkForAuthentication = (success) => {
    success ? dispatch(set(true)) : dispatch(set(false));
  };

  const handleLockHoverToggle = () => {
    setLockHover(!isLockHover);
  };

  const calculateRemainingTime = (token) => {
    const tokenPayload = jwtDecode(token);
    const expirationTime = tokenPayload.exp * 1000;
    const currentTime = new Date().getTime();

    return expirationTime - currentTime;
  };

  const extendSession = async (remainingTime) => {
    setTimeout(async () => {
      const extendSession = window.confirm(
        "Your session is about to expire. Do you want to extend it?"
      );
      if (extendSession) {
        let res;
        try {
          res = await ApiService.refreshToken({
            token: localStorage.getItem("token"),
            refreshToken: localStorage.getItem("refreshToken"),
          });
          checkForAuthentication(true);

          localStorage.setItem("token", res.headers["access-token"]);
          localStorage.setItem("refreshToken", res.headers["refresh-token"]);

          const remainingTime = calculateRemainingTime(
            res.headers["access-token"]
          );

          await extendSession(remainingTime);
        } catch (err) {
          checkForAuthentication(false);

          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          navigate("/");
        }
      }

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }, remainingTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await ApiService.login({ email: email, password: password });
      checkForAuthentication(true);

      localStorage.setItem("token", res.headers["access-token"]);
      localStorage.setItem("refreshToken", res.headers["refresh-token"]);

      const remainingTime = calculateRemainingTime(res.headers["access-token"]);

      await extendSession(remainingTime);
      setPassword("");
      setEmail("");

      navigate("/admin");
    } catch (err) {
      checkForAuthentication(false);

      setError(err.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
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
        {error && <p className="text-red mb-4">{error}</p>}
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
