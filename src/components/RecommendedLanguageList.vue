<template>
  <el-dialog title="语培达人推荐列表" :visible.sync="dialogFormVisible" :before-close="handleClose"
  width="80%">
    <el-form :inline="true" :model="formInline">
      <div >
        <el-form-item label="渠道：" >
          {{formInline.platform}}
        </el-form-item>
        <el-form-item label="频道：" >
          {{formInline.channel}}
        </el-form-item>
      </div>
      <el-form-item label="达人名称：" >
        <el-input v-model="formInline.darenName" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称：">
        <el-input v-model="formInline.userNickname" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="formInline.sex" size="small" >
          <el-option
          v-for="item in formInline.sexList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认证：">
        <el-select v-model="formInline.authentication" size="small" >
          <el-option
          v-for="item in formInline.authenticationList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色：">
        <el-select v-model="formInline.userRole" size="small" >
          <el-option
          v-for="item in formInline.userRoleList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-input v-model="formInline.state" size="small" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-width:100%;width: 1035px"
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="selection"
        label="全部"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        align="center" width="80">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户/联系人姓名"
        width="80" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userRole"
        label="用户角色"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="60" align="center" >
      </el-table-column>
      <el-table-column
        prop="registrationTime"
        label="用户注册时间"
        width="160" align="center" >
      </el-table-column>
      <el-table-column
        prop="loginTime"
        label="最近登录时间"
        width="160" align="center" >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="authentication"
        label="认证"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="registrationChannel"
        label="注册频道"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="80">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="recommend(scope.$index, scope.row)">推荐</el-button>
       </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
    <div class="btn-box" >
      <el-button type="primary" @click="batchRecommend()" >批量推荐</el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:dialogFormVisible',false)">确定</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'recommendedLanguageList',
  props: ['dialogFormVisible', 'dialogForm'],
  data () {
    return {
      formInline: {
        platform: this.dialogForm.platform,
        channel: this.dialogForm.channel,
        darenName: '',
        userNickname: '',
        sex: '0',
        sexList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        authentication: '0',
        authenticationList: [{
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '已认证'
        }, {
          value: '2',
          label: '未认证'
        }],
        userRole: '0',
        userRoleList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '个人讲师'
        }, {
          value: '2',
          label: '机构讲师'
        }]
      },
      tableData: [{
        userId: '100001',
        userName: 'thl',
        userRole: '机构讲师',
        sex: '男',
        registrationTime: '2018-8-31 00:12:12',
        loginTime: '2018-8-31 00:12:12',
        state: '正常',
        authentication: '已认证',
        registrationChannel: '留学'
      }, {
        userId: '100001',
        userName: 'thl',
        userRole: '机构讲师',
        sex: '男',
        registrationTime: '2018-8-31 00:12:12',
        loginTime: '2018-8-31 00:12:12',
        state: '正常',
        authentication: '已认证',
        registrationChannel: '留学'
      }, {
        userId: '100001',
        userName: 'thl',
        userRole: '机构讲师',
        sex: '男',
        registrationTime: '2018-8-31 00:12:12',
        loginTime: '2018-8-31 00:12:12',
        state: '正常',
        authentication: '已认证',
        registrationChannel: '留学'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  watch: {
    dialogForm (newValue, oldValue) {
      this.formInline.platform = newValue.platform
      this.formInline.channel = newValue.channel
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible', false)
    },
    onSubmit (e) {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    recommend () {

    },
    batchRecommend () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .btn-box {
    display: flex;
    justify-content: flex-end
  }
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>
