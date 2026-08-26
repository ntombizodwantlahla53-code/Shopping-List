import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { fetchItem, setItemCatergory, setItemName, setItemNotes, toggleDropdown } from "../Features/items";
import { Buttons } from "../../components/Buttons/Button";
import { IoIosAddCircle } from "react-icons/io";
import style from "./Item.module.css";
import { MdArrowBackIos } from "react-icons/md"
import { Link } from "react-router-dom";

export const Item = () => {
  const { catergory } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { items,inputCatergory,inputNotes,inputName ,openIndex } = useSelector(
    (state: RootState) => state.items
  );

  const handleAddItem = () => {
    if (inputCatergory.trim()&&catergory) {
      dispatch(fetchItem({ catergory: inputCatergory, category: catergory, notes: inputNotes , name: inputName}));
    }
  };
  return (
    <div>
<Link to = "/home"><div className={style.bc}> <MdArrowBackIos/> </div></Link>
      <h1>iiItems ze.. {catergory}</h1>
      <div className={style.itemsContainer}>
        {items
          .filter((i) =>i.category === catergory)
          .map((item,i) => (
            <div key={i} className={style.itemRow}>
              <div className={style.inputs}>
                <span>{item.catergory}</span>
                <button onClick={() => dispatch(toggleDropdown(openIndex === i ? null : i))}>
                  {openIndex === i? "Hide ":"Show"}
                </button>
              </div>
              {openIndex === i && (<div className={style.drop}>
                  <p>{item.name}</p>
  <p>{item.notes || "Nothng"}</p></div>)}
            </div>
          ))}
      </div>


      <div className={style.addForm}>
        <input
          type="text"
          value={inputCatergory}
          onChange={(e) => dispatch(setItemCatergory(e.target.value))}
          placeholder="cater"/>
        <input type="text"
          value={inputNotes}
          onChange={(e) => dispatch(setItemNotes(e.target.value))}
          placeholder="Note"/>
        <input type="text"
          value={inputName}
          onChange={(e) => dispatch(setItemName(e.target.value))}
          placeholder="name"/>
        <Buttons type="button"
          label="Add Item"
          icon={<IoIosAddCircle />}
          variant="inputting"
          onClick={handleAddItem}/>
      </div>
    </div>
  );
};
