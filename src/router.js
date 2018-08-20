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
          component: () => import('./views/main.vue')
        },
        {
          path: '/personnel',
          name: 'personnel',
          component: () => import('./views/Personnel.vue')
        },
        {
          path: '/userEditors',
          name: 'userEditors',
          component: () => import('./views/userEditors.vue')
        },
        {
          path: '/realName',
          name: 'realName',
          component: () => import('./views/realName.vue')
        },
        {
          path: '/realNameDetails',
          name: 'realNameDetails',
          component: () => import('./views/realNameDetails.vue')
        },
        {
          path: '/institutions',
          name: 'institutions',
          component: () => import('./views/institutions.vue')
        },
        {
          path: '/institutionsEditors',
          name: 'institutionsEditors',
          component: () => import('./views/institutionsEditors.vue')
        },
        {
          path: '/institutionsExamine',
          name: 'institutionsExamine',
          component: () => import('./views/institutionsExamine.vue')
        },
        {
          path: '/institutionsDetails',
          name: 'institutionsDetails',
          component: () => import('./views/institutionsDetails.vue')
        },
        {
          path: '/follow',
          name: 'follow',
          component: () => import('./views/follow.vue')
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
    },
    {
      path: '/courseReview', //课程审核
      name: 'courseReview',
      component: () => import(/* webpackChunkName: "about" */ './views/courseReview.vue')
    },
    {
      path: '/courseComment', //课程评论
      name: 'courseComment',
      component: () => import(/* webpackChunkName: "about" */ './views/courseComment.vue')
    },
    {
      path: '/courseDetail', //课程详情
      name: 'courseDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/courseDetail.vue')
    },
    {
      path: '/courseCommentDetail', //课程评论详情
      name: 'courseCommentDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/courseCommentDetail.vue')
    }
  ]
})
