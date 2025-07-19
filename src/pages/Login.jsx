import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password }); // asumsi kamu pakai AuthContext
      navigate("/admin");
    } catch (err) {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            TokoPakaian🛍️
          </div>
          <p className="text-slate-600 dark:text-slate-300">Login ke sistem kasir</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-200 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Ingat saya
            </label>
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
