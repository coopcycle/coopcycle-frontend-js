import {
  CREATE_TASK_LIST_SUCCESS
} from "./actions";
import { copyMap } from "./objectUtils"
import { replaceTasksWithIds } from "./taskListUtils"

const initialState = {
  items: new Map()
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_LIST_SUCCESS: {
      let taskList = replaceTasksWithIds(action.payload)

      let newItems = copyMap(state.items)
      newItems.set(taskList['@id'], taskList)

      return {
        ...state,
        items: newItems,
      }
    }
    default:
      return state
  }
}
