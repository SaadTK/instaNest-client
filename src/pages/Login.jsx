import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login to InstaNest</h2>
        <input type="email" required placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} className="input input-bordered w-full" />
        <input type="password" required placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Login</button>
        <p className="text-sm text-center">
          Don’t have an account? <Link to="/register" className="text-primary font-semibold">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
