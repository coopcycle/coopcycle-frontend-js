import { default as taskListEntityReducers } from '../taskListEntityReducers'

describe('taskListEntityReducers', () => {

  it('should add a task list', () => {
    let expectedItems = new Map()
    expectedItems.set('bot_1', {
      '@id': '/api/task_lists/1',
      'username': 'bot_1',
      itemIds: [
          '/api/tasks/1',
          '/api/tasks/2',
      ]
    })

    expect(taskListEntityReducers(
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

})
