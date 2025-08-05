import axios from "../../config/axios";

export const getInvoiceCount = async () => {
  const res = await axios.get("/invoice/count");
  return res.data.data.count;
};

export const getRevenue = async () => {
  const res = await axios.get("/reports/revenue?range=monthly");
  return res.data.data.monthly;
};


export const getTotalProductSold = async () => {
  const res = await axios.get("/reports/total-sales");
  return res.data.data.totalSoldItems;
};