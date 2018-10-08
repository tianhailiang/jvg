// import http from './http'
// var url = "https://tdxzback.jjldxz.com/api/c/";

const URL = ''
export default {
  state: { 
    'courseList': URL + 'course/list.json', // 课程列表
    'removeCourseList': URL + 'course/delete.json', // 删除课程
    'jdCourse': URL + 'course/frozen.json', // 冻结、解冻课程
    'courseComent': URL + 'course/comment/list.json', // 查询课程评论列表
    'courseComentDetail': URL + 'course/comment/detail.json', // 查询课程评论详情
    'removeCourseComent': URL + 'course/comment/delete.json', // 删除课程评论
    'courseReview': URL + 'course/verify/list.json', // 课程审核列表
    'courseReviewInfo': URL + 'course/verify.json',  // 审核课程信息
    'addCourse':  URL + 'course/create.json', // 创建课程
    'editCourse':  URL + 'course/update.json', // 编辑课程
    'searchCourseDetail': URL +'course/detail.json', // 查询课程详情

    'searchmemberList': URL + 'user/rank/list.json', // 查询会员等级列表
    'memberList':URL + 'user/vip/list.json', //查询会员列表
    'removeVip': URL + 'user/rank/delete.json', // 删除会员等级信息
    'clearvipAll': URL + 'user/rank/clear.json', // 清除除会员等级
    'addVip': URL + 'user/rank/create.json', // 添加会员等级信息
    'searchTeacher': URL + 'operations/prestige-rule/list.json', // 查询讲师声望值规则列表
    'removeTeacher': URL + 'operations/prestige-rule/delete.json', // 删除讲师声望值规则信息
    'clearAll': URL + 'operations/prestige-rule/clear.json', // 清除讲师声望值规则信息
    'addTeacher':URL + 'operations/prestige-rule/create.json', // 追加讲师声望值规则信息
    'searchPrestige': URL + 'operations/prestige-statistics/list.json', //查询讲师声望值统计列表
    'searchdetail': URL + 'operations/prestige-statistics/list-details.json', // 查询讲师声望值详细信息
    'update':URL + 'user/prestige-statistics/update.json',// 更新讲师声望值初始值
    'updateIntegral':URL + 'user/vip/update-integral.json', // 更新会员积分信息
    'viprulelist':URL + 'operations/vip-integral/list.json', // 查询会员积分规则列表-
    'removerule': URL + 'operations/vip-integral/delete.json', // 删除会员积分规则信息
    'addrule': URL + 'operations/vip-integral/create.json', // 追加会员积分规则信息
    'clearAllvip': URL + 'operations/vip-integral/clear.json', //清除会员积分规则信息
    'searchIntegral': URL + 'user/vip/vip-details.json', // 查询会员积分详情
    'searchviplist':URL + 'operations/vip-regulation/list.json', // 查询VIP会员规则列表
    'removeviprule':URL + 'operations/vip-regulation/delete.json', // 删除VIP会员规则信息
    'clearAllviprule':URL + 'operations/vip-regulation/clear.json', //清除VIP会员规则信息
    'addToviprule':URL+ 'operations/vip-regulation/create.json', // 追加VIP会员规则信息


    'removePublish': URL + 'publication/delete.json', //删除出版物
    'searchPublishList': URL + 'publication/list.json', // 查询出版物
    'freezePublish': URL + 'publication/frozen.json', //冻结出版物
    'searchCommentList': URL + 'publication/comment/list.json', // 出版物评论列表
    'publishReviewList': URL + 'publication/verify/list.json', // 出版物审核列表
    'reviewListInfo': URL + 'publication/verify.json', // 审核出版物信息
    'reviewDetail': URL + 'publication/comment/detail.json', // 出版物评论详情
    'removePublishing':URL + 'publication/comment/delete.json', //删除出版物评论
    'searchPublishdetail': URL + 'publication/detail.json', //查询出版物详情
    'addPublishing': URL + 'publication/create.json', // 新建出版物
    'editPublishing': URL + 'publication/update.json', //编辑出版物(youwenti)


    'searchadvertising':URL + 'advert/advertising-management/select-list.json', // 查询选择广告位列表
    'searchAdvert': URL + 'advert/advertising-management/list.json', //查询广告位列表
    'searchAdvertList': URL + 'advert/advertisement/list.json', // 查询广告列表
    'removeAdvert': URL + 'advert/advertising-management/delete.json', //删除广告位列表
    'removeAdvertlist': URL + 'advert/advertisement/delete.json', //删除广告列表
    'advertFreeze': URL + 'advert/advertising-management/frozen.json', //广告位冻结
    'advertFreezeCopy': URL + 'advert/advertisement/frozen.json', //广告冻结(批量冻结)
    'replaceAdvert':URL + 'advert/advertising-management/replace.json', //一键替换广告位
    
    'addAdvertlist':URL + 'advert/advertisement/create.json', // 添加广告
    'addvertlistcopy': URL + 'advert/advertising-management/create.json', //添加广告位
    'searchadvertDetail': URL + 'advert/advertising-management/detail.json', //查询广告位详情
    'searchCommerDetail': URL + 'advert/advertisement/detail.json', //查询广告详情
    'advertreviewList': URL + 'advert/advertisement/auditing/list.json', //广告审核管理
    'passadvert': URL + 'advert/advertisement/auditing/notThrough.json', //广告审核通过(不通过)
    'advertThaw': URL + 'advert/advertisement/thaw.json', //广告解冻/批量解冻
    'updateAdvert': URL + 'advert/advertising-management/update.json', // 更新广告位
    'advertisingfreeze':URL + 'advert/advertising-management/thaw.json', // 广告位解冻/批量解冻


    
    'couponList': URL + 'release-coupon/list/list.json', //查询优惠券列表
    'removecouponList':URL + 'release-coupon/list/delete.json', //删除优惠券列表
    'disableCoupon': URL + 'release-coupon/list/change-updown.json', //禁用解禁优惠券(youwenti)
    'couponReviewlist': URL + 'release-coupon/verify/list.json', // 查询优惠券审核列表
    'isOkCoupon': URL + 'release-coupon/verify/verify.json', //通过不通过优惠券审核列表
    'searchgoodDetail': URL + 'release-coupon/detail/detail.json', //查询优惠券详情
    'releaseCoupon': URL + 'release-coupon/list/release.json', //发布优惠券(youwenti)
    'addCoupon': URL + 'release-coupon/detail/create.json', //添加优惠券
    'searchGoods': URL + 'release-coupon/product/list.json',//查询商品选择
    'modifyCoupon': URL + 'release-coupon/detail/update.json', // 修改优惠券

    'searchreservation': URL + 'reservation/activity/list.json', // 查询预约活动列表
    'removereservation': URL + 'reservation/activity/delete.json',// 删除(批量)预约活动
    'searchUser': URL + 'reservation/person/list.json', // 查询用户预约列表
    'removeUser': URL + 'reservation/person/delete.json', // 删除用户预约列表
    'searchActivityDetail':URL + 'reservation/activity/detail.json', // 查询预约活动详情
    'addactivitydetail': URL + 'reservation/activity/update.json', // 追加/修改预约活动详情
    'replyUser': URL + 'reservation/person/response.json', //回复用户预约

    'searchHelp': URL + 'help/category/list.json', // 查询帮助中心栏目列表
    'addHelpCenter' : URL + 'help/category/create.json', // 创建帮助中心栏目
    'removeHelpCenter': URL + 'help/category/delete.json', // 批量删除帮助中心栏目
    'removeMore': URL + 'help/category/category-all.json', // (删除)查询帮助中心栏目
    'sorthelp': URL + 'help/category/sort.json', // 帮助中心栏目排序
    'edithelp': URL + 'help/category/update.json', // 编辑帮助中心栏目

    'searchquestion':URL + 'help/answer/list.json', //查询帮助中心问题列表
    'addquestion':URL + 'help/answer/create.json', // 创建帮助中心问题
    'removequestion':URL + 'help/answer/delete.json', // 批量删除帮助中心问题
    'sortquestion':URL + 'help/answer/sort.json', // 帮助中心问题排序
    'editquestion':URL + 'help/answer/update.json', //编辑帮助中心问题

    'searchOrder':URL + 'order/refund/list.json', // 查询退款列表
    'searchorderdetails':URL + 'order/refund/detail.json', // 查询退款详情
    'removeactive':URL + 'order/refund/status/list.json', // 【删除】查询退款单状态列表
    'searchorderlist': URL + 'order/list.json', // 查询订单列表
    'searchorderdetail': URL+'/order/detail.json' // 查询订单详情
  },
  mutations: { },
  actions: { },
  getters: { }
}