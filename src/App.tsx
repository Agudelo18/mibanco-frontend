import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";
import CreateCustomer from "./pages/createCustomer";
import FindCustomer from "./pages/FindCustomer";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<Clients />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/create-customer" element={<CreateCustomer />} />
            <Route path="/find-customer" element={<FindCustomer />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
