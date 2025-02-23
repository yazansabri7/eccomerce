import { Navigate } from "react-router-dom";
import React from 'react';



export default function AuthProtectedRoute({children}) {
    const userToken = localStorage.getItem('userToken');
  if(userToken){
    return <Navigate to={'/'}/>

  }
  return children;
}