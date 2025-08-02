import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import AuthLayout from "../../../layout/AuthLayout";

const RegisterKasirPage = () => {
    const { token } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "kasir" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/users", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage("Berhasil menambahkan kasir.");
        } catch (err) {
            setMessage("Gagal menambahkan kasir.");
        }
    };

    return (
        <div className="min-h-screen bg-transparent px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-white">
            Kasir Toko - Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Daftar
          </button>
          <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-300">
            Sudah punya akun? <a href="/login" className="text-blue-600 dark:text-blue-400 underline">Login</a>
          </p>
        </form>
        </div>
        </div>
    );
};

export default RegisterKasirPage;
