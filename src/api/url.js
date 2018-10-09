import http from './http'
// var url = 'https://bird.ioliu.cn/v1/?url=' + 'https://tdxzback.jjldxz.com/api/c/'
// // var url = 'https://tdxzback.jjldxz.com/api/c/'
// const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
// 查询业务类型列表
export const codeAffairs = (params) => {
  return http.fetchPost('/api/c/common/code/affairs/list.json', params)
}
// 查询平台标签列表
export const codeLabel = (params) => {
  return http.fetchPost('/api/c/common/code/label/list.json', params)
}
// 查询渠道列表
export const codeSource = (params) => {
  return http.fetchPost('/api/c/common/code/source/list.json', params)
}
// 查询国家信息列表
export const codeCountry = (params) => {
  return http.fetchPost('/api/c/common/code/country/list.json', params)
}
// 查询频道列表
export const codeChannel = (params) => {
  return http.fetchPost('/api/c/common/code/channel/list.json', params)
}
// 查询角色列表
export const codeRole = (params) => {
  return http.fetchPost('/api/c/common/code/role/list.json', params)
}
// 登录
export const memberLogin = (params) => {
  return http.fetchPost('/api/c/member/login.json', params)
}
// 搜狐获取ip地址
export const ipdizhi = (params) => {
  // return http.fetchGet(API_PROXY + 'http://pv.sohu.com/cityjson?ie=utf-8', params)
    return http.fetchGet('http://pv.sohu.com/cityjson?ie=utf-8', params)
}
// 获取验证码
export const loginCode = (params) => {
  return http.fetchPost('/api/c/member/login/code.json', params)
}
// 主页
export const mainList = (params) => {
  return http.fetchPost('/api/c/index/detail.json', params)
}
// 查询权限列表
export const resourceList = (params) => {
  return http.fetchPost('/api/c/resource/list.json', params)
}
// 追加父节点
export const resourceCreate = (parms) => {
  return http.fetchPost('/api/c/resource/create-parent.json', parms)
}
// 更新父节点信息
export const resourceUpdate = (parms) => {
  return http.fetchPost('/api/c/resource/update-parent.json', parms)
}
// 追加子节点
export const resourceChild = (parms) => {
  return http.fetchPost('/api/c/resource/create-child.json', parms)
}
// 更新子节点信息
export const resourceUpdateChild = (parms) => {
  return http.fetchPost('/api/c/resource/update-child.json', parms)
}
// 排序权限
export const resourceSort = (parms) => {
  return http.fetchPost('/api/c/resource/sort.json', parms)
}
// 删除节点信息
export const resourceDelete = (parms) => {
  return http.fetchPost('/api/c/resource/delete.json', parms)
}
// 查询角色列表
export const roleList = (parms) => {
  return http.fetchPost('/api/c/role/list.json', parms)
}
// 追加角色信息
export const roleCreate = (parms) => {
  return http.fetchPost('/api/c/role/create.json', parms)
}
// 更新角色信息
export const roleUpdate = (parms) => {
  return http.fetchPost('/api/c/role/update.json', parms)
}
// 删除角色信息
export const roleDelete = (parms) => {
  return http.fetchPost('/api/c/role/delete.json', parms)
}
// 查询成员列表
export const memberList = (parms) => {
  return http.fetchPost('/api/c/member/list.json', parms)
}
// 禁用/解禁成员
export const memberStatus = (parms) => {
  return http.fetchPost('/api/c/member/status.json', parms)
}
// 追加成员信息
export const memberCreate = (parms) => {
  return http.fetchPost('/api/c/member/create.json', parms)
}
// 删除成员信息
export const memberDelete = (parms) => {
  return http.fetchPost('/api/c/member/delete.json', parms)
}
// 更新成员信息
export const memberUpdate = (parms) => {
  return http.fetchPost('/api/c/member/update.json', parms)
}
// 清除成员
export const memberClear = (parms) => {
  return http.fetchPost('/api/c/member/clear.json', parms)
}
// 一键清除白名单
export const whiteDelete = (parms) => {
  return http.fetchPost('/api/c/system/white-list/delete.json', parms)
}
// 查询白名单列表
export const whiteList = (parms) => {
  return http.fetchPost('/api/c/system/white-list/list.json', parms)
}
// 添加白名单
export const whiteCreate = (parms) => {
  return http.fetchPost('/api/c/system/white-list/create.json', parms)
}
// 审核白名单
export const whiteVerify = (parms) => {
  return http.fetchPost('/api/c/system/white-list/verify.json', parms)
}
// 编辑白名单
export const whiteUpdate = (parms) => {
  return http.fetchPost('/api/c/system/white-list/update.json', parms)
}
// 冻结白名单
export const whiteFrozen = (parms) => {
  return http.fetchPost('/api/c/system/white-list/frozen.json', parms)
}
// 解冻白名单
export const whiteUnfrozen = (parms) => {
  return http.fetchPost('/api/c/system/white-list/unfrozen.json', parms)
}
// 批量删除API信息
export const apiDelete = (parms) => {
  return http.fetchPost('/api/c/system/api/delete.json', parms)
}
// 查询API列表
export const apiList = (parms) => {
  return http.fetchPost('/api/c/system/api/list.json', parms)
}
// 追加API信息
export const apiCreate = (parms) => {
  return http.fetchPost('/api/c/system/api/create.json', parms)
}
// 冻结/解冻API
export const apiStatus = (parms) => {
  return http.fetchPost('/api/c/system/api/status.json', parms)
}
// 批量冻结API
export const apiStatusBatch = (parms) => {
  return http.fetchPost('/api/c/system/api/status-batch.json', parms)
}
// 更新Api信息
export const apiUpdate = (parms) => {
  return http.fetchPost('/api/c/system/api/update.json', parms)
}
// 一键清除日志
export const logsDelete = (parms) => {
  return http.fetchPost('/api/c/system/logs/delete.json', parms)
}
// 查询日志列表
export const logsList = (parms) => {
  return http.fetchPost('/api/c/system/logs/list.json', parms)
}
// 查询页面列表
export const pagesList = (parms) => {
  return http.fetchPost('/api/c/system/pages/list.json', parms)
}
// 添加页面
export const pagesCreate = (parms) => {
  return http.fetchPost('/api/c/system/pages/create.json', parms)
}
// 删除页面
export const pagesDelete = (parms) => {
  return http.fetchPost('/api/c/system/pages/delete.json', parms)
}
// 冻结页面
export const pagesFrozen = (parms) => {
  return http.fetchPost('/api/c/system/pages/frozen.json', parms)
}
// 追加SEO
export const seosCreate = (parms) => {
  return http.fetchPost('/api/c/system/seos/create.json', parms)
}
// 查询SEO管理列表
export const seosList = (parms) => {
  return http.fetchPost('/api/c/system/seos/list.json', parms)
}
// 编辑SEO
export const seosUpdate = (parms) => {
  return http.fetchPost('/api/c/system/seos/update.json', parms)
}
// 删除SEO
export const seosDelete = (parms) => {
  return http.fetchPost('/api/c/system/seos/delete.json', parms)
}
// 查询敏感词列表
export const sensitiveList = (parms) => {
  return http.fetchPost('/api/c/system/sensitive-words/list.json', parms)
}
// 删除敏感词
export const sensitiveDelete = (parms) => {
  return http.fetchPost('/api/c/system/sensitive-words/delete.json', parms)
}
// (删除预定)追加业务类型
export const sensitiveCreate = (parms) => {
  return http.fetchPost('/api/c/system/sensitive-words/create-biz-types.json', parms)
}
// 追加敏感词
export const sensitiveCreateSensitive = (parms) => {
  return http.fetchPost('/api/c/system/sensitive-words/create-sensitive.json', parms)
}
// 编辑敏感词
export const sensitiveUpdate = (parms) => {
  return http.fetchPost('/api/c/system/sensitive-words/update.json', parms)
}
// 查询人员列表
export const userList = (parms) => {
  return http.fetchPost('/api/c/user/user/list.json', parms)
}
// 追加/更新用户信息
export const userUpdate = (parms) => {
  return http.fetchPost('/api/c/user/user/update.json', parms)
}
// 删除(批量)用户
export const userDelete = (parms) => {
  return http.fetchPost('/api/c/user/user/delete.json', parms)
}
// 禁用/解禁用户
export const userFrozen = (parms) => {
  return http.fetchPost('/api/c/user/user/frozen.json', parms)
}
// 【删除预订】-查询禁用人信息
export const userFrozenQuery = (parms) => {
  return http.fetchPost('/api/c/user/user/frozen-query.json', parms)
}
// 查询用户信息详情
export const userDetail = (parms) => {
  return http.fetchPost('/api/c/user/user/detail.json', parms)
}
// 查询实名认证列表
export const certificationList = (parms) => {
  return http.fetchPost('/api/c/user/certification/verify-list.json', parms)
}
// 查询实名认证详情
export const certificationDetail = (parms) => {
  return http.fetchPost('/api/c/user/certification/detail.json', parms)
}
// 审核实名认证
export const certificationVerify = (parms) => {
  return http.fetchPost('/api/c/user/certification/verify.json', parms)
}
// 撤销(批量)实名认证
export const certificationRevoke = (parms) => {
  return http.fetchPost('/api/c/user/certification/revoke.json', parms)
}
// 查询机构/院校审核列表
export const institudeVerifyList = (parms) => {
  return http.fetchPost('/api/c/institude/verify/list.json', parms)
}
// 查询机构/院校审核详情
export const institudeVerifyDetail = (parms) => {
  return http.fetchPost('/api/c/institude/verify/detail.json', parms)
}
// 审核机构/院校信息
export const institudeVerifyVerify = (parms) => {
  return http.fetchPost('/api/c/institude/verify/verify.json', parms)
}
// 查询院校/机构详情
export const institudeDetail = (parms) => {
  return http.fetchPost('/api/c/institude/detail.json', parms)
}
// 新增机构/院校信息
export const institudeCreate = (parms) => {
  return http.fetchPost('/api/c/institude/create.json', parms)
}
// 编辑机构/院校信息
export const institudeUpdate = (parms) => {
  return http.fetchPost('/api/c/institude/update.json', parms)
}
// 删除机构/院校信息
export const institudeDelete = (parms) => {
  return http.fetchPost('/api/c/institude/delete.json', parms)
}
// 禁用/解禁机构/院校
export const institudeSet = (parms) => {
  return http.fetchPost('/api/c/institude/set-status.json', parms)
}
// 查询机构院校列表
export const institudeList = (parms) => {
  return http.fetchPost('/api/c/institude/list.json', parms)
}
// 查询关注管理列表
export const fansList = (parms) => {
  return http.fetchPost('/api/c/fans/list.json', parms)
}
// 查询标签热度列表
export const labelHotlList = (parms) => {
  return http.fetchPost('/api/c/label/hot/list.json', parms)
}
// 查询标签列表
export const labelList = (parms) => {
  return http.fetchPost('/api/c/label/list.json', parms)
}
// 标签删除/批量删除
export const labelDelete = (parms) => {
  return http.fetchPost('/api/c/label/delete.json', parms)
}
// 标签排序保存
export const labelSort = (parms) => {
  return http.fetchPost('/api/c/label/sort.json', parms)
}
// 标签排序搜索
export const labelSortQuery = (parms) => {
  return http.fetchPost('/api/c/label/sort-list.json', parms)
}
// 查询标签关系列表
export const labelRelationshipList = (parms) => {
  return http.fetchPost('/api/c/label/relationship-list.json', parms)
}
// 删除标签关系
export const labelShipDelete = (parms) => {
  return http.fetchPost('/api/c/label/ship/delete.json', parms)
}
// 标签关系推荐/撤销
export const labelRecommendationOrCancellation = (parms) => {
  return http.fetchPost('/api/c/label/recommendationOrCancellation.json', parms)
}
// 查询选择标签关系列表
export const labelLevelOneList = (parms) => {
  return http.fetchPost('/api/c/label/variable/select/list.json', parms)
}
// 查询级别标签列表
export const labelLevelOneToThirdList = (parms) => {
  return http.fetchPost('/api/c/label/variable/list.json', parms)
}
// 标签关系编辑
export const labelRelationship = (parms) => {
  return http.fetchPost('/api/c/label/relationship/update.jsonn', parms)
}
// 添加标签
export const labelCrate = (parms) => {
  return http.fetchPost('/api/c/label/create.json', parms)
}
// 查询标签详情
export const labelDetail = (parms) => {
  return http.fetchPost('/api/c/label/detail.json', parms)
}
// 编辑标签
export const labelUpdate = (parms) => {
  return http.fetchPost('/api/c/label/update.json', parms)
}
// 查询用户新增数据
export const dataUser = (parms) => {
  return http.fetchPost('/api/c/data/user/new-user.json', parms)
}
// 查询业务数据
export const dataOrder = (parms) => {
  return http.fetchPost('/api/c/data/order/list.json', parms)
}
// 查询用户活跃数据
export const dataUserActive = (parms) => {
  return http.fetchPost('/api/c/data/user/active-user.json', parms)
}
// 查询用户数据
export const dataUserList = (parms) => {
  return http.fetchPost('/api/c/data/user/list.json', parms)
}
// 查询用户性别分布数据
export const dataUserSex = (parms) => {
  return http.fetchPost('/api/c/data/analysis/user/sex/query.json', parms)
}
// 查询用户年龄分布
export const dataUserAge = (parms) => {
  return http.fetchPost('/api/c/data/analysis/user/age/query.json', parms)
}
// 查询用户渠道分布
export const dataUserLogin = (parms) => {
  return http.fetchPost('/api/c/data/analysis/user/channel/query.json', parms)
}
// 查询用户新增(按月)
export const dataCreated = (parms) => {
  return http.fetchPost('/api/c/data/analysis/user/created/month-query.json', parms)
}
// 查询用户新增
export const dataBusiness = (parms) => {
  return http.fetchPost('/api/c/data/analysis/user/created/query.json', parms)
}
// 查询订单数据
export const businessQuery = (parms) => {
  return http.fetchPost('/api/c/data/analysis/business/order/query.json', parms)
}
// 查询页面明细数据

