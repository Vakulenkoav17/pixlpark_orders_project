import React , {useEffect, useState} from "react";
// import orderList from "./components/orderList"
import axios from 'axios'



function App() {
  
  const url = "http://localhost:5000/get-api-orders"

  const [orders, setOrders]= useState([])

  useEffect(()=>{
    axios(url).then((res)=>{
      setOrders(res.data)
    })
  })  
    
    return (
    <div className="App">
     <ul>
       
       {orders.map( item =>{ 

       return <li>{item.Title}</li> })}
       
     </ul>
    </div>
  );
}

export default App;
