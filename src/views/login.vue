<template>
    <section class="advert-container" style="overflow:hidden;">
        <div>
            <top-nav></top-nav>
        </div>
        <div class='login-m'>
            <img src='@/assets/main-icon.png' alt=''>
            <el-form ref='form' class='login-r' label-width='80px' style='margin-top: 50px;margin-left: 58%;'>
                <div>登录</div>
                <el-form-item label='用户名' style='height: 50px;margin-top: 50px;'>
                    <el-input placeholder='请输入姓名' v-model="name"></el-input>
                </el-form-item>
                <el-form-item label='密码' style='height: 50px;margin-top: 30px;'>
                    <el-input placeholder='请输入密码' v-model="pass"></el-input>
                </el-form-item>
                <el-form-item label='验证码' style='height: 50px;margin-top: 30px;text-align: left;'>
                    <el-input placeholder='请输入验证码' style='width:50%;' v-model="code"></el-input>
                    <div class="login-code" @click="refreshCode()">
                        <img class="img_code" :src="img" alt="">
                    </div>
                </el-form-item>
                <el-form-item style='height: 50px;margin-top: 30px;margin-left: -75px;'>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script>
import TopNav from '@/components/NavLogin.vue'
// import svgCaptcha from 'svg-captcha'
import SIdentify from '@/components/identify.vue'
import { memberLogin,loginCode,ipdizhi } from '@/api/url.js'
import axios from 'axios'
import { mapMutations } from 'vuex';
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='

export default {
  components: {
    TopNav,
    SIdentify
  },
  data () {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      img: '',
      name: '',
      pass: '',
      code: '',
      codeKey: '',
      ip: '',
      url: ''
    }
  },
  methods: {
    // randomNum (min, max) {
    //   return Math.floor(Math.random() * (max - min) + min)
    // },
    onSubmit () {
      // 登录
      var _this = this
      var data = {username: this.name, password: this.pass, code: this.code, codeKey: this.codeKey, lastLoginIp: this.ip}
      // data = JSON.stringify(data)
      console.log('传参', data)
      memberLogin(data).then(res => {
        console.log('data', res)
        if (res.success) {
          // console.log('login', _this.$store.state.login.token)
          // _this.$store.dispatch('set_token', res.result)
          // console.log('token', this.$store.state.login.token)
          sessionStorage.setItem('dxzjjltoken', res.result)
          // sessionStorage.setItem('dxzjjltoken', 'ee90b3e3874dda89ad643498112cc7ec')
          console.log('token', sessionStorage.getItem('dxzjjltoken'))
          console.log('rou', _this.url)
          if (_this.url !== undefined && _this.url !== '' && _this.url !== '/') {
            console.log('1111')
            _this.$router.push({ path: _this.url })
            // this.postData()
            // _this.$router.back(-1)
          } else {
            console.log('2222')
            _this.$router.push({ path: '/main' })
          }
        } else {
          this.postData()
          if (res.code === 'E10010') {
            _this.$message('验证码错误')  
          } else if (res.code === 'E10003') {
            _this.$message('用户未找到')
          } else if (res.code === 'E10002') {
            _this.$message('用户登录失败')
          } else if (res.code === 'E10001') {
            _this.$message('用户无权限') 
          } else if (res.code === 'E10000') {
            _this.$message('用户未登录')
          } else if (/system.member.login.fail/.test(res.message)) {
            _this.$message('用户登录密码错误')
          } else {
            _this.$message(res.message)
          }
        }
      }).catch(error => {
        // this.$message(error.data.message)
        this.postData()
        console.log(`请求错误`, error)
        if (error.data.code === 'E10010') {
          _this.$message('验证码错误')  
        } else if (error.data.code === 'E10003') {
          _this.$message('用户未找到')
        } else if (error.data.code === 'E10002') {
          _this.$message('用户登录失败')
        } else if (error.data.code === 'E10001') {
          _this.$message('用户无权限') 
        } else if (error.data.code === 'E10000') {
          _this.$message('用户未登录')
        } else if (/system.member.login.fail/.test(error.data.message)) {
          _this.$message('用户登录密码错误')
        } else {
          _this.$message(error.data.message)
        }
      })
    },
    refreshCode () {
    //   this.identifyCode = ''
    //   this.makeCode(this.identifyCodes, 4)
      this.postData()
    },
    // makeCode (o, l) {
    //   for (let i = 0; i < l; i++) {
    //     this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
    //   }
    //   console.log(this.identifyCode)
    // },
    geturl () {
      console.log('rou1', this.$router)
      console.log('rou', this.$router.history.current.query.redirect)
      this.url = this.$router.history.current.query.redirect
      if (/redirect=/.test(this.url)) {
        this.url = this.url.replace('?redirect=', '')
      }
    },
    postData () {
      loginCode().then(res => {
        console.log('data', res)
        if (res.success) {
          this.img = 'data:image/jpeg;base64,' + res.result.code
          this.codeKey = res.result.codeKey
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // axios.post('https://tdxzback.jjldxz.com/api/c/member/login/code.json').then(function (res) {
      //   console.log('res', res)
      // }, function (error) {

      // })
    },
    getip () {
      // var _this = this
      // axios.get(API_PROXY + 'http://pv.sohu.com/cityjson?ie=utf-8')
      // .then(function (res) {
      //   console.log(res)
      //   _this.ip = res.data
      //   console.log('ip', _this.ip)
      //   _this.ip = _this.ip.split(':')
      //   console.log('sss', _this.ip)
      //   _this.ip = _this.ip[1].split('"')
      //   console.log('aaaa', _this.ip)
      //   _this.ip = _this.ip[1]
      //   console.log('qqqq', _this.ip)
      // }, function (error) {
      //   console.log(error)
      // })
      // ipdizhi().then(res => {
      //   console.log('data', res)
      //   // console.log(res)
      // }).catch(error => {
      //   console.log(error)
      //   _this.ip = error.data
      //   console.log('ip', _this.ip)
      //   _this.ip = _this.ip.split(':')
      //   console.log('sss', _this.ip)
      //   _this.ip = _this.ip[1].split('"')
      //   console.log('aaaa', _this.ip)
      //   _this.ip = _this.ip[1]
      //   console.log('qqqq', _this.ip)
      // })
    }
  },
  mounted () {
    this.geturl ()
    this.getip ()
    this.postData ()
    // this.identifyCode = ''
    // this.makeCode(this.identifyCodes, 4)
  }
}
</script>
<style scoped>
.login-m{
    margin: 50px 20px;
}
.login-m img{
    width: 40%;
    height: 380px;
    border: 20px solid #eee;
    float: left;
    display: block;
    margin-left: 100px;
}
.login-r{
    border: 1px solid #000;
    width: 30%;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    padding-right: 20px;
    margin-top: 50px;
}
.login-code{
    width: 100px;
    height: 50px;
    float: right;
    margin-right: 20px;
    cursor: pointer;
}
.login-code img.img_code {
    width: 100px;
    height: 40px;
    border: none;
    float: none;
    display: block;
    margin-left: 0;
}
</style>
