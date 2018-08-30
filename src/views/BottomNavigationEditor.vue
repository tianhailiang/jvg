<template>
  <div>
    <div class="nav">
      底部导航编辑
    </div>
    <el-form :model="formInline" style="border: 1px solid #dcdcdc">
      <h3 >固定位置设定</h3>
      <el-form-item label="底部logo设定：" class="logo" >
        <div class="upload-box" >
          <img :src="formInline.imgUrl" />
          <el-upload
            :show-file-list="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            >
            <el-button size="small" type="primary" style="margin-left: 10px">点击上传</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="400电话设置：" style="display: flex" >
        <el-input v-model="formInline.telphone" size="small" style="min-width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="固定电话设置：" style="display: flex" >
        <el-input v-model="formInline.fixedPhone" size="small" style="min-width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="固定地址设置：" style="display: flex"  >
        <el-input v-model="formInline.fixedAddress" size="small" style="min-width: 800px"></el-input>
      </el-form-item>
      <el-form-item label="版权设置：" style="display: flex" >
        <el-input v-model="formInline.copyRight" size="small" style="min-width: 800px"></el-input>
      </el-form-item>
      <el-form-item label="备案信息设置：" style="display: flex" >
        <el-input v-model="formInline.recordInformation" size="small" style="min-width: 800px"></el-input>
      </el-form-item>
      <h3 style="border-top: 1px solid #dcdcdc">可变位置设定</h3>
      <el-form-item v-for="(item, index) in formInline.variableList" :key="index" style="display: flex">
        <el-input v-model="item.name" size="small" style="width: 150px" placeholder="可变位置名称"></el-input>
        <el-input v-model="item.url" size="small" style="width: 600px;margin-left: 10px;margin-right: 10px" placeholder="输入对应的url"></el-input>
        <el-button type="primary" size="small" @click="addNewTodo">+</el-button>
        <el-button type="primary" size="small" @click="formInline.variableList.splice(index, 1)">-</el-button>
      </el-form-item>
      <div class="btn-box" >
        <el-button type="primary" size="small" @click="btnSure">确定</el-button>
        <el-button type="primary" size="small" @click="btnCancel" style="margin-left: 10px">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'bottomNavigationEditor',
  data () {
    return {
      formInline: {
        imgUrl: 'http://cdn6.jjl.cn/assets/img/logo_red-326a8e4bf5.png',
        telphone: '',
        fixedPhone: '',
        fixedAddress: '',
        copyRight: '',
        recordInformation: '',
        variableList:[{
          name: '',
          url: ''
        }]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw))
      this.formInline.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M;
    },
    addNewTodo: function () {
      this.formInline.variableList.push({
        name: '',
        url: ''
      })
    },
    btnSure () {

    },
    btnCancel () {

    }
  }
}
</script>

<style scoped>
  .nav {
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .logo {
    display:flex;
    align-items:center
  }
  .upload-box {
    display:flex;
    align-items:center
  }
  .btn-box {
    display: flex;
    justify-content: center;
    height:50px;
    align-items: center
  }
</style>
