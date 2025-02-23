import React from 'react'
import CustomNavbar from '../components/user/navbar/CustomNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/footer/Footer'
import NavbarNotLogin from '../components/navbarNotLogin/navbarNotLogin'

export default function AuthLayout() {
  return (
    <>
    <NavbarNotLogin/>
    <Outlet/>
    <Footer/>
    </>
  )
}
