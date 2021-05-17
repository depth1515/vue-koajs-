import AlertComponent from './Alter.vue'

const Alert = {}

Alert.install = function (Vue, options) {
  const AlertConstructor = Vue.extend(AlertComponent)

  const instance = new AlertConstructor()

  instance.$mount(document.createElement('div'))

  document.body.appendChild(instance.$el)

  // 4. 添加实例方法
  Vue.prototype.$alert = (msg) => {
    // 逻辑...
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }

  Vue.prototype.$confirm = (msg, cancel, confirm) => {
    // 逻辑...
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if (typeof cacel !== 'undefined') {
      instance.cancel = cancel
    }
    if (typeof confirm !== 'undefined') {
      instance.confirm = confirm
    }
  }
}

export default Alert
