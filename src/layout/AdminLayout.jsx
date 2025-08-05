import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const getPageTitle = () => {
    const current = navItems.find((item) => location.pathname.startsWith(item.path));
    return current?.name || "Dashboard";
  };

  return (
    <div className="flex h-screen bg-[#0A1736] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F1E46] p-6 flex flex-col gap-6 flex-shrink-0">
        <div className="text-2xl font-bold mb-8">👕 Clothy</div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 p-2 rounded-lg transition-all",
                  isActive ? "bg-[#1D2E5F] font-semibold" : "hover:bg-[#1A254C]",
                ].join(" ")
              }
              end={item.path === "/admin"}
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

      {/* Konten kanan (scrollable) */}
      <div className="flex-1 h-screen overflow-y-auto p-6 hide-scrollbar">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8 sticky top-0 z-10 bg-[#0A1736]">
          <h1 className="text-2xl font-semibold">{getPageTitle()}</h1>
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

        {/* Halaman konten */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
