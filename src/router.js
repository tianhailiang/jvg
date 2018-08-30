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
          name: '首页',
          component: () => import('@/views/main.vue')
        },
        {
          path: '/personnel',
          name: '人员管理',
          component: () => import('@/views/Personnel.vue')
        },
        {
          path: '/userEditors',
          name: '添加/编辑用户',
          component: () => import('@/views/userEditors.vue')
        },
        {
          path: '/realName',
          name: '实名认证管理',
          component: () => import('@/views/realName.vue')
        },
        {
          path: '/realNameDetails',
          name: '实名认证详情审核',
          component: () => import('@/views/realNameDetails.vue')
        },
        {
          path: '/institutions',
          name: '机构院校管理',
          component: () => import('@/views/institutions.vue')
        },
        {
          path: '/institutionsEditors',
          name: '新增/编辑机构院校',
          component: () => import('@/views/institutionsEditors.vue')
        },
        {
          path: '/institutionsExamine',
          name: '机构院校审核管理',
          component: () => import('@/views/institutionsExamine.vue')
        },
        {
          path: '/institutionsDetails',
          name: '机构院校审核详情页',
          component: () => import('@/views/institutionsDetails.vue')
        },
        {
          path: '/follow',
          name: '关注管理',
          component: () => import('@/views/follow.vue')
        },
        {
          path: '/dataTemplate',
          name: '数据看板',
          component: () => import('@/views/dataTemplate.vue')
        },
        {
          path: '/userAnalysis',
          name: '用户分析',
          component: () => import('@/views/userAnalysis.vue')
        },
        {
          path: '/businessAnalysis',
          name: '业务分析',
          component: () => import('@/views/businessAnalysis.vue')
        },
        {
          path: '/label',
          name: '标签列表',
          component: () => import('@/views/label.vue')
        },
        {
          path: '/labelRelationship',
          name: '标签关系列表',
          component: () => import('@/views/labelRelationship.vue')
        },
        {
          path: '/labelDegree',
          name: '标签热度列表',
          component: () => import('@/views/labelDegree.vue')
        },
        {
          path: '/sensitive',
          name: '敏感词管理',
          component: () => import('@/views/sensitive.vue')
        },
        {
          path: '/seoList',
          name: 'seo管理',
          component: () => import('@/views/seo.vue')
        },
        {
          path: '/journal',
          name: '日志管理',
          component: () => import('@/views/journal.vue')
        },
        {
          path: '/whiteList',
          name: '白名单管理',
          component: () => import('@/views/whiteList.vue')
        },
        {
          path: '/pageList',
          name: '页面管理',
          component: () => import('@/views/pageList.vue')
        },
        {
          path: '/apiList',
          name: 'API管理',
          component: () => import('@/views/apiList.vue')
        },
        {
          path: '/interlocution', /* 问答管理模块 话题列表 */
          name: 'interlocution',
          component: () => import('./views/InterlocutionList.vue')
        },
        {
          path: '/interlocution/:id', /* 问答管理模块 话题详情 */
          name: 'interlocutionDetail',
          component: () => import('./views/InterlocutionDetail.vue')
        },
        {
          path: '/answer', /* 问答管理模块 问答列表 */
          name: 'answer',
          component: () => import('./views/AnswerList.vue')
        },
        {
          path: '/answer/:id', /* 问答管理模块 问答详情 */
          name: 'answerDetail',
          component: () => import('./views/AnswerDetail.vue')
        },
        {
          path: '/private_letter', /* 私信管理模块 私信列表 */
          name: 'private_letter',
          component: () => import('./views/Private_letter_list.vue')
        },
        {
          path: '/article', /* 文章管理模块 文章列表 */
          name: 'article',
          component: () => import('./views/ArticleList.vue')
        },
        {
          path: '/article/:id', /* 文章管理模块 文章详情 */
          name: 'articleDetail',
          component: () => import('./views/ArticleDetail.vue')
        },
        {
          path: '/examine', /* 文章管理模块 文章审核列表 */
          name: 'examine',
          component: () => import('./views/ArticleExamine.vue')
        },
        {
          path: '/reward', /* 文章管理模块 文章打赏列表 */
          name: 'reward',
          component: () => import('./views/ArticleRewardList.vue')
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
          path: '/couponList', /* 优惠券列表 */
          name: 'couponList',
          component: () => import(/* webpackChunkName: "about" */ './views/couponList.vue')
        },
        {
          path: '/couponDetails', /* 优惠券详情 */
          name: 'couponDetails',
          component: () => import(/* webpackChunkName: "about" */ './views/couponDetails.vue')
        },
        {
          path: '/couponReview', /* 优惠券审核 */
          name: 'couponReview',
          component: () => import(/* webpackChunkName: "about" */ './views/couponReview.vue')
        },
        {
          path: '/scheduledEventList', /* 预约活动列表 */
          name: 'scheduledEventList',
          component: () => import(/* webpackChunkName: "about" */ './views/scheduledEventList.vue')
        },
        {
          path: '/scheduledEventDetail', /* 预约活动详情 */
          name: 'scheduledEventDetail',
          component: () => import(/* webpackChunkName: "about" */ './views/scheduledEventDetail.vue')
        },
        {
          path: '/userAppointmentList', /* 用户预约列表 */
          name: 'userAppointmentList',
          component: () => import(/* webpackChunkName: "about" */ './views/userAppointmentList.vue')
        },
        {
          path: '/helpSectionList', /* 帮助栏目列表 */
          name: 'helpSectionList',
          component: () => import(/* webpackChunkName: "about" */ './views/helpSectionList.vue')
        },
        {
          path: '/helpProblemList', /* 帮助问题列表 */
          name: 'helpProblemList',
          component: () => import(/* webpackChunkName: "about" */ './views/helpProblemList.vue')
        },
        {
          path: '/helpProblemList', /* 帮助问题列表 */
          name: 'helpProblemList',
          component: () => import(/* webpackChunkName: "about" */ './views/helpProblemList.vue')
        },
        {
          path: '/ruleManagement', /* 会员规则管理 */
          name: 'ruleManagement',
          component: () => import(/* webpackChunkName: "about" */ './views/ruleManagement.vue')
        },
        {
          path: '/integralRule', /* 积分规则管理 */
          name: 'integralRule',
          component: () => import(/* webpackChunkName: "about" */ './views/integralRule.vue')
        },
        {
          path: '/membershipLevel', /* 会员等级规则管理 */
          name: 'membershipLevel',
          component: () => import(/* webpackChunkName: "about" */ './views/membershipLevel.vue')
        },
        {
          path: '/lecturerPrestige', /* 讲师声望值规则 */
          name: 'lecturerPrestige',
          component: () => import(/* webpackChunkName: "about" */ './views/lecturerPrestige.vue')
        },
        {
          path: '/memberList', /* 会员列表 */
          name: 'memberList',
          component: () => import(/* webpackChunkName: "about" */ './views/memberList.vue')
        },
        {
          path: '/lecturerStatistics', /* 讲师声望值统计 */
          name: 'lecturerStatistics',
          component: () => import(/* webpackChunkName: "about" */ './views/lecturerStatistics.vue')
        },
        {
          path: '/memberDetails', /* 会员详情 */
          name: 'memberDetails',
          component: () => import(/* webpackChunkName: "about" */ './views/memberDetails.vue')
        },
        {
          path: '/advertListCopy', /* 广告列表 */
          name: 'advertListCopy',
          component: () => import(/* webpackChunkName: "about" */ './views/advertListCopy.vue')
        },
        {
          path: '/advertReview', /* 广告审核管理 */
          name: 'advertReview',
          component: () => import(/* webpackChunkName: "about" */ './views/advertReview.vue')
        },
        {
          path: '/advertDetail', /* 广告详情 */
          name: 'advertDetail',
          component: () => import(/* webpackChunkName: "about" */ './views/advertDetail.vue')
        },
        {
          path: '/advertReplace', /* 广告替换 */
          name: 'advertReplace',
          component: () => import(/* webpackChunkName: "about" */ './views/advertReplace.vue')
        },
        {
          path: '/advertDetailPlatform_list', /* 广告详情平台列表 */
          name: 'advertDetailPlatform_list',
          component: () => import(/* webpackChunkName: "about" */ './views/advertDetailPlatform_list.vue')
        },
        {
          path: '/advertDetailPlatform_item', /* 广告详情平台类目 */
          name: 'advertDetailPlatform_item',
          component: () => import(/* webpackChunkName: "about" */ './views/advertDetailPlatform_item.vue')
        },
        {
          path: '/advertSelect', /* 广告详情平台类目 */
          name: 'advertSelect',
          component: () => import(/* webpackChunkName: "about" */ './views/advertSelect.vue')
        },
        {
          path: '/advertSpaceDetail', /* 广告位详情（平台+固定+单页轮播）*/
          name: 'advertSpaceDetail',
          component: () => import(/* webpackChunkName: "about" */ './views/advertSpaceDetail.vue')
        },
        {
          path: '/advertSpaceDetail_list', /* 广告位详情（平台+列表+单页）*/
          name: 'advertSpaceDetail_list',
          component: () => import(/* webpackChunkName: "about" */ './views/advertSpaceDetail_list.vue')
        },
        {
          path: '/advertSpaceDetail_item', /* 广告位详情（平台+类目+单页）*/
          name: 'advertSpaceDetail_item',
          component: () => import(/* webpackChunkName: "about" */ './views/advertSpaceDetail_item.vue')
        },
        {
          path: '/reward/:id', /* 文章管理模块 文章打赏详情 */
          name: 'rewardDetail',
          component: () => import('./views/ArticleRewardDetail.vue')
        },
        {
          path: '/comment', /* 文章管理模块 文章评论列表 */
          name: 'comment',
          component: () => import('./views/ArticleCommentList.vue')
        },
        {
          path: '/comment/:id', /* 文章管理模块 文章评论详情 */
          name: 'commentDeatil',
          component: () => import('./views/ArticleCommentDetail.vue')
        },
        {
          path: '/notice', /* 运营管理模块 通知列表 */
          name: 'notice',
          component: () => import('./views/NoticeList.vue')
        },
        {
          path: '/notice/:id', /* 运营管理模块 通知详情 */
          name: 'noticeDetail',
          component: () => import('./views/NoticeDetail.vue')
        }
      ]
    }
  ]
})
