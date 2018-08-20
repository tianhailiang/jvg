<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">添加/编辑用户</p>
        </el-col>
        <br/>
        <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
            <el-col :span="6">
              <el-form-item label="用户类型：" label-width="95px">
                  <el-select placeholder="个人用户" style="width: 120px;">
                      <el-option label="普通个人" value="beijing"></el-option>
                      <el-option label="个人讲师" value="beijing"></el-option>
                      <el-option label="机构讲师" value="beijing"></el-option>
                      <el-option label="院校讲师" value="beijing"></el-option>
                      <el-option label="顾问" value="beijing"></el-option>
                      <el-option label="大咖" value="beijing"></el-option>
                      <el-option label="经纪人" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户id：">
                  <el-input placeholder="自动生成"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="*用户姓名：" style="color: #C13232;">
                  <el-input placeholder="请输入用户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户昵称：" >
                  <el-input placeholder="请输入用户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="*手机号：" style="color: #C13232;">
                  <el-col :span="8">
                  <el-select placeholder="+86" style="width: 80px;float: left;">
                      <el-option label="+86" value="beijing"></el-option>
                      <el-option label="+81" value="beijing"></el-option>
                  </el-select>
                  </el-col>
                  <el-col :span="15">
                      <el-input placeholder="请输入用户手机号"></el-input>
                  </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话：" >
                  <el-input placeholder="请输入用户电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱：" >
                  <el-input placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别：" >
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属国家：">
                  <el-select placeholder="中国" style="width: 100px;">
                      <el-option label="中国" value="beijing"></el-option>
                      <el-option label="澳大利亚" value="beijing"></el-option>
                      <el-option label="美国" value="beijing"></el-option>
                      <el-option label="英国" value="beijing"></el-option>
                      <el-option label="马拉西亚" value="beijing"></el-option>
                      <el-option label="新加坡" value="beijing"></el-option>
                      <el-option label="俄罗斯" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所在位置：" >
                  <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件类型：">
                  <el-select placeholder="身份证" style="width: 100px;">
                      <el-option label="身份证" value="beijing"></el-option>
                      <el-option label="护照" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号：" >
                  <el-input placeholder="请输入证件号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册频道：">
                  <el-select placeholder="留学" style="width: 100px;">
                      <el-option label="留学" value="beijing"></el-option>
                      <el-option label="语培" value="beijing"></el-option>
                      <el-option label="后台添加" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册渠道：">
                  <el-select placeholder="PC" style="width: 100px;">
                      <el-option label="app-Andriod" value="beijing"></el-option>
                      <el-option label="app-ios" value="beijing"></el-option>
                      <el-option label="PC" value="beijing"></el-option>
                      <el-option label="WAP" value="beijing"></el-option>
                      <el-option label="小程序" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属机构/院校：">
                  <el-select placeholder="新加坡国立大学" style="width: 100px;">
                      <el-option label="新加坡国立大学" value="beijing"></el-option>
                      <el-option label="宾夕法尼亚大学" value="beijing"></el-option>
                      <el-option label="墨尔本大学" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="认证状态：">
                  <el-input placeholder="未认证"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="禁用状态：">
                  <el-select placeholder="正常" style="width: 100px;">
                      <el-option label="正常" value="beijing"></el-option>
                      <el-option label="禁用" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18" style='text-align: center;'>
                <el-form-item >
                    <el-button type="primary">提交</el-button>
                    <el-button type="primary">取消</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </section>
</template>
<script>
export default {
}
</script>
<style scoped>
.personnel{
    margin-left: 10px;
}
.personnel-title{
    font-size: 20px;
    font-weight: 700;
}
</style>
