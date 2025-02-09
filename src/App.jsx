import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import Register from './pages/user/register/Register';
import Login from './pages/user/login/Login';
import { ToastContainer } from 'react-toastify';

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
    <ToastContainer/>
    <RouterProvider router={router} />
    </>
  )
}
