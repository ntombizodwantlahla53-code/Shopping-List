import styles from "./Login.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import {useSelector,useDispatch,} from "react-redux";
import type {RootState,AppDispatch,} from "../../Redux/store";
import {Link,useNavigate,} from "react-router-dom";
import {fetchLogins,updateLogin,clearLogin,} from "../../components/Features/login";
import { MdArrowBackIos } from "react-icons/md";

export const Login = () => {
  const loginInfo = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(fetchLogins(loginInfo.info))
      .unwrap()
      .then((user) => {
        localStorage.setItem("userId",String(user.id));

        dispatch(clearLogin());
        navigate("/home");
      })
      .catch(() => {});
  };
  return (
    <div className={styles.linkContainer}>
      <Link to="/">
        <div className={styles.bc}>
          <MdArrowBackIos />
        </div>
      </Link>
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}>Log in</h1>
        <p className={styles.Myp}>
          Enter your email and password to securely
          access your account.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <input className={styles.inputtitle}
                value={loginInfo.info.email}
                type="email"
                onChange={(e) =>dispatch(updateLogin({email: e.target.value,}))}
                placeholder="Email Address"/>
            </div>
            <div className={styles.desc}>
              <input className={styles.inputdesc}
                value={loginInfo.info.password}
                onChange={(e) =>dispatch(updateLogin({password: e.target.value,}))}
                type="password"
                placeholder="Password"/>
            </div>

            <p className={styles.password}>
              Forgot Password
            </p>
            <Buttons type="submit"
              label={loginInfo.loading ? "Logging in..." : "Log in"}
              icon={<IoIosAddCircle />}
              variant="inputting"/>

            {loginInfo.error && (<p>{loginInfo.error}</p>
            )}
            <p className={styles.text}>
              Don't have an account?
            </p>
            <Link to="/register">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};