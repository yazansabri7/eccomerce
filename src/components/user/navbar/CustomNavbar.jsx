import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import navImage from '../../../assets/navLogo.svg'
import { NavDropdown } from 'react-bootstrap';
import '../navbar/navbar.css'
import cart from '../../../assets/cart.svg'
export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="z-3 bg-body-tertiary py-3 bg-light-subtle shadow-sm p-3 mb-5 bg-body-tertiary rounded position-sticky top-0">
    <Container>
      <Navbar.Brand href="#home">
        <img src={navImage} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ms-auto">
          <Nav.Link as={Link} to={'/'} className='fw-bold'>HOME</Nav.Link>
          <NavDropdown title="PAGES" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to={'/auth/login'}>LOGIN</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={'/auth/register'}>REGISTER</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to={'/categories'}>CATEGORIES</Nav.Link>
          <Nav.Link as={Link} to={'/products'}>PRODUCTS</Nav.Link>
          <Nav.Link href="#home" className='d-none cart-word'>CART</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <div className="cart w-25 d-flex justify-content-end">
        <img src={cart} alt="" className='img-fluid'/>
      </div>

    </Container>
  </Navbar>
  )
}
