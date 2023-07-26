import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const projects = [
  {
    id: 1,
    title: "4ip's Auto",
    description:
      "4ip's Auto: A one-stop platform for buying and selling used cars and car parts. Intuitive interface, and hassle-free experience.",
    imageUrl: "/src/assets/4ips-auto.jpg",
    siteUrl: "https://4ips-auto.vercel.app/",
  },
  {
    id: 2,
    title: "Sanction List Checker",
    description:
      "Sanction List Checker: Streamlined verification against sanction lists. Ensure compliance with ease.",
    imageUrl: "/src/assets/sanc-project.jpg",
    siteUrl: "https://sanction-list-checker.vercel.app/",
  },
];

const Portfolio = ({ forwardedRef }) => {
  return (
    <div className="bg-amber-500 py-10 mt-10" ref={forwardedRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-offWhite mb-8">Portfolio</h1>
        <div className=" text-offWhite text-xl mb-6">
          <div className="flex gap-1">
            Welcome to my
            <div className="center text-blue">
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden m-10 transform transition-transform hover:scale-105 hover:shadow-lg">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover object-top cursor-pointer"
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
                    className="text-amber-500 font-bold relative overflow-hidden group">
                    Visit Site
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
