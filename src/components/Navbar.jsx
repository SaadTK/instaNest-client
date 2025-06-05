import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">InstaNest</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        {user && <Link to="/my-bookings">My Bookings</Link>}
        {user ? (
          <>
            <span className="text-gray-600">{user.email}</span>
            <button onClick={logout} className="text-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
