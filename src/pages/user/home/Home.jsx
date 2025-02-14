import React from 'react'
import CustomNavbar from '../../../components/user/navbar/CustomNavbar'
import Footer from '../../../components/user/footer/Footer'
import Categories from '../../category/Categories'
import Products from '../../products/Products'

export default function Home() {
  return (
    <>
    <Categories/>
    <Products/>
    </>
  )
}
