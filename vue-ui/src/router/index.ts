import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/components/main/home/home.component.vue'
import Details from '@/components/main/details/details.component.vue'
import Inccorect from '@/components/main/incorrect/incorrect.component.vue'

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
    component: Details,
  },
  {
    path: '*',
    name: '404',
    component: Inccorect,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
