import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { name: "Clientes", path: "/" },
    { name: "Crear Cliente", path: "/create-customer" },
    { name: "Transferencias", path: "/transfer" },
    { name: "Transacciones", path: "/transactions" },
    { name: "Buscar Cliente", path: "/find-customer" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-6">
      <h1 className="text-xl font-bold text-center">Mi Banco</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2 rounded hover:bg-gray-700 ${
              pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
       
      </nav>
    </div>
  );
};

export default Sidebar;
