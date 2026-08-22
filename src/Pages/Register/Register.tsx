import styles from "./Register.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { Link } from "react-router-dom";
import {fetchRegs,updateRegister,} from "../../components/Features/register";

export const Register = () => {
  const info = useSelector(
    (state: RootState) => state.register.info
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (info.password !== info.confirmPassword) {
      alert("Passwords not match");
      return;
    }

    dispatch(
      fetchRegs({
        name: info.name,
        surname:info.surname,
        cellNumber:info.cellNumber,
        email:info.email,
        password: info.password,
        confirmPassword: info.password
      })
    );
  };
  return (
    <div className={styles.linkContainer}>
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}>Create Account</h1>
        <p className={styles.Myp}>
          Create a new account to get started and enjoy seamless
          access to our features.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <label></label>
              <input
                className={styles.inputtitle}
                placeholder="Name"
                value={info.name}
                onChange={(e) =>
                  dispatch(updateRegister({ name: e.target.value }))
                }/>
            </div>
            <div className={styles.desc}>
              <label></label>
              <input
                className={styles.inputdesc}
                placeholder="Surname"
                value={info.surname}
                onChange={(e) =>
                  dispatch(updateRegister({ surname: e.target.value }))
                }/>
            </div>
            <div className={styles.desc}>
              <label></label>
              <input
                className={styles.inputdesc}
                placeholder="Cell Number"
                value={info.cellNumber}
                onChange={(e) =>
                  dispatch(updateRegister({cellNumber: e.target.value,})
                  )
                }/>
            </div>
            <div className={styles.desc}>
              <label></label>
              <input
                className={styles.inputdesc}
                placeholder="Email Address"
                value={info.email}
                onChange={(e) =>
                  dispatch(updateRegister({ email: e.target.value }))
                }/>
            </div>
            <div className={styles.desc}>
              <label></label>

              <input
                className={styles.inputdesc}
                placeholder="Password"
                type="password"
                value={info.password}
                onChange={(e) =>
                  dispatch(updateRegister({password: e.target.value,}))
                }
              />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input
                className={styles.inputdesc}
                placeholder="Confirm Password"
                type="password"
                value={info.confirmPassword}
                onChange={(e) =>
                  dispatch(updateRegister({confirmPassword: e.target.value,}))
                }/>
            </div>
            <Buttons
              type="submit"
              label="Create Account"
              icon={<IoIosAddCircle />}
              variant="inputting"/>
            <p className={styles.text}>
              Already have an account?
            </p>
            <Link to="/login">Sign In Here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};