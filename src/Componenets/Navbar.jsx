import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../Context/Firebasecontext';

const MyNavbar = () => {
  const firebase = useFirebase();
  const loggedIn =  firebase.isLoggedIn;

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">PageTurn</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/#home">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
           
          </Nav>
          <Nav className="ms-auto">
            {!loggedIn ? (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="">or</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/logout">Logout</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
