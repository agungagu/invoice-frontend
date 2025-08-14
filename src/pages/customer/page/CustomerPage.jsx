// import React, { useState, useEffect } from "react";
// import { fetchCustomers, createCustomer, deleteCustomer } from "../customerApi";
import AddCustomerModal from "../components/AddCustomerModal";
import { useCreateCustomer } from "../../../hooks/customer/useCreateCustomers";
import { useCustomers } from "../../../hooks/customer/useCustomers";
import { useState } from "react";
import { useUpdateCustomer } from "../../../hooks/customer/useUpdateCustomer";
import UpdateCustomerModal from "../components/UpdateCustomerModal";
import { useDeleteCustomer } from "../../../hooks/customer/useDeletecustomer";

const CustomerPage = () => {
  // const loadCustomers = async () => {
  //   try {
  //     const response = await fetchCustomers();
  
  //     // Jika API mereturn { customers: [...] }
  //     const data = Array.isArray(response)
  //       ? response
  //       : Array.isArray(response.customers)
  //         ? response.customers
  //         : [];
  
  //     setCustomers(data);
  //   } catch (error) {
  //     console.error("Gagal mengambil data pelanggan:", error);
  //     setCustomers([]); // fallback agar .map tidak error
  //   }
  // };
  

  // useEffect(() => {
  //   loadCustomers();
  // }, []);

  // const handleSave = async (newCustomer) => {
  //   try {
  //     await createCustomer(newCustomer);
  //     setIsModalOpen(false); // Tutup modal setelah simpan
  //     loadCustomers(); // Refresh data
  //   } catch (error) {
  //     console.error("Gagal menambah pelanggan:", error);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (confirm("Yakin ingin menghapus customer ini?")) {
  //     try {
  //       await deleteCustomer(id);
  //       loadCustomers();
  //     } catch (error) {
  //       console.error("Gagal menghapus pelanggan:", error);
  //     }
  //   }
  // };

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const { data: customers = [], isLoading, isError, error} = useCustomers();
  const {mutateAsync: createCustomer, isPending: isCreating} = useCreateCustomer();
  const {mutateAsync: updateCustomer, isPending: isUpdating} = useUpdateCustomer();
  const {mutateAsync: deleteCustomer, isPending: isDeleting} = useDeleteCustomer();



  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!customers) return <div>No customers found</div>

  const addCustomer = async (newCustomer) => {
    try {
      await createCustomer(newCustomer);
      setIsModalOpen(false)
    } catch (error) {
      console.error("Gagal menambah data customer: ", error)
    }
  }

  const handleUpdateCustomer = async (updateData) => {
      try {
        await updateCustomer(updateData);
        setIsUpdateModalOpen(false)
        setSelectedCustomer(null)
      } catch (error) {
        console.error("Gagal mengubah data : ", error)
      }
  }

  const handleDelete = async (customer) => {
    if (confirm(`Yakin ingin menghapus data ${customer.name}?`)){
      try {
        await deleteCustomer(customer.id)
      } catch (error) {
        console.error("Gagal delete data")
      }
    }
  }


  return (
    <div className="p-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-semibold text-white">Pelanggan</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Tambah Pelanggan
      </button>
    </div>
  
    {/* Table */}
    <div className="overflow-x-auto rounded-[10px] shadow-md border-none">
      <table className="min-w-full text-sm text-gray-700 bg-white rounded-[10px]">
        <thead className="text-gray-700 text-left uppercase text-xs tracking-wider rounded-[10px]">
          <tr className="bg-blue-950 text-white rounded-[10px]">
            <th className="p-4 border-b">Nama</th>
            <th className="p-4 border-b">No HP</th>
            <th className="p-4 border-b">Alamat</th>
            <th className="p-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50 transition">
              <td className="p-4 border-b border-gray-300">{customer.name}</td>
              <td className="p-4 border-b border-gray-300">{customer.phone}</td>
              <td className="p-4 border-b border-gray-300">{customer.address}</td>
              <td className="p-4 border-b border-gray-300">
                <button
                  // onClick={() => handleDelete(customer.id)}
                  onClick={() => {
                    setSelectedCustomer(customer)
                    setIsUpdateModalOpen(true)
                  }}
                  className="px-3 py-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-xs transition"
                >
                  Edit
                </button>
                <button
                   onClick={() => handleDelete(customer)}
                  className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs transition"
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
        onSave={addCustomer}
      />

<UpdateCustomerModal
  isOpen={isUpdateModalOpen}
  onClose={() => {
    setIsUpdateModalOpen(false);
    setSelectedCustomer(null);
  }}
  customer={selectedCustomer}
  onSave={handleUpdateCustomer}
/>
    </div>
  );
};

export default CustomerPage;
