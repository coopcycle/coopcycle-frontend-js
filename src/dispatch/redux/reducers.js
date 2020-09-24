import moment from '../../moment'

const initialState = {
  unassignedTasks: [],
  taskLists: [],
  date: moment(),
}

export default (state = initialState, action) => {
  return {
    ...state
  }
}
