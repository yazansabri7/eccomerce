import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import cart from '../../../src/assets/cart.svg';
import navImage from '../../../src/assets/navLogo.svg';


export default function NavbarNotLogin() {
   
    const [active , setActive] = useState('home')
    const bar =(link)=>{
      setActive(link);
  
    }
    return (
      <Navbar
        expand="lg"
        className="z-3 bg-body-tertiary py-3 bg-light-subtle shadow-sm p-3 mb-5 bg-body-tertiary rounded position-sticky top-0"
      >
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <img src={navImage} alt="" />
          </Navbar.Brand>
          
          <div className="text-uppercase d-flex flex-column me-4">
            <span className="">WELCOME</span>
            <div className="welcome">
                <Link to={'/auth/login'} className="fw-bold text-black">LOGIN /</Link>
                <Link to={'/auth/register'} className="fw-bold text-black"> REGISTER</Link>
            </div>
          </div>
          
        </Container>
      </Navbar>
    );
}
