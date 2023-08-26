import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderDisplay from './dashboard/Orders/OrderDisplay';
import POS from './dashboard/POS/POS';
import CustomerDisplay from './dashboard/Customers/CustomerDisplay';
import AddUser from './dashboard/Users/AddUser';
import RegisterUser from './dashboard/Login/RegisterUser';
import AdminBoard from './dashboard/Products/AdminBoard'
import Login from './dashboard/Login/Login';
// import UserContext, { UserProvider, useUser } from './UserContext'; 

import Layout from './dashboard/Layout';
const UserContext = createContext();
function App() {
  // const  user  = useUser();
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <div className="App">   
      <div className="container">
        <Router>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Login />}
            />
            <Route path="/home" element={<Layout />} />
            <Route path="/products" element={<AdminBoard />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/order" element={<OrderDisplay />} />
            <Route path="/customer" element={<CustomerDisplay />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/register_user" element={<RegisterUser />} />
          </Routes>
        </Router>
      </div>
    </div>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
