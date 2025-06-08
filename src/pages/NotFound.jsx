import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center">
    <img src="https://http.cat/404" alt="404 not found" className="rounded-lg mb-8" />
    <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
    <Link to="/" className="btn btn-primary">Back to Home</Link>
  </div>
);

export default NotFound;
