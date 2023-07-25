import React, { useRef } from "react";
import Navbar from "./Navbar";
import { library } from "@fortawesome/fontawesome-svg-core";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import About from "./About";
import Portfolio from "./Portfolio";
import Contact from "./Contact";

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
    <div className="flex flex-col items-center bg-offWhite h-screen">
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
    </div>
  );
}
library.add(fas, far, fab);
export default App;
