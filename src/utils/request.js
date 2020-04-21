
import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
import { URL } from './config'
import { getStorage } from './utils'
Vue.use(Toast)

const errorHandle = status => {
  // 判断状态码
  switch (status) {
    case 500:
      Toast.fail('找不到此服务，可能是在路上~')
      break
    case 503:
      Toast.fail('服务器开小差了~请稍后')
      break
    default:
      Toast.fail('网络错误')
  }

  return { data: '' }
}

// 新建了一个 axios 实例
const request = axios.create({
  baseURL: URL,
  timeout: 10000,
})

request.interceptors.request.use(

  config => {
    // 如果是FormData
    if (!(config.data instanceof FormData)) {
      config.headers = {
        Accept: 'application/json',
        'Authorization': `Bearer ${getStorage('token')}`,
        'Content-Type': 'application/json; charset=utf-8',
        ...config.headers
      }
    }else{
      config.headers = {
        'Authorization': `Bearer ${getStorage('token')}`,
        'Content-Type': 'application/json; charset=utf-8',
        ...config.headers
      }
    }
    return config
  },
  // 请求错误
  () => {
    // console.log('request error', err)
  }
)

// 处理响应数据
request.interceptors.response.use(
  // 请求成功
  res => { 
    if (res.code === 200) {
      return res.data
    }
    return Promise.resolve(res.data)
  },
  err => {
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response.data)
    }
    return { data: '' }
  }
)

export default request
