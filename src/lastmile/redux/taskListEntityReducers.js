import {
  CREATE_TASK_LIST_SUCCESS
} from "./actions";
import { replaceTasksWithIds, upsertTaskList } from "./taskListUtils"

const initialState = {
  byUsername: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_LIST_SUCCESS: {
      let entity = replaceTasksWithIds(action.payload)

      let newItems = upsertTaskList(state.byUsername, entity)

      return {
        ...state,
        byUsername: newItems,
      }
    }
    default:
      return state
  }
}
