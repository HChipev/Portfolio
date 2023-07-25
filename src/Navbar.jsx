import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ aboutRef, portfolioRef, contactRef }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex fixed bg-amber-500 justify-between w-full h-16 z-50 border-b-2 border-b-offWhite">
      <img
        className="w-20 h-20 rounded-[50%] shadow-md object-cover z-10"
        src="/src/assets/me.jpg"
        alt="photo"
      />
      <div className="hidden sm:flex justify-center items-center gap-4 px-2">
        <div
          className="cursor-pointer hover:text-white transition"
          onClick={aboutRef}>
          <FontAwesomeIcon icon="fa-solid fa-laptop" className="mr-1" />
          About me
        </div>
        <div
          className="cursor-pointer hover:text-white transition"
          onClick={portfolioRef}>
          <FontAwesomeIcon icon="fa-regular fa-folder-open" className="mr-1" />
          Portfolio
        </div>
        <div
          className="cursor-pointer hover:text-white transition"
          onClick={contactRef}>
          <FontAwesomeIcon icon="fa-regular fa-envelope" className="mr-1" />
          Contact me
        </div>
      </div>

      <div className="sm:hidden flex items-center gap-4 px-2">
        <FontAwesomeIcon
          icon={isMobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
          onClick={handleMobileMenuToggle}
          className={`text-white text-2xl cursor-pointer ${
            isMobileMenuOpen ? "rotate-90" : "rotate-0"
          } transition-transform duration-150 ease-linear`}
        />
      </div>
      <div
        className={`${
          isMobileMenuOpen ? "max-h-96" : " max-h-0"
        } overflow-hidden transition-all ease-linear duration-500 sm:hidden absolute top-16 right-0 left-0 bg-amber-500 border-b-2 border-b-offWhite`}>
        <div className="flex flex-col justify-center items-center gap-4 py-4">
          <div
            className="cursor-pointer hover:text-white transition"
            onClick={aboutRef}>
            <FontAwesomeIcon icon="fa-solid fa-laptop" className="mr-1" />
            About me
          </div>
          <div
            className="cursor-pointer hover:text-white transition"
            onClick={portfolioRef}>
            <FontAwesomeIcon
              icon="fa-regular fa-folder-open"
              className="mr-1"
            />
            Portfolio
          </div>
          <div
            className="cursor-pointer hover:text-white transition"
            onClick={contactRef}>
            <FontAwesomeIcon icon="fa-regular fa-envelope" className="mr-1" />
            Contact me
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
