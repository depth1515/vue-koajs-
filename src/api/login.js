import axios from './../util/request'

/**
 * 获取验证码接口
 * @param {*} sid 唯一标识
 */
const getCode = (sid) => {
  return axios.get(`/public/getCaptcha?sid=${sid}`)
}

/**
 * 找回密码接口
 * @param {*} options 用户信息 { 邮箱，验证码code }
 */
const forget = (options) => {
  return axios.post('/forget', {
    ...options
  })
}
/**
 * 登录接口
 * @param {*} userInfo 登录信息
 */
const login = (userInfo) => {
  return axios.post('/login/login', {
    ...userInfo
  })
}
/**
 * 注册接口
 * @param {*} userInfo 注册信息
 */
const reg = (userInfo) => {
  return axios.post('/login/reg', {
    ...userInfo
  })
}

export {
  getCode,
  forget,
  login,
  reg
}
