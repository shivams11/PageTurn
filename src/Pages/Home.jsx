import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/Firebasecontext'
import CardPage from '../Componenets/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const HomePage =()=> {

const firebase= useFirebase();
const [books,setBooks]=useState([])

useEffect(()=>{
    firebase.listallBooks()
    .then((books)=>  setBooks(books.docs))
    // or books.docs.docs[0].data()
},[])

  return (
    <div className='container mt-5 '>
    <CardGroup>
        {books.map((book)=> <CardPage link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}/>)}
    </CardGroup>
    
    </div>
  )
}

export default HomePage

