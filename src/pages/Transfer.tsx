import { useState } from "react";
import axios from "axios";

const Transfer = () => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/transactions/transfer", {
        senderAccountNumber: sender,
        receiverAccountNumber: receiver,
        amount: parseFloat(amount),
      });

      setMessage("✅ Transferencia realizada con éxito");
      setSender("");
      setReceiver("");
      setAmount("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al realizar la transferencia");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Transferencia entre cuentas</h2>
      <form onSubmit={handleTransfer} className="bg-white p-6 rounded shadow max-w-md space-y-4">
        <div>
          <label className="block mb-1 font-medium">Cuenta Origen</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Cuenta Destino</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Monto</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Transferir
        </button>
        {message && <p className="mt-2 text-center font-semibold">{message}</p>}
      </form>
    </div>
  );
};

export default Transfer;
