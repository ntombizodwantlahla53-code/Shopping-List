import React from "react";
import styles from "./Main.module.css";
import type {AppDispatch,RootState,} from "../../Redux/store";
import {useSelector,useDispatch,} from "react-redux";
import {fetchList,lists,} from "../../components/Features/list";
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md"
import { Link } from "react-router-dom";

export const Main = () => {
  const details = useSelector((state: RootState) =>state.main.details);
  const error = useSelector((state: RootState) =>state.main.error);
  const user = useSelector((state: RootState) =>state.login.user);

  const dispatch =useDispatch<AppDispatch>();
  const navigate =useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {return;}

    dispatch(
      fetchList({
        catergory:details.catergory,
        userId:user.id,
      })
    )
     .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {});
  };
  return (
    <div>
      <div className={styles.linkContainer}>
        
          <Link to ="/home"><div className={styles.backbutton}><MdArrowBackIos/></div></Link>
        <div className={styles.Topic}>
          <h1 className={styles.Mytitle}>Add list</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.insideContainer}>
            <div className={styles.linkss}>
              <div className={styles.title}>
                <label></label>
                <input className={styles.inputtitle}
                  placeholder="Category"
                  value={details.catergory}
                  onChange={(e) =>dispatch(lists({catergory:e.target.value,}))
                  }/>
              </div>
            <div className={styles.desc}><label></label>
              </div>
              <Buttons type="submit"
                label="ADD YOUR LIST"
                icon={<IoIosAddCircle />}
                variant="inputting"/>
              {error && (<p>{error}</p>)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};