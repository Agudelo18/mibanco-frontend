import React, { useState } from "react";
import { getTransactionsByAccount } from "../services/api";

interface Transaction {
  id: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  timestamp: string;
}

const TransactionHistory: React.FC = () => {
  const [account, setAccount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await getTransactionsByAccount(account);
      setTransactions(res.data);
      setMessage("");
    } catch (error) {
      setMessage("❌ No se encontraron transacciones.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Historial de Transacciones</h2>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Número de cuenta"
          className="flex-1 border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchTransactions}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Consultar
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando transacciones...</p>
      ) : transactions.length > 0 ? (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Origen</th>
              <th className="py-2 px-4 border">Destino</th>
              <th className="py-2 px-4 border">Monto</th>
              <th className="py-2 px-4 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="text-center">
                <td className="py-2 px-4 border">{t.id}</td>
                <td className="py-2 px-4 border">{t.senderAccountNumber}</td>
                <td className="py-2 px-4 border">{t.receiverAccountNumber}</td>
                <td className="py-2 px-4 border">${t.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border">{new Date(t.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : message ? (
        <p className="text-red-500">{message}</p>
      ) : null}
    </div>
  );
};

export default TransactionHistory;
