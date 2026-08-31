import style from "./Profile.module.css";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import {useSelector,useDispatch,} from "react-redux";
import type {RootState,AppDispatch,} from "../../Redux/store";
import {setEditing,updateProfile,updateUser,} from "../../components/Features/login";

export const Profile = () => {
  const {user,editing,loading,error,} = useSelector((state: RootState) =>state.login);
  const dispatch =useDispatch<AppDispatch>();

  if (!user) {return (<p>No user logged in</p>);}
  const handleSave = () => {
    dispatch(
      updateUser(user)
    );
  };
  return (
    <div className={style.profile}>
      <Link to="/home">
        <div className={style.bc}>
          <MdArrowBackIos />
        </div>
      </Link>
      
      <div className={style.icon}><VscAccount /></div>
      <div className={style.profileContainer}>
        <h1 className={style.title}>
          My Profile</h1>
        {!editing ? (
          <div className={style.text}>
            <p className={style.inputs}>Name: {user.name}</p>
            <p className={style.inputs}>Surname: {user.surname}</p>
            <p className={style.inputs}>Cell Number:{" "}{user.cellNumber}</p>
            <p className={style.inputs}>Email: {user.email}</p>
            <button className={style.editBTN} onClick={() =>dispatch(setEditing(true))}>
              Edit
            </button>
          </div>
        ) : (
          <>
            <div className={style.edittingT}>
              <label>Name:
              <input className={style.input} value={user.name}
                onChange={(e) =>dispatch(updateProfile({name:e.target.value,}))
                }/></label>
            
         
              <label>Surname:
              <input className={style.input} value={user.surname}
                onChange={(e) =>dispatch(updateProfile({surname:e.target.value,}))
                }/></label>
            
            
              <label>Cell Number:
              <input className={style.input} value={user.cellNumber}
                onChange={(e) =>dispatch(updateProfile({cellNumber:e.target.value,}))
                }/></label>
         
            
              <label>Email:
              <input className={style.input} value={user.email}
                type="email"
                onChange={(e) =>dispatch(updateProfile({email:e.target.value,}))
                }/></label>
            </div>
            <button className={style.saveBTN}onClick={handleSave} disabled={loading}>
              {loading? "Saving...": "Save"}</button>
          </>
        )}
        {error && (<p>{error}</p>)}
      </div>
    </div>
  );
};