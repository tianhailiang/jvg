<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">新增/编辑机构院校</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
        <el-col :span="6">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※类型：</p>
            <el-form-item>
                <el-select v-model="region" placeholder="机构" style="width: 100px;">
                    <el-option label="机构" :value="0" :key="0"></el-option>
                    <el-option label="院校" :value="1" :key="1"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="机构院校id：">
                <el-input placeholder="请输入机构院校id" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※名称：</p>
            <el-form-item >
                <el-input placeholder="请输入用户姓名"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※联系人：</p>
            <el-form-item >
                <el-input placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <p style="width: 110px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※联系人手机号：</p>
            <el-form-item style="color: #C13232;">
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
            <el-form-item label="联系电话：">
                <el-input placeholder="请输入用户电话"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="邮箱：">
                <el-input placeholder="请输入邮箱"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="全球排名：">
                <el-input placeholder="请输入院校在全球排名"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <p style="width: 93px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※所属国家：</p>
            <el-form-item>
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
        <el-col :span="6">
            <p style="width: 110px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※机构院校性质：</p>
            <el-form-item>
                <el-select v-model="region" placeholder="全部" style="width: 100px;">
                    <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="语言培训" :value="1" :key="1"></el-option>
                      <el-option label="K12" :value="2" :key="2"></el-option>
                      <el-option label="私立研究型大学" :value="3" :key="3"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="联系地址：">
                <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校类型：" label-width="120px">
                <el-input placeholder="请输入机构院校类型" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="官网：">
                <el-input placeholder="如果机构院校有官网的，可输入URL" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校介绍：" label-width="120px">
                <el-input type="textarea" :rows="5" placeholder="请输入机构院校介绍" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="18">
            <el-form-item label="机构院校logo：" label-width="130px">
                <div class="shangchuan"><i>+</i></div>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创立时间：">
                <el-input placeholder="请输入机构院校创立年月日"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="注册时间：">
                <el-input placeholder="请输入注册时间" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="法人：">
                <el-input placeholder="请输入机构院校法人"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="审核状态：">
                <el-input placeholder="请输入审核状态" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创建人员：">
                <el-input placeholder="请输入创建人员" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="18" style='text-align: center;'>
            <el-form-item >
                <el-button type="primary">提交</el-button>
                <el-button type="primary">取消</el-button>
            </el-form-item>
        </el-col>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      region: ''
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
.shangchuan{
    width: 200px;
    height: 150px;
    border: 1px solid #eee;
    text-align: center;
    cursor: pointer;
}
.shangchuan i{
    font-style: normal;
    font-size: 40px;
    font-weight: bold;
    line-height: 150px;
}
</style>
