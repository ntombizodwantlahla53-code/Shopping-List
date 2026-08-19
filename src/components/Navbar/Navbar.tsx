import { Text } from '../Text/Text';
import styles from './Navbar.module.css'
import { FiCoffee } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";


export const Navbar =() => {

  return (
    <nav>
        <div className={styles.content}>    
            <div className={styles.heading}>
          <FaSearch/>
          </div>

            
            <div className={styles.links}>
              <Link to = "/profile" ><Text><button className={styles.sNow}>Profile <CgProfile/></button></Text></Link>
            <Link to = "/" ><Text><button className={styles.sNow}>Log Out <IoIosLogOut/></button></Text></Link>  
             </div>
        </div>
</nav>
  )}
  export default Navbar