// -------------------------2018.10.8 rongfa-----------------------------//
// 订单退款列表
export const searchOrder1 = (parms) => {
  return http.fetchPost('/api/c/order/refund/list.json', parms)
}
//订单列表
export const searchorderlist = (parms) => {
  return http.fetchPost('/api/c/order/list.json', parms)
}
//查询帮助中心栏目列表
export const searchHelp = (parms) => {
  return http.fetchPost('/api/c/help/category/list.json', parms)
}
//创建帮助中心栏目
export const addHelpCenter = (parms) => {
  return http.fetchPost('/api/c/help/category/create.json', parms)
}
//批量删除帮助中心栏目
export const removeHelpCenter = (parms) => {
  return http.fetchPost('/api/c/help/category/delete.json', parms)
}
//(删除)查询帮助中心栏目
export const removeMore = (parms) => {
  return http.fetchPost('/api/c/help/category/category-all.json', parms)
}
//帮助中心栏目排序
export const sorthelp = (parms) => {
  return http.fetchPost('/api/c/help/category/sort.json', parms)
}
// 编辑帮助中心栏目
export const edithelp = (parms) => {
  return http.fetchPost('/api/c/help/category/update.json', parms)
}
//查询帮助中心问题列表
export const searchquestion = (parms) => {
  return http.fetchPost('/api/c/help/answer/list.json', parms)
}
//创建帮助中心问题
export const addquestion = (parms) => {
  return http.fetchPost('/api/c/help/answer/create.json', parms)
}
//编辑帮助中心问题
export const editquestion = (parms) => {
  return http.fetchPost('/api/c/help/answer/update.json', parms)
}
//帮助中心问题排序
export const sortquestion = (parms) => {
  return http.fetchPost('/api/c/help/answer/sort.json', parms)
}
//批量删除帮助中心问题
export const removequestion = (parms) => {
  return http.fetchPost('/api/c/help/answer/delete.json', parms)
}
//删除出版物
export const removePublish = (parms) => {
  return http.fetchPost('/api/c/publication/delete.json', parms)
}
//查询出版物
export const searchPublishList = (parms) => {
  return http.fetchPost('/api/c/publication/list.json', parms)
}
//冻结出版物
export const freezePublish = (parms) => {
  return http.fetchPost('/api/c/publication/frozen.json', parms)
}
//出版物评论列表
export const searchCommentList = (parms) => {
  return http.fetchPost('/api/c/publication/comment/list.json', parms)
}
//出版物审核列表
export const publishReviewList = (parms) => {
  return http.fetchPost('/api/c/publication/verify/list.json', parms)
}
//审核出版物信息
export const reviewListInfo = (parms) => {
  return http.fetchPost('/api/c/publication/verify.json', parms)
}
//出版物评论详情
export const reviewDetail = (parms) => {
  return http.fetchPost('/api/c/publication/comment/detail.json', parms)
}
//删除出版物评论
export const removePublishing = (parms) => {
  return http.fetchPost('/api/c/publication/comment/delete.json', parms)
}
//查询出版物详情
export const searchPublishdetail = (parms) => {
  return http.fetchPost('/api/c/publication/detail.json', parms)
}
//新建出版物
export const addPublishing = (parms) => {
  return http.fetchPost('/api/c/publication/create.json', parms)
}
//编辑出版物(youwenti)
export const editPublishing = (parms) => {
  return http.fetchPost('/api/c/publication/update.json', parms)
}
//查询优惠券列表
export const couponList = (parms) => {
  return http.fetchPost('/api/c/release-coupon/list/list.json', parms)
}
// 删除优惠券列表
export const removecouponList = (parms) => {
  return http.fetchPost('/api/c/release-coupon/list/delete.json', parms)
}
//禁用解禁优惠券(youwenti)
export const disableCoupon = (parms) => {
  return http.fetchPost('/api/c/release-coupon/list/change-updown.json', parms)
}
// 查询优惠券审核列表
export const couponReviewlist = (parms) => {
  return http.fetchPost('/api/c/release-coupon/verify/list.json', parms)
}
//通过不通过优惠券审核列表
export const isOkCoupon = (parms) => {
  return http.fetchPost('/api/c/release-coupon/verify/verify.json', parms)
}
//查询优惠券详情
export const searchgoodDetail = (parms) => {
  return http.fetchPost('/api/c/release-coupon/detail/detail.json', parms)
}
//发布优惠券(youwenti)
export const releaseCoupon = (parms) => {
  return http.fetchPost('/api/c/release-coupon/list/release.json', parms)
}
//添加优惠券
export const addCoupon = (parms) => {
  return http.fetchPost('/api/c/release-coupon/detail/create.json', parms)
}
//查询商品选择
export const searchGoods = (parms) => {
  return http.fetchPost('/api/c/release-coupon/product/list.json', parms)
}
//修改优惠券
export const modifyCoupon = (parms) => {
  return http.fetchPost('/api/c/release-coupon/detail/update.json', parms)
}
//查询预约活动列表
export const searchreservation = (parms) => {
  return http.fetchPost('/api/c/reservation/activity/list.json', parms)
}
//删除(批量)预约活动
export const removereservation = (parms) => {
  return http.fetchPost('/api/c/reservation/activity/delete.json', parms)
}
// 查询用户预约列表
export const searchUser = (parms) => {
  return http.fetchPost('/api/c/reservation/person/list.json', parms)
}
// 删除用户预约列表
export const removeUser = (parms) => {
  return http.fetchPost('/api/c/reservation/person/delete.json', parms)
}
//查询预约活动详情
export const searchActivityDetail = (parms) => {
  return http.fetchPost('/api/c/reservation/activity/detail.json', parms)
}
//追加/修改预约活动详情
export const addactivitydetail = (parms) => {
  return http.fetchPost('/api/c/reservation/activity/update.json', parms)
}
//回复用户预约
export const replyUser = (parms) => {
  return http.fetchPost('/api/c/reservation/person/response.json', parms)
}
// / 查询会员积分规则列表
export const viprulelist = (parms) => {
  return http.fetchPost('/api/c/operations/vip-integral/list.json', parms)
}
// // 删除会员积分规则信息
export const removerule = (parms) => {
  return http.fetchPost('/api/c/operations/vip-integral/delete.json', parms)
}

