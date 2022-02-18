import React from 'react';
import { Navigate, useLocation } from "react-router-dom";



const ProtectedRoute = ({ children , ...props } ) => {
  const location = useLocation();
  if(!props.loggedIn && location.pathname!== '/movies' && location.pathname!== '/saved-movies' && location.pathname!== '/profile') {
    return <Navigate to="/" />;
  }
  return  children;
};

export default ProtectedRoute;