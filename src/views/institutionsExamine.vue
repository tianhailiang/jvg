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
                      <el-option label="正常" :value="0" :key="0"></el-option>
                      <el-option label="禁用" :value="1" :key="1"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="3.5">
              <el-form-item label="所属国家：" label-width="100px">
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
            <el-col :span="3.5">
                <el-form-item label="类型：" label-width="80px">
                <el-select v-model="region" placeholder="机构" style="width: 100px;">
                    <el-option label="机构" :value="0" :key="0"></el-option>
                    <el-option label="院校" :value="1" :key="1"></el-option>
                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="3.5">
              <el-form-item label="审核状态：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="未通过" :value="1" :key="1"></el-option>
                      <el-option label="已审核" :value="2" :key="2"></el-option>
                      <el-option label="待审核" :value="3" :key="3"></el-option>
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
                        <el-button @click="onExamineClick(scope.$index)" type="danger" size="small">审核</el-button>
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
  },
  methods: {
    onExamineClick (index) {
      this.$router.replace({ path: '/institutionsDetails' })
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
