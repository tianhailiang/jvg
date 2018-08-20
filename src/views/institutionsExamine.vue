<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">机构院校审核管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
          <el-col :span="6">
              <el-form-item label="机构/院校名称：">
                  <el-input placeholder="请输入机构/院校名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="联系人手机号：">
                  <el-input placeholder="请输入联系人手机号"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="联系人姓名：">
                  <el-input placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="状态：" label-width="55px">
                  <el-select placeholder="正常" style="width: 80px;">
                      <el-option label="正常"  value="shanghai"></el-option>
                      <el-option label="禁用" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="3">
              <el-form-item label="所属国家：" label-width="100px">
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
            <el-col :span="3">
                <el-form-item label="类型：">
                <el-select placeholder="机构" style="width: 100px;">
                    <el-option label="机构" value="beijing"></el-option>
                    <el-option label="院校" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="审核状态：" label-width="100px">
                  <el-select placeholder="全部" style="width: 80px;">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="未通过" value="beijing"></el-option>
                      <el-option label="已审核" value="beijing"></el-option>
                      <el-option label="待审核" value="beijing"></el-option>
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
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="date" label="机构院校id" width="90"></el-table-column>
                <el-table-column prop="name" label="机构院校名称" width="90"></el-table-column>
                <el-table-column prop="name" label="所属国家" width="90"></el-table-column>
                <el-table-column prop="name" label="联系人手机号" width="90"></el-table-column>
                <el-table-column prop="name" label="联系人姓名" width="90"></el-table-column>
                <el-table-column prop="name" label="类别" width="90"></el-table-column>
                <el-table-column prop="name" label="审核状态" width="90"></el-table-column>
                <el-table-column prop="name" label="状态" width="90"></el-table-column>
                <el-table-column prop="name" label="注册时间" width="90"></el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip></el-table-column>
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
