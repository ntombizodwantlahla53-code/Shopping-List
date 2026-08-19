import React from 'react'
import { Text } from '../../components/Text/Text'
import style from './../Landing/Landing.module.css'
import { CiShop } from "react-icons/ci";

export const Landing = () => {
  return (
    <div>
        <div className={style.heading}>
            <Text variant="h1">S-list </Text>
            <CiShop/>
            <Text variant="h2">Welcome</Text>
        </div>
       
    </div>
  )
}
