import { useState } from "react";
import axios from "axios";

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  balance: number;
};

const FindCustomer = () => {
  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [message, setMessage] = useState("");

  const fetchCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomer(null);
    setMessage("");

    try {
      const response = await axios.get<Customer>(
        `http://localhost:8080/api/customers/${customerId}`
      );
      setCustomer(response.data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Cliente no encontrado");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Buscar Cliente por ID</h2>
      <form onSubmit={fetchCustomer} className="mb-6 max-w-md">
        <label className="block mb-1 font-medium">ID del cliente:</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            className="border border-gray-300 px-4 py-2 rounded w-full"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>
      </form>

      {message && <p className="mb-4 text-red-500 font-semibold">{message}</p>}

      {customer && (
        <div className="bg-white shadow rounded p-4 max-w-md">
          <h3 className="text-xl font-semibold mb-2">Información del cliente</h3>
          <p><strong>ID:</strong> {customer.id}</p>
          <p><strong>Nombre:</strong> {customer.firstName} {customer.lastName}</p>
          <p><strong>Número de cuenta:</strong> {customer.accountNumber}</p>
          <p><strong>Saldo:</strong> ${customer.balance.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default FindCustomer;

