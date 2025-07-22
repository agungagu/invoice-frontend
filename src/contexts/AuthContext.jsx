import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      console.log("✅ Checking auth with token:", token);
      // Kamu bisa fetch user profile dari endpoint lain jika perlu
    }
  }, [token]);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      // Cek struktur response sesuai backend
      console.log("Login response:", res.data);

      const receivedToken = res.data?.data?.token;
      if (!receivedToken) {
        throw new Error("Token tidak ditemukan di response");
      }

      console.log("✅ Login success, token saved:", receivedToken);
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      setUser(res.data.data.user); // Simpan user jika diperlukan
    } catch (err) {
      console.error("❌ Login error:", err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    console.log("🟡 Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
