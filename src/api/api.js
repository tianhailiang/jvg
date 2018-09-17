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
    'searchmemberList': URL + 'user/rank/list.json', // 查询会员等级
    'removeVip': URL + 'user/rank/delete.json', // 删除会员等级
    'clearvipAll': URL + 'user/rank/clear.json', // 清除除会员等级
    'addVip': URL + 'user/rank/create.json', // 添加会员等级
    'removePublish': URL + 'publication/delete.json', //删除出版物
    'searchPublishList': URL + 'publication/list.json', // 查询出版物
    'freezePublish': URL + 'publication/frozen.json', //冻结出版物
    'searchCommentList': URL + 'publication/comment/list.json', // 出版物评论列表
    'publishReviewList': URL + 'publication/verify/list.json', // 出版物审核列表
    'reviewListInfo': URL + 'publication/verify.json', // 审核出版物信息
    'reviewDetail': URL + 'publication/comment/detail.json', // 出版物评论详情
    'removePublishing':URL + 'publication/comment/delete.json' //删除出版物评论
  },
  mutations: {  },
  actions: {  },
  getters: {  }
}