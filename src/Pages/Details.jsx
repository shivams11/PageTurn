import React, { useEffect, useState } from 'react'
import{ useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/Firebasecontext';
import Button from 'react-bootstrap/esm/Button';

const BookDetailsPage=()=>{

  const firebase = useFirebase();
  const params = useParams();
  const [data,setData]=useState(null)
  const [URL,setURL]=useState("")
  const [qnt,setQnt]=useState("")

useEffect(()=>{
  firebase.getBookById(params.bookId).then((value)=>setData(value.data()))
},[])

console.log(data) 
//yala console karvley tar pahun ghe kay datay yat and use kar mag tyanusar tyala ghe direct data. karun

useEffect(()=>{
  if(data){
    const imageurl =data.imageURL;
    firebase.getImageURL(imageurl).then((value)=> setURL(value))
  }
},[data])

if(data==null)  return(<h2> Loading .... !!!</h2>)


const placeorder =async ()=>{
  const result = await firebase.placeOrder(params.bookId,qnt)
  console.log("ordeer placed")
}


  return (
    <div className='container mt-5'>
    <h1>{data.name}</h1> <br></br>
      <img src={URL} width="50%"></img>
      <br />
      <h2>Details</h2> 
      <h5> Price : {data.price}</h5> <br />
      <h2>Owner : Details</h2>
      <h5>Name : {data.displayName}</h5> 
      <h5>Email : {data.userEmail}</h5> 
      <br />
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" onChange={(e)=> setQnt(e.target.value)} value={qnt} placeholder="Quantity" />
      </Form.Group>
      <Button variant='success' onClick={placeorder}>Buy Now</Button>

    </div>
  )
}

export default BookDetailsPage

