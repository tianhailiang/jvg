<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">新增/编辑机构院校</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
        <el-col :span="6">
            <el-form-item label="※类型：">
                <el-select placeholder="机构" style="width: 100px;">
                    <el-option label="机构" value="beijing"></el-option>
                    <el-option label="院校" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="机构院校id：" >
                <el-input placeholder="请输入机构院校id" disabled="true"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="※名称：" >
                <el-input placeholder="请输入用户姓名"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="※联系人：" >
                <el-input placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="※联系人手机号：" style="color: #C13232;">
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
            <el-form-item label="全球排名：" >
                <el-input placeholder="请输入院校在全球排名"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="※所在国家：">
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
        <el-col :span="6">
            <el-form-item label="※机构院校性质：">
                <el-select placeholder="全部" style="width: 100px;">
                    <el-option label="全部" value="beijing"></el-option>
                      <el-option label="语言培训" value="beijing"></el-option>
                      <el-option label="K12" value="beijing"></el-option>
                      <el-option label="私立研究型大学" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="联系地址：" >
                <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校类型：" >
                <el-input placeholder="请输入机构院校类型" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="官网：" >
                <el-input placeholder="如果机构院校有官网的，可输入URL" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校介绍：" >
                <el-input type="textarea" :rows="5" placeholder="请输入机构院校介绍" style="width: 400px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="18">
            <el-form-item label="机构院校logo：" >
                <div class="shangchuan"><i>+</i></div>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创立时间：" >
                <el-input placeholder="请输入机构院校创立年月日"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="注册时间：" >
                <el-input placeholder="请输入注册时间" disabled="true"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="法人：" >
                <el-input placeholder="请输入机构院校法人"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="审核状态：" >
                <el-input placeholder="请输入审核状态" disabled="true"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创建人员：" >
                <el-input placeholder="请输入创建人员" disabled="true"></el-input>
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
