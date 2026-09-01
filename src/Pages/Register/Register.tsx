import styles from "./Register.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { Link, useNavigate } from "react-router-dom";
import {fetchRegs, updateRegister, clearRegister,} from "../../components/Features/register";

export const Register = () => {
  const info = useSelector((state: RootState) => state.register.info);
  const loading = useSelector((state: RootState) => state.register.loading);
  const error = useSelector((state: RootState) => state.register.error);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (info.password !== info.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!info.name) {
      alert("Name cannot be empty. Please enter a name.");
      return;
    }
    if (!info.surname) {
      alert("Title cannot be empty.Plz Enter Title");
      return;
    }
    if (!info.cellNumber) {
      alert("Cell number cannot be empty. Please enter a cell number.");
      return;
    }
    if (!info.email) {
      alert("Email cannot be empty. Please enter an email address.");
      return;
    }
    if (!info.password) {
    alert("Password cannot be empty. Please enter a password.");
      return;
    }
    dispatch(
      fetchRegs({
        name: info.name,
        surname: info.surname,
        cellNumber: info.cellNumber,
        email: info.email,
        password: info.password,
        confirmPassword: info.confirmPassword,
      }))
      .unwrap()
      .then(() => {
        dispatch(clearRegister());
        navigate("/login");
      })
      .catch(() => {});
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

              <input className={styles.inputtitle}
                placeholder="Name"
                value={info.name}
                onChange={(e) =>dispatch(updateRegister({name: e.target.value,})
                  )}/>
         
              <label></label>
              <input className={styles.inputdesc}
                placeholder="Surname"
                value={info.surname}
                onChange={(e) =>dispatch(updateRegister({surname: e.target.value,
                    }))
                }/>
            </div>
            <div className={styles.descc}>
            
              <input className={styles.inputdesc}
                placeholder="Cell Number"
                value={info.cellNumber}
                onChange={(e) =>dispatch(updateRegister({cellNumber: e.target.value,})
                  )
                }/>
            
            
              <label></label>
              <input className={styles.inputdesc}
                placeholder="Email Address"
                type="email"
                value={info.email}
                onChange={(e) =>dispatch(updateRegister({email: e.target.value,})
                  )
                }/>
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc}
                placeholder="Password"
                type="password"
                value={info.password}
                onChange={(e) =>dispatch(updateRegister({password: e.target.value,})
                  )
                }/>
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc}
                placeholder="Confirm Password"
                type="password"
                value={info.confirmPassword}
                onChange={(e) =>dispatch(updateRegister({confirmPassword: e.target.value,})
                  )
                }/>
            </div>
            <Buttons type="submit"
              label={loading ? "Creating..." : "Create Account"}
              icon={<IoIosAddCircle />}
              variant="inputting"/>
            {error && <p>{error}</p>}
            <p className={styles.text}>
              Already have an account?
            </p>
            <Link to="/login">
              Sign In Here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};