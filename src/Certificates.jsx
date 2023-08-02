const certificatesData = [
  {
    id: 1,
    title: "The Nuxt 3 Bootcamp",
    description: "Udemy",
    imageUrl: "/nuxt-certificate.jpg",
  },
  {
    id: 2,
    title: "NEXTGEN Internship program - Level 1",
    description: "Blankfactor",
    imageUrl: "/nextgen-certificate.jpg",
  },
];

const Certificates = ({ forwardedRef }) => {
  return (
    <div className="bg-amber-500 py-10 mt-10" ref={forwardedRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-offWhite mb-8">Certificates</h1>
        <p className="text-offWhite mb-8">
          Here you can find a collection of my certificates and achievements.
          Each certificate represents a milestone in my learning journey and
          demonstrates my commitment to continuous improvement in my field.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white rounded-lg shadow-md transform  transition-transform hover:scale-105">
              <img
                src={certificate.imageUrl}
                alt={certificate.title}
                className="w-full  object-contain object-center cursor-pointer rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-zinc-700 mb-2">
                  {certificate.title}
                </h2>
                <p className="text-zinc-700 mb-4">{certificate.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
