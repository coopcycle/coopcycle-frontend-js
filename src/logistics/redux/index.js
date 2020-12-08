export { default as dateReducer } from './dateReducer'
export { default as taskEntityReducers } from './taskEntityReducers'
export { default as taskListEntityReducers } from './taskListEntityReducers'
export { default as uiReducers } from './uiReducers'

export {
  selectSelectedDate,
  selectTaskLists,
  selectAssignedTasks,
  selectUnassignedTasks,
  selectAllTasks,
  selectTasksWithColor,
} from './selectors'

export * from './actions'

import { mapToColor, upsertTasks } from './taskUtils'
import {
  tasksToIds,
  replaceTasksWithIds,
  findTaskListByTask,
  findTaskListByUsername,
  addAssignedTask,
  removeUnassignedTask,
  upsertTaskList,
  upsertTaskLists,
} from './taskListUtils'

export const taskUtils = {
  mapToColor, upsertTasks,
}

export const taskListUtils = {
  tasksToIds,
  replaceTasksWithIds,
  findTaskListByTask,
  findTaskListByUsername,
  addAssignedTask,
  removeUnassignedTask,
  upsertTaskList,
  upsertTaskLists,
}
