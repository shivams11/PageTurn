import React, { useState ,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/Firebasecontext';
import { useNavigate } from 'react-router';


const Register= ()=> {
    const firebase = useFirebase();
    console.log(firebase)
    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");

    const handlesubmit = async (e)=>{
      e.preventDefault();
      console.log("signing up")
      const result = await firebase.signupwithemail(email,pass);
      console.log("success")
      console.log(result);
    }

    useEffect(()=>{
      if(firebase.isloggedIn){
          navigate("/")
      }
  },[firebase,navigate])

  return (
    <div className='container'>
    <h3>Sign up</h3> <br />
    <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
  
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(e)=> setPass(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <br />
    <h5>OR</h5> <br />
    <Button variant='danger' onClick={async()=> await firebase.signinwithGoogle()}>Signun Using Google</Button>


    </div>
  )
}

export default Register

