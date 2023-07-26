import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import emailjs from "emailjs-com";
import { errorNotifications } from "./Notifications";

const Contact = ({ forwardedRef }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      };
      debugger;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;

      await emailjs.send(serviceId, templateId, templateParams, userId);

      successNotification("Email sent successfully!");
    } catch (error) {
      console.log(error);
      errorNotifications(
        "An error occurred while sending the email. Please try again later."
      );
    }
  };

  return (
    <div className="bg-lightGray py-10" ref={forwardedRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-amber-500 mb-8">Contact</h1>
          <div className="flex items-center mb-4">
            <a
              href="https://github.com/HChipev"
              target="_blank"
              className="mr-4 text-3xl text-amber-500 hover:text-blue transition duration-300">
              <FontAwesomeIcon icon="fa-brands fa-github" />
            </a>
            <a
              href="https://www.instagram.com/_hchipev_/"
              target="_blank"
              className="mr-4 text-3xl text-amber-500 hover:text-blue transition duration-300">
              <FontAwesomeIcon icon="fa-brands fa-instagram" />
            </a>
            <a
              href="https://www.linkedin.com/in/hristo-chipev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-amber-500 hover:text-blue transition duration-300">
              <FontAwesomeIcon icon="fa-brands fa-linkedin" />
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h2 className="text-xl font-bold text-zinc-700 mb-4">
              Send Me an Email
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
