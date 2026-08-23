import { Navbar } from '../../components/Navbar/Navbar'
import { FaBasketShopping } from "react-icons/fa6";
import style from './Home.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from '../../components/Buttons/Button';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { Link } from 'react-router-dom';


export const Home = () => {
  const details = useSelector((state: RootState) => state.main.details)
    if (!details) {
      return <p>No userlogged in</p>
    }
  return (
    <div className={style.home} >
    <Navbar/>
    <h1 className={style.hometitle}>Shopping List</h1>
    <div className={style.icon}><FaBasketShopping /></div>
    <div className={style.text}>
    <h2 className={style.list}>Your List is Empty<br/></h2>
    <p>create/add list to your trolley for an<br/> easier shopping experience</p>
    </div>
    <p>Catergory: {details.catergory}</p>
      <p>Name:{details.name}</p>
      <p>Note:{details.note}</p>
      <p>Quantity:{details.quantity}</p>
    <Link to="/main"><Buttons type="submit"
    label ="Add List"
    icon={<IoIosAddCircle />}
    variant="inputting"/></Link>
    </div>
    
  )
}
