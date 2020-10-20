import moment from '../../moment'

import {
  CREATE_TASK_LIST_REQUEST,
  CREATE_TASK_LIST_SUCCESS,
  CREATE_TASK_LIST_FAILURE,
} from './actions'

const initialState = {
  unassignedTasks: [],
  taskLists: [],
  date: moment(),
  taskListsLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_LIST_REQUEST:
      return {
        ...state,
        taskListsLoading: true,
      }

    case CREATE_TASK_LIST_SUCCESS:
      return {
        ...state,
        taskListsLoading: false,
        taskLists: Array.prototype.concat(state.taskLists, action.payload),
      }

    case CREATE_TASK_LIST_FAILURE:
      return {
        ...state,
        taskListsLoading: false,
      }
    default:
      return state
  }
}
