import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import PageHead from "../components/PageHead";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <PageHead
        title="InstaNest | Login"
        description="Book cozy rooms & enjoy your stay."
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 transition-transform scale-95 hover:scale-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to InstaNest
        </h2>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          className="btn btn-primary w-full px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
        >
          Login
        </button>

        {/* Social Login Options */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="btn btn-outline flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaGoogle className="text-red-500" /> Login with Google
          </button>
          {/* <button className="btn btn-outline flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaFacebook className="text-blue-600" /> Login with Facebook
          </button> */}
        </div>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