// // 追加会员积分规则信息
export const addrule = (parms) => {
  return http.fetchPost('/api/c/operations/vip-integral/create.json', parms)
}
//  //清除会员积分规则信息
export const clearAllvip = (parms) => {
  return http.fetchPost('/api/c/operations/vip-integral/clear.json', parms)
}

 // 查询会员积分详情
export const searchIntegral = (parms) => {
  return http.fetchPost('/api/c/user/vip/vip-details.json', parms)
}

// / 查询VIP会员规则列表
export const searchviplist = (parms) => {
  return http.fetchPost('/api/c/operations/vip-regulation/list.json', parms)
}

// / 删除VIP会员规则信息
export const removeviprule = (parms) => {
  return http.fetchPost('/api/c/operations/vip-regulation/delete.json', parms)
}

// //清除VIP会员规则信息
export const clearAllviprule = (parms) => {
  return http.fetchPost('/api/c/operations/vip-regulation/clear.json', parms)
}
// / 追加VIP会员规则信息
export const addToviprule = (parms) => {
  return http.fetchPost('/api/c/operations/vip-regulation/create.json', parms)
}
//查询会员列表
export const memberlist = (parms) => {
  return http.fetchPost('/api/c/user/vip/list.json', parms)
}
// // 删除会员等级信息
export const removeVip = (parms) => {
  return http.fetchPost('/api/c/user/rank/delete.json', parms)
}
// 清除除会员等级
export const clearvipAll = (parms) => {
  return http.fetchPost('/api/c/user/rank/clear.json', parms)
}
// 添加会员等级信息
export const addVip = (parms) => {
  return http.fetchPost('/api/c/user/rank/create.json', parms)
}
// 查询讲师声望值规则列表
export const searchTeacher = (parms) => {
  return http.fetchPost('/api/c/operations/prestige-rule/list.json', parms)
}
 // 删除讲师声望值规则信息
