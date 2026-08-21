import React from 'react'
import styles from './Main.module.css'
import type{ AppDispatch } from '../../Redux/store';
import { useSelector, useDispatch} from "react-redux";
import type { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchList } from './../Features/list'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const details = useSelector((state: RootState) => state.main)
  console.log(details)
  const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

  const [catergory, setCatergory] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  dispatch(fetchList({
      catergory,
      name,
      note,
      quantity,
  
    }))
    .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
      });
  };

  return (
    <div>
       <div className={styles.linkContainer}>
      <div className={styles.Topic}>
        <h1 className={styles.Mytitle}> Add list</h1>
       
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.insideContainer}>
          <div className={styles.linkss}>
            <div className={styles.title}>
              <label></label>
              <input className={styles.inputtitle} placeholder="Catergory" value={catergory} onChange={(e) => setCatergory(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className={styles.desc}>
              <label></label>
              </div>
           <Buttons type="submit"
            label ="ADD YOU LIST"
            icon={<IoIosAddCircle />}
            variant="inputting"/>
            {details.error && <p >{details.error}</p>}
            
            {/* <Buttons label="View Links"
            icon={<CiSaveDown2 />}
            onClick={onView}
            variant="inputting"/> */}
          </div>
        </div>
      </form>
      </div> 
    </div>
  )
}
