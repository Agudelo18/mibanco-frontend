import { useState } from "react";
import { createCustomer } from "../services/api";

const CreateCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer({
        firstName,
        lastName,
        accountNumber,
        balance: parseFloat(balance),
      });

      setMessage("✅ Cliente creado exitosamente");
      setFirstName("");
      setLastName("");
      setAccountNumber("");
      setBalance("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al crear el cliente");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo cliente</h2>
      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded shadow max-w-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Apellido</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Número de cuenta</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Saldo inicial</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Crear cliente
        </button>
        {message && (
          <p className="mt-2 text-center font-semibold">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateCustomer;

