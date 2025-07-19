export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-white">
            Kasir Toko - Register
          </h1>
          {children}
        </div>
      </div>
    );
  }