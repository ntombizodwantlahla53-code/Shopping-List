import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { fetchItem, fetchItems, deleteItemThunk, editItemThunk, setItemCatergory, setItemName, setItemNotes, setItemQuantity, toggleDropdown, setAddIndex, setNewName, setNewNotes,setItemImage, setNewQty, clearAddForm } from "../Features/items";
import { Buttons } from "../../components/Buttons/Button";
import { IoIosAddCircle } from "react-icons/io";
import style from "./Item.module.css";
import { MdArrowBackIos } from "react-icons/md"
import { useEffect } from "react";

export const Item = () => {
  const { catergory } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { items, inputCatergory, inputNotes, inputName, inputQuantity,inputImage, openIndex, addIndex, newName, newNotes, newQty } = useSelector((state: RootState) => state.items);

  useEffect(() => {
     dispatch(fetchItems()); 
    }, [dispatch]);
  const groceryItems = items.filter((i) => i.category === catergory);
  const grouped = groceryItems.reduce((acc: any, item) => {
    const key = item.catergory || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  const handleAddMain = () => {
    if (!inputName.trim() ||!inputCatergory.trim() ||!catergory) return;
    dispatch(fetchItem({
      category: catergory,
      catergory: inputCatergory,
      name: inputName,
      quantity: inputQuantity,
      notes: inputNotes,
      image: inputImage,
    })).then(()=> {
      dispatch(clearAddForm());
      dispatch(setAddIndex(null));
      dispatch(fetchItems());
    })
  };
  const handleAddToGroup = (groupName: string) => {
    if (!newName.trim() ||!catergory) return;
    dispatch(fetchItem({
      category: catergory,
      catergory: groupName,
      name: newName,
      quantity: newQty,
      notes: newNotes,
    })).then(() => dispatch(clearAddForm()));
  };
  const handleEdit = (item: any) => {
    const updatedName = prompt("EditName:", item.name);
    if (!updatedName) return;
    const updatedQty = prompt("EditQuantity:", item.quantity);
    const updatedNotes = prompt("EditNotes:", item.quantity);
    dispatch(editItemThunk({...item, name: updatedName, quantity: updatedQty || item.quantity ,notes: updatedNotes || item.notes}));
  };
  if(groceryItems.length===0 || addIndex=== "MAIN"){
    return(
      <div className={style.itemcontainer}>
      <Link to="/home"><div className={style.bc}><MdArrowBackIos /></div></Link>
      {groceryItems.length> 0 && <button className={style.cancel} onClick={() =>dispatch(setAddIndex(null))}>Cancel</button>}
<div className={style.addForm}>
        <h3>Add new category item to {catergory}</h3>
        <input className={style.in} value={inputCatergory}
        onChange={(e) => dispatch(setItemCatergory(e.target.value))} 
        placeholder="Category" />
        <input className={style.in} value={inputName} 
        onChange={(e) => dispatch(setItemName(e.target.value))} 
        placeholder="Item name" />
        <input className={style.in} value={inputQuantity} 
        onChange={(e) => dispatch(setItemQuantity(e.target.value))} 
        placeholder="Quantity" />
        <input className={style.in} value={inputNotes} 
        onChange={(e) => dispatch(setItemNotes(e.target.value))} 
        placeholder="Note" />
        <input type="file" accept="image/*" onChange={(e) => {
        const file =(e.target as HTMLInputElement).files?.[0];
        if(!file) return;
        const reader =new FileReader();
        reader.onload=() => dispatch(setItemImage(reader.result as string));
        reader.readAsDataURL(file);
        
  }}/>
        <div className={style.buttonAdd}>
          <Buttons label="Add Item" icon={<IoIosAddCircle />} variant="inputting" type="button" onClick={handleAddMain} />
          
        </div>
</div>
</div>

    );
  } else {
  return (
    <div className={style.itemcontainer}>
      <Link to="/home"><div className={style.bc}><MdArrowBackIos /></div></Link>
      <h1 className={style.top}>{catergory} - {groceryItems.length} items</h1>
      <button className={style.smalladd} onClick={()=> dispatch(setAddIndex("MAIN" as any))}>add cart</button>
      {Object.keys(grouped).map((groupName) => (
        <div key={groupName} className={style.group}>
          <h2 className={style.text}>
            {groupName} - {grouped[groupName].length} items
            <button className={style.smalladd} onClick={() => dispatch(setAddIndex(addIndex === groupName? null : groupName as any))}>+ Add to {groupName}</button>
          </h2>
          {addIndex === groupName && (
            <div className={style.nn}>
              <input placeholder="Name" value={newName} 
              onChange={(e) => dispatch(setNewName(e.target.value))} />
              <input placeholder="Qty" value={newQty} 
              onChange={(e) => dispatch(setNewQty(e.target.value))} />
              <input placeholder="Notes" value={newNotes} 
              onChange={(e) => dispatch(setNewNotes(e.target.value))} />
              <Buttons label={`Save to ${groupName}`} type="button" 
              variant="inputting" 
              onClick={() => handleAddToGroup(groupName)} />
            </div>
          )}
          {grouped[groupName].map((item: any) => {
            const uniqueId = `${groupName}-${item.id}`;
            return (
              <div key={item.id} className={style.itemRow}>
                <div className={style.inputs}>
           <span>{item.name} - {item.quantity}</span>
             <button className={style.dropdown} onClick={() => dispatch(toggleDropdown(openIndex === uniqueId? null : uniqueId))}>
           {openIndex === uniqueId? "Hide":"Show"}
            </button>
            </div>
           {openIndex === uniqueId && (
              <div className={style.drop}>
                
                <p><b>Name:</b> {item.name}</p>
                <p><b>Qty:</b> {item.quantity}</p>
                <p><b>Notes:</b> {item.notes}</p>
                {item.image && <img src= {item.image} className={style.img}/>}

                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <Buttons label="Edit" type="button" variant="inputting" onClick={() => handleEdit(item)} />
         <Buttons label="Delete" type="button" variant="inputting" onClick={() => item.id && dispatch(deleteItemThunk(item.id))} />
            </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      
      
    </div>
  );
};
};