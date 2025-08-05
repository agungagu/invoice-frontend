import axios from "../../config/axios";

export const fetchAllProducts = async () => {
  const res = await axios.get("/product/getAllProduct");
  return res.data.data;
};

export const createProduct = async (formData) => {
  const res = await axios.post("/product/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (id, formData) => {
  const res = await axios.put(`/product/updateProduct/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`/product/deleteProduct/${id}`);
  return res.data;
};
