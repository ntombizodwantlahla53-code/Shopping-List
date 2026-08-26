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
      <h2 className={style.text}>Profile
      </h2>
      <div className={style.icon}><VscAccount /></div>
      <div className={style.profileContainer}>
        <h1 className={style.title}>
          My Profile</h1>
        {!editing ? (
          <><p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Cell Number:{" "}{user.cellNumber}</p>
            <p>Email: {user.email}</p>
            <button className={style.saveBtn} onClick={() =>dispatch(setEditing(true))}>
              Edit
            </button>
          </>
        ) : (
          <>
            <div>
              <label>Name</label>
              <input value={user.name}
                onChange={(e) =>dispatch(updateProfile({name:e.target.value,}))
                }/>
            </div>
            <div><label>Surname</label>
              <input value={user.surname}
                onChange={(e) =>dispatch(updateProfile({surname:e.target.value,}))
                }/>
            </div>
            <div>
              <label>Cell Number</label>
              <input value={user.cellNumber}
                onChange={(e) =>dispatch(updateProfile({cellNumber:e.target.value,}))
                }/>
            </div>
            <div><label>Email</label>
              <input value={user.email}
                type="email"
                onChange={(e) =>dispatch(updateProfile({email:e.target.value,}))
                }/>
            </div>
            <button className={style.saveBtn}onClick={handleSave} disabled={loading}>
              {loading? "Saving...": "Save"}</button>
          </>
        )}
        {error && (<p>{error}</p>)}
      </div>
    </div>
  );
};