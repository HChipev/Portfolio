import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ApiService from "./services/ApiService";
import { errorNotifications } from "./Notifications";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Portfolio = ({ forwardedRef }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function getProjects() {
      setProjects(
        (
          await ApiService.getPortfolios().catch((error) =>
            errorNotifications(
              error.response.data
                ? error.response.data.title ?? error.response.data
                : error.response.statusText
            )
          )
        ).data
      );
    }

    getProjects();
  }, []);

  return (
    <div className="bg-lightGray py-10" ref={forwardedRef}>
      <div className="sm:max-w-3xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-md shadow-zinc-700 shadow-md mx-auto p-8 section">
        <h1 className="text-3xl font-bold text-amber-500 mb-8">Portfolio</h1>
        <div className=" text-zinc-700 text-xl mb-6">
          <div className="flex gap-1">
            Welcome to my
            <div className="flex text-blue">
              <div className="word text-lg">
                <span>P</span>
                <span>o</span>
                <span>r</span>
                <span>t</span>
                <span>f</span>
                <span>o</span>
                <span>l</span>
                <span>i</span>
                <span>o</span>
                <span>!</span>
              </div>
            </div>
          </div>
          Below, you'll find some of the exciting projects I've worked on
          recently. Feel free to explore and click on the images to visit each
          project's site.
        </div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}>
          {projects.map((project) => (
            <div key={project.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden m-5 sm:m-10 transform transition-transform hover:scale-105 hover:shadow-lg">
                <img
                  src={`data:image/png;base64,${project.image}`}
                  alt={project.name}
                  className="w-full h-40 object-cover object-top cursor-pointer"
                  onClick={() => window.open(project.siteUrl, "_blank")}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-zinc-700 mb-2">
                    {project.name}
                  </h2>
                  <p className="text-zinc-700 mb-4">{project.description}</p>
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 font-bold relative overflow-hidden group">
                    Visit
                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-amber-500 transform scale-x-0 transition-transform group-hover:scale-x-100 duration-500" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Portfolio;
