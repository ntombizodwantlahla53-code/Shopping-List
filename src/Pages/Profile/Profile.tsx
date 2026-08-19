import React from 'react'
import style from './Profile.module.css'
import { Link } from 'react-router-dom'
import { MdArrowBackIos } from "react-icons/md"
import { VscAccount } from "react-icons/vsc";

export const Profile = () => {
  return (
    <div className={style.profile} >
       <Link to = "/home"><div className={style.bc}> <MdArrowBackIos/> </div></Link>
       <h2 className={style.text}>Profile</h2>
       <div className={style.icon}><VscAccount/></div>

    </div>
  )
}
