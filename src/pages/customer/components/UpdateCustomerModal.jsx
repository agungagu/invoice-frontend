import React, { useEffect, useState } from "react";

const UpdateCustomerModal = ({ isOpen, onClose, onSave, customer }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
  });

 useEffect(() => {
    if (customer){
        setFormData({
            id: customer.id,
            name: customer.name,
            phone: customer.phone,
            address: customer.address
        })
    }
 }, [customer])

 if(!isOpen) return null;

 const handleChange =(e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
 }

 const handleSubmit = (e) => {
    e.preventDefault();
    if(!customer) return;
    console.log("submit update", formData)
    onSave(formData);
    onClose();
 }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold text-black text-center mb-4">Edit Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">No HP</label>
            <input
              type="text"
              name="phone"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Alamat</label>
            <textarea
              name="address"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerModal;
