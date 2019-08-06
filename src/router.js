import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Food from './views/Food.vue'
import Sport from './views/Sport.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },
    {
      path: '/sport',
      name: 'sport',
      component: Sport
    },
  ]
})
