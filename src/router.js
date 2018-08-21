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
          component: () => import('@/views/realNameDetails.vue')
        },
        {
          path: '/institutions',
          name: 'institutions',
          component: () => import('./views/institutions.vue')
        },
        {
          path: '/institutionsEditors',
          name: 'institutionsEditors',
          component: () => import('@/views/institutionsEditors.vue')
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
      path: '/orderList', /* 订单列表 */
      name: 'orderList',
      component: () => import(/* webpackChunkName: "about" */ './views/orderList.vue')
    },
    {
      path: '/orderRefund', /* 订单退款列表 */
      name: 'orderRefund',
      component: () => import(/* webpackChunkName: "about" */ './views/orderRefund.vue')
    },
    {
      path: '/orederRefundDetail', /* 订单退款详情 */
      name: 'orederRefundDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/orederRefundDetail.vue')
    },
    {
      path: '/orderDetail', /* 订单详情 */
      name: 'orderDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/orderDetail.vue')
    },
    {
      path: '/publishingList', /* 出版物列表 */
      name: 'publishingList',
      component: () => import(/* webpackChunkName: "about" */ './views/publishingList.vue')
    },
    {
      path: '/publishingCommentList', /* 出版物评论列表 */
      name: 'publishingCommentList',
      component: () => import(/* webpackChunkName: "about" */ './views/publishingCommentList.vue')
    },
    {
      path: '/publishingCommentDetail', /* 出版物评论详情 */
      name: 'publishingCommentDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/publishingCommentDetail.vue')
    },
    {
      path: '/publishingDetail', /* 出版物详情 */
      name: 'publishingDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/publishingDetail.vue')
    },
    {
      path: '/publishingReview', /* 出版物审核 */
      name: 'publishingReview',
      component: () => import(/* webpackChunkName: "about" */ './views/publishingReview.vue')
    },
    {
      path: '/advertList', /* 广告位列表 */
      name: 'advertList',
      component: () => import(/* webpackChunkName: "about" */ './views/advertList.vue')
    }
  ]
})
