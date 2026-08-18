import { useState } from "react";
import type { LoginFormProps } from "../../LoginType";
import styles from './Login.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { IoMdMail } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md"
import { useSelector } from "react-redux";

export const Login: React.FC<LoginFormProps> = ({ onAddLink, onView }) => {
  const logins = useSelector((state)=> state.logins)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const Email = email.trim();
    const Password = password.trim();
    

    if (!Email) {
      alert("Email cannot be empty.Plz Enter Email");
      return;
    }
    if (!Email) {
      alert("Name must contain text only.");
      return;
    }
    if (!Password) {
      alert("Password cannot be empty.Enter password please!");
      return;
    }
    
    onAddLink({ id: Date.now(), email: Email, password: Password});

    setEmail(""); 
    setPassword(""); 
    
  };

  return (
    <div className={styles.linkContainer}>
<div className={styles.bc}> <MdArrowBackIos/> </div>
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}> Log in </h1>
        <p className={styles.Myp}>Enter you email and password to securely access your account.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <label></label>
              <input className={styles.inputtitle} value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <p className={styles.password}>Forgot Password</p>
            <Buttons type="submit"
            label ="Log in"
            icon={<IoIosAddCircle />}
            variant="inputting"/>
            <p className={styles.text}>Don't have an account? <p/></p><p className={styles.click}>Sign Up</p>
            <Buttons label="Sign Up"
            icon={<IoIosAddCircle />}
            onClick={onView}
            variant="inputting"/>
          </div>
        </div>
      </form>
    </div>
  );
};

