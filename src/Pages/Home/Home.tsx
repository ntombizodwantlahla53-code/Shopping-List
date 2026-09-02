import { Navbar } from "../../components/Navbar/Navbar";
import { FaBasketShopping } from "react-icons/fa6";
import style from "./Home.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { deleteItem, fetchLists, editItem , setSortBy} from "../../components/Features/list";
import { fetchItems } from "../../components/Features/items";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { HiEye } from "react-icons/hi";
import { FaShareNodes } from "react-icons/fa6";


export const Home = () => {
  const { links, loading, error, searchTerm ,sortBy} = useSelector((state: RootState) => state.main);
  const { items } = useSelector((state: RootState) => state.items);
  const user = useSelector((state: RootState) => state.login.user); //extract login user infoo
  const dispatch = useDispatch<AppDispatch>();

  //filter links based on what i search on search
  const filteredLinks = links.filter((link) =>
    link.catergory.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //sort filtered links based on the selected sort option
  const sortedLinks= [...filteredLinks].sort((a,b)=>{
    if(sortBy==="az"){
      return a.catergory.localeCompare(b.catergory);
    }
   if(sortBy==="za"){
      return b.catergory.localeCompare(a.catergory);
    }
    if(sortBy==="oldest"){
      return (a.createdAt ?? 0)-(b.createdAt ?? 0);
    }
   if (sortBy==="newest"){
      return (b.createdAt ?? 0)-(a.createdAt ?? 0);
    }
    return 0;
  });
  const formatDate = (timestamp?:number) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString([],{
      day: '2-digit',
      month:'short',
      year: 'numeric',
 
    })
  }
  //sharing function, for my share icon
  const handleShare = (categoryName: string) => {
    const listItems = items.filter((i) => i.category === categoryName);
    const itemNames = listItems.map((i) => `- ${i.name}`).join("\n");
    const textToShare = `My Shopping List: ${categoryName}\n\nItems:\n${itemNames}`;

    if(navigator.share){
      navigator.share({
        title: categoryName,
        text: textToShare,
      }).catch((error) => console.log("sharing failed", error));
    } else {
      navigator.clipboard.writeText(textToShare);
      alert("List is copied to cliboard"); // if user ayishereki , it will be copied to clipboard and alert will show
    }
  }
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchLists(user.id));
      dispatch(fetchItems());
    }
  }, [user?.id, dispatch]);

  const handleDelete = (id?: number) => {
    if (!id) return;
    dispatch(deleteItem(id));
  };

  const handleEdit = (id?: number, catergory?: string) => {
    if (!id) return;
    const newCategory = prompt("enter new cart:", catergory);
    if (!newCategory ||!user?.id) return;
    dispatch(editItem({ id, catergory: newCategory, userId: user.id ,createdAt: Date.now()}));
  };

  return (
    <div className={style.home}>
      <Navbar />
      {loading && links.length === 0 ? (
        <p>Loading lists...</p>
      ) : links.length === 0 ? (
        <>
          <h1 className={style.hometitle}>Shopping List</h1>
          <div className={style.icon}><FaBasketShopping /></div>
          <div className={style.text}>
            <h2 className={style.list}>Your List is Empty<br /></h2>
            <p className={style.txt}>create/add list to your trolley for an<br />easier shopping experience</p>
          </div>
          <Link to="/main">
            <Buttons type="submit" label="Add List" icon={<IoIosAddCircle />} variant="inputting" />
          </Link>
        </>
      ) : (
        <>
          <div className={style.new}>
            <h1 className={style.hometitle2}>Shopping List</h1>
            
            <div className={style.button}>
              <Link to="/main">
           
                <Buttons type="submit" label="Add List" icon={<IoIosAddCircle />} variant="inputting" />
              </Link>
            </div>
          </div>
          <select value={sortBy}
            onChange={(e)=> dispatch(setSortBy(e.target.value as any))} className={style.sort}>
              <option value={"newest"}>Newest to Oldest</option>
              <option value={"oldest"}>Oldest to Newest</option>
              <option value={"az"}>A to Z</option>
              <option value={"za"}>Z to A</option>
            </select>
          <div className={style.cater}>
            {sortedLinks.map((link, index) => {
              const count = items.filter((i) => i.category === link.catergory).length;
              return (
                <div key={link.id?? index} className={style.yea}>
                  <div className={style.q}>
                  <h2 className={style.name}>{link.catergory}</h2>
                  <p className={style.count}>
                    {count} {count === 1? "item":"items"}
                  </p>
                  <p className={style.date}>{formatDate(link.createdAt)}</p>
                  </div>

                  <div className={style.buttonz}>
                  <div className={style.buttn} onClick={() => handleDelete(link.id)}>
                    <button className={style.delete}><RiDeleteBin6Fill/></button>
                  </div>
                  <div className={style.buttn} onClick={() => handleEdit(link.id, link.catergory)}>
                    <button className={style.edit}><BiSolidEditAlt/></button>
                  </div>
                  <Link to={`/items/${link.catergory}`}>
                    <div className={style.buttnV}>
                      <button className={style.viewb}><HiEye/></button>
                    </div>
                  </Link>
                  <div className={style.buttnS} onClick={() => handleShare(link.catergory)}>
                      <button className={style.shareB}><FaShareNodes/></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};