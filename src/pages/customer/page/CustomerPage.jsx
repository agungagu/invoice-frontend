import React, { useState, useEffect } from "react";
import { fetchCustomers, createCustomer, deleteCustomer } from "../customerApi";
import AddCustomerModal from "../components/AddCustomerModal";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCustomers = async () => {
    try {
      const response = await fetchCustomers();
  
      // Jika API mereturn { customers: [...] }
      const data = Array.isArray(response)
        ? response
        : Array.isArray(response.customers)
          ? response.customers
          : [];
  
      setCustomers(data);
    } catch (error) {
      console.error("Gagal mengambil data pelanggan:", error);
      setCustomers([]); // fallback agar .map tidak error
    }
  };
  

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSave = async (newCustomer) => {
    try {
      await createCustomer(newCustomer);
      setIsModalOpen(false); // Tutup modal setelah simpan
      loadCustomers(); // Refresh data
    } catch (error) {
      console.error("Gagal menambah pelanggan:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus customer ini?")) {
      try {
        await deleteCustomer(id);
        loadCustomers();
      } catch (error) {
        console.error("Gagal menghapus pelanggan:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tambah Customer
        </button>
      </div>

      <div className="overflow-x-auto text-black">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">No HP</th>
              <th className="p-3 border">Alamat</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="p-3 border">{customer.name}</td>
                <td className="p-3 border">{customer.phone}</td>
                <td className="p-3 border">{customer.address}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default CustomerPage;
