import { Text } from '../Text/Text';
import styles from './Navbar.module.css'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Redux/store";
import {logout} from "../Features/login";
import {clearLists} from "../Features/list";
import {useNavigate} from "react-router-dom";

export const Navbar =() => {
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
          <FaSearch/>
          </div>

            
            <div className={styles.links}>
              <Link to = "/profile" ><Text><button className={styles.sNow}>Profile <CgProfile/></button></Text></Link>
             <Text><button className={styles.sNow} onClick={handleLogout}>Logout <IoIosLogOut /></button></Text>
        </div></div>
</nav>
  )}
  export default Navbar