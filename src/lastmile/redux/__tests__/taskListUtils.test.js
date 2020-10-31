import {
  tasksToIds,
  replaceTasksWithIds,
  findTaskListEntity,
  addAssignedTask,
  removeUnassignedTask,
} from '../taskListUtils.js'

describe('tasksToIds', () => {

  it('should map tasks to task ids', () => {

    let tasks = [
      {
        '@id': '/api/tasks/1',
        id : 1,
      }, {
        '@id': '/api/tasks/2',
        id : 2,
      }
    ]

    let ids = tasksToIds(tasks)

    expect(ids).toEqual([
      '/api/tasks/1',
      '/api/tasks/2',
    ])
  })
})

describe('replaceTasksWithIds', () => {

  it('should remove items and add itemIds in a task list', () => {

    let taskList = {
      '@id': '/api/task_lists/1',
      username: 'bot_1',
      items: [
        {
          '@id': '/api/tasks/1',
          id : 1,
        }, {
          '@id': '/api/tasks/2',
          id : 2,
        }
      ]
    }

    let result =  replaceTasksWithIds(taskList)

    expect(result).toEqual({
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })
    expect(result).not.toBe(taskList)
  })
})

describe('findTaskListEntity', () => {

  it('should return a task list, it it is found ', () => {

    let entities = [{
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    }, {
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    }]

    let task = {
      '@id': '/api/tasks/1',
      id : 1,
      next: '/api/tasks/2',
    }

    let result =  findTaskListEntity(entities, task)

    expect(result).toEqual({
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })
  })

  it('should return undefined if task does not belong to any tasklist', () => {

    let entities = [{
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    }, {
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    }]

    let task = {
      '@id': '/api/tasks/5',
      id : 1,
      next: '/api/tasks/2',
    }

    let result =  findTaskListEntity(entities, task)

    expect(result).toBeUndefined()
  })
})

describe('addAssignedTask', () => {

  it('should add assigned task into existing task list', () => {
    let state = {
      items: new Map()
    }
    state.items.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })
    state.items.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    })

    let task = {
      '@id': '/api/tasks/5',
      id: 5,
      isAssigned: true,
      assignedTo: 'bot_1'
    }

    let result = addAssignedTask(state, task)

    let expectedItems = new Map()
    expectedItems.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
        '/api/tasks/5',
      ]
    })
    expectedItems.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    })

    expect(result).toEqual(expectedItems)
    expect(result).not.toBe(state.items)
  })

  it('should create a new task list when it does not exist', () => {
    let state = {
      items: new Map()
    }
    state.items.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })

    let task = {
      '@id': '/api/tasks/3',
      id: 3,
      isAssigned: true,
      assignedTo: 'bot_2'
    }

    let result = addAssignedTask(state, task)

    expect(result.get('bot_1').itemIds).toEqual([
      '/api/tasks/1',
      '/api/tasks/2',
    ])
    expect(result.get('bot_2').itemIds).toEqual([
      '/api/tasks/3',
    ])
    expect(result).not.toBe(state.items)
  })

  it('should unassign task if it was assigned to another courier', () => {
    let state = {
      items: new Map()
    }
    state.items.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })
    state.items.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    })

    let task = {
      '@id': '/api/tasks/3',
      id: 5,
      isAssigned: true,
      assignedTo: 'bot_1'
    }

    let result = addAssignedTask(state, task)

    let expectedItems = new Map()
    expectedItems.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
        '/api/tasks/3',
      ]
    })
    expectedItems.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/4',
      ]
    })

    expect(result).toEqual(expectedItems)
    expect(result).not.toBe(state.items)
  })

  it('should not modify a task list if the task is already there', () => {
    let state = {
      items: new Map()
    }
    state.items.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })
    state.items.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    })

    let task = {
      '@id': '/api/tasks/1',
      id: 1,
      isAssigned: true,
      assignedTo: 'bot_1'
    }

    let result = addAssignedTask(state, task)

    let expectedItems = new Map()
    expectedItems.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })
    expectedItems.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    })

    expect(result).toEqual(expectedItems)
    expect(result.get('bot_1').itemIds).toBe(state.items.get('bot_1').itemIds)
  })
})

describe('removeUnassignedTask', () => {
  it('should remove unassigned task', () => {
    let state = {
      items: new Map()
    }
    state.items.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/1',
        '/api/tasks/2',
      ]
    })
    state.items.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    })

    let task = {
      '@id': '/api/tasks/1',
      id: 1,
      isAssigned: false,
      assignedTo: null,
    }

    let result = removeUnassignedTask(state, task)

    let expectedItems = new Map()
    expectedItems.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
        '/api/tasks/2',
      ]
    })
    expectedItems.set('bot_2', {
      '@id': '/api/task_lists/2',
      'username': 'bot_2',
      itemIds: [
        '/api/tasks/3',
        '/api/tasks/4',
      ]
    })

    expect(result).toEqual(expectedItems)
    expect(result).not.toBe(state.items)
  })
})
