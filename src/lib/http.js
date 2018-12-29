import axios from 'axios'
import Vue from 'vue'

let instance = axios.create({
  baseURL: '/backend',
  timeout: 10000,
  headers: {'X-Custom-Header': 'axios'}
})
instance.interceptors.request.use(
  function (config) {
    config.headers = {
      'Content-Type': 'application/json' // 设置很关键
    }
    return config
  }, function (err) {
    // Vue.prototype.$message.error('请求失败,请联系管理员')
    console.log('请求失败,请联系管理员')
    console.log(err)
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (err) {
  // Vue.prototype.$message.error('系统异常,请联系管理员')
  console.log('系统异常,请联系管理员')
  console.log(err)
  return Promise.reject(err)
})

Vue.prototype.$http = instance

export default instance
