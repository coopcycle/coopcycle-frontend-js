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
  tasksToIds,
  replaceTasksWithIds,
  findTaskList,
  addAssignedTask,
  removeUnassignedTask,
} from './taskListUtils'
import { copyMap } from "./objectUtils";

export const taskUtils = {
  mapToColor, upsertTasks
}

export const taskListUtils = {
  tasksToIds, replaceTasksWithIds,
  findTaskList,
  addAssignedTask, removeUnassignedTask,
}

export const objectUtils = {
  copyMap
}
