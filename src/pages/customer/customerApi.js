import axios from "../../config/axios";

export const fetchCustomers = async () => {
  const res = await axios.get("/customer/all");
  return res.data.data;
};

export const createCustomer = async (data) => {
  const res = await axios.post("/customer/create", data);
  return res.data;
};

export const updateCustomer = async (data) => {
  const res = await axios.put(`/customer/update/${data.id}`, data)
  return res.data;
} 

export const deleteCustomer = async (id) => {
  const res = await axios.delete(`/customer/delete/${id}`);
  return res.data;
};

export const getCustomerCount = async () => {
  const res = await axios.get("/customer/count");
  return res.data.data.count;
};
