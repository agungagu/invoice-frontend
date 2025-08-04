import axios from "../../config/axios";

export const getInvoiceCount = async () => {
  const res = await axios.get("/invoice/count");
  return res.data.data.count;
};
