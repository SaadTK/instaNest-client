import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

axios.defaults.withCredentials = true; // send cookies on all requests

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5005/api/auth/register", {
        email,
        password,
        name,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5005/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5005/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5005/api/auth/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
