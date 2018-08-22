<template>
    <section class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">实名认证管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="6">
              <el-form-item label="用户名称：">
                  <el-input placeholder="请输入用户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户手机号：">
                  <el-input placeholder="请输入用户手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户角色：">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部"  :value="0" :key="0"></el-option>
                      <el-option label="普通个人" :value="1" :key="1"></el-option>
                      <el-option label="个人讲师" :value="2" :key="2"></el-option>
                      <el-option label="机构讲师" :value="3" :key="3"></el-option>
                      <el-option label="院校讲师" :value="4" :key="4"></el-option>
                      <el-option label="顾问" :value="5" :key="5"></el-option>
                      <el-option label="大咖" :value="6" :key="6"></el-option>
                      <el-option label="经纪人" :value="7" :key="7"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户id：">
                  <el-input placeholder="请输入用户id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户昵称：">
                  <el-input placeholder="请输入用户昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="审核状态：" >
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部"  :value="0" :key="0"></el-option>
                      <el-option label="未审核" :value="1" :key="1"></el-option>
                      <el-option label="已审核" :value="2" :key="2"></el-option>
                      <el-option label="撤销" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button size="small" type="primary">搜索</el-button>
          </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;text-align: center;">
        <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户id" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="用户手机" align="center"></el-table-column>
                <el-table-column prop="userClassify" label="角色" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                <el-table-column prop="certificate" label="证件号" align="center"></el-table-column>
                <el-table-column prop="state" label="状态" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
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
            <el-col :span="3" style="float: right;">
                <el-button @click="onRevokeClick()" size="small" type="primary">批量撤销</el-button>
            </el-col>
        </el-col>
        <!-- 撤销窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 20px;">请确认是否进行撤销处理</p>
            <el-form >
                <el-form-item label="禁用原因：">
                    <el-input type="textarea" placeholder="请录入禁用原因" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：撤销后该用户状态为未认证</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script scoped>
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      tableData: [{
        phone: '15200000001',
        sex: '男',
        userId: '15242',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        state: '正常',
        certificate: '110110110110110110'
      }, {
        phone: '15200000001',
        sex: '男',
        userId: '15242',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        state: '正常',
        certificate: '110110110110110110'
      }, {
        phone: '15200000001',
        sex: '男',
        userId: '15242',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        state: '正常',
        certificate: '110110110110110110'
      }, {
        phone: '15200000001',
        sex: '男',
        userId: '15242',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        state: '正常',
        certificate: '110110110110110110'
      }]
    }
  },
  methods: {
    onExamineClick (index) {
      this.$router.replace({ path: '/realNameDetails' })
    },
    onRevokeClick () {
      this.isDialogShow = true
    }
  }
}
</script>
<style>
.personnel{
    margin-left: 10px;
}
.personnel-title{
    font-size: 20px;
    font-weight: 700;
}
</style>
