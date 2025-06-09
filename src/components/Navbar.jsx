import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          InstaNest
        </Link>
      </div>
      <div className="flex-none gap-3">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
          {user && (
            <li>
              <Link to="/bookings">My Bookings</Link>
            </li>
          )}
        </ul>
        {user ? (
          <>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={user?.photoURL} alt="user" />
              </div>
            </div>
            <button className="btn btn-sm btn-outline" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
