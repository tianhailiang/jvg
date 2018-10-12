"use strict"

import Vue from 'vue'
import axios from "axios"
import qs from 'querystring'
import router from '../router'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: 'https://tdxzback.jjldxz.com/api/c/',
  baseURL: '/',
  changeOrigin: true
  // headers: {'contentType': 'application/json;charset=UTF-8'}
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)
var loginT = true
setInterval(() => {
  loginT = false
}, 1000 * 60 * 50)
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    var dxzjjltoken = sessionStorage.getItem('dxzjjltoken')
    if (loginT) {
      // 首次登陆系统
      if (dxzjjltoken !== null) {
        config.headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Access-Token': dxzjjltoken,
          'X-Api-Ver': '1.0'
        }
      } else {
        config.headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Api-Ver': '1.0'
        }
      }
    } else {
      loginT = true
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Api-Ver': '1.0'
      }
    }
    if (config.method === 'post') {
      if (JSON.stringify(config.data) !== '{}') {
        config.data = JSON.stringify(config.data)
      } else {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (!response.data.success) {
      if (response.data.code === 'E10000') {
        // 用户未登录
        sessionStorage.setItem('dxzjjltoken', '')
        router.replace({
          path: '/',
          query: {redirect: router.currentRoute.path} // 登录成功后跳入浏览的当前页面
        })
        return false
      }
      return Promise.resolve(response)
    }
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      },
      post() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    },
  });
}

Vue.use(Plugin)

export default Plugin
