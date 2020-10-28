import {
  CREATE_TASK_LIST_SUCCESS
} from "./actions";
import { upsertTasks } from "./taskUtils"

const initialState = {
  items: new Map()
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_LIST_SUCCESS: {
      let taskList = action.payload
      let newItems = upsertTasks(state.items, taskList.items)

      return {
        ...state,
        items: newItems,
      }
    }
    default:
      return state
  }
}
