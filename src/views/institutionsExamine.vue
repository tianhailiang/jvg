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
          <el-col :span="3">
              <el-form-item label="状态：" label-width="80px">
                  <el-select v-model="region" placeholder="正常" style="width: 80px;">
                      <el-option label="正常"  value="shanghai"></el-option>
                      <el-option label="禁用" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="3.5">
              <el-form-item label="所属国家：" label-width="100px">
                  <el-select v-model="region" placeholder="中国" style="width: 100px;">
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
            <el-col :span="3.5">
                <el-form-item label="类型：" label-width="80px">
                <el-select v-model="region" placeholder="机构" style="width: 100px;">
                    <el-option label="机构" value="beijing"></el-option>
                    <el-option label="院校" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="3.5">
              <el-form-item label="审核状态：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
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
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="collegesId" label="机构院校id" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="机构院校名称" align="center"></el-table-column>
                <el-table-column prop="country" label="所属国家" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系人手机号" align="center"></el-table-column>
                <el-table-column prop="userName" label="联系人姓名" align="center"></el-table-column>
                <el-table-column prop="category" label="类别" align="center"></el-table-column>
                <el-table-column prop="examineState" label="审核状态" align="center"></el-table-column>
                <el-table-column prop="state" label="状态" align="center"></el-table-column>
                <el-table-column prop="registerTime" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small">查看</el-button>
                    </template>
                </el-table-column>
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
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        examineState: '已通过',
        registerTime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registerTime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registerTime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registerTime: '2018-8-29 00:00:00',
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
