import styles from './Register.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useSelector, useDispatch} from "react-redux";
import type { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchRegs } from "./../../components/Features/register"
import { register } from './../../components/Features/register'
import type{ AppDispatch } from '../../Redux/store'


export const Register = () => {
 const info = useSelector((state: RootState) => state.register)
  console.log(info)
  const dispatch = useDispatch<AppDispatch>(); 

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords not match");
      return;
    }

   dispatch(fetchRegs({
    name,
    surname,
    email,
    password,

  }));
  
};

  return (
    <div className={styles.linkContainer}>
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}> Create Account </h1>
        <p className={styles.Myp}>Create a new account to get started and enjoy seamless acces to our features.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <label></label>
              <input className={styles.inputtitle} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Cell Number" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <Buttons type="submit"
            label ="Create Account"
            icon={<IoIosAddCircle />}
            variant="inputting"/>
            <p className={styles.text}>Already have an account? <p/></p>
            <Link to= "/login">Sign In Here</Link>
            
            {/* <Buttons label="View Links"
            icon={<CiSaveDown2 />}
            onClick={onView}
            variant="inputting"/> */}
          </div>
        </div>
      </form>
    </div>
  );
};

