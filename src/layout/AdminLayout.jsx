import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Kasir Toko</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? "active-link" : ""}>
            Home
          </NavLink>
          <NavLink to="/admin/customer" className={({ isActive }) => isActive ? "active-link" : ""}>
            Customer
          </NavLink>
          <NavLink to="/admin/invoice" className={({ isActive }) => isActive ? "active-link" : ""}>
            Invoice
          </NavLink>
          <NavLink to="/admin/product" className={({ isActive }) => isActive ? "active-link" : ""}>
            Product
          </NavLink>
          <NavLink to="/admin/report" className={({ isActive }) => isActive ? "active-link" : ""}>
            Report
          </NavLink>
          <NavLink to="/admin/setting" className={({ isActive }) => isActive ? "active-link" : ""}>
            Setting
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
