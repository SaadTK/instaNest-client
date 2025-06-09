// import React from "react";
// import { Link } from "react-router-dom";

// const NotFound = () => (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white text-center p-6">
//     <img
//       src="https://http.cat/404"
//       alt="404 not found"
//       className="rounded-lg shadow-lg mb-8 w-80"
//     />
//     <h1 className="text-5xl font-extrabold mb-4">Oops! Page Not Found</h1>
//     <p className="text-lg mb-6 opacity-80">
//       The page you're looking for doesn't exist or might have been moved.
//     </p>
//     <Link
//       to="/"
//       className="btn btn-primary bg-white text-indigo-800 px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 hover:bg-gray-200 shadow-md"
//     >
//       Go Back Home
//     </Link>
//   </div>
// );

// export default NotFound;
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white text-center p-6">
    <img
      src="https://http.cat/404"
      alt="404 not found"
      className="rounded-lg shadow-lg mb-8 w-80"
    />
    <h1 className="text-5xl font-extrabold mb-4">Oops! Page Not Found</h1>
    <p className="text-lg mb-6 opacity-80">
      The page you're looking for doesn't exist or might have been moved.
    </p>
    <Link
      to="/"
      className="btn btn-primary bg-white text-indigo-800 px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 hover:bg-gray-200 shadow-md"
    >
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
