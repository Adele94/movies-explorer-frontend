import React from 'react';
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children , ...props } ) => {
  if(!props.loggedIn) {
      return <Navigate to="/" />;
  }
  return  children;
};

export default ProtectedRoute;