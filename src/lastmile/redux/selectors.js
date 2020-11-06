import _ from "lodash";
import {createSelector} from "reselect";
import {mapToColor} from "./taskUtils";

export const selectSelectedDate = state => state.lastmile.date

export const selectTaskLists = createSelector(
  state => state.lastmile.entities.taskLists.byUsername,
  state => state.lastmile.entities.tasks.byId,
  (taskListsByUsername, tasksById) =>
    Object.values(taskListsByUsername).map(taskList => {
      let newTaskList = {...taskList}
      delete newTaskList.itemIds

      newTaskList.items = taskList.itemIds.map(taskId => {
        let task = tasksById[taskId]

        console.assert(task != null, `task is null: taskId: ${taskId}`)

        return task
      })

      return newTaskList
    })
)

export const selectAllTasks = createSelector(
  state => state.lastmile.entities.tasks.byId,
  tasksById => Object.values(tasksById)
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
