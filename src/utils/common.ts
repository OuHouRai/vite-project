// 浏览器存储
const $storage = {
  set(key: string, value: number) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}
//是否是空
function $isNull(value: any) {
  if (
    (value === null ||
      value === undefined ||
      value === '' ||
      value.length === 0) &&
    typeof value !== 'number' &&
    typeof value !== 'boolean'
  ) {
    return true
  }
  return false
}
export default {
  $storage,
  $isNull,
}
