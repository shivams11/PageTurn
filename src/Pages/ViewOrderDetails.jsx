import React, { useEffect, useState } from 'react'
import {useParams} from  'react-router-dom'
import { useFirebase } from '../Context/Firebasecontext'

const ViewOrderDetails=()=> {
 
    const params=useParams()
    // console.log(params)
    const firebase = useFirebase();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
      firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
    }, []);

// console.log(orders)

  return (
    <div className="container mt-3">
    <h1>Orders</h1>
    {orders.map((order) => {
      const data = order.data();
      return (
        <div
          key={order.id}
          className="mt-5"
          style={{ border: "1px solid", padding: "10px" }}
        >
          <h5>Order By: {data.displayName}</h5>
          <h6>Qty: {data.qnt}</h6>
          <p>Email: {data.userEmail}</p>
        </div>
      );
    })}
  </div>
  )
}

export default ViewOrderDetails

