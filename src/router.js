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
          path: '/interlocution', /* 问答管理模块 话题列表 */
          name: 'interlocution',
          component: () => import(/* webpackChunkName: "about" */ './views/Interlocution.vue')
        },
        {
          path: '/private_letter', /* 私信管理模块 私信列表 */
          name: 'private_letter',
          component: () => import(/* webpackChunkName: "about" */ './views/Private_letter_list.vue')
        },
        {
          path: '/article', /* 文章管理模块 文章列表 */
          name: 'article',
          component: () => import(/* webpackChunkName: "about" */ './views/ArticleList.vue')
        }
      ]
    },
    {
      path: '/courseList', /* 课程列表 */
      name: 'courseList',
      component: () => import(/* webpackChunkName: "about" */ './views/courseList.vue')
    },
    {
      path: '/courseReview', /* 课程审核 */
      name: 'courseReview',
      component: () => import(/* webpackChunkName: "about" */ './views/courseReview.vue')
    },
    {
      path: '/courseComment', /* 课程评论 */
      name: 'courseComment',
      component: () => import(/* webpackChunkName: "about" */ './views/courseComment.vue')
    },
    {
      path: '/courseDetail', /* 课程详情 */
      name: 'courseDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/courseDetail.vue')
    },
    {
      path: '/courseCommentDetail', /* 课程评论详情 */
      name: 'courseCommentDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/courseCommentDetail.vue')
    },
    {
      path: '/orderManagement', //订单管理
      name: 'orderManagement',
      component: () => import(/* webpackChunkName: "about" */ './views/orderManagement.vue')
    }
  ]
})
