import styles from "./Login.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogins } from "../../components/Features/login";
import { updateRegister } from "../../components/Features/register";
import { MdArrowBackIos } from "react-icons/md"

export const Login=() => {
  const registerInfo =useSelector((state: RootState) => state.register.info);
  const loginInfo =useSelector((state: RootState) => state.login);

  const dispatch= useDispatch<AppDispatch>();
  const navigate= useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      fetchLogins({
        email:registerInfo.email,
        password:registerInfo.password,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {});
  };
  return (
    <div className={styles.linkContainer}>
      <Link to="/"><div className={styles.bc}>
        <MdArrowBackIos/></div>
  </Link>
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}>Log in</h1>
        <p className={styles.Myp}>
          Enter your email and password to securely access
          your account.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <input className={styles.inputtitle}
                value={registerInfo.email}
                type="email"
                onChange={(e) =>
                  dispatch(updateRegister({ email: e.target.value }))}
                placeholder="Email Address"/>
            </div>

            <div className={styles.desc}>
              <input className={styles.inputdesc}
                value={registerInfo.password}
                onChange={(e) =>
                  dispatch(updateRegister({ password: e.target.value }))}
                type="password"
                placeholder="Password"/>
            </div>

            <p className={styles.password}>
              Forgot Password</p>
            <Buttons
              type="submit"
              label="Log in"
              icon={<IoIosAddCircle />}
              variant="inputting"/>
            {loginInfo.error && (<p>{loginInfo.error}</p>)}

            <p className={styles.text}>
              Don't have an account?</p>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};