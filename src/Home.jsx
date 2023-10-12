import About from "./About";
import Certificates from "./Certificates";
import Portfolio from "./Portfolio";
import Contact from "./Contact";

function Home({ aboutRef, certificatesRef, portfolioRef, contactRef }) {
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
