import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/api'
})
Vue.use(axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
