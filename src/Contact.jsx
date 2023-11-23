import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import emailjs from "emailjs-com";
import { errorNotifications, successNotification } from "./Notifications";
import ApiService from "./services/ApiService";

const Contact = ({ forwardedRef }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const templateParams = {
        senderName: name,
        senderEmail: email,
        message: message,
      };

      await ApiService.sendEmail(templateParams);

      successNotification("Email sent successfully!");
    } catch (error) {
      errorNotifications(
        "An error occurred while sending the email. Please try again later."
      );
    }
  };

  return (
    <div className="bg-amber-500 py-10" ref={forwardedRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 section">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-offWhite mb-8">Contact Me</h1>
          <div className="flex items-center mb-4">
            <a
              href="https://github.com/HChipev"
              target="_blank"
              className="mr-4 text-3xl text-offWhite hover:text-blue transition duration-300">
              <FontAwesomeIcon className="w-8 h-8" icon="fa-brands fa-github" />
            </a>
            <a
              href="https://www.instagram.com/_hchipev_/"
              target="_blank"
              className="mr-4 text-3xl text-offWhite hover:text-blue transition duration-300">
              <FontAwesomeIcon
                className="w-8 h-8"
                icon="fa-brands fa-instagram"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/hristo-chipev/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 text-3xl text-offWhite hover:text-blue transition duration-300">
              <FontAwesomeIcon
                className="w-8 h-8"
                icon="fa-brands fa-linkedin"
              />
            </a>
            <a
              href="https://www.buymeacoffee.com/hchipev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-offWhite hover:text-blue transition duration-300">
              <FontAwesomeIcon
                className="w-8 h-8 pb-1"
                icon="fa-solid fa-mug-hot"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h2 className="text-xl font-bold text-offWhite mb-4">
              Send Me an Email
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                rows="5"
                className="py-2 px-4 mb-3 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-white text-amber-500 rounded-md transition-all duration-500 ease-in-out hover:bg-blue hover:text-white">
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
