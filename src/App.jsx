import React, { useRef } from "react";
import Navbar from "./Navbar";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "./Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

function App() {
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  const headerHeight = 80;
  const scrollToRefWithHeaderOffset = (ref) => {
    if (ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerHeight;
      window.scrollBy({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    scrollToRefWithHeaderOffset(aboutRef);
  };

  const scrollToPortfolio = () => {
    scrollToRefWithHeaderOffset(portfolioRef);
  };

  const scrollToContact = () => {
    scrollToRefWithHeaderOffset(contactRef);
  };

  return (
    <div className="flex flex-col items-center bg-lightGray h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hristo Chipev</title>
        <meta
          name="description"
          content="Hi there! I'm Hristo Chipev, a passionate web developer with expertise in React, JavaScript, C#, .NET, and SQL. Check out my portfolio to see my projects and achievements in web development."
        />
        <meta
          name="keywords"
          content="portfolio, web development, React, JavaScript, projects, skills, achievements, frontend, backend, C#, .NET, SQL"
        />
        <meta name="author" content="Hristo Chipev" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hristo Chipev" />
        <meta
          property="og:description"
          content="Hi there! I'm Hristo Chipev, a passionate web developer with expertise in React, JavaScript, C#, .NET, and SQL. Check out my portfolio to see my projects and achievements in web development."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://hristo.ch/" />
        <meta property="og:image" content="http://hristo.ch/logo.png" />
        <meta property="og:image:alt" content="Hristo Chipev logo" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Hristo Chipev" />
        <meta
          property="twitter:description"
          content="Hi there! I'm Hristo Chipev, a passionate web developer with expertise in React, JavaScript, C#, .NET, and SQL. Check out my portfolio to see my projects and achievements in web development."
        />
        <meta property="twitter:image" content="http://hristo.ch/logo.png" />
      </Helmet>
      <Navbar
        aboutRef={scrollToAbout}
        portfolioRef={scrollToPortfolio}
        contactRef={scrollToContact}
      />
      <main className="mt-24 w-full">
        <About forwardedRef={aboutRef} />
        <Portfolio forwardedRef={portfolioRef} />
        <Contact forwardedRef={contactRef} />
      </main>
      <Footer
        aboutRef={scrollToAbout}
        portfolioRef={scrollToPortfolio}
        contactRef={scrollToContact}
      />
      <ToastContainer />
    </div>
  );
}
library.add(fas, far, fab);
export default App;
