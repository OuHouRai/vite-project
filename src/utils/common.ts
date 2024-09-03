import { reactive } from 'vue'
//Test
const initInputData = {
  datasourceName: '',
  driverClassName: '',
  url: '',
  userName: '',
  password: '',
  startYear: '',
  endYear: '',
  status: true,
  action: 'submit',
  id: '',
  ip: '',
  port: '',
}
const inputData = reactive({ ...initInputData })
const $resetInputData = () => {
  Object.assign(inputData, initInputData)
}
export default {
  $resetInputData,
}
