const workHistory = [
  {
    id: 1,
    company: "Blankfactor",
    dates: "Apr 2023 - Present",
    imageUrl: "/src/assets/blankfactor-logo.jpg",
  },
];

const About = ({ forwardedRef }) => {
  return (
    <div
      className="bg-offWhite w-full flex justify-center items-center"
      ref={forwardedRef}>
      <div className="max-w-2xl bg-white p-8 rounded shadow-zinc-700 shadow-md">
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
          During my tenure at Blankfactor, I had the incredible opportunity to
          be part of an exciting project that involved the development of an AI
          Chatbot. The main objective was to elevate user interactions and
          establish a seamless conversational experience. Leveraging my
          expertise in a powerful technology stack, which included React, .NET,
          and Python, I played a pivotal role in shaping the chatbot's
          functionality and ensuring it met the highest standards.
        </p>
        <h2 className="text-xl font-bold mb-2">Education</h2>
        <ul className="list-disc list-inside mb-4">
          <li className="font-bold">New Bulgarian University</li>
          <li>Bachelor of Informatics</li>
          <li>2023 - 2027</li>
        </ul>
        <ul className="list-disc list-inside mb-4">
          <li className="font-bold">SPGE "John Atanasov"</li>
          <li>High School Diploma - System Programming</li>
          <li>2018 - 2023</li>
        </ul>
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        <ul className="list-disc list-inside">
          <li>.Net/C#</li>
          <li>Js/Vue/Nuxt</li>
          <li>Git/GitHub</li>
          <li>HTML/CSS</li>
          <li>SQL</li>
        </ul>
        <p className="text-zinc-700 mt-4">
          My dedication to staying up-to-date with the latest industry trends
          and eagerness to learn drive me to continuously improve my skill set,
          enabling me to adapt to any challenge that comes my way.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4">Work History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {workHistory.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={work.imageUrl}
                alt={work.company}
                className="w-full h-32 object-cover object-center cursor-pointer duration-300 ease-in-out transition-transform transform hover:scale-105"
                onClick={() => window.open(work.siteUrl, "_blank")}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{work.company}</h3>
                <p className="text-zinc-700 mb-2">{work.dates}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
