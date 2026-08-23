import React from 'react'
import style from './Profile.module.css'
import { Link } from 'react-router-dom'
import { MdArrowBackIos } from "react-icons/md"
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

export const Profile = () => {
  const user = useSelector((state: RootState) => state.login.user)
  if (!user) {
    return <p>No userlogged in</p>
  }
  return (
    <div className={style.profile} >
       <Link to = "/home"><div className={style.bc}><MdArrowBackIos/></div></Link>
       <h2 className={style.text}>Profile</h2>
       <div className={style.icon}><VscAccount/></div>
  
    <div className={style.profileContainer}>
      <h1 className={style.title}>My Profile</h1>

      <p>Name: {user.name}</p>
      <p>Surname:{user.surname}</p>
      <p>Cell Number:{user.cellNumber}</p>
      <p>Email:{user.email}</p>

      <button className={style.saveBtn}>Edit</button>
    </div>

    </div>
  )
}
