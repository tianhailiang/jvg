<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      问答详情
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc" class="answer-detail-form">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        {{$route.params.id}}
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
      <div class="nav">一级回复</div>
      <el-form-item label="回复内容：" :label-width="formLabelWidth">
        <el-input v-model="replayContent" size="small"></el-input>
      </el-form-item>
      <el-form-item label="回复人：" :label-width="formLabelWidth">
        <el-input v-model="replayName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="回复ID：" :label-width="formLabelWidth">
        <el-input v-model="replayId" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="回复时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="replayTime"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" 
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <template v-if="total > 0" >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border>
        <el-table-column
          type="selection"
          label="全部"
          width="55" >
        </el-table-column>
        <el-table-column
          label="回复ID"
          width="80" align="center" >
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="goDetail(scope.$index, scope.row)">
              {{scope.row.id}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="details"
          label="回复内容"
          width="200" align="center" 
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="回复人"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="回复时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="sourceName"
          label="回复渠道"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="typeVal"
          label="最佳答案"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="answerCount"
          label="二级回复数"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="vue-btn-box" >
        <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
      </div>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px;height:50px" 
      v-if="total > 0">
    </el-pagination>
    <div class="vue-info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
    <div class="answer-count">
      <span style="margin-left:18px">问答统计：</span>
      <el-table
          :data="tableData1" border >
          <el-table-column
            prop="browseNum"
            label="浏览数" align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="transpondNum"
            label="转发数" align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="shareNum"
            label="分享数" align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="collectNum"
            label="收藏数" align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="commentNum"
            label="评论数"
            align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="thumpNum"
            label="点赞数" align="center" width="80">
          </el-table-column>
        </el-table>
    </div>
    <!-- 弹出问答/回复列表 -->
    <AnswerReplayList :dialogFormVisible.sync="dialogFormVisible" :replyId="replyId" />
  </div>
</template>

<script>
import AnswerReplayList from '@/components/AnswerReplayList.vue'
export default {
  name: 'answerDetail',
  data () {
    return {
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
      replayTime: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      formLabelWidth: '100px',
      tableData: [],
      tableData1: [],
      currentPage: 1,
      dialogFormVisible: false,
      total: 0,
      pageSize: 1,
      infoTotal: 1,
      replyId: null
    }
  },
  components: {
    AnswerReplayList
  },
  methods: {
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      if (!this.replayTime) {
        this.replayTime = []
      } 
      /* 搜索回复列表 */
      axios.post('/api/c/topic/qadetail/list.json', {
        id: this.$route.params.id,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        details: this.replayContent,
        userId: this.replayName,
        answerId: this.replayId,
        createAtFrom: this.replayTime[0],
        createAtTo: this.replayTime[1]
      })
      .then(response => {
        this.total = response.data.result.total
        this.tableData = response.data.result.qaData
        this.infoTotal = this.total
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleClose (done) {
      this.$emit('update:dialogFormVisible1',false)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
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
    goDetail (index, row) {
      this.dialogFormVisible = true
      this.replyId = row.id
    }
  },
  mounted () {
    /* 问题详情 */
    axios.post('/api/c/topic/qadetail/list.json', {
      id: this.$route.params.id,
      pageNo: this.currentPage,
      pageSize: this.pageSize
    })
    .then(response => {
      this.title = response.data.result.title
      this.statusVal = response.data.result.statusVal
      this.type = response.data.result.type
      this.typeVal = response.data.result.typeVal
      this.price = response.data.result.price
      this.userId = response.data.result.userId
      this.userName = response.data.result.userName
      this.upDownVal = response.data.result.upDownVal
      this.total = response.data.result.total
      this.tableData = response.data.result.qaData
      let countObj = {}
      countObj.browseNum = response.data.result.browseNum
      countObj.transpondNum = response.data.result.transpondNum
      countObj.shareNum = response.data.result.shareNum
      countObj.collectNum = response.data.result.collectNum
      countObj.commentNum = response.data.result.commentNum
      countObj.thumpNum = response.data.result.thumpNum
      this.tableData1.push(countObj)
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>

<style scoped>
  .answer-count {
    display: flex;
  }
</style>
<style>
  .answer-detail-form .el-form-item__label {
    padding-right:0
  }
</style>
