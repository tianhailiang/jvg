<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">机构院校管理</p>
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
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="中国" :value="1" :key="1"></el-option>
                      <el-option label="澳大利亚" :value="2" :key="2"></el-option>
                      <el-option label="美国" :value="3" :key="3"></el-option>
                      <el-option label="英国" :value="4" :key="4"></el-option>
                      <el-option label="马拉西亚" :value="5" :key="5"></el-option>
                      <el-option label="新加坡" :value="6" :key="6"></el-option>
                      <el-option label="俄罗斯" :value="7" :key="7"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3.5">
              <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 100px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="机构" :value="1" :key="1"></el-option>
                      <el-option label="院校" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3.5">
              <el-form-item label="机构院校性质：" label-width="120px">
                  <el-select v-model="region" placeholder="全部" style="width: 120px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="语培" :value="1" :key="1"></el-option>
                      <el-option label="K12" :value="2" :key="2"></el-option>
                      <el-option label="独立研究型大学" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">注册年份：</span>
                    <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary">新增</el-button>
          </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="collegesId" label="机构院校id" width="90" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="机构院校名称" width="90" align="center"></el-table-column>
                <el-table-column prop="country" label="所属国家" width="90" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系人手机号" width="90" align="center"></el-table-column>
                <el-table-column prop="userName" label="联系人姓名" width="90" align="center"></el-table-column>
                <el-table-column prop="category" label="类别" width="90" align="center"></el-table-column>
                <el-table-column prop="collegesNature" label="机构院校性质" width="90" align="center"></el-table-column>
                <el-table-column prop="state" label="状态" width="90" align="center"></el-table-column>
                <el-table-column prop="registertime" label="注册时间" width="90" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onEditClick(scope.$index)" type="danger" size="small">编辑</el-button>
                        <el-button @click="onDisableClik(scope.$index)" type="danger" size="small">禁用</el-button>
                        <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
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
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用编辑窗口 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <el-form >
                <el-form-item label="机构院校名称：" >
                    <el-input auto-complete="off" placeholder="xxxxxx" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="机构院校ID：" >
                    <el-input auto-complete="off" placeholder="13912xxxx34" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="禁用原因：" >
                    <el-input type="textarea" placeholder="请录入禁用原因" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：禁用后该机构院校将无法登陆平台</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      tableData: [{
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
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
        registertime: '2018-8-29 00:00:00',
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
        registertime: '2018-8-29 00:00:00',
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
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }]
    }
  },
  methods: {
    onEditClick (index) {
      this.$router.replace({ path: '/institutionsEditors' })
    },
    onDisableClik (index) {
      this.isDialogShow1 = true
    },
    onDelClick () {
      this.isDialogShow = true
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
