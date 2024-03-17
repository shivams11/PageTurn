import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../Context/Firebasecontext';
import {useNavigate} from  'react-router-dom'

const CardPage= (props)=>{
    const firebase = useFirebase();
    const navigate  = useNavigate()

    const [url,setURL]=useState(null);
    useEffect(() => {
      firebase.getImageURL(props.imageURL).then((url) => setURL(url));
      // console.log(props)
    }, []);
    
  return (
    <div>
       <Card className="m-2 p-2" style={{ width: '100%', maxWidth: '23rem' }}>
  {url ? <Card.Img variant="top" src={url} /> : null}
  <Card.Body>
    <Card.Title>{props.name}</Card.Title>
    <Card.Text>
      This book name is {props.name} and sold by {props.displayName} at the {props.price}
    </Card.Text>
    <Button variant="primary" onClick={() => navigate(props.lin)}>view</Button>
  </Card.Body>
</Card>

    </div>
  )
}

export default CardPage

