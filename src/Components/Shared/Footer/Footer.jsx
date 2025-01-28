import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import logo from "../../../assets/forum.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100  text-gray-500 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 md:mb-0">
             <img  className="md:w-44 w-20 text-3xl font-bold text-black" src={logo} alt="" />
            {/* <p className="font-bold text-2xl text-white  "> Forum </p> */}
          
        </div>
     <div className="grid grid-cols-1 md:grid-cols-2 md:flex md:justify-between">
     <div>
       <h2 className="text-2xl font-bold text-black mt-2">About Us</h2>
          <p className="mt-2 text-sm">
            Welcome to our community! We are dedicated to providing a platform
            where people can connect, share ideas, and grow together.
          </p>
       </div>
       <div className="mb-6 md:mb-0 md:ml-2">
          <h2 className="text-2xl font-bold text-black mt-2 ">Follow Us</h2>
          <div className="flex mt-2 space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-500 transition"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-400 transition"
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
              className="hover:text-lime-700 transition"
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
     </div>
        <div className="md:mt-6 mt-3">
          <h2 className="text-2xl font-bold text-black mt-2">Contact Us</h2>
          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2  bg-gray-200 text-black rounded focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 bg-gray-200 text-black rounded focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 bg-gray-200 text-black rounded h-24 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <button
              type="submit"
              className="w-full p-2 bg-opacity-60 bg-lime-500 text-black rounded hover:bg-lime-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-600 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Forum. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
