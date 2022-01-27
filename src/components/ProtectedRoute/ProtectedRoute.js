import React from 'react';
import { Route, Navigate } from "react-router-dom";


const ProtectedRoute = ({ children , ...props } ) => {
  console.log("login", props.loggedIn)
  if(!props.loggedIn) {
      return <Navigate to="/signin" />;
  }
  return  children;
};

export default ProtectedRoute;