<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">添加/编辑用户</p>
        </el-col>
        <br/>
        <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
            <el-col :span="6">
              <el-form-item   label="用户类型：" label-width="95px">
                  <el-select v-model="region" placeholder="个人用户" style="width: 120px;">
                      <el-option label="普通个人" :value="0" :key="0"></el-option>
                      <el-option label="个人讲师" :value="1" :key="1"></el-option>
                      <el-option label="机构讲师" :value="2" :key="2"></el-option>
                      <el-option label="院校讲师" :value="3" :key="3"></el-option>
                      <el-option label="顾问" :value="4" :key="4"></el-option>
                      <el-option label="大咖" :value="5" :key="5"></el-option>
                      <el-option label="经纪人" :value="6" :key="6"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户id：">
                  <el-input placeholder="自动生成"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※用户姓名：</p>
              <el-form-item>
                  <el-input placeholder="请输入用户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户昵称：" >
                  <el-input placeholder="请输入用户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※手机号：</p>
              <el-form-item>
                  <el-col :span="8">
                  <el-select v-model="region" placeholder="+86" style="width: 80px;float: left;">
                      <el-option label="+86" :value="0" :key="0"></el-option>
                      <el-option label="+81" :value="1" :key="1"></el-option>
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
            <el-col :span="7">
              <el-form-item label="邮箱：" >
                  <el-input placeholder="请输入邮箱" style="width: 250px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属国家：">
                  <el-select v-model="region" placeholder="中国" style="width: 100px;">
                      <el-option label="中国" :value="0" :key="0"></el-option>
                      <el-option label="澳大利亚" :value="1" :key="1"></el-option>
                      <el-option label="美国" :value="2" :key="2"></el-option>
                      <el-option label="英国" :value="3" :key="3"></el-option>
                      <el-option label="马拉西亚" :value="4" :key="4"></el-option>
                      <el-option label="新加坡" :value="5" :key="5"></el-option>
                      <el-option label="俄罗斯" :value="6" :key="6"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：" style="display: inline-block;">
                  <el-radio-group v-model="radio" size="mini">
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
                  </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所在位置：" >
                  <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件类型：">
                  <el-select v-model="region" placeholder="身份证" style="width: 100px;">
                      <el-option label="身份证" :value="0" :key="0"></el-option>
                      <el-option label="护照" :value="1" :key="1"></el-option>
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
                  <el-select v-model="region" placeholder="留学" style="width: 100px;">
                      <el-option label="留学" :value="0" :key="0"></el-option>
                      <el-option label="语培" :value="1" :key="1"></el-option>
                      <el-option label="后台添加" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册渠道：">
                  <el-select v-model="region" placeholder="PC" style="width: 100px;">
                      <el-option label="app-Andriod" :value="0" :key="0"></el-option>
                      <el-option label="app-ios" :value="1" :key="1"></el-option>
                      <el-option label="PC" :value="2" :key="2"></el-option>
                      <el-option label="WAP" :value="3" :key="3"></el-option>
                      <el-option label="小程序" :value="4" :key="4"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属机构/院校：" label-width="120px">
                  <el-select v-model="region" placeholder="新加坡国立大学" style="width: 150px;">
                      <el-option label="新加坡国立大学" :value="0" :key="0"></el-option>
                      <el-option label="宾夕法尼亚大学" :value="1" :key="1"></el-option>
                      <el-option label="墨尔本大学" :value="2" :key="2"></el-option>
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
                  <el-select v-model="region" placeholder="正常" style="width: 100px;">
                      <el-option label="正常" :value="0" :key="0"></el-option>
                      <el-option label="禁用" :value="1" :key="1"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18" style='text-align: center;'>
                <el-form-item >
                    <el-button @click="onEditClick" type="primary">提交</el-button>
                    <el-button @click="onEditClick" type="primary">取消</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </section>
</template>
<script>
export default {
  data () {
    return {
      region: '',
      radio: '1'
    }
  },
  methods: {
    onEditClick () {
      this.$router.push({ path: '/personnel' })
    }
  }
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
