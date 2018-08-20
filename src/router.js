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
    },
    {
      path: '/orderList', /* 订单列表 */
      name: 'orderList',
      component: () => import(/* webpackChunkName: "about" */ './views/orderList.vue')
    },
    {
      path: '/orderRefund', /* 订单退款 */
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
    }
  ]
})
