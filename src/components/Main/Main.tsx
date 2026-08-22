import React from 'react'
import styles from './Main.module.css'
import type{ AppDispatch } from '../../Redux/store';
import { useSelector, useDispatch} from "react-redux";
import type { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchList, lists } from './../Features/list'
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useNavigate } from 'react-router-dom';


export const Main = () => {
  const details = useSelector((state: RootState) => state.main.details)
  const error = useSelector((state: RootState) => state.main.error)
  console.log(details)

  const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  dispatch(fetchList({
      catergory: details.catergory,
      name:details.name,
      note:details.note,
      quantity:details.quantity,
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
              <input className={styles.inputtitle} placeholder="Catergory" value={details.catergory} 
              onChange={(e) =>dispatch(lists({ catergory: e.target.value }))
              }/>
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Name" value={details.name} 
              onChange={(e) =>dispatch (lists({ name: e.target.value}))} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Note" value={details.note} 
              onChange={(e) =>dispatch (lists({ note: e.target.value}))} />
            </div>
            <div className={styles.desc}>
              <label></label>
              <input className={styles.inputdesc} placeholder="Quantity" value={details.quantity} 
              onChange={(e) =>dispatch(lists({ quantity: e.target.value }))
              }/>
            </div>
            <div className={styles.desc}>
              <label></label>
              </div>
           <Buttons type="submit"
            label ="ADD YOU LIST"
            icon={<IoIosAddCircle />}
            variant="inputting"/>
            {error && <p>{error}</p>}
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
