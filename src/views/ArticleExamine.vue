<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      文章审核列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="文章ID" :label-width="formLabelWidth">
        <el-input v-model="articleId" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="userType" size="small" >
          <el-option
          v-for="item in userTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" >
        <el-select v-model="state" size="small" >
          <el-option
          v-for="item in stateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID" :label-width="formLabelWidth">
        <el-input v-model="userId" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="userName" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <template v-if="total > 0" >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange" border>
        <el-table-column
          type="selection"
          label="全部"
          width="55">
        </el-table-column>
        <el-table-column
          label="文章ID"
          align="center" width="100">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="goDetail(scope.$index, scope.row)">
              {{scope.row.id}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          width="120"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="memo"
          label="文章描述（简述）"
          width="150"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="发布用户ID"
          width="80"
          align="center" >
        </el-table-column>
        <el-table-column
          prop="realName"
          label="发布用户姓名"
          width="120"
          align="center" >
        </el-table-column>
        <el-table-column
          prop="userTypeVal"
          label="发布人角色"
          width="80"
          align="center" >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="文章发布时间"
          width="120"
          align="center" >
        </el-table-column>
        <el-table-column
          prop="statusVal"
          label="审核状态"
          width="105"
          align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160">
          <template slot-scope="scope">
            <template  v-if="scope.row.status == 2">
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
      <div class="vue-btn-box">
        <el-button type="danger" @click="batchAdopt()" >批量通过</el-button>
      </div>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
      style="text-align:center;margin-top:20px"
      v-if="total > 0">
    </el-pagination>
    <div class="vue-info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
    <!-- 不同过编辑窗口 -->
    <el-dialog title="不通过编辑窗口" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label="文章ID：" label-width="120px">
          {{dialogForm.id}}
        </el-form-item>
        <el-form-item label="文章标题：" label-width="120px">
          {{dialogForm.title}}
        </el-form-item>
        <el-form-item label="发布用户名：" label-width="120px">
          {{dialogForm.realName}}
        </el-form-item>
        <el-form-item label="不通过原因：" label-width="120px">
          <el-input type="textarea" v-model="reason" maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
      formLabelWidth: '80px',
      articleId: null,
      title: '',
      userType: null,
      userTypeList: [],
      state: null,
      stateList: [{
        value: 1,
        label: '草稿'
      },
      {
        value: 2,
        label: '申请中'
      }, {
        value: '3',
        label: '审核通过'
      }, {
        value: '4',
        label: '审核失败'
      }],
      userId: null,
      userName: '',
      currentPage: 1,
      pageSize: 20,
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      dialogForm: '',
      reason: '',
      total: 0,
      infoTotal: 1
    }
  },
  methods: {
    onSubmit (e) {
      axios.post('article/verify/list.json', {
        id: this.articleId,
        title: this.title,
        userType: this.userType,
        status: this.state,
        userId: this.userId,
        realName: this.userName,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if(res.data.code == 'OK') {
          this.tableData = res.data.result.modelData
          this.total = res.data.result.total
          this.infoTotal = this.total
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    adopt (index, row) {
      axios.post('article/verify/verify.json', {
        id: row.id,
        status: 3
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.$message({
            type: 'succes',
            message: res.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    noadopt (index, row) {
      this.dialogFormVisible = true
      this.dialogForm = row
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.id}})
    },
    dialogNoAdopt () {
      if (this.reason == '') {
        this.$message({
          type: 'warning',
          message: '请填写不通过原因!'
        })
        return false
      }
      axios.post('article/verify/verify.json', {
        id: this.dialogForm.id,
        status: 4,
        statusMemo: this.reason
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.$message({
            type: 'succes',
            message: res.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    batchAdopt () {
      
    }
  },
  mounted () {
    axios.post('common/code/role/list.json')
    .then(res => {
      this.userTypeList = res.data.result
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>

<style scoped>
  
</style>
