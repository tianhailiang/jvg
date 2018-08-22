<template>
  <div >
    <div class="nav" >
      文章审核列表
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="文章ID">
        <el-input v-model="formInline.articleId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="formInline.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="formInline.userRole" size="small" >
          <el-option
          v-for="item in formInline.userRoleList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" >
        <el-select v-model="formInline.state" size="small" >
          <el-option
          v-for="item in formInline.stateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="formInline.userId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="formInline.userName" size="small"></el-input>
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
        label="文章ID"
        align="center" width="120">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="goDetail(scope.$index, scope.row)">
            {{scope.row.articleId}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="文章描述（简述）"
        width="200" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userId"
        label="发布用户ID"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="发布用户姓名"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="userRole"
        label="发布人角色"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="time"
        label="文章发布时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="examineState"
        label="审核状态"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160">
        <template slot-scope="scope">
          <template  v-if="scope.row.examineCode==0">
            <el-button
              size="mini"
              @click="adopt(scope.$index, scope.row)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="noadopt(scope.$index, scope.row)">不通过</el-button>
          </template>
          <template v-else>
            <el-button
              size="mini"
              @click="goDetail(scope.$index, scope.row)">查看</el-button>
          </template>
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
    <!-- 不同过编辑窗口 -->
    <el-dialog title="不通过编辑窗口" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label="文章ID：" label-width="120px">
          {{dialogForm.articleId}}
        </el-form-item>
        <el-form-item label="文章标题：" label-width="120px">
          {{dialogForm.title}}
        </el-form-item>
        <el-form-item label="发布用户名：" label-width="120px">
          {{dialogForm.userName}}
        </el-form-item>
        <el-form-item label="不通过原因：" label-width="120px">
          <el-input type="textarea" v-model="reason" maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdopt()">通过</el-button>
        <el-button @click="dialogNoAdopt()">不通过</el-button>
        <el-button @click="dialogFormVisible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'examine',
  data () {
    return {
      formInline: {
        articleId: '',
        title: '',
        userRole: '0',
        userRoleList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '普通个人'
        }, {
          value: '2',
          label: '讲师'
        }],
        state: '0',
        stateList: [{
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '禁用'
        }, {
          value: '2',
          label: '正常'
        }],
        userId: '',
        userName: ''
      },
      tableData: [{
        articleId: '100001',
        title: '美国留学1',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl1',
        userRole: '人员',
        time: '2018-8-29 00:00:00',
        examineState: '待审核',
        examineCode: '0'
      }, {
        articleId: '100002',
        title: '美国留学2',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl2',
        userRole: '人员',
        time: '2018-8-29 00:00:00',
        examineState: '不通过',
        examineCode: '1'
      }, {
        articleId: '100003',
        title: '美国留学3',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl3',
        userRole: '人员',
        time: '2018-8-29 00:00:00',
        examineState: '通过',
        examineCode: '2'
      }],
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      dialogForm: {
        articleId: '',
        title: ''
      },
      reason: ''
    }
  },
  methods: {
    onSubmit (e) {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    adopt (index, row) {

    },
    noadopt (index, row) {
      this.dialogFormVisible = true
      this.dialogForm = row
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.articleId}})
    },
    dialogAdopt () {
      window.location.reload()
    },
    dialogNoAdopt () {

    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
</style>
