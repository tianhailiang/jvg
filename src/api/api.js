import http from './http'
var url = "https://tdxzback.jjldxz.com/api/c/";
// 课程列表
export const courseList = (params) => {
	return http.fetchPost(url + 'course/list.json', params)
}
//课程评论列表
export const courseComent = (params) => {
  return http.fetchPost(url + 'course/comment/list.json', params)
}
//删除课程
export const removeCourse = (parms) => {
  return http.fetchPost(url + 'course/delete.json', parms)
}