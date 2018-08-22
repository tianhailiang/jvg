<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">机构院校审核详情页</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
        <el-col :span="6">
            <el-form-item label="类型：">
                <el-input placeholder="请输入机构院校类型" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="机构院校id：" >
                <el-input placeholder="请输入机构院校id" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="名称：" >
                <el-input placeholder="请输入用户姓名" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="联系人：" >
                <el-input placeholder="请输入联系人姓名" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="联系人手机号：" label-width="110px" style="color: #C13232;">
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
                <el-input placeholder="请输入邮箱" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="全球排名：" >
                <el-input placeholder="请输入院校在全球排名" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="所在国家：">
                <el-input placeholder="请输入所在国家" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="机构院校性质：" label-width="110px">
                <el-input placeholder="请输入机构院校性质" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="联系地址：" >
                <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校类型：" label-width="120px">
                <el-input placeholder="请输入机构院校类型" style="width: 400px;" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="官网：" >
                <el-input placeholder="如果机构院校有官网的，可输入URL" style="width: 400px;" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校介绍：" label-width="120px">
                <el-input type="textarea" :rows="5" placeholder="请输入机构院校介绍" style="width: 400px;" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="18" style="margin-bottom: 20px;">
            <div style="width: 120px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">机构院校logo：</div>
            <i class="el-icon-picture"></i>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创立时间：" >
                <el-input placeholder="请输入机构院校创立年月日" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="注册时间：" >
                <el-input placeholder="请输入注册时间" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="法人：" >
                <el-input placeholder="请输入机构院校法人" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="审核状态：" >
                <el-input placeholder="请输入审核状态" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创建人员：" >
                <el-input placeholder="请输入创建人员" disabled></el-input>
            </el-form-item>
        </el-col>
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
