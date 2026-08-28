import { Navbar } from "../../components/Navbar/Navbar";
import { FaBasketShopping } from "react-icons/fa6";
import style from "./Home.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { Buttons } from "../../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { deleteItem, fetchLists, editItem } from "../../components/Features/list";
import { fetchItems } from "../../components/Features/items";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
  const { links, loading, error } = useSelector((state: RootState) => state.main);
  const { items } = useSelector((state: RootState) => state.items); 
  const user = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(editItem({ id, catergory: newCategory, userId: user.id }));
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
            <p>create/add list to your trolley for an<br />easier shopping experience</p>
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

          <div className={style.cater}>
            {links.map((link, index) => {
              const count = items.filter((i) => i.category === link.catergory).length;
              return (
                <div key={link.id?? index} className={style.yea}>
                  <div className={style.q}>
                  <p className={style.name}>{link.catergory}</p>
                  <p className={style.count}>
                    {count} {count === 1? "item":"items"}
                  </p></div>
                  <div className={style.bbtn} onClick={() => handleDelete(link.id)}>
                    <Buttons type="button" label="Delete" 
                    icon={<IoIosAddCircle />} 
                    variant="inputting" />
                  </div>
                  <div className={style.bbtn} 
                  onClick={() => handleEdit(link.id, link.catergory)}>
                    <Buttons type="button" label="Edit" icon={<IoIosAddCircle />} variant="inputting" />
                  </div>
                  <Link to={`/items/${link.catergory}`}>
                    <div className={style.btn}>
                      <Buttons type="button" label="View" 
                      icon={<IoIosAddCircle />} 
                      variant="inputting" />
                    </div>
                  </Link>
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