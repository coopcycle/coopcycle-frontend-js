import {
  CREATE_TASK_LIST_SUCCESS
} from "./actions";
import { taskListKey, replaceTasksWithIds } from "./taskListUtils"

const initialState = {
  items: new Map()
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_LIST_SUCCESS: {
      let entity = replaceTasksWithIds(action.payload)

      let newItems = new Map(state.items)
      newItems.set(entity[taskListKey], entity)

      return {
        ...state,
        items: newItems,
      }
    }
    default:
      return state
  }
}
