import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">InstaNest</h2>
          <p className="mt-2 text-gray-400">
            Your perfect stay awaits. Book your next hotel with InstaNest.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Navigation</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/" className="hover:text-primary transition">
                Home
              </a>
            </li>
            <li>
              <a href="/rooms" className="hover:text-primary transition">
                Rooms
              </a>
            </li>
            <li>
              <a href="/bookings" className="hover:text-primary transition">
                My Bookings
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white">Contact</h3>
          <p className="mt-2">Email: contact@instanest.com</p>
          <p>Phone: +1 234 567 890</p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-xl hover:text-blue-500 transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl hover:text-blue-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-blue-700 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center mt-8 text-gray-500">
        &copy; {new Date().getFullYear()} InstaNest. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
