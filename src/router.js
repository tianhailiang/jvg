import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import login from '@/views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'index',
      component: index,
      children:
      [
        {
          path: '',
          name: '首页右侧',
          component: () => import(/* webpackChunkName: "about" */ './views/main.vue')
        }
      ]
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
