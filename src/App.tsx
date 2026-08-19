import './App.css'
import { Login } from './Pages/Login/Login'
import React, { useState, useEffect } from "react";
import { Register } from './Pages/Register/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './Pages/Landing/Landing';
import { Landingpage } from './Pages/Landingpage/Landingpage';


function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/register" element={<Landing/>}/>
        <Route path = "/register" element={<Landingpage/>}/>
        </Routes></Router>  
    
    

    </>
  )
}

export default App
