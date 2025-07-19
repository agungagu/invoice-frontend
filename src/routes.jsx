import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import CustomerPage from "./pages/customer/page/CustomerPage";
import InvoicePage from "./pages/invoice/page/InvoicePage";
import ProductPage from "./pages/product/page/ProductPage";
import ReportPage from "./pages/report/page/ReportPage";
import SettingPage from "./pages/setting/page/SettingPage";
import HomePage from "./pages/home/page/HomePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "customer",
        element: <CustomerPage />,
      },
      {
        path: "invoice",
        element: <InvoicePage />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin" replace />,
  },
]);

export default router;
