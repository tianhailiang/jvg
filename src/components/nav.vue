<template>
    <el-row class="nav_top">
        <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="1"><div class="grid-content bg-purple-light">
          <img src="@/assets/logo_common_black.png" alt="" width="145" height="50"></div>
        </el-col>
        <el-col :span="5"><div class="grid-content bg-purple-light title">金吉列大学长管理后台</div></el-col>
        <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="3"><a href="javaScript:viod"><div class="grid-content bg-purple-light title">登录用户名</div></a></el-col>
        <el-col :span="1"><div class="grid-content bg-purple-light title">|</div></el-col>
        <el-col :span="3"><a href="javaScript:viod"><div class="grid-content bg-purple-light title">我的消息</div></a></el-col>
        <el-col :span="1"><div class="grid-content bg-purple-light title">|</div></el-col>
        <el-col :span="3"><a href="/"><div class="grid-content bg-purple-light title">安全退出</div></a></el-col>
        </el-row>
    </el-row>
</template>
<script>
export default {
}
</script>
<style scoped>
.title{color: #2c3e50;line-height: 60px;}
.nav_top{ 
  overflow: hidden; 
  padding-left:20px;
  margin-bottom: 25px;
  margin-left:240px;
  border-bottom:1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
}
</style>
