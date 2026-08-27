import { Text } from '../../components/Text/Text'
import style from './FirstLanding.module.css'
import { CiShop } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { Buttons } from '../../components/Buttons/Button';
import { IoIosAddCircle } from "react-icons/io";
import { FaShopify } from "react-icons/fa6";

export const FirstLanding = () => {
  return (
    <div className={style.landing} >
      <div className={style.skip}>
        <Link to = "/login" >Skip</Link>
      </div>
            <h1 className={style.heading}><FaShopify/>-list <FaShopify/></h1>
           
            <div className={style.icon}><CiShop/></div>
            <h2 className={style.welcome}>Welcome to S-list</h2>
            <div className={style.paragraph}>
            <Text variant="p">Make your shopping the easiest and<br/>
             fastest, in advance by making list of<br/>
              your products with S-LIST.</Text></div>
      <div className={style.nextBTN}>
        <Link to="/landing2"><Buttons type="submit"
                    label ="Next"
                    icon={<IoIosAddCircle />}
                    variant="inputting"/></Link></div>
       
    </div>
  )
}
