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
axios.interceptors.request.use(
  config => {
    store.commit('loader/LOADING', true)
    return config
  },
  err => {
    store.commit('loader/LOADING', false)
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  res => {
    store.commit('loader/LOADING', false)
    return res
  },
  err => {
    store.commit('loader/LOADING', false)
    return Promise.reject(err)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
