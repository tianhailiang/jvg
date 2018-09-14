// import http from './http'
// var url = "https://tdxzback.jjldxz.com/api/c/";

const URL = ''
export default {
  state: { 
    'courseList': URL + 'course/list.json', // 课程列表
    'removeCourseList': URL + 'course/delete.json', // 删除课程
    'jdCourse': URL + 'course/frozen.json', // 冻结、解冻课程
    'courseComent': URL + 'course/comment/list.json', // 课程评论列表
    'courseComentDetail': URL + 'course/comment/detail.json', // 课程评论详情
    'courseReview': URL + 'course/verify/list.json' // 课程审核列表
  },
  mutations: {  },
  actions: {  },
  getters: {  }
}