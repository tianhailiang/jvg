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
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
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
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="index" label="NO" align="center"></el-table-column>
                <el-table-column prop="coverFollowId" label="被关注id" align="center"></el-table-column>
                <el-table-column prop="coverFollowName" label="被关注名称" align="center"></el-table-column>
                <el-table-column prop="category" label="类型" align="center"></el-table-column>
                <el-table-column prop="followId" label="关注id" align="center"></el-table-column>
                <el-table-column prop="followName" label="关注名称" align="center"></el-table-column>
                <el-table-column prop="followTime" label="注册时间" align="center"></el-table-column>
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
  data () {
    return {
      region: '',
      tableData: [{
        phone: '15200000001',
        coverFollowId: '15242',
        coverFollowName: 'hhhh哈哈',
        followId: '15200000001',
        followName: 'aaaa呵呵',
        followTime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        coverFollowId: '15242',
        coverFollowName: 'hhhh哈哈',
        followId: '15200000001',
        followName: 'aaaa呵呵',
        followTime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        coverFollowId: '15242',
        coverFollowName: 'hhhh哈哈',
        followId: '15200000001',
        followName: 'aaaa呵呵',
        followTime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        coverFollowId: '15242',
        coverFollowName: 'hhhh哈哈',
        followId: '15200000001',
        followName: 'aaaa呵呵',
        followTime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }]
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
