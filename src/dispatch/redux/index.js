export { default as reducer } from './reducers'
export {
  selectSelectedDate,
  selectTaskLists,
  selectAssignedTasks,
  selectUnassignedTasks,
  selectAllTasks,
  selectTasksWithColor
} from './selectors'

export * from './actions'

import { mapToColor } from './taskUtils'

export const taskUtils = {
  mapToColor
}
