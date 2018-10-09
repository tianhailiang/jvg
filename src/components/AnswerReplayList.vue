<template>
  <el-dialog title="问答/回复列表" :visible.sync="dialogFormVisible" width="80%" :before-close="handleClose">
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        {{id}}
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        {{title}}
      </el-form-item>
      <el-form-item label="悬赏状态：" :label-width="formLabelWidth">
        {{statusVal}}
      </el-form-item>
      <el-form-item label="悬赏内容：" :label-width="formLabelWidth">
        {{typeVal}} 
        <span v-if = "type == 1" >
        </span>
        <span v-else-if = "type == 2" >
          {{price}}积分
        </span>
        <span v-else-if = "type == 3" >
          {{price}}
        </span>
      </el-form-item>
      <el-form-item label="发布人ID：" :label-width="formLabelWidth">
        {{userId}}
      </el-form-item>
      <el-form-item label="发布人名称：" :label-width="formLabelWidth">
        {{userName}}
      </el-form-item>
      <el-form-item label="状态：" :label-width="formLabelWidth">
        {{upDownVal}}
      </el-form-item>
    </el-form>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <div>一级回复</div>
      <el-form-item label="回复内容：" :label-width="formLabelWidth">
        {{replayContent}}
      </el-form-item>
      <el-form-item label="回复人：" :label-width="formLabelWidth">
        {{replayName}}
      </el-form-item>
      <el-form-item label="回复ID：" :label-width="formLabelWidth">
        {{replayId}}
      </el-form-item>
      <el-form-item label="回复时间：" :label-width="formLabelWidth">
        {{replayTime}}
      </el-form-item>
      <el-form-item label="最佳答案：" :label-width="formLabelWidth">
        {{typeVal1}}
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border>
      <el-table-column
        type="slection"
        label="NO"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="answerId"
        label="二级回复ID"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="answerParentName"
        label="二级回复内容"
        width="300"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="answerUserName"
        label="回复人"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="answerCreatedAt"
        label="回复时间"
        width="163"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="sourceVal"
        label="回复渠道"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px;height:50px">
    </el-pagination>
  </el-dialog>
</template>

<script>
export default {
  name: 'answerReplayList',
  props: ['dialogFormVisible','replyId'],
  data () {
    return {
      id: '',
      title: '',
      statusVal: '',
      type: '',
      typeVal: '',
      price: '',
      userId: '',
      userName: '',
      upDownVal: '',
      replayContent: '',
      replayName: '',
      replayId: '',
      replayTime: '',
      typeVal1: '',
      formLabelWidth: '100px',
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 20
    }
  },
  watch: {
    replyId: function(newVal, oldVal) {
      this.id = newVal
      /* 查询问答回复列表 */
      axios.post('/api/c/topic/qa/list.json', {
        id: this.$route.params.id,
        answerId: this.replyId,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(response => {
        this.total = response.data.result.total
        this.tableData = response.data.result.answerData
        this.id = response.data.result.id
        this.title = response.data.result.title
        this.statusVal = response.data.result.statusVal
        this.type = response.data.result.type
        this.typeVal = response.data.result.typeVal
        this.price = response.data.result.price
        this.userId = response.data.result.userId
        this.userName = response.data.result.userName
        this.upDownVal = response.data.result.upDownVal
        this.replayContent = response.data.result.details1
        this.replayName = response.data.result.userName1
        this.replayId = response.data.result.userId1
        this.replayTime = response.data.result.createdAt1
        this.typeVal1 = response.data.result.typeVal1
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/api/c/topic/qadetail/delete.json', {
          id: arrId
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
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>