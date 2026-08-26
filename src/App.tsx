import './App.css'
import { Login } from './Pages/Login/Login'
import { Register } from './Pages/Register/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirstLanding } from './Pages/FirstLanding/FirstLanding';
import { Landingpage } from './Pages/Landingpage/Landingpage';
import { Home } from './Pages/Home/Home';
import { Main } from './components/Main/Main';
import { Profile } from './Pages/Profile/Profile';
import { Item } from './components/Item/Item';
import { ProtectedRoute } from './components/ProtectedRouter/ProtectedRouter';
import { PublicRoute } from './components/ProtectedRouter/PublicRouter';
import {restoreSession} from "./components/Features/login";
import {useDispatch,} from "react-redux";
import type {AppDispatch,} from "./Redux/store";
import { useEffect } from "react";


function App() {
  // const [count, setCount] = useState(0)
  const dispatch =useDispatch<AppDispatch>();
 useEffect(() => {
    dispatch(restoreSession());
  },
  [dispatch]);
  return (
    <>
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
        <Route path = "/" element={<FirstLanding/>}/>
        <Route path = "/landing2" element={<Landingpage/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path="/items/:catergory" element={<Item/>}/>
        </Route>
        <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/main" element={<Main />}/>
      </Route>
    </Routes></Router>  
    
    

    </>
  )
}

export default App
