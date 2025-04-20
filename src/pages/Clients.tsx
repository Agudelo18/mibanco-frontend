import { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
  id: number;
  accountNumber: string;
  firstName: string;
  lastName: string;
  balance: number;
}

const Clients = () => {
  const [clients, setClients] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/customers")
      .then(response => {
        setClients(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar clientes", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Cuenta</th>
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Apellido</th>
                <th className="py-2 px-4">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t hover:bg-gray-100">
                  <td className="py-2 px-4">{client.id}</td>
                  <td className="py-2 px-4">{client.accountNumber}</td>
                  <td className="py-2 px-4">{client.firstName}</td>
                  <td className="py-2 px-4">{client.lastName}</td>
                  <td className="py-2 px-4">${client.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Clients;
