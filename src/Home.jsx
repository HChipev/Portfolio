import About from "./About";
import Certificates from "./Certificates";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import { useEffect } from "react";

function Home({ aboutRef, certificatesRef, portfolioRef, contactRef }) {
  useEffect(() => {
    const showSection = (entries, observer) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;

      entry.target.classList.remove("section-hidden");
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(showSection, {
      root: null,
      threshold: 0.15,
    });

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      sectionObserver.observe(section);
      section.classList.add("section-hidden");
    });
  }, []);

  return (
    <main className="mt-24 w-full">
      <About forwardedRef={aboutRef} />
      <Certificates forwardedRef={certificatesRef} />
      <Portfolio forwardedRef={portfolioRef} />
      <Contact forwardedRef={contactRef} />
    </main>
  );
}

export default Home;
