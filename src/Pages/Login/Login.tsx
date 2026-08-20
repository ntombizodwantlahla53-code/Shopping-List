import styles from './Login.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { MdArrowBackIos } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../Redux/store";
import { login } from "../../components/Features/login"
import { Link } from "react-router-dom";
import { useState } from 'react';
import { fetchLogins } from '../../components/Features/login';
import type{ AppDispatch } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';



export const Login = () => {
const lss = useSelector((state: RootState) => state.login)
  console.log(lss)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(fetchLogins({
        email,
        password,
      })
    )
  .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
      });
  }

  return (
    <div className={styles.linkContainer}>
      <Link to = "/"><div className={styles.bc}> <MdArrowBackIos/> </div></Link>

      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}> Log in </h1>
        <p className={styles.Myp}>Enter you email and password to securely access your account.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <label></label>
              <input className={styles.inputtitle} value={email} type="email"
        onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc}  value={password} type="password"
        onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <p className={styles.password}>Forgot Password</p>
              <Buttons
              type="submit"
              label="Log in"
              icon={<IoIosAddCircle />}
              variant="inputting"/>
        {lss.error && <p style={{ color: "red" }}>{lss.error}</p>}

            <p className={styles.text}>Don't have an account? <p/></p>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

