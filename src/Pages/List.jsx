import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/Firebasecontext';

const Listingpage=()=> {

    const firebase = useFirebase();

    const [name , setName]=useState('');
    const [isbnNumber,setisbnNumber]=useState('')
    const [price,setPrice]= useState('')
    const [coverpic, setCoverpic]=useState("")

    const handlesubmit =async (e)=>{
          e.preventDefault();
         await firebase.handlecreatenewListing(name,isbnNumber,price,coverpic)
          setCoverpic("") ; setisbnNumber("") ; setPrice("") ; setName("")
          alert("Book Registered Succesfull")
    }


  return (
    <div className='container'>
      
      <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Book Namme" />
  
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN Number</Form.Label>
        <Form.Control type="text" value={isbnNumber} onChange={(e)=> setisbnNumber(e.target.value)} placeholder="Enter ISBN Number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" value={price} onChange={(e)=> setPrice(e.target.value)} placeholder="Enter Price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cover pic</Form.Label>
        <Form.Control type="file"  onChange={(e)=> setCoverpic(e.target.files[0])} placeholder="Add Cover Pic" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </div>
  )
}

export default Listingpage

