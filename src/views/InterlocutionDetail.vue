<template>
  <div class="right-box">
    <div class="nav" >
      话题详情（新建/编辑）
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="话题ID：" class="topic-id">
        {{id}}
      </el-form-item>
      <el-form-item label="话题标题">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题频道">
        <el-select v-model="channelVal" size="small">
          <el-option
          v-for="item in channelList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话题分类" >
        <el-select v-model="classificationVal" size="small" >
          <el-option
          v-for="item in classificationList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        {{createdAt}}
      </el-form-item>
      <el-form-item label="话题内容" style="display:block">
        <el-input v-model="content" size="small" type="textarea" maxlength="100" style="width:1015px"></el-input>
      </el-form-item>
      <el-form-item label="话题标签">
        <el-input v-model="lableIds" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建人：">
        {{adminName}}
      </el-form-item>
      <el-button @click="addWenda">添加问答</el-button>
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
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="questionDetails"
          label="问题内容"
          width="180" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="bestDetails"
          label="最佳答案"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="answerNum"
          label="回复数"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="joinNum"
          label="参与人数"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="questionUserId"
          label="问题创建人"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="questionCreatedAt"
          label="问题创建时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160" >
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
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px" v-if="total > 0">
    </el-pagination>
    <div class="operation-btn-box">
      <el-button @click="sure">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <!-- 问答列表查看 -->
    <InterlocutionListSee :dialogFormVisible.sync="dialogFormVisible" />
    <!-- 问答详情查看 -->
    <InterlocutionDetailSee :dialogFormVisible1.sync="dialogFormVisible1" :id="questionId" />
  </div>
</template>
<script>
import InterlocutionListSee from '@/components/InterlocutionListSee.vue'
import InterlocutionDetailSee from '@/components/InterlocutionDetailSee.vue'
export default {
  name: 'interlocutionDetail',
  data () {
    return {
      id: '',
      title: '',
      channelVal: '',
      channelList: [],
      classificationVal: '0',
      classificationList: [],
      createdAt: '',
      content: '',
      lableIds: '',
      adminName: '',
      adminId: '',
      tableData: [],
      multipleSelection: [],
      currentPage: '',
      total: '0',
      dialogFormVisible: false,
      dialogFormVisible1: false,
      questionId: ''
    }
  },
  components: {
    InterlocutionListSee, InterlocutionDetailSee
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete (qaId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('topic/detail/delete.json', {
          id: this.id,
          qaId: qaId
        })
        .then(function (response) {
          console.log(response)
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
        }.bind(this))
        .catch(function (error) {
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$router.push({
        name: 'interlocutionDetail', 
        params: {id: this.id}, 
        query: {currentPage: val}
      })
      window.location.reload()
    },
    addWenda () {
      this.dialogFormVisible = true
    },
    goDetail (index, row) {
      this.dialogFormVisible1 = true
      this.questionId = row.questionId
    },
    sure () {
      /* 添加话题 */
      axios.post('topic/detail/create.json', {
        name: this.title,
        content: this.content,
        business: this.channelVal,
        categorySigns: this.classificationVal,
        lableIds: this.lableIds,
        adminId: this.adminId
      })
      .then( response => {
        if (response.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: response.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      })
      .catch( error => {
        console.log(error)
      })
    },
    cancel () {
      this.$router.push({name: 'interlocution'})
    }
  },
  mounted () {
    /* 话题频道 */
    axios.post('common/code/channel/list.json', {
    })
    .then(function (response) {
      this.channelList = response.data.result
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
    this.id = this.$route.params.id
    this.currentPage = Number(this.$route.query.currentPage) || 1
    /* 查询话题详情 */
    axios.post('topic/detail/detail.json', {
      id: this.$route.params.id,
      pageNo: this.currentPage,
      pageSize: 20,
      languages: 'zh'
    })
    .then(function (response) {
      this.title = response.data.result.name
      this.channelVal = response.data.result.business
      this.createdAt = response.data.result.createdAt
      this.content = response.data.result.content
      this.adminName = response.data.result.adminName
      this.adminId = response.data.result.adminId
      this.tableData = response.data.result.qaData
      this.total = response.data.result.total
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>
<style>
  .right-box {
    display: flex;
    flex-direction: column
  }
  .nav {
    height: 40px;
    font-size: 18px;
    line-height: 40px
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px
  }
  .topic-id .el-form-item__label {
    padding-right: 0
  }
  .operation-btn-box {
    display: flex;
    justify-content: center;
    margin-top: 10px
  }
</style>
