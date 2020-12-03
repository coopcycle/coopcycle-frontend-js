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
  selectTasksWithColor
} from './selectors'

export * from './actions'

import { mapToColor, upsertTasks } from './taskUtils'
import {
  taskListKey,
  tasksToIds,
  replaceTasksWithIds,
  findTaskListEntity,
  addAssignedTask,
  removeUnassignedTask,
  upsertTaskList,
} from './taskListUtils'

export const taskUtils = {
  mapToColor, upsertTasks
}

export const taskListUtils = {
  taskListKey,
  tasksToIds,
  replaceTasksWithIds,
  findTaskListEntity,
  addAssignedTask,
  removeUnassignedTask,
  upsertTaskList,
}
