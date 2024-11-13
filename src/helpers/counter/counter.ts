import { Statuses } from "../../constants";
import { RootState } from "../../redux/store";

export const counter = (arr: RootState['todoList']['list'], status: keyof typeof Statuses) => {
  return  arr.reduce((accum, item) => {

    if (item.status === status) {
      return accum + 1
    }
    return accum
  }, 0)
 }