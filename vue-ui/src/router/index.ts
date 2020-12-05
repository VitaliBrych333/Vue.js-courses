import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/components/main/home/home.component.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search*',
    name: 'Search',
    component: Home
  },
  {
    path: '/movies/:id',
    name: 'Details',
    component: () =>
      import(/* webpackChunkName: "Details" */ '@/components/main/details/details.component.vue')
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "Inccorect" */ '@/components/main/incorrect/incorrect.component.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
