import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const workHistory = [
  {
    id: 1,
    company: "Blankfactor",
    positions: [
      { id: 1, title: "Software Engineer Inter", dates: "Apr 2023 - Oct 2023" },
      { id: 2, title: "Junior Software Engineer", dates: "Oct 2023 - Present" },
    ],
    imageUrl: "/blankfactor-logo.jpg",
    siteUrl: "https://blankfactor.com/",
    description:
      "During my time at Blankfactor, I made meaningful contributions to both the development of a Hiring Management System and an AI Chatbot. I specialized in full-stack engineering, emphasizing .NET and Vue.js. I played a pivotal role in crafting a user-friendly and responsive system, optimizing the hiring workflow for efficiency. Simultaneously, I significantly contributed to the AI Chatbot project, where my focus was on enhancing user interactions and ensuring a seamless conversational experience. With expertise in a robust technology stack comprising of React, .NET, and Python. I actively shaped the chatbot's functionality. This experience allowed me to master the synergy between frontend and backend technologies, resulting in a dynamic and responsive system that meets high-performance standards and user satisfaction. Eager to carry this momentum forward, I look forward to contributing to impactful projects and pushing the boundaries of innovation in user experience.",
  },
];

const skills = [
  {
    category: "Languages",
    items: ["C#", "Java", "JavaScript", "HTML/CSS", "MSSQL/MySQL"],
    icon: "fa-solid fa-circle-check",
  },
  {
    category: "Frameworks",
    items: [".NET", "Entity Framework", "Vue", "Nuxt", "React"],
    icon: "fa-solid fa-circle-check",
  },
  {
    category: "Tools",
    items: ["Git/GitHub"],
    icon: "fa-solid fa-circle-check",
  },
];

const education = [
  {
    institution: "SPGE 'John Atanasov'",
    degree: "High School Diploma - System Programming",
    dates: "2018 - 2023",
    icon: "fa-solid fa-circle-check",
  },
  {
    institution: "New Bulgarian University",
    degree: "Bachelor of Informatics",
    dates: "2023 - 2027(expected)",
    icon: "fa-solid fa-circle-check",
  },
];

const About = ({ forwardedRef }) => {
  return (
    <div
      className="bg-lightGray w-full flex justify-center items-center"
      ref={forwardedRef}>
      <div className="sm:max-w-3xl lg:max-w-4xl xl:max-w-6xl bg-white p-8 rounded-md shadow-zinc-700 shadow-md">
        <h1 className="text-3xl font-bold mb-4">
          About Me - Full-Stack Developer
        </h1>
        <p className="text-zinc-700 mb-4">
          Greetings! I'm thrilled to welcome you to my portfolio website. My
          name is
          <br />
          <span className="font-bold italic text-amber-500">Hristo Chipev</span>
          , and I am a passionate and driven Full-Stack Developer with a strong
          focus on creating innovative solutions and delightful user
          experiences.
        </p>
        <p className="text-zinc-700 mb-4">
          As a Full-Stack Developer, I have been involved in various exciting
          projects that have enriched my expertise and skills. One of my
          significant contributions was working on an innovative web application
          that aimed to streamline user interactions and provide a seamless user
          experience. My responsibilities included utilizing a diverse
          technology stack, including React, .NET, and Python, to develop
          efficient and high-quality solutions that met the project's
          objectives.
        </p>
        <h2 className="text-xl font-bold mb-2">
          <FontAwesomeIcon className="mr-2" icon="fa-solid fa-school" />
          Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="bg-white border-amber-500 border-t rounded-lg shadow-lg p-4 flex flex-col justify-between transform transition-transform hover:scale-105 hover:rotate-2 relative">
              <div>
                <img
                  className="absolute w-24 h-24 -top-7 -translate-x-1/2 left-1/2"
                  src="/pin.png"
                  alt="pin"
                />
                <h3 className="text-lg font-bold mb-2">
                  <FontAwesomeIcon
                    icon={edu.icon}
                    className="text-amber-500 mr-2"
                  />
                  {edu.institution}
                </h3>
                <ul className="list-disc list-inside pl-4">
                  <li>{edu.degree}</li>
                  <li>{edu.dates}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2">
          <FontAwesomeIcon className="mr-2" icon="fa-solid fa-laptop" />
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="bg-white border-amber-500 border-t rounded-lg shadow-lg p-4 flex flex-col justify-between transform transition-transform hover:scale-105 hover:rotate-2">
              <div>
                <img
                  className="absolute w-24 h-24 -top-7 -translate-x-1/2 left-1/2"
                  src="/pin.png"
                  alt="pin"
                />
                <h3 className="text-lg font-bold mb-2">
                  <FontAwesomeIcon
                    icon={skill.icon}
                    className="text-amber-500 mr-2"
                  />
                  {skill.category}
                </h3>
                <ul className="list-disc list-inside pl-4">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mt-8 mb-4">
          <FontAwesomeIcon className="mr-2" icon="fa-solid fa-briefcase" />
          Work History
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {workHistory.map((work) => (
            <div
              key={work.id}
              className="bg-white border-amber-500 border-t rounded-lg shadow-lg overflow-hidden">
              <img
                src={work.imageUrl}
                alt={work.company}
                className="w-full h-32 object-cover object-center cursor-pointer duration-300 ease-in-out transition-transform transform hover:scale-105"
                onClick={() => window.open(work.siteUrl, "_blank")}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">{work.company}</h3>
                {[...work.positions].reverse().map((position) => (
                  <div
                    key={position.id}
                    className="flex flex-col justify-center mb-2 relative">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        className="mr-1 text-amber-500"
                        icon="fa-solid fa-circle-chevron-up"
                      />
                      <p className="text-zinc-600 font-semibold">
                        {position.title}
                      </p>
                    </div>
                    <p className="text-blue">{position.dates}</p>
                  </div>
                ))}
                <p className="text-zinc-700">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-zinc-700 mt-4">
          My dedication to staying up-to-date with the latest industry trends
          and eagerness to learn drive me to continuously improve my skill set,
          enabling me to adapt to any challenge that comes my way.
        </p>
      </div>
    </div>
  );
};

export default About;
