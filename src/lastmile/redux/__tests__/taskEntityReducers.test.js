import { default as taskEntityReducers } from '../taskEntityReducers'

describe('taskEntityReducers', () => {

  describe('CREATE_TASK_LIST_SUCCESS', () => {
    it('should add tasks', () => {
      let expectedItems = new Map()
      expectedItems.set('/api/tasks/1', {
        '@id': '/api/tasks/1',
        id : 1,
        next: '/api/tasks/2',
      })
      expectedItems.set('/api/tasks/2', {
        '@id': '/api/tasks/2',
        id : 2,
        previous: '/api/tasks/1',
      })

      expect(taskEntityReducers(
          {
            items: new Map()
          },
          {
            type: 'CREATE_TASK_LIST_SUCCESS',
            payload: {
              '@id': '/api/task_lists/1',
              'username': 'bot_1',
              items: [
                {
                  '@id': '/api/tasks/1',
                  id : 1,
                  next: '/api/tasks/2',
                }, {
                  '@id': '/api/tasks/2',
                  id : 2,
                  previous: '/api/tasks/1',
                }
              ]
            }
          }
      )).toEqual({
        items: expectedItems,
      })
    })

    it('should update tasks', () => {
      let initialItems = new Map()
      initialItems.set('/api/tasks/1', {
        '@id': '/api/tasks/1',
        id : 1,
      })
      initialItems.set('/api/tasks/2', {
        '@id': '/api/tasks/2',
        id : 2,
      })

      let expectedItems = new Map()
      expectedItems.set('/api/tasks/1', {
        '@id': '/api/tasks/1',
        id : 1,
        next: '/api/tasks/2',
      })
      expectedItems.set('/api/tasks/2', {
        '@id': '/api/tasks/2',
        id : 2,
        previous: '/api/tasks/1',
      })

      expect(taskEntityReducers(
          {
            items: initialItems
          },
          {
            type: 'CREATE_TASK_LIST_SUCCESS',
            payload: {
              '@id': '/api/task_lists/1',
              'username': 'bot_1',
              items: [
                {
                  '@id': '/api/tasks/1',
                  id : 1,
                  next: '/api/tasks/2',
                }, {
                  '@id': '/api/tasks/2',
                  id : 2,
                  previous: '/api/tasks/1',
                }
              ]
            }
          }
      )).toEqual({
        items: expectedItems,
      })
    })
  })

})
