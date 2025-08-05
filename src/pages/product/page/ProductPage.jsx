import React, { useEffect, useState } from "react";
import { fetchAllProducts, createProduct } from "../productApi";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    size: "",
    price: "",
    stock: "",
    image: null,
  });

  const getProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, val);
      });

      await createProduct(formData);
      setShowModal(false);
      setForm({
        name: "",
        code: "",
        size: "",
        price: "",
        stock: "",
        image: null,
      });
      getProducts();
    } catch (err) {
      console.error("Create product failed:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Product List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {product.code} • Size {product.size}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">
                    Rp {product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-700">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 text-black flex items-center justify-center backdrop-blur-sm bg-black/30">
         <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="code"
                placeholder="Product Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.code}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="size"
                placeholder="Size (e.g., M, L, XL)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.size}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price (e.g., 120000)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.price}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={form.stock}
                onChange={handleChange}
                required
              />

              {/* Custom File Input */}
              <div className="w-full">
                <label className="block text-gray-700 mb-1">Product Image</label>
                <div className="relative flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 bg-white cursor-pointer hover:border-blue-400 transition">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <span className="text-gray-500">Choose image...</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm3.293 2.707A1 1 0 018 7h4a1 1 0 01.707 1.707L10.414 11l2.293 2.293A1 1 0 0112 15h-4a1 1 0 01-.707-1.707L9.586 11 7.293 8.707z" />
                  </svg>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProductPage;
