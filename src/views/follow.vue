<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">关注管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="6">
              <el-form-item label="被关注id：">
                  <el-input placeholder="请输入被关注id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="被关注名称：">
                  <el-input placeholder="请输入被关注名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2.5">
              <el-form-item label="类别：" label-width="55px">
                  <el-select placeholder="全部" style="width: 80px;">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="机构" value="beijing"></el-option>
                      <el-option label="院校" value="beijing"></el-option>
                      <el-option label="人员" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button size="small" type="primary">搜索</el-button>
            </el-col>
        </el-form>
        <el-col :span='18.5' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData3" stripe width="100%">
                <el-table-column type="selection" label="NO" width="55"></el-table-column>
                <el-table-column prop="date" label="被关注id" width="90"></el-table-column>
                <el-table-column prop="name" label="被关注名称" width="90"></el-table-column>
                <el-table-column prop="name" label="类型" width="90"></el-table-column>
                <el-table-column prop="name" label="关注id" width="90"></el-table-column>
                <el-table-column prop="name" label="关注名称" width="90"></el-table-column>
                <el-table-column prop="name" label="注册时间" width="90"></el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <div style="height:30px"></div>

        <el-col :span="18" style="text-align: center;">
            <el-col :span="12">
                <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            </el-col>
            <el-col :span="3">
                <el-button size="small" type="primary">确定</el-button>
            </el-col>
            <el-col :span="3" style="float: right;">
                <el-button size="small" type="primary">批量删除</el-button>
            </el-col>
        </el-col>
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
