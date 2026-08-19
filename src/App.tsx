import './App.css'
import { Login } from './Pages/Login/Login'
import React, { useState, useEffect } from "react";
import { Register } from './Pages/Register/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirstLanding } from './Pages/FirstLanding/FirstLanding';
import { Landingpage } from './Pages/Landingpage/Landingpage';
import { Home } from './Pages/Home/Home';
import { Profile } from './Pages/Profile/Profile';



function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element={<FirstLanding/>}/>
        <Route path = "/landing2" element={<Landingpage/>}/>
        <Route path = "/home" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/profile" element={<Profile/>}/>
        
        </Routes></Router>  
    
    

    </>
  )
}

export default App
