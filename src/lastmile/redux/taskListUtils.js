import _ from "lodash";
import moment from "moment";
import { copyMap } from "./objectUtils"

export function tasksToIds(tasks) {
  return tasks.map((item) => item["@id"])
}

export function replaceTasksWithIds(taskList) {
  let newTaskList = {
    ...taskList
  }

  newTaskList.itemIds = tasksToIds(newTaskList.items)
  delete newTaskList.items

  return newTaskList
}

function addTaskIdIfMissing(taskIds, taskId) {

  const taskIdIndex = _.findIndex(taskIds, t => t === taskId)

  if (-1 !== taskIdIndex) {
    return taskIds
  } else {
    return taskIds.concat([ taskId ])
  }
}

function removeTaskId(taskIds, taskId) {
  return _.filter(taskIds, t => t !== taskId)
}

export function findTaskList(taskLists, task) {
  return _.find(taskLists, taskList => {
    return _.includes(taskList.itemIds, task['@id'])
  })
}

function createTaskList(username, items = []) {

  return {
    '@context': '/api/contexts/TaskList',
    '@id': null,
    '@type': 'TaskList',
    distance: 0,
    duration: 0,
    polyline: '',
    createdAt: moment().format(),
    updatedAt: moment().format(),
    username,
    items,
  }
}

export function addAssignedTask(state, task) {
  let taskLists = Array.from(state.items.values())
  let newItems = copyMap(state.items)

  let taskList = findTaskList(taskLists, task)

  let targetTaskList = _.find(taskLists, taskList => taskList.username === task.assignedTo)

  if (taskList != null) {
    if (targetTaskList['@id'] !== taskList['@id']) {
      //unassign
      let newTaskList = {
        ...taskList,
        itemIds: removeTaskId(taskList.itemIds, task['@id'])
      }

      newItems.set(taskList['@id'], newTaskList)
    }
  }

  //assign
  if (targetTaskList != null) {
    let newTaskList = {
      ...targetTaskList,
      itemIds: addTaskIdIfMissing(targetTaskList.itemIds, task['@id'])
    }

    newItems.set(targetTaskList['@id'], newTaskList)

  } else {
    let newTaskList = createTaskList(task.assignedTo, [task])
    newTaskList = replaceTasksWithIds(newTaskList)

    newItems.set(newTaskList['@id'], newTaskList)
  }

  return newItems
}

export function removeUnassignedTask(state, task) {
  let taskLists = Array.from(state.items.values())
  let newItems = copyMap(state.items)

  let taskList = findTaskList(taskLists, task)

  if (taskList != null) {
    //unassign
    let newTaskList = {
      ...taskList,
      itemIds: removeTaskId(taskList.itemIds, task['@id'])
    }

    newItems.set(taskList['@id'], newTaskList)
  }

  return newItems
}
