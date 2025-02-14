import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import Register from './pages/user/register/Register';
import Login from './pages/user/login/Login';
import { ToastContainer } from 'react-toastify';
import Home from './pages/user/home/Home';
import UserLayout from './layout/UserLayout';
import Categories from './pages/category/Categories';
import Products from './pages/products/Products';
import CategoryProducts from './pages/products/CategoryProducts';
import ProductDetails from './pages/products/ProductDetails';

export default function App() {
  const router = createBrowserRouter(
    [
      {
        path:'/auth',
        element:<AuthLayout/>,
        children:[
          {

            path:'register',
            element:<Register/>
          },
          {
            path:'login',
            element:<Login/>
          }
        ]

      },
      {
        path:'/',
        element:<UserLayout/>,
        children:
        [
          {
            path:'/',
            element:<Home/>
          },
          {
            path:'/categories',
            element:<Categories/>
          },
          {
            path:'/categories/:categoryId',
            element:<CategoryProducts/>
          },
          {
            path:'/products',
            element:<Products/>,
            
          },
          {
            path:'products/:productId',
            element:<ProductDetails/>,
          },
        ]

      },
      {
        path:'/dashboard',
        element:<DashboardLayout/>
      },
    ]
  );
  return (
    <>
    <ToastContainer/>
    <RouterProvider router={router} />
    </>
  )
}
