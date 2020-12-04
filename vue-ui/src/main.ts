import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios'
import './plugins/bootstrap-vue'
import './plugins/formulate-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.headers['Content-Type'] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
