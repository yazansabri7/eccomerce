import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import navImage from '../../../assets/navLogo.svg'
import { NavDropdown } from 'react-bootstrap';
import '../navbar/navbar.css'
export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="z-3 bg-body-tertiary py-3 bg-light-subtle shadow-sm p-3 mb-5 bg-body-tertiary rounded position-sticky top-0">
    <Container>
      <Navbar.Brand href="#home">
        <img src={navImage} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">HOME</Nav.Link>
          <NavDropdown title="PAGES" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to={'/login'}>LOGIN</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={'/register'}>REGISTER</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#link">PRODUCTS</Nav.Link>
          <Nav.Link href="#link">CONTACT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
