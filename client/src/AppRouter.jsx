import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from "./components/Home"
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Admin from "./components/Admin"
const AppRouter = () => {

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? < Home/> : <Login />} />
        <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <Register />} />
        <Route path="/admin" element={loggedIn && isAdmin ? <Admin/> : <Register />} />
      </Routes>


    </BrowserRouter>
  );
};

export default AppRouter;
