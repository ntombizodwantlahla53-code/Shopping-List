import { Navbar } from '../../components/Navbar/Navbar'
import { FaBasketShopping } from "react-icons/fa6";
import style from './Home.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from '../../components/Buttons/Button';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { Link } from 'react-router-dom';
import { deletelist, deleteItem, editItem,  type Main } from '../../components/Features/list';
import type{ AppDispatch } from '../../Redux/store';


export const Home = () => {
  const {details, links} = useSelector((state: RootState) => state.main)
    if (!details) {}
     const dispatch = useDispatch<AppDispatch>();

     const handleDelete =(id?:string) =>{
      if(!id) return;
      dispatch(deleteItem(id));
     }
    
  return (
    <div className={style.home} >
    <Navbar/>
    {links.length === 0?(
      <>
    <h1 className={style.hometitle}>Shopping List</h1>
    <div className={style.icon}><FaBasketShopping /></div>
    <div className={style.text}>
    <h2 className={style.list}>Your List is Empty<br/></h2>
    <p>create/add list to your trolley for an<br/> easier shopping experience</p>
    </div>
    <Link to="/main"><Buttons type="submit"
    label ="Add List"
    icon={<IoIosAddCircle />}
    variant="inputting"/></Link>
    </>
    ) : (
      <>
      <div className={style.new}>
      <h1 className={style.hometitle2}>Shopping List</h1>
      <div className={style.button}>
    <Link to="/main"><Buttons type="submit"
    label ="Add List"
    icon={<IoIosAddCircle />}
    variant="inputting"/></Link></div></div>
    <div className={style.cater}>
      {links.map((link, index) => (
        <div key={index} className={style.yea}>
        <p key={index} className={style.name}>{link.catergory}
        </p>
      <div className={style.bbtn} onClick ={() =>handleDelete(link.id)}>
       <Buttons
        type="button"
        label="Delete"
        icon={<IoIosAddCircle />}
        variant="inputting"/> </div>
        <Link to = {`/items/${link.catergory}`}>
        <div className={style.btn}><Buttons type="button"
        label="View"
        icon={<IoIosAddCircle />}
        variant="inputting"/></div></Link>
        </div>
      ))}</div>
    </>
    )}
    </div>
    
  )
}
