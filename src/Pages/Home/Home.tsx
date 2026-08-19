import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { FaBasketShopping } from "react-icons/fa6";
import style from './Home.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from '../../components/Buttons/Button';

export const Home = () => {
  return (
    <div className={style.home} >
    <Navbar/>
    <h1 className={style.hometitle}>Shopping List</h1>
    <div className={style.icon}><FaBasketShopping /></div>
    <div className={style.text}>
    <span >Your List is Empty</span>
    <span >create/add list to your trolley for an<br/> easier shopping experience</span>
    </div>
    <Buttons type="submit"
    label ="Add List"
    icon={<IoIosAddCircle />}
    variant="inputting"/>
    </div>
    
  )
}
