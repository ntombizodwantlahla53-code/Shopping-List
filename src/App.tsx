import './App.css'
import { Login } from './Pages/Login/Login'
import type { LoginTypes } from './LoginType';
import React, { useState, useEffect } from "react";
import { Register } from './Pages/Register/Register'

function App() {
  const [count, setCount] = useState(0)
  const [links, setLinks] = useState<LoginTypes[]>([]);
const [showList, setShowList] = useState(false);

const addLink = (link: LoginTypes) => {
    setLinks((prevLinks) =>{
      const updatedLinks = [...prevLinks,link]
      localStorage.setItem('links',JSON.stringify(updatedLinks))
      return updatedLinks
    });
    setShowList(true);
  };
  return (

    <>
    <div>
      {showList ? (
      <Register onAddLink ={() => setShowList(false)} 
      />
        ) : (
        <Login onAddLink={addLink}
        onView={() => setShowList(true)} />
        )}

        </div>
    </>
  )
}

export default App
