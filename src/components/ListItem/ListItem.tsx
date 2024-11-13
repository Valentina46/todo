import { useDispatch } from "react-redux";
import { deleteTodoItem, doneTodo } from "../../redux/slice";
import deleteItem from "./../../asets/deleteItem.svg"
import check from "./../../asets/check.svg"
import styles from "./ListItem.module.css"


export interface IItem 
{
  title: string;
  id: number
}

export const ListItem = ({ title,id }:IItem) =>{
  const dispatch = useDispatch()
  return(
    <div className={styles.taskItem}>
      <div className={styles.title}>
        {title}
      </div>
      <div>
        <button className={styles.button} type={"button"} onClick={() => dispatch(doneTodo(id))}>
          <img src={check}/>
        </button>
        <button className={styles.button} type={"button"} onClick={()=>dispatch(deleteTodoItem(id))}>
          <img src={deleteItem}/>
        </button>
      </div>
    </div>
  )
}