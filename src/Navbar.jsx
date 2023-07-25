import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ aboutRef, portfolioRef, contactRef }) => {
  return (
    <div className="flex fixed bg-lightGray justify-between w-full h-16">
      <img
        className="w-20 h-20 rounded-[50%] shadow-black shadow-md object-cover"
        src="/src/assets/me.jpg"
        alt="photo"
      />
      <div className="flex justify-center items-center gap-4 px-2">
        <div className=" cursor-pointer" onClick={aboutRef}>
          <FontAwesomeIcon className="mr-1" icon="fa-solid fa-laptop" />
          About me
        </div>
        <div className=" cursor-pointer" onClick={portfolioRef}>
          <FontAwesomeIcon className="mr-1" icon="fa-regular fa-folder-open" />
          Portfolio
        </div>
        <div className=" cursor-pointer" onClick={contactRef}>
          <FontAwesomeIcon className="mr-1" icon="fa-regular fa-envelope" />
          Contact me
        </div>
      </div>
    </div>
  );
};

export default Navbar;
