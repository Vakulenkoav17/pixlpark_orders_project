import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderList from './components/OrderList/OrderList.jsx';

function App() {
  const url = 'http://localhost:5000/get-api-orders';

  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios(url).then((res) => {
      setOrders(res.data);
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="App">
      <OrderList orders={orders} />
    </div>
  );
}

export default App;
