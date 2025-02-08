import React from 'react'
import CustomNavbar from './components/user/navbar/CustomNavbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import Register from './pages/user/register/register';
import Login from './pages/user/login/Login';

export default function App() {
  const router = createBrowserRouter(
    [
      {
        path:'/',
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
        path:'/dashboard',
        element:<DashboardLayout/>
      },
    ]
  );
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
