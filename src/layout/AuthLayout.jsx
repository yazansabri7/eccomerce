import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/footer/Footer'
import NavbarNotLogin from '../components/navbarNotLogin/NavbarNotLogin'

export default function AuthLayout() {
  return (
    <>
    <NavbarNotLogin/>
    <Outlet/>
    <Footer/>
    </>
  )
}
