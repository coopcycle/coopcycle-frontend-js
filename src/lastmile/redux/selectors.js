import _ from "lodash";
import {createSelector} from "reselect";
import {mapToColor} from "./taskUtils";

export const selectSelectedDate = state => state.lastmile.date

function toArray(map) {
  return Array.from(map.values())
}

export const selectTaskLists = createSelector(
  state => state.lastmile.entities.taskLists.items,
  state => state.lastmile.entities.tasks.items,
  (taskLists, tasks) =>
    toArray(taskLists).map(taskList => {
      let newTaskList = {...taskList}
      delete newTaskList.itemIds

      newTaskList.items = taskList.itemIds.map(taskId => {
        let task = tasks.get(taskId)

        console.assert(task != null, `task is null: taskId: ${taskId}`)

        return task
      })

      return newTaskList
    })
)

export const selectAllTasks = createSelector(
  state => state.lastmile.entities.tasks.items,
  map => toArray(map)
)

export const selectAssignedTasks = createSelector(
  selectTaskLists,
  taskLists => _.flatMap(taskLists,taskList => taskList.items)
)

export const selectUnassignedTasks = createSelector(
  selectAllTasks,
  selectAssignedTasks,
  (allTasks, assignedTasks) =>
    _.filter(allTasks, task => assignedTasks.findIndex(assignedTask => task["@id"] == assignedTask["@id"]) == -1)
)

export const selectTasksWithColor = createSelector(
   selectAllTasks,
  allTasks => mapToColor(allTasks)
)
