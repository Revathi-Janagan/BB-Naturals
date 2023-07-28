import React from 'react';
import './App.css';
import AdminBoard from './dashboard/AdminBoard';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OrderDisplay from './dashboard/Orders/OrderDisplay';
import POS from './dashboard/POS/POS';
import CustomerDisplay from './dashboard/Customers/CustomerDisplay';



function App() {
  return (
    <div className="App">  
     <div className="container">
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminBoard />} />
            <Route path='/pos' element={<POS />}/>
            <Route path='/order' element={<OrderDisplay />} />
            <Route path='/customer' element= {<CustomerDisplay />} />
          </Routes>
          </BrowserRouter>  
     
    </div>
    </div>
  );
}

export default App;
