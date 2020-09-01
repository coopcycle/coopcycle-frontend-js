import { createSelector } from 'reselect'
import { mapValues } from 'lodash'
import { integerToColor, groupLinkedTasks } from './utils'

export const selectTasksWithColor = createSelector(
  state => state.allTasks,
  allTasks =>
    mapValues(groupLinkedTasks(allTasks), taskIds => integerToColor(taskIds.reduce((accumulator, value) => accumulator + value)))
)
