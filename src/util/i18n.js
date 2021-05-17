import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import zh from 'vee-validate/dist/locale/zh_CN.json'

Vue.use(Vuei18n)

const i18n = new Vuei18n({
  locale: 'zh_CN',
  messages: {
    zh_CN: {
      fields: {
        email: '邮箱',
        password: '密码',
        name: '昵称',
        username: '用户名',
        code: '验证码'
      },
      validation: {
        ...zh.messages,
        required: '请输入{_field_}'
      }
    }
  }
})

export {
  i18n
}
