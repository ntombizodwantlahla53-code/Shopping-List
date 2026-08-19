import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from '../../components/Text/Text'
import style from './Landingpage.module.css'
import { CiShop } from "react-icons/ci";
import { Buttons } from '../../components/Buttons/Button';

export const Landingpage = () => {
  return (
    <div className={style.land}>
      
        <div className={style.headingg}>
            <h1 className={style.heading}>S-list </h1>
            <div className={style.icon}><CiShop/></div>
            <h2 className={style.welcome} >Create and share</h2>
            <p className={style.paragraph}>Share shopping list with family<br/>and friends.</p>
        </div>
        <Link to="/login"><Buttons type="submit"
                    label ="Next"
                    icon={< CiShop/>}
                    variant="inputting"/></Link>
       
    </div>
  )
}
