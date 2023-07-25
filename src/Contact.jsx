import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = ({ forwardedRef }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission (you can use a library like Formik or implement your backend logic here)
  };

  return (
    <div className="bg-lightGray py-10" ref={forwardedRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-amber-500 mb-8">Contact</h1>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-700 mb-4">Find Me On</h2>
            <div className="flex items-center mb-4">
              <a
                href="https://github.com/HChipev"
                target="_blank"
                className="mr-4 text-3xl text-amber-500 hover:text-amber-600 transition">
                <FontAwesomeIcon icon="fa-brands fa-github" />
              </a>
              <a
                href="https://www.instagram.com/_hchipev_/"
                target="_blank"
                className="mr-4 text-3xl text-amber-500 hover:text-amber-600 transition">
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/in/hristo-chipev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-amber-500 hover:text-amber-600 transition">
                <FontAwesomeIcon icon="fa-brands fa-linkedin" />
              </a>
            </div>
          </div>
          {/* Email Form */}
          <div>
            <h2 className="text-xl font-bold text-zinc-700 mb-4">
              Send Me an Email
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Your Name"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
