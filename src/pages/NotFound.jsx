import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white text-center p-6">
    <PageHead
      title="404 Error"
      description="Book cozy rooms & enjoy your stay."
    />

    <div className="max-w-lg mx-auto">
      <img
        src="https://cdn.pixabay.com/photo/2016/11/22/23/13/black-dog-1851106__340.jpg"
        alt="Lost Page"
        className="rounded-lg shadow-lg mb-8 w-80 transition-transform hover:scale-105"
      />
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-lg mb-6 opacity-80">
        The page you're looking for doesn't exist or might have been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary bg-white text-gray-900 px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 hover:bg-gray-300 shadow-md"
      >
        Go Back Home
      </Link>
    </div>
  </div>
);

export default NotFound;
