import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1",
    imageUrl: "/src/assets/blankfactor-logo.jpg",
    siteUrl: "https://www.example.com/project1",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
    imageUrl: "/src/assets/blankfactor-logo.jpg",
    siteUrl: "https://www.example.com/project2",
  },
];

const Portfolio = ({ forwardedRef }) => {
  return (
    <div className="bg-amber-500 py-10 mt-10" ref={forwardedRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-offWhite mb-8">Portfolio</h1>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}>
          {projects.map((project) => (
            <div key={project.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden m-10 transform transition-transform hover:scale-105 hover:shadow-lg">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover object-center cursor-pointer"
                  onClick={() => window.open(project.siteUrl, "_blank")}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-zinc-700 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-zinc-700 mb-4">{project.description}</p>
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold hover:underline">
                    Visit Site
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
