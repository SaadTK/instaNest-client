// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-10">
      <div className="footer max-w-6xl mx-auto">
        <div>
          <span className="footer-title">InstaNest</span>
          <p>Your perfect stay awaits. Book your next hotel with InstaNest.</p>
        </div>
        <div>
          <span className="footer-title">Navigation</span>
          <a href="/" className="link link-hover">
            Home
          </a>
          <a href="/rooms" className="link link-hover">
            Rooms
          </a>
          <a href="/bookings" className="link link-hover">
            My Bookings
          </a>
        </div>
        <div>
          <span className="footer-title">Contact</span>
          <p>Email: contact@instanest.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <p className="text-center mt-6">
        &copy; {new Date().getFullYear()} InstaNest. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
