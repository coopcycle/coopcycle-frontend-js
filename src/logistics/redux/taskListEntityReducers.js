import {
  CREATE_TASK_LIST_SUCCESS
} from './actions';
import { replaceTasksWithIds, upsertTaskList } from './taskListUtils'

const initialState = {
  byId: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_LIST_SUCCESS: {
      let entity = replaceTasksWithIds(action.payload)

      let newItems = upsertTaskList(state.byId, entity)

      return {
        ...state,
        byId: newItems,
      }
    }
    default:
      return state
  }
}
