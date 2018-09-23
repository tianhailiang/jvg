import http from './http'
var url = 'https://tdxzback.jjldxz.com/api/c/'
// 查询业务类型列表
export const codeAffairs = (params) => {
  return http.fetchPost(url + 'common/code/affairs/list.json', params)
}
// 查询平台标签列表
export const codeLabel = (params) => {
  return http.fetchPost(url + 'common/code/label/list.json', params)
}
// 查询渠道列表
export const codeSource = (params) => {
  return http.fetchPost(url + 'common/code/source/list.json', params)
}
// 查询国家信息列表
export const codeCountry = (params) => {
  return http.fetchPost(url + 'common/code/country/list.json', params)
}
// 查询频道列表
export const codeChannel = (params) => {
  return http.fetchPost(url + 'common/code/channel/list.json', params)
}
// 查询角色列表
export const codeRole = (params) => {
  return http.fetchPost(url + 'common/code/role/list.json', params)
}
// 登录
export const memberLogin = (params) => {
  return http.fetchPost(url + 'member/login.json', params)
}
// 搜狐获取ip地址
export const ipdizhi = (params) => {
  return http.fetchGet('http://pv.sohu.com/cityjson?ie=utf-8', params)
}
// 获取验证码
export const loginCode = (params) => {
  return http.fetchPost(url + 'member/login/code.json', params)
}
// 主页
export const mainList = (params) => {
  return http.fetchPost(url + 'index/detail.json', params)
}
// 查询权限列表
export const resourceList = (params) => {
  return http.fetchPost(url + 'resource/list.json', params)
}
// 追加父节点
export const resourceCreate = (parms) => {
  return http.fetchPost(url + 'resource/create-parent.json', parms)
}
// 更新父节点信息
export const resourceUpdate = (parms) => {
  return http.fetchPost(url + 'resource/update-parent.json', parms)
}
// 追加子节点
export const resourceChild = (parms) => {
  return http.fetchPost(url + 'resource/create-child.json', parms)
}
// 更新子节点信息
export const resourceUpdateChild = (parms) => {
  return http.fetchPost(url + 'resource/update-child.json', parms)
}
// 排序权限
export const resourceSort = (parms) => {
  return http.fetchPost(url + 'resource/sort.json', parms)
}
// 删除节点信息
export const resourceDelete = (parms) => {
  return http.fetchPost(url + 'resource/delete.json', parms)
}
// 查询角色列表
export const roleList = (parms) => {
  return http.fetchPost(url + 'role/list.json', parms)
}
// 追加角色信息
export const roleCreate = (parms) => {
  return http.fetchPost(url + 'role/create.json', parms)
}
// 更新角色信息
export const roleUpdate = (parms) => {
  return http.fetchPost(url + 'role/update.json', parms)
}
// 删除角色信息
export const roleDelete = (parms) => {
  return http.fetchPost(url + 'role/delete.json', parms)
}
// 查询成员列表
export const memberList = (parms) => {
  return http.fetchPost(url + 'member/list.json', parms)
}
// 禁用/解禁成员
export const memberStatus = (parms) => {
  return http.fetchPost(url + 'member/status.json', parms)
}
// 追加成员信息
export const memberCreate = (parms) => {
  return http.fetchPost(url + 'member/create.json', parms)
}
// 删除成员信息
export const memberDelete = (parms) => {
  return http.fetchPost(url + 'member/delete.json', parms)
}
// 更新成员信息
export const memberUpdate = (parms) => {
  return http.fetchPost(url + 'member/update.json', parms)
}
// 清除成员
export const memberClear = (parms) => {
  return http.fetchPost(url + 'member/clear.json', parms)
}
// 一键清除白名单
export const whiteDelete = (parms) => {
  return http.fetchPost(url + 'system/white-list/delete.json', parms)
}
// 查询白名单列表
export const whiteList = (parms) => {
  return http.fetchPost(url + 'system/white-list/list.json', parms)
}
// 添加白名单
export const whiteCreate = (parms) => {
  return http.fetchPost(url + 'system/white-list/create.json', parms)
}
// 审核白名单
export const whiteVerify = (parms) => {
  return http.fetchPost(url + 'system/white-list/verify.json', parms)
}
// 编辑白名单
export const whiteUpdate = (parms) => {
  return http.fetchPost(url + 'system/white-list/update.json', parms)
}
// 冻结白名单
export const whiteFrozen = (parms) => {
  return http.fetchPost(url + 'system/white-list/frozen.json', parms)
}
// 解冻白名单
export const whiteUnfrozen = (parms) => {
  return http.fetchPost(url + 'system/white-list/unfrozen.json', parms)
}
// 批量删除API信息
export const apiDelete = (parms) => {
  return http.fetchPost(url + 'system/api/delete.json', parms)
}
// 查询API列表
export const apiList = (parms) => {
  return http.fetchPost(url + 'system/api/list.json', parms)
}
// 追加API信息
export const apiCreate = (parms) => {
  return http.fetchPost(url + 'system/api/create.json', parms)
}
// 冻结/解冻API
export const apiStatus = (parms) => {
  return http.fetchPost(url + 'system/api/status.json', parms)
}
// 批量冻结API
export const apiStatusBatch = (parms) => {
  return http.fetchPost(url + 'system/api/status-batch.json', parms)
}
// 更新Api信息
export const apiUpdate = (parms) => {
  return http.fetchPost(url + 'system/api/update.json', parms)
}
// 一键清除日志
export const logsDelete = (parms) => {
  return http.fetchPost(url + 'system/logs/delete.json', parms)
}
// 查询日志列表
export const logsList = (parms) => {
  return http.fetchPost(url + 'system/logs/list.json', parms)
}
// 查询页面列表
export const pagesList = (parms) => {
  return http.fetchPost(url + 'system/pages/list.json', parms)
}
// 添加页面
export const pagesCreate = (parms) => {
  return http.fetchPost(url + 'system/pages/create.json', parms)
}
// 删除页面
export const pagesDelete = (parms) => {
  return http.fetchPost(url + 'system/pages/delete.json', parms)
}
// 冻结页面
export const pagesFrozen = (parms) => {
  return http.fetchPost(url + 'system/pages/frozen.json', parms)
}
// 查询SEO管理列表
export const seosList = (parms) => {
  return http.fetchPost(url + 'system/seos/list.json', parms)
}
// 编辑SEO
export const seosUpdate = (parms) => {
  return http.fetchPost(url + 'system/seos/update.json', parms)
}
// 删除SEO
export const seosDelete = (parms) => {
  return http.fetchPost(url + 'system/seos/delete.json', parms)
}
// 查询敏感词列表
export const sensitiveList = (parms) => {
  return http.fetchPost(url + 'system/sensitive-words/list.json', parms)
}
// 删除敏感词
export const sensitiveDelete = (parms) => {
  return http.fetchPost(url + 'system/sensitive-words/delete.json', parms)
}
// (删除预定)追加业务类型
export const sensitiveCreate = (parms) => {
  return http.fetchPost(url + 'system/sensitive-words/create-biz-types.json', parms)
}
// 追加敏感词
export const sensitiveCreateSensitive = (parms) => {
  return http.fetchPost(url + 'system/sensitive-words/create-sensitive.json', parms)
}
// 编辑敏感词
export const sensitiveUpdate = (parms) => {
  return http.fetchPost(url + 'system/sensitive-words/update.json', parms)
}
// 查询人员列表
export const userList = (parms) => {
  return http.fetchPost(url + 'user/user/list.json', parms)
}
// 追加/更新用户信息
export const userUpdate = (parms) => {
  return http.fetchPost(url + 'user/user/update.json', parms)
}
// 删除(批量)用户
export const userDelete = (parms) => {
  return http.fetchPost(url + 'user/user/delete.json', parms)
}
// 禁用/解禁用户
export const userFrozen = (parms) => {
  return http.fetchPost(url + 'user/user/frozen.json', parms)
}
// 【删除预订】-查询禁用人信息
export const userFrozenQuery = (parms) => {
  return http.fetchPost(url + 'user/user/frozen-query.json', parms)
}
// 查询用户信息详情
export const userDetail = (parms) => {
  return http.fetchPost(url + 'user/user/detail.json', parms)
}
// 查询实名认证列表
export const certificationList = (parms) => {
  return http.fetchPost(url + 'user/certification/verify-list.json', parms)
}
// 查询实名认证详情
export const certificationDetail = (parms) => {
  return http.fetchPost(url + 'user/certification/detail.json', parms)
}
// 审核实名认证
export const certificationVerify = (parms) => {
  return http.fetchPost(url + 'user/certification/verify.json', parms)
}
// 撤销(批量)实名认证
export const certificationRevoke = (parms) => {
  return http.fetchPost(url + 'user/certification/revoke.json', parms)
}
// 查询机构/院校审核列表
export const institudeVerifyList = (parms) => {
  return http.fetchPost(url + 'institude/verify/list.json', parms)
}
// 查询机构/院校审核详情
export const institudeVerifyDetail = (parms) => {
  return http.fetchPost(url + 'institude/verify/detail.json', parms)
}
// 审核机构/院校信息
export const institudeVerifyVerify = (parms) => {
  return http.fetchPost(url + 'institude/verify/verify.json', parms)
}
// 查询院校/机构详情
export const institudeDetail = (parms) => {
  return http.fetchPost(url + 'institude/detail.json', parms)
}
// 新增机构/院校信息
export const institudeCreate = (parms) => {
  return http.fetchPost(url + 'institude/create.json', parms)
}
// 编辑机构/院校信息
export const institudeUpdate = (parms) => {
  return http.fetchPost(url + 'institude/update.json', parms)
}
// 删除机构/院校信息
export const institudeDelete = (parms) => {
  return http.fetchPost(url + 'institude/delete.json', parms)
}
// 禁用/解禁机构/院校
export const institudeSet = (parms) => {
  return http.fetchPost(url + 'institude/set-status.json', parms)
}
// 查询机构院校列表
export const institudeList = (parms) => {
  return http.fetchPost(url + 'institude/list.json', parms)
}
// 查询关注管理列表
export const fansList = (parms) => {
  return http.fetchPost(url + 'fans/list.json', parms)
}
// 查询标签热度列表
export const labelHotlList = (parms) => {
  return http.fetchPost(url + 'label/hot/list.json', parms)
}
// 查询标签列表
export const labelList = (parms) => {
  return http.fetchPost(url + 'label/list.json', parms)
}
// 标签删除/批量删除
export const labelDelete = (parms) => {
  return http.fetchPost(url + 'label/delete.json', parms)
}
// 标签排序保存
export const labelSort = (parms) => {
  return http.fetchPost(url + 'label/sort.json', parms)
}
// 标签排序搜索
export const labelSortQuery = (parms) => {
  return http.fetchPost(url + 'label/sort-list.json', parms)
}
// 查询标签关系列表
export const labelRelationshipList = (parms) => {
  return http.fetchPost(url + 'label/relationship-list.json', parms)
}
// 删除标签关系
export const labelShipDelete = (parms) => {
  return http.fetchPost(url + 'label/ship/delete.json', parms)
}
// 标签关系推荐/撤销
export const labelRecommendationOrCancellation = (parms) => {
  return http.fetchPost(url + 'label/recommendationOrCancellation.json', parms)
}
// 查询选择标签关系列表
export const labelLevelOneList = (parms) => {
  return http.fetchPost(url + 'label/levelOneList.json', parms)
}
// 查询下级标签列表
export const labelLevelOneToThirdList = (parms) => {
  return http.fetchPost(url + 'label/levelOneToThirdList.json', parms)
}
// 标签关系编辑
export const labelRelationship = (parms) => {
  return http.fetchPost(url + 'label/relationship/update.jsonn', parms)
}
// 添加标签
export const labelCrate = (parms) => {
  return http.fetchPost(url + 'label/create.json', parms)
}
// 查询标签详情
export const labelDetail = (parms) => {
  return http.fetchPost(url + 'label/detail.json', parms)
}
// 编辑标签
export const labelUpdate = (parms) => {
  return http.fetchPost(url + 'label/update.json', parms)
}
// 查询用户新增数据
export const dataUser = (parms) => {
  return http.fetchPost(url + 'data/user/new-user.json', parms)
}
// 查询业务数据
export const dataOrder = (parms) => {
  return http.fetchPost(url + 'data/order/list.json', parms)
}
// 查询用户活跃数据
export const dataUserActive = (parms) => {
  return http.fetchPost(url + 'data/user/active-user.json', parms)
}
// 查询用户数据
export const dataUserList = (parms) => {
  return http.fetchPost(url + 'data/user/list.json', parms)
}
// 查询用户性别分布数据
export const dataUserSex = (parms) => {
  return http.fetchPost(url + 'data/analysis/user/sex/query.json', parms)
}
// 查询用户年龄分布
export const dataUserAge = (parms) => {
  return http.fetchPost(url + 'data/analysis/user/age/query.json', parms)
}
// 查询用户渠道分布
export const dataUserLogin = (parms) => {
  return http.fetchPost(url + 'data/analysis/user/channel/query.json', parms)
}
// 查询用户新增(按月)
export const dataCreated = (parms) => {
  return http.fetchPost(url + 'data/analysis/user/created/month-query.json', parms)
}
// 查询用户新增
export const dataBusiness = (parms) => {
  return http.fetchPost(url + 'data/analysis/user/created/query.json', parms)
}
// 查询订单数据
export const businessQuery = (parms) => {
  return http.fetchPost(url + 'data/analysis/business/order/query.json', parms)
}
// 查询页面明细数据
