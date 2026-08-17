import { useState } from "react";
import type { RegisterFormProps } from './../../RegisterType'
import styles from './Register.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { IoMdMail } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";

export const Register: React.FC<RegisterFormProps> = ({ onAddLink }) => {
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
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}> Create Account </h1>
        <p className={styles.Myp}>Create a new account to get started and enjoy seamless acces to our features.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <label></label>
              <input className={styles.inputtitle} value={email}  onChange={e => setEmail(e.target.value)} placeholder="Name" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} value={password} onChange={e => setPassword(e.target.value)} placeholder="Surname" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} value={password} onChange={e => setPassword(e.target.value)} placeholder="Cell Number" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} value={password} onChange={e => setPassword(e.target.value)} placeholder="Email Address" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} value={password} onChange={e => setPassword(e.target.value)} placeholder="Confirm Password" />
            </div>
            <Buttons type="submit"
            label ="Create Account"
            icon={<IoIosAddCircle />}
            variant="inputting"/>
            <p className={styles.text}>Already have an account? <p/></p><p className={styles.click}>Sign In here</p>
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