export const removeTeacher = (parms) => {
  return http.fetchPost('/api/c/operations/prestige-rule/delete.json', parms)
}
 // 清除讲师声望值规则信息
export const clearAll = (parms) => {
  return http.fetchPost('/api/c/operations/prestige-rule/clear.json', parms)
}
 // 追加讲师声望值规则信息
export const addTeacher = (parms) => {
  return http.fetchPost('/api/c/operations/prestige-rule/create.json', parms)
}
 //查询讲师声望值统计列表
export const searchPrestige = (parms) => {
  return http.fetchPost('/api/c/operations/prestige-statistics/list.json', parms)
}
// 查询讲师声望值详细信息
export const searchdetail = (parms) => {
  return http.fetchPost('/api/c/operations/prestige-statistics/list-details.json', parms)
}
// 更新讲师声望值初始值
export const update = (parms) => {
  return http.fetchPost('/api/c/user/prestige-statistics/update.json', parms)
}
// 更新会员积分信息
export const updateIntegral = (parms) => {
  return http.fetchPost('/api/c/user/vip/update-integral.json', parms)
}
 // 查询会员等级列表
export const searchmemberList = (parms) => {
  return http.fetchPost('/api/c/user/rank/list.json', parms)
}
// 课程列表
export const courseList = (parms) => {
  return http.fetchPost('/api/c/course/list.json', parms)
}
// 删除课程
export const removeCourseList = (parms) => {
  return http.fetchPost('/api/c/course/delete.json', parms)
}
// 冻结、解冻课程
export const jdCourse = (parms) => {
  return http.fetchPost('/api/c/course/frozen.json', parms)
}
 // 查询课程评论列表
