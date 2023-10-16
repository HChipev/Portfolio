import { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import { errorNotifications } from "./Notifications";

const Certificates = ({ forwardedRef }) => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    async function getCertificates() {
      setCertificates(
        (
          await ApiService.getCertificates().catch((error) =>
            errorNotifications(
              error.response.data
                ? error.response.data.title ?? error.response.data
                : error.response.statusText
            )
          )
        ).data
      );
    }

    getCertificates();
  }, []);

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
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white rounded-lg shadow-md transform  transition-transform hover:scale-105">
              <img
                src={`data:image/png;base64,${certificate.image}`}
                alt={certificate.name}
                className="w-full  object-contain object-center cursor-pointer rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-zinc-700 mb-2">
                  {certificate.name}
                </h2>
                <p className="text-zinc-700 mb-4">{certificate.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
