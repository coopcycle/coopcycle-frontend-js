import {
  selectSelectedDate,
  selectTaskLists,
  selectAllTasks,
  selectAssignedTasks,
  selectUnassignedTasks,
  selectTasksWithColor,
} from "../selectors";

import moment from "../../../moment";

describe('Selectors', () => {
  let date = moment().format('YYYY-MM-DD')
  let taskEntities = new Map()
  taskEntities.set('/api/tasks/1', {
    '@id': '/api/tasks/1',
    id : 1,
    next: '/api/tasks/2',
  })
  taskEntities.set('/api/tasks/2', {
    '@id': '/api/tasks/2',
    id : 2,
    previous: '/api/tasks/1',
  })
  taskEntities.set('/api/tasks/3', {
    '@id': '/api/tasks/3',
    id : 3,
  })
  taskEntities.set('/api/tasks/4', {
    '@id': '/api/tasks/4',
    id : 4,
  })

  let taskListEntities = new Map()
  taskListEntities.set('bot_1', {
    '@id': '/api/task_lists/1',
    'username': 'bot_1',
    itemIds: [
      '/api/tasks/1',
      '/api/tasks/2',
    ]
  })
  taskListEntities.set('bot_2', {
    '@id': '/api/task_lists/2',
    'username': 'bot_2',
    itemIds: [
      '/api/tasks/3',
    ]
  })

  let baseState = {
    lastmile: {
      date,
      entities: {
        tasks: {
          items: taskEntities
        },
        taskLists: {
          items: taskListEntities
        }
      },
      ui: {
        taskListsLoading: false,
      }
    }
  }

  describe('selectSelectedDate', () => {
    it('should return selected date', () => {
      expect(selectSelectedDate(baseState)).toEqual(date)
    })
  })

  describe('selectTaskLists', () => {
    it('should return task lists with tasks', () => {
      expect(selectTaskLists(baseState)).toEqual([
        {
          '@id': '/api/task_lists/1',
          'username': 'bot_1',
          items: [
            {
              '@id': '/api/tasks/1',
              id : 1,
              next: '/api/tasks/2',
            },
            {
              '@id': '/api/tasks/2',
              id : 2,
              previous: '/api/tasks/1',
            }
          ],
        },
        {
          '@id': '/api/task_lists/2',
          'username': 'bot_2',
          items: [
            {
              '@id': '/api/tasks/3',
              id : 3,
            }
          ],
        }
      ])
    })
  })

  describe('selectAllTasks', () => {
    it('should return all tasks', () => {
      expect(selectAllTasks(baseState)).toEqual([
        {
          '@id': '/api/tasks/1',
          id : 1,
          next: '/api/tasks/2',
        },
        {
          '@id': '/api/tasks/2',
          id : 2,
          previous: '/api/tasks/1',
        },
        {
          '@id': '/api/tasks/3',
          id : 3,
        },
        {
          '@id': '/api/tasks/4',
          id : 4,
        },
      ])
    })
  })

  describe('selectAssignedTasks', () => {
    it('should return assigned tasks', () => {
      expect(selectAssignedTasks(baseState)).toEqual([
        {
          '@id': '/api/tasks/1',
          id : 1,
          next: '/api/tasks/2',
        },
        {
          '@id': '/api/tasks/2',
          id : 2,
          previous: '/api/tasks/1',
        },
        {
          '@id': '/api/tasks/3',
          id : 3,
        },
      ])
    })
  })

  describe('selectUnassignedTasks', () => {
    it('should return unassigned tasks', () => {
      expect(selectUnassignedTasks(baseState)).toEqual([
        {
          '@id': '/api/tasks/4',
          id : 4,
        },
      ])
    })
  })

  describe('selectTasksWithColor', () => {
    it('should return tasks with a color tag', () => {
      expect(selectTasksWithColor(baseState)).toEqual({
        "/api/tasks/1": "#93c63f",
        "/api/tasks/2": "#93c63f",
      })
    })
  })
})