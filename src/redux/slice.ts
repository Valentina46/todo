import { createSlice } from "@reduxjs/toolkit";
import { Statuses } from "../constants";

interface ITodo {
  id: number;
  title: string;
  status: Statuses;
}
type TodoState = {
  list: ITodo[]
}
const initialState: TodoState = {
  list:[]
}

export const todoList = createSlice (
  {
    name: "todo",
    initialState,
    reducers: {
        loadTodos: (state, action) => {
          state.list = action.payload
        },
        addTodo:(state,action) => {
          state.list = [...state.list, {
            id: state.list.length ? state.list[state.list.length - 1].id + 1 :1,
            title: action.payload,
            status: Statuses.inProgress,
          }]
           localStorage.setItem('todoI',JSON.stringify(state.list))
        },
        deleteTodoItem: (state, action) =>{
          const newState = state.list.map((item) => {
            if (item.id === action.payload) {
              item.status = Statuses.deleted
            }
            return item
          })
          state.list = newState
          localStorage.setItem('todoI',JSON.stringify(newState))

        },
        doneTodo:(state, action) => {
          const newState  = state.list.map((item) => {
            if (item.id === action.payload) {
              item.status = Statuses.done
            } 
            return item
          })
          state.list = newState
          localStorage.setItem('todoI',JSON.stringify(newState))

        },
        clearStore:(state) => {
          state.list = []
          localStorage.setItem('todoI',JSON.stringify([]))

        }

    }
  }
)
export default todoList.reducer
export const { addTodo, clearStore, deleteTodoItem, doneTodo, loadTodos } = todoList.actions