<template>
  <div class="right-box">
    <div class="nav">
      问答列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        <el-input v-model="id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问题内容：" :label-width="formLabelWidth">
        <el-input v-model="details" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问答标签：" :label-width="formLabelWidth">
        <el-input v-model="lableIds" size="small"></el-input>
      </el-form-item>
      <el-form-item label="最佳答案：" :label-width="formLabelWidth">
        <el-radio v-model="answerType" label="1">是</el-radio>
        <el-radio v-model="answerType" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="问题创建人：" :label-width="formLabelWidth">
        <el-input v-model="userId" size="small"></el-input>
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
          width="55" >
        </el-table-column>
        <el-table-column
          label="问答id"
          width="80" align="center" >
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="goDetail(scope.$index, scope.row)">
              {{scope.row.questionId}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="questionTitle"
          label="问答标题"
          width="100" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="questionDetails"
          label="问题内容"
          width="150" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="bestDetails"
          label="最佳答案"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="answerNum"
          label="回复数"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="joinNum"
          label="参与人数"
          width="110" align="center">
        </el-table-column>
        <el-table-column
          prop="questionUserName"
          label="问题创建人"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="questionCreatedAt"
          label="问题创建时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="140" >
          <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete([scope.row.questionId])">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <div class="btn-box" >
        <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
      </div>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px" v-if="total > 0">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'answerList',
  data () {
    return {
      id: '',
      title: '',
      details: '',
      lableIds: '',
      answerType: '',
      userId: '',
      formLabelWidth: '100px',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    onSubmit () {
      axios.post('topic/qalist/list.json', {
        // id: this.id,
        // title: this.title,
        // details: this.details,
        // lableIds: this.lableIds,
        // answerType: this.answerType,
        // userId: this.userId,
        pageNo: 1,
        pageSize: 10
      })
      .then( response => {
        this.total = response.data.result.total
        this.tableData = response.data.result.qaData
      })
      .catch( error => {
        console.log(error);
      })
    },
    handleDelete (qaId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('topic/qalist/delete.json', {
          id: qaId
        })
        .then( response => {
          if (response.data.code == 'OK') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            setTimeout(function () {
              window.location.reload()
            },500)
          } else {
            this.$message({
              type: 'error',
              message: response.data.message
            })
          }
        })
        .catch( error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })     
      })
    },
    batchDelete () {
      let multipleQaid = []
      this.multipleSelection.forEach((item, index) => {
        multipleQaid.push(item.questionId)
      })
      if (multipleQaid.length == 0) {
        this.$message({
          type: 'warning',
          message: '请勾选问答'
        })
        return false
      }
      this.handleDelete(multipleQaid)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      axios.post('topic/qalist/list.json', {
        pageNo: val,
        pageSize: 10
      })
      .then( response => {
        this.tableData = response.data.result.qaData
      })
      .catch( error => {
        console.log(error);
      })
    },
    goDetail (index, row) {
      this.$router.push({name: 'answerDetail', params: {id: row.questionId}})
    }
  }
}
</script>

<style scoped>
  .right-box {
    display: flex;
    flex-direction: column
  }
  .nav {
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top:10px
  }
</style>

