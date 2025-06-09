import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import PageHead from "../components/PageHead";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setForm({ ...form, password });

    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (/[A-Z]/.test(password) && /\d/.test(password)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    if (passwordStrength === "Weak") {
      return toast.error("Password must be stronger.");
    }
    try {
      await register(email, password, name);
      toast.success("Registered! Now log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <PageHead
        title="Register"
        description="Book cozy rooms & enjoy your stay."
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 transition-transform scale-95 hover:scale-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create InstaNest Account
        </h2>

        <input
          type="text"
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input input-bordered w-full"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={handlePasswordChange}
          className="input input-bordered w-full"
        />
        <p
          className={`text-sm font-semibold ${
            passwordStrength === "Weak"
              ? "text-red-500"
              : passwordStrength === "Medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          Password Strength: {passwordStrength}
        </p>

        <button
          type="submit"
          className="btn btn-primary w-full px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
        >
          Register
        </button>

        {/* Social Signup Options */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="btn btn-outline flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>
          {/* <button className="btn btn-outline flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaFacebook className="text-blue-600" /> Sign up with Facebook
          </button> */}
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
