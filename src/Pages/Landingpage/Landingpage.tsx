import { Link } from 'react-router-dom'
import style from './Landingpage.module.css'
import { CiShop } from "react-icons/ci";
import { Buttons } from '../../components/Buttons/Button';
import { MdArrowBackIos } from "react-icons/md"
import { FaShopify } from "react-icons/fa6";
import { ImNext } from "react-icons/im";

export const Landingpage = () => {
  return (
    <div className={style.land}>
      <Link to = "/"><div className={style.bc}> <MdArrowBackIos/> </div></Link>
        <div className={style.headingg}>
            <h1 className={style.heading}><FaShopify/>S-list <FaShopify/></h1>
            <div className={style.icon}><CiShop/></div>
            <h2 className={style.welcome} >Create and share</h2>
            <p className={style.paragraph}>Share shopping list with family<br/>and friends.</p>
        </div>
        <Link to="/login"><Buttons type="submit"
                    label ="Next"
                    icon={< ImNext/>}
                    variant="inputting"/></Link>
       
    </div>
  )
}
