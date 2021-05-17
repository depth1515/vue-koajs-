import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './util/veevalidate'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Alert from './components/modules/alter'
// import '@/util/veevalidate-i18n'
Vue.use(Alert)

Vue.prototype.$api = axios

Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
