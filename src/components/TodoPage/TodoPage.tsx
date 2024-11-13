import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addTodo, loadTodos, clearStore } from "../../redux/slice";
import { ListItem } from "../ListItem/ListItem";
import { Statuses } from "../../constants";
import { counter } from "../../helpers/counter/counter";
import { useAppSelector } from "../../redux/hooks/rtkHooks";
import styles from "./TodoPage.module.css";
import add from "./../../asets/add.svg";
import delet from "./../../asets/delete.svg";

const LOCAL_STORAGE_KEY = "todoItems"; // Изменено для ясности

interface TodoPageProps {
  onLogout: () => void;
}

const formatCount = (count: number): string => {
  return count > 0 ? `(${count})` : '';
};

export const TodoPage = ({ onLogout }: TodoPageProps) => {
  const { list } = useAppSelector(state => state.todoList);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [tab, setTab] = useState(Statuses.all);

  useEffect(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTodos) {
      dispatch(loadTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  const handleAddItem = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText(''); 
      setTab(Statuses.all); 
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputTask}>
        <button className={styles.add} onClick={handleAddItem}><img src={add}/>ДОБАВИТЬ</button>
        <input  className={styles.input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Пополните список..." />
        <button className={styles.delete} onClick={() => dispatch(clearStore())}>ОЧИСТИТЬ <img src={delet}/></button>
      </div>
      <div className={styles.allTask}> 
        <div className={`${styles.buttonContainer} ${styles[`tab-${tab}`]}`}>
          <button className={styles.button} onClick={() => setTab(Statuses.inProgress)}>
            ТЕКУЩИЕ ДЕЛА {formatCount(counter(list, Statuses.inProgress))}
          </button> 
          <button className={styles.button} onClick={() => setTab(Statuses.all)}>
            ВСЕ ДЕЛА {formatCount(list.length)}
          </button>
          <button className={styles.button} onClick={() => setTab(Statuses.done)}>
            ВЫПОЛНЕННЫЕ ДЕЛА {formatCount(counter(list, Statuses.done))}  
          </button>
          <button className={styles.button} onClick={() => setTab(Statuses.deleted)}>
            КОРЗИНА {formatCount(counter(list, Statuses.deleted))}
          </button>
        </div>
          <p className={styles.p}>{list.length ? '' : <h2>Задач нет</h2>}</p>
        <ul className={styles.listItem}>
          {list.filter((item) => tab === Statuses.all || item.status === tab).map(({ title, id }) => (
            <ListItem title={title} id={id} key={id} />
          ))}
        </ul>
      </div>
      <button className={styles.exit} onClick={onLogout}>Выйти</button>
    </div>
  );
};