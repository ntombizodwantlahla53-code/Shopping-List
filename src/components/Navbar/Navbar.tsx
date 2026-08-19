import { Text } from '../Text/Text';
import styles from './Navbar.module.css'
import { FiCoffee } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';


export const Navbar =() => {

  return (
    <nav>
        <div className={styles.content}>
            < FaSearch/>
           
        </div>
</nav>
  )}
  export default Navbar