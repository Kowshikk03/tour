
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navbarout = () => {
  return (
    <div>
           <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#" className='mx-2'>I-Tourism</Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
             <Nav className="mr-auto">
                 <Nav.Link href="/home">Home</Nav.Link>
                 <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
             <Nav.Link href="#about">About</Nav.Link>
              </Nav>
             </Navbar.Collapse>
           </Navbar>
        </div>
  );
};

export default Navbarout;