export const courseComent = (parms) => {
  return http.fetchPost('/api/c/course/comment/list.json', parms)
}
 // 查询课程评论详情
export const courseComentDetail = (parms) => {
  return http.fetchPost('/api/c/course/comment/detail.json', parms)
}
// 删除课程评论
export const removeCourseComent = (parms) => {
  return http.fetchPost('/api/c/course/comment/delete.json', parms)
}
 // 课程审核列表
export const courseReview = (parms) => {
  return http.fetchPost('/api/c/course/verify/list.json', parms)
}
// 审核课程信息
export const courseReviewInfo = (parms) => {
  return http.fetchPost('/api/c/course/verify.json', parms)
}
 // 创建课程
export const addCourse = (parms) => {
  return http.fetchPost('/api/c/course/create.json', parms)
}
 // 编辑课程
export const editCourse = (parms) => {
  return http.fetchPost('/api/c/course/update.json', parms)
}
 // 查询课程详情
export const searchCourseDetail = (parms) => {
  return http.fetchPost('/api/c/course/detail.json', parms)
}
 // 查询选择广告位列表
export const searchadvertising = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/select-list.json' ,parms)
}
 //查询广告位列表
export const searchAdvert = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/list.json' ,parms)
}
 // 查询广告列表
export const searchAdvertList = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/list.json' ,parms)
}
//查询广告详情
export const searchCommerDetail = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/detail.json' ,parms)
}

