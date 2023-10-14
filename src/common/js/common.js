import axios from 'axios'
import {useLocalStorage} from '@vueuse/core'
import {ElMessage} from 'element-plus'

axios.interceptors.request.use(config => {
  // 获取token类型
  const tokenType = 'Bearer'
  // 获取token
  const token = useLocalStorage('token').value
  // 设置参数格式
  if (!config.headers['Content-Type']) {
    config.headers = {
      'Content-Type': 'application/json'
    }
  }
  // 添加token到headers
  if (token) {
    config.headers['Authorization'] = tokenType + ' ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})


export const common = {
  axios (options) {
    return new Promise((resolve, reject) => {
      axios({
        method: options.method,
        url: `${location.origin}/${options.url}`,
        params: options.params,
        data: options.data
      }).then(res => {
        if (res.data.code === 200) {
          resolve(res.data.data)
        } else {
          ElMessage.error(res.data.message)
        }
      }).catch(err => {
        if (err && err.response) {
          ElMessage.error(err.response.data.message)
          if (err.response.data.code) {
            // 用户登录异常code
          }
        }
        reject(err)
      })
    })

  },
}
