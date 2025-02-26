import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import Register from "./pages/user/register/Register";
import Login from "./pages/user/login/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/user/home/Home";
import UserLayout from "./layout/UserLayout";
import Categories from "./pages/category/Categories";
import Products from "./pages/products/Products";
import CategoryProducts from "./pages/products/CategoryProducts";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/user/cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContextProvider from "./components/user/context/CartContext";
import UserContextProvider from "./components/user/context/UserContext";
import ProfileInfo from "./pages/profile/ProfileInfo";
import Order from "./pages/profile/Order";
import Profile from "./pages/profile/Profile";
import SendCode from "./pages/user/login/SendCode";
import ResetPassword from "./pages/user/login/ResetPassword";
import AuthProtectedRoute from "./pages/user/AuthProtectedRoute";
import CheckOut from "./pages/user/checkout/CheckOut";
import Contact from "./pages/user/contact/Contact";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: 
      <AuthProtectedRoute>
      <AuthLayout />
      </AuthProtectedRoute>
      ,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
          
        },
        {
          path:'sendCode',
          element:<SendCode/>,
        },
        {
         path:'resetPassword',
         element:<ResetPassword/>,
        },
      ],
    },
    {
      path: "/",
      element:
      <ProtectedRoute>
        <UserContextProvider>
          <CartContextProvider>
            <UserLayout />
          </CartContextProvider>
        </UserContextProvider>
      </ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categories/:categoryId",
          element: <CategoryProducts />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path:'contact',
          element:<Contact/>
        },
        {
          path:"profile",
          element:<Profile/>,
          children:[
            {
              path:'info',
              element:<ProfileInfo/>,
            },
            {
              path:'order',
              element:<Order/>,
            },
          ]
          
        },
        
        
        {
          path: "products/:productId",
          element: <ProductDetails />,
        },
        {
          path: "cart",
          element:<Cart />,
        },
        {
          path:"checkOut",
          element:<CheckOut/>,
        }
        
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
    },
  ]);
  return (
    <>
      
          <ToastContainer />
          <RouterProvider router={router} />
        
    </>
  );
}