//删除广告位列表
export const removeAdvert = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/delete.json' ,parms)
}
 //删除广告列表
export const removeAdvertlist = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/delete.json' ,parms)
}
 //广告位冻结
export const advertFreeze = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/frozen.json' ,parms)
}
 //广告冻结(批量冻结)
export const advertFreezeCopy = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/frozen.json' ,parms)
}
//一键替换广告位
export const replaceAdvert = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/replace.json' ,parms)
}
// 添加广告
export const addAdvertlist = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/create.json' ,parms)
}
//添加广告位
export const addvertlistcopy = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/create.json' ,parms)
}
 //查询广告位详情
export const searchadvertDetail = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/detail.json' ,parms)
}
//广告审核管理
export const advertreviewList = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/auditing/list.json' ,parms)
}
 //广告审核通过(不通过)
export const passadvert = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/auditing/notThrough.json' ,parms)
}
//广告解冻/批量解冻
export const advertThaw = (parms) => {
  return http.fetchPost('/api/c/advert/advertisement/thaw.json' ,parms)
}
// 更新广告位
export const updateAdvert = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/update.json' ,parms)
}
 // 广告位解冻/批量解冻
export const advertisingfreeze = (parms) => {
  return http.fetchPost('/api/c/advert/advertising-management/thaw.json' ,parms)
}