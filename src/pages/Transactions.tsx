import { useState } from "react";
import axios from "axios";

type Transaction = {
  id: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  timestamp: string;
};

const Transactions = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState("");

  const fetchTransactions = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get<Transaction[]>(
        `http://localhost:8080/api/transaction/${accountNumber}`
      );
      setTransactions(response.data);
      setMessage(response.data.length ? "" : "No se encontraron transacciones.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al buscar transacciones");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Historial de Transacciones</h2>
      <form onSubmit={fetchTransactions} className="mb-6 max-w-md">
        <label className="block mb-1 font-medium">Número de cuenta:</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded w-full"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
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

      {transactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Origen</th>
                <th className="px-4 py-2">Destino</th>
                <th className="px-4 py-2">Monto</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="px-4 py-2">{tx.id}</td>
                  <td className="px-4 py-2">{tx.senderAccountNumber}</td>
                  <td className="px-4 py-2">{tx.receiverAccountNumber}</td>
                  <td className="px-4 py-2">${tx.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {new Date(tx.timestamp).toLocaleString("es-CO")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
