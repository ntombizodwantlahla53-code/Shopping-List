

import style from './ItemList.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from '../../components/Buttons/Button';
import {  useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { Link } from 'react-router-dom';

export const ItemList = () => {
    const {details} = useSelector((state: RootState) => state.main)
    if (!details) {
    
    } 
  return (
    <div className={style.home} >
    <h1 className={style.hometitle}>list Items</h1>
    <div className={style.text}>
    <h2 className={style.list}>Your List is Empty<br/></h2>
    <p>add items to your Shopping list for an<br/> easier shopping experience</p>
    </div>
    <Link to="/items"><Buttons type="submit"
    label ="item"
    icon={<IoIosAddCircle />}
    variant="inputting"/></Link>
    </div>
  )
}