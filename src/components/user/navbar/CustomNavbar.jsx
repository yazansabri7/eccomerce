import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import navImage from "../../../assets/navLogo.svg";
import { Dropdown, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import cart from "../../../assets/cart.svg";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import imageProfile from '../../../assets/profile.jpg'
export default function CustomNavbar() {
  const { cartCount } = useContext(CartContext);
  const { user, loading } = useContext(UserContext);
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-auto ">
            <Nav.Link as={Link} to={"/"} className={active === 'home' ? 'active3': ''}  onClick={()=>bar('home')}>
              HOME
            </Nav.Link>
            
            <Nav.Link as={Link} to={"/categories"} className={active === 'categories' ? 'active3': ''}  onClick={()=>bar('categories')}>
              CATEGORIES
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"} className={active === 'pro' ? 'active3': ''}  onClick={()=>bar('pro')}>
              PRODUCTS
            </Nav.Link>
            <Nav.Link as={Link} to={"/contact"} className={active === 'con' ? 'active3': ''}  onClick={()=>bar('con')}>
              CONTACT
            </Nav.Link>
            <div className="cart-info d-flex">
              <Nav.Link as={Link} to={"/cart"}  className="d-none cart-word">
                CART
                <span className="cart-count">{cartCount}</span>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <div className="wel text-uppercase d-flex flex-column me-1">
          {loading? "" :
          <>
          <Dropdown>
      <Dropdown.Toggle className="wel">
        {user?.image?.secure_url != null ? <img src={user.image.secure_url}/>:<img src={imageProfile}/>}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={'/profile/info'} className={active === 'profile' ? 'active3': ''}  onClick={()=>bar('profile')} >Profile</Dropdown.Item>        
      </Dropdown.Menu>
    </Dropdown>
          </>
          
          }
        </div>
        <Link
        
          className="cart d-flex justify-content-end position-relative py-2"
          to={"/cart"}
        >
          <img src={cart} alt="" className=" me-1 w-100" />
          <span className="cart-count">{cartCount}</span>
        </Link>
      </Container>
    </Navbar>
  );
}
