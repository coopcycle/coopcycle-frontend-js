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

import { mapToColor, addOrReplaceTasks } from './taskUtils'
import {
  tasksToIds,
  replaceTasksWithIds,
  findTaskListByTask,
  findTaskListByUsername,
  addAssignedTask,
  removeUnassignedTask,
  addOrReplaceTaskList,
  addOrReplaceTaskLists,
} from './taskListUtils'

export const taskUtils = {
  mapToColor, addOrReplaceTasks,
}

export const taskListUtils = {
  tasksToIds,
  replaceTasksWithIds,
  findTaskListByTask,
  findTaskListByUsername,
  addAssignedTask,
  removeUnassignedTask,
  addOrReplaceTaskList,
  addOrReplaceTaskLists,
}
