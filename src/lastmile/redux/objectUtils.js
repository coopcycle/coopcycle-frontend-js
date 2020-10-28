export function copyMap(items) {
  let newItems = new Map()
  for (let [key, value] of items) {
    newItems.set(key, value)
  }
  return newItems
}
