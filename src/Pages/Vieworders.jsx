import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/Firebasecontext'
import CardPage from '../Componenets/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const OrdersPage =()=> {
const fireabse = useFirebase();
const [books,setBooks]=useState([])

useEffect( ()=>{
    
    if(fireabse.isloggedIn){ 
        
   fireabse.fetchMyBooks(fireabse.user.uid)?.then((books)=>setBooks(books.docs))
    }
},[fireabse])

if(!fireabse.isloggedIn) return <h1>Please Login</h1>;

// console.log(books)
// console.log(user.displayName)
  return (
    <div>
      <CardGroup>
      {books.map((book)=>( 
        <CardPage link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()}/>
    ))}
      </CardGroup>
   
    </div>
  )
}

export default OrdersPage

