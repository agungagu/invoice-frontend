import { Link } from "react-router-dom";

const SettingPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pengaturan Toko</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Contoh kartu pengaturan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold">Informasi Toko</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Atur nama, alamat, dan informasi lainnya.
          </p>
          <button className="mt-2 text-blue-600 hover:underline">
            Edit Informasi
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold">Manajemen Pengguna</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Tambahkan user kasir baru yang bisa login.
          </p>
          <Link
            to="/admin/register-kasir"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            Register User Baru
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
