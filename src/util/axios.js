// 封装axios请求,返回重新封装的数据格式
// 对错误的统一处理

import axios from 'axios'
import errHandle from './errHandle'
// import config from './../config'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设定拦截器
  interceptors (instance) {
    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
      // 在发送请求之前做些什么
      console.log('config: ', config)
      return config
    }, (error) => {
      errHandle(error)
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((response) => {
      console.log('---response---')
      console.log(response)
      if (response.status === 200) {
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(response)
      }
      // 对响应数据做点什么
    }, (error) => {
      // debugger
      errHandle(error)
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  // 创建实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}

export default HttpRequest
