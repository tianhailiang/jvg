<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">实名认证详情审核</p>
        </el-col>
        <br/>
        <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
            <el-col :span="6">
              <el-form-item label="用户类型：" label-width="95px">
                  <el-input placeholder="请输入用户类型" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户id：">
                  <el-input placeholder="自动生成" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※用户姓名：</p>
              <el-form-item style="color: #C13232;">
                  <el-input placeholder="请输入用户姓名" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户昵称：" >
                  <el-input placeholder="请输入用户姓名" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※手机号：</p>
              <el-form-item style="color: #C13232;">
                      <el-input placeholder="请输入用户手机号" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话：" >
                  <el-input placeholder="请输入用户电话" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱：" >
                  <el-input placeholder="请输入邮箱" disabled style="width: 240px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别：" >
                  <el-input placeholder="请输入性别" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属国家：">
                  <el-input placeholder="请输入所属国家" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所在位置：" >
                  <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件类型：">
                  <el-input placeholder="请输入证件类型" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号：" >
                  <el-input placeholder="请输入证件号码" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册频道：">
                  <el-input placeholder="请输入注册频道" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册渠道：">
                  <el-input placeholder="请输入注册渠道" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属机构/院校：" label-width="130px">
                  <el-input placeholder="请输入所属机构/院校" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="认证状态：">
                  <el-input placeholder="认证状态" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="禁用状态：">
                  <el-input placeholder="禁用状态" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18" style="margin-left: 10px;"><div>证件照片：</div><i class="el-icon-picture"></i><i class="el-icon-picture"></i></el-col>
            <el-col :span="18" style="margin-left: 10px;margin-top: 20px;">
                <el-form-item label="不通过原因：" label-width="100px">
                    <el-input type="textarea" placeholder="请录入不通过原因" :rows="5" style="width: 800px;"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="18" style='text-align: center;'>
                <el-form-item >
                    <el-button type="primary">通过</el-button>
                    <el-button type="primary">不通过</el-button>
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
.personnel i{
    display: inline-block;
    width: 400px;
    height: 300px;
    float: left;
    background: url(../assets/main-icon.png);
    background-size: 100% 100%;
    border: 1px solid #eee;
}
</style>
