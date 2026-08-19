import { useState } from "react";
import styles from './Register.module.css'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { IoMdMail } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";

export const Register = () => {


  return (
    <div className={styles.linkContainer}>
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}> Create Account </h1>
        <p className={styles.Myp}>Create a new account to get started and enjoy seamless acces to our features.</p>
      </div>
      <form>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <label></label>
              <input className={styles.inputtitle}  placeholder="Name" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Surname" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc}  placeholder="Cell Number" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Email Address" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc}  placeholder="Password" />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Confirm Password" />
            </div>
            <Buttons type="submit"
            label ="Create Account"
            icon={<IoIosAddCircle />}
            variant="inputting"/>
            <p className={styles.text}>Already have an account? <p/></p>
            <Link to= "/">Sign In Here</Link>
            
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

