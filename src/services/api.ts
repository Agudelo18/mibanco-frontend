import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // Ajusta si usas otro puerto
});

export const getCustomers = () => API.get("/customers");
export const makeTransfer = (data: {
    senderAccountNumber: string;
    receiverAccountNumber: string;
    amount: number;
  }) => API.post("/transactions/transfer", data);

  export const getTransactionsByAccount = (accountNumber: string) =>
    API.get(`/transactions/account/${accountNumber}`);
export const createCustomer = (data: {
  firstName: string;
  lastName: string;
  accountNumber: number;
  balance: number;
  }) => API.post("/customers", data);
export const getCustomerById = (id: number) => API.get(`/customers/${id}`);
  
  
