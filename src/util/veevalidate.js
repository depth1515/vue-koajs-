import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed, max } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)
extend('max', max)

// Custom validate
extend('name', {
  validate: value => {
    console.log((/^\d+/).test(value))
    return !(/^\d+/).test(value)
  },
  message: '不能以纯数字为昵称'
})

localize('zh_CN', {
  // 全局
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  // names 对应 fields 覆盖全局messages
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '用户名',
    code: '验证码'
  },
  fields: {
    // fields 覆盖全局messages
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}！！！'
    },
    name: {
      min: (field, { length }) => {
        return `请在${field}输入至少${length}个字符`
      }
    }
  }
})
