import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/interlocution',
      name: 'interlocution',
      component: () => import(/* webpackChunkName: "about" */ './views/Interlocution.vue')
    },
    {
      path: '/courseList', //课程列表
      name: 'courseList',
      component: () => import(/* webpackChunkName: "about" */ './views/courseList.vue')
    }
  ]
})
