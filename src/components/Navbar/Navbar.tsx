import { Text } from '../Text/Text';
import styles from './Navbar.module.css'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../Redux/store";
import {logout} from "../Features/login";
import {clearLists, setSearchTerm} from "../Features/list";
import {useNavigate} from "react-router-dom";
import type{ RootState } from '../../Redux/store';

export const Navbar =() => {
  const searchTerm= useSelector((state: RootState) => state.main.searchTerm);
  const dispatch = useDispatch<AppDispatch>();
  const navigate =useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch(logout());
    dispatch(clearLists()
);
    navigate("/login");
  };
  return (
    <nav>
        <div className={styles.content}>    
            <div className={styles.heading}>
          
          <input className={styles.ss}type="text"
          placeholder='searhlist'
          value={searchTerm}
          onChange={(e) =>dispatch(setSearchTerm(e.target.value))}
          />
          </div>

            
            <div className={styles.links}>
              <Link to = "/profile" ><Text><button className={styles.sNow}>Profile <CgProfile/></button></Text></Link>
             <Text><button className={styles.sNow} onClick={handleLogout}>Logout <IoIosLogOut /></button></Text>
        </div></div>
</nav>
  )}
  export default Navbar