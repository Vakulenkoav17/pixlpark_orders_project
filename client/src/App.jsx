import React , {useCallback, useEffect, useMemo, useState} from "react";
import OrderList from "./components/OrderList"
import axios from 'axios'




function App() {
  
  const url = "http://localhost:5000/get-api-orders"

  const [orders, setOrders]= useState([])

  const getOrders = useCallback(() => {axios(url).then((res)=>{setOrders(res.data)})} ,[]) 
  
  useEffect(()=>{
    getOrders()
  })  
    
  console.log(orders[0].Shipping)
    return (
    <div className="App">
      <OrderList orders = {orders}/>
    </div>
  );
}

export default App;
