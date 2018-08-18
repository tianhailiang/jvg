<template>
    <div>
        <div>
            <top-nav></top-nav>
        </div>
        <div class='login-m'>
            <img src='@/assets/main-icon.png' alt=''>
            <el-form ref='form' class='login-r' label-width='80px' style='margin-top: 50px;margin-left: 58%;'>
                <div>登录</div>
                <el-form-item label='用户名' style='height: 50px;margin-top: 50px;'>
                    <el-input placeholder='请输入姓名'></el-input>
                </el-form-item>
                <el-form-item label='密码' style='height: 50px;margin-top: 30px;'>
                    <el-input placeholder='请输入密码'></el-input>
                </el-form-item>
                <el-form-item label='验证码' style='height: 50px;margin-top: 30px;text-align: left;'>
                    <el-input placeholder='请输入验证码' style='width:50%;'></el-input>
                    <div class="login-code" @click="refreshCode()">
                        <s-identify :identifyCode='identifyCode'></s-identify>
                    </div>
                </el-form-item>
                <el-form-item style='height: 50px;margin-top: 30px;margin-left: -75px;'>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import TopNav from '@/components/NavLogin.vue'
// import svgCaptcha from 'svg-captcha'
import SIdentify from '@/components/identify.vue'

export default {
  components: {
    TopNav,
    SIdentify
  },
  data () {
    return {
      identifyCodes: '1234567890',
      identifyCode: ''
    }
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    onSubmit () {
      this.$router.push({ path: '/main' })
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  }
}
</script>
<style>
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
</style>
