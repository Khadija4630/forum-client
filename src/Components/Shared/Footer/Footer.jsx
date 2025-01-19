import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 md:flex md:justify-between md:items-start">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold text-white">About Us</h2>
          <p className="mt-2 text-sm">
            Welcome to our community! We are dedicated to providing a platform
            where people can connect, share ideas, and grow together.
          </p>
        </div>
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold text-white">Follow Us</h2>
          <div className="flex mt-2 space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Contact Us</h2>
          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 bg-gray-700 text-white rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-600 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Website. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
