import http from './http'
var url = 'https://tdxzback.jjldxz.com/api/c/';
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
