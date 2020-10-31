import _ from "lodash";
import moment from "moment";

export const taskListKey = 'username'

export function tasksToIds(tasks) {
  return tasks.map((item) => item["@id"])
}

export function replaceTasksWithIds(taskList) {
  let entity = {
    ...taskList
  }

  entity.itemIds = tasksToIds(taskList.items)
  delete entity.items

  return entity
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

export function findTaskListEntity(taskLists, task) {
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
  let newItems = new Map(state.items)

  let taskList = findTaskListEntity(taskLists, task)

  let targetTaskList = _.find(taskLists, taskList => taskList.username === task.assignedTo)

  if (taskList != null) {
    if (targetTaskList.username !== taskList.username) {
      //unassign
      let newTaskList = {
        ...taskList,
        itemIds: removeTaskId(taskList.itemIds, task['@id'])
      }

      newItems.set(taskList[taskListKey], newTaskList)
    }
  }

  //assign
  if (targetTaskList != null) {
    let newTaskList = {
      ...targetTaskList,
      itemIds: addTaskIdIfMissing(targetTaskList.itemIds, task['@id'])
    }

    newItems.set(targetTaskList[taskListKey], newTaskList)

  } else {
    let newTaskList = createTaskList(task.assignedTo, [task])
    newTaskList = replaceTasksWithIds(newTaskList)

    newItems.set(newTaskList[taskListKey], newTaskList)
  }

  return newItems
}

export function removeUnassignedTask(state, task) {
  let taskLists = Array.from(state.items.values())
  let newItems = new Map(state.items)

  let taskList = findTaskListEntity(taskLists, task)

  if (taskList != null) {
    //unassign
    let newTaskList = {
      ...taskList,
      itemIds: removeTaskId(taskList.itemIds, task['@id'])
    }

    newItems.set(taskList[taskListKey], newTaskList)
  }

  return newItems
}
