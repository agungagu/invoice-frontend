import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Bell,
  DollarSign,
  Users,
  FileText,
  BarChart,
  Settings,
  Package,
  Pause,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <BarChart size={18} />, path: "/admin" },
  { name: "Customers", icon: <Users size={18} />, path: "/admin/customer" },
  { name: "Invoices", icon: <FileText size={18} />, path: "/admin/invoice" },
  { name: "Products", icon: <Package size={18} />, path: "/admin/product" },
  { name: "Reports", icon: <Pause size={18} />, path: "/admin/report" },
  { name: "Settings", icon: <Settings size={18} />, path: "/admin/setting" },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // atau panggil context logout()
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#0A1736] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F1E46] p-6 flex flex-col gap-6">
        <div className="text-2xl font-bold mb-8">👕 Clothy</div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-all ${
                  isActive ? "bg-[#1D2E5F] font-semibold" : "hover:bg-[#1A254C]"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="text-white" />
            <div className="flex items-center gap-2 bg-[#1D2E5F] px-3 py-2 rounded-full">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-300">Cashier</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
