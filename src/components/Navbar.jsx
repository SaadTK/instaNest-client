import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-primary">
          InstaNest
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <li>
            <Link to="/rooms" className="hover:text-primary transition">
              Rooms
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/bookings" className="hover:text-primary transition">
                My Bookings
              </Link>
            </li>
          )}
        </ul>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Profile Avatar */}

              <span className="text-lg font-semibold">
                {user.displayName || user.name || user.email || "Guest"}
              </span>

              <button
                className="btn btn-sm btn-outline hover:bg-primary hover:text-white transition"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary text-white">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white shadow-md py-4 space-y-4">
          <li>
            <Link to="/rooms" className="hover:text-primary transition">
              Rooms
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/bookings" className="hover:text-primary transition">
                My Bookings
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
