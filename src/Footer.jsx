import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ aboutRef, portfolioRef, contactRef }) => {
  return (
    <footer className="flex bg-black min-h-fit w-full text-amber-500 py-4">
      <div className="max-w-6xl min-w-full px-4 sm:px-6 lg:px-8  h-full">
        <div className="flex flex-col">
          <div className="flex justify-between items-center gap-4 h-full">
            <div className="flex items-center">
              <a
                href="https://github.com/HChipev"
                target="_blank"
                className="mr-4 text-3xl text-amber-500 hover:text-white transition duration-300">
                <FontAwesomeIcon icon="fa-brands fa-github" />
              </a>
              <a
                href="https://www.instagram.com/_hchipev_/"
                target="_blank"
                className="mr-4 text-3xl text-amber-500 hover:text-white transition duration-300">
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/in/hristo-chipev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-amber-500 hover:text-white transition duration-300">
                <FontAwesomeIcon icon="fa-brands fa-linkedin" />
              </a>
            </div>
            <ul className="flex gap-4">
              <li
                className="cursor-pointer hover:text-white transition"
                onClick={aboutRef}>
                <FontAwesomeIcon icon="fa-solid fa-laptop" className="mr-1" />
                About me
              </li>
              <li
                className="cursor-pointer hover:text-white transition"
                onClick={portfolioRef}>
                <FontAwesomeIcon
                  icon="fa-regular fa-folder-open"
                  className="mr-1"
                />
                Portfolio
              </li>
              <li
                className="cursor-pointer hover:text-white transition"
                onClick={contactRef}>
                <FontAwesomeIcon
                  icon="fa-regular fa-envelope"
                  className="mr-1"
                />
                Contact me
              </li>
            </ul>
          </div>
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Hristo Chipev. Software Engineer.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
