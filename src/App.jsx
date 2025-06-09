// src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen pt-4">
        <Outlet />
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default App;
