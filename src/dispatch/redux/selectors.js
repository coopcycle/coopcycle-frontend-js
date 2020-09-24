import {forEach} from "lodash";
import {createSelector} from "reselect";
import {mapToColor} from "./taskUtils";

export const selectSelectedDate = state => state.dispatch.date

export const selectTaskLists = state => state.dispatch.taskLists

function flattenTaskLists(taskLists) {
  const tasks = []
  forEach(taskLists, taskList => taskList.items.forEach(task => tasks.push(task)))

  return tasks
}

export const selectAssignedTasks = createSelector(
  selectTaskLists,
  taskLists => flattenTaskLists(taskLists)
)

export const selectUnassignedTasks = state => state.dispatch.unassignedTasks

export const selectAllTasks = createSelector(
  selectUnassignedTasks,
  selectAssignedTasks,
  (unassignedTasks, assignedTasks) => {
    return unassignedTasks.slice(0).concat(assignedTasks)
  }
)

export const selectTasksWithColor = createSelector(
   selectAllTasks,
  allTasks => mapToColor(allTasks)
)
