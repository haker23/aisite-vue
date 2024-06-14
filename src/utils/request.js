import axios from 'axios'
import Vue from 'vue'

let v = new Vue()

const request = axios.create({
	baseURL: '/aisite',  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
  timeout: 60000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8'
  
 // config.headers['token'] = user.token;  // 设置请求头
  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    var code = String(response.data.code)
    if (code.startsWith('100')) {
      v.$notify.error({
        message: response.data.msg
      })
    }
    return response.data
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default request

