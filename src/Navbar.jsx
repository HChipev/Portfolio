import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ aboutRef, portfolioRef, contactRef, certificateRef }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const location = useLocation();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const updateScrollPercentage = () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const percentage = (scrollTop / scrollHeight) * 100;
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollPercentage);
    return () => {
      window.removeEventListener("scroll", updateScrollPercentage);
    };
  }, []);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;

  const hackerText = (event) => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target
        .closest("span")
        .innerText.split("")
        .map((_, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 7;
    }, 30);
  };

  const isAuthenticated = useSelector((state) => state.auth.value);

  return (
    <div className="flex fixed bg-white justify-between w-full h-16 z-50 border-b border-b-amber-500">
      <Link className="z-10" to={isAuthenticated ? "/admin" : "/login"}>
        <img
          className="w-20 h-20 rounded-[50%] shadow-md object-cover spinOnHover"
          src="/me.jpg"
          alt="photo"
        />
      </Link>
      <div className="h-1 bg-white absolute bottom-0 left-0 right-0">
        <div
          className="h-full bg-amber-500 rounded-xl"
          style={{ width: `${scrollPercentage}%` }}></div>
      </div>
      <div className="flex flex-1 justify-start items-center px-2 cursor-default">
        <h1 className="font-extrabold name text-3xl whitespace-nowrap text-blue">
          Hristo{" "}
          <span
            onMouseOver={(e) => hackerText(e)}
            data-value="CHIPEV"
            className="text-amber-500">
            CHIPEV
          </span>
        </h1>
      </div>
      <div className="hidden md:flex justify-center items-center gap-4 px-2">
        {location.pathname === "/" && (
          <div
            className="cursor-pointer hover:text-amber-500 transition"
            onClick={aboutRef}>
            <FontAwesomeIcon icon="fa-solid fa-laptop" className="mr-1" />
            About me
          </div>
        )}
        {location.pathname === "/" && (
          <div
            className="cursor-pointer hover:text-amber-500 transition"
            onClick={certificateRef}>
            <FontAwesomeIcon icon="fa-solid fa-certificate" className="mr-1" />
            Certificates
          </div>
        )}
        {location.pathname === "/" && (
          <div
            className="cursor-pointer hover:text-amber-500 transition"
            onClick={portfolioRef}>
            <FontAwesomeIcon
              icon="fa-regular fa-folder-open"
              className="mr-1"
            />
            Portfolio
          </div>
        )}
        {location.pathname === "/" && (
          <div
            className="cursor-pointer hover:text-amber-500 transition"
            onClick={contactRef}>
            <FontAwesomeIcon icon="fa-regular fa-envelope" className="mr-1" />
            Contact me
          </div>
        )}
        {location.pathname !== "/" && (
          <Link to={"/"}>
            <div className="cursor-pointer hover:text-amber-500 transition">
              <FontAwesomeIcon icon="fa-solid fa-house" className="mr-1" />
              Home{" "}
            </div>
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center gap-4 px-2">
        <FontAwesomeIcon
          icon={isMobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
          onClick={handleMobileMenuToggle}
          className={`text-amber-500 text-2xl cursor-pointer ${
            isMobileMenuOpen ? "rotate-90" : "rotate-0"
          } transition-transform duration-150 ease-linear`}
        />
      </div>
      <div
        className={`${
          isMobileMenuOpen ? "max-h-96" : " max-h-0"
        } overflow-hidden transition-all ease-linear duration-500 md:hidden absolute top-16 right-0 left-0 bg-white border-b border-b-amber-500`}>
        <div className="flex flex-col justify-center items-center gap-4 py-4">
          {location.pathname === "/" && (
            <div
              className="cursor-pointer hover:text-amber-500 transition"
              onClick={aboutRef}>
              <FontAwesomeIcon icon="fa-solid fa-laptop" className="mr-1" />
              About me
            </div>
          )}
          {location.pathname === "/" && (
            <div
              className="cursor-pointer hover:text-amber-500 transition"
              onClick={certificateRef}>
              <FontAwesomeIcon
                icon="fa-solid fa-certificate"
                className="mr-1"
              />
              Certificates
            </div>
          )}
          {location.pathname === "/" && (
            <div
              className="cursor-pointer hover:text-amber-500 transition"
              onClick={portfolioRef}>
              <FontAwesomeIcon
                icon="fa-regular fa-folder-open"
                className="mr-1"
              />
              Portfolio
            </div>
          )}
          {location.pathname === "/" && (
            <div
              className="cursor-pointer hover:text-amber-500 transition"
              onClick={contactRef}>
              <FontAwesomeIcon icon="fa-regular fa-envelope" className="mr-1" />
              Contact me
            </div>
          )}
          {location.pathname !== "/" && (
            <Link to={"/"}>
              <div className="cursor-pointer hover:text-amber-500 transition">
                <FontAwesomeIcon icon="fa-solid fa-house" className="mr-1" />
                Home{" "}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
