import axios from 'axios'
// import '../plugins/axios.js'
// import qs from 'qs'
import qs from 'querystring'
import router from '../router'
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
// axios.defaults.headers.common['X-Api-Ver'] = '1.0'

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config => {
  // 在发送请求之前做某件事
  const loginT = true
  setTimeout(() => {
    loginT = false
  }, 1000 * 60 * 50)
  if (loginT) {
    var token = sessionStorage.getItem('token')
    console.log('token', token)
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Access-Token': token,
      'X-Api-Ver': '1.0'
    }
  } else {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Api-Ver': '1.0'
    }
  }
  if (config.method === 'post') {
    if (JSON.stringify(config.data) !== '{}') {
      console.log('ssss', config.data)
      config.data = JSON.stringify(config.data)
      // console.log('cccc', data)
      // config.data = qs.encode(config.data)
      console.log('dddd', config.data)
    } else {
      console.log('aaaa')
      config.data = qs.stringify(config.data)
    }
    // config.data = '{' + config.data + '}'
    // config.data = JSON.stringify(config.data)
    // config.data = {}
    // config.data = '"' + config.data + '"'
  }
  return config
}, (error) => {
  // _.toast("错误的传参", 'fail')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data.success) {
    // _.toast(res.data.msg);
    console.log('res1', res)
    sessionStorage.setItem('token', '')
    if (res.data.code === 'E10000') {
      // 用户未登录
      console.log('ssss')
      router.replace({
        path: '/',
        query: {redirect: router.currentRoute.fullPath} // 登录成功后跳入浏览的当前页面
      })
      return false
    }
    return Promise.reject(res)
  }
  // sessionStorage.setItem('token', '')
  console.log('res2', res)
  return res
}, (error) => {
  // _.toast("网络异常", 'fail')
  return Promise.reject(error)
})

export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchQuickSearch (url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        // console.log('err2', error)
        reject(error)
      })
    })
  }
}
