<template>
  <div class="right-box">
    <div class="nav" >
      话题详情（新建/编辑）
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="话题ID：" class="topic-id">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="话题标题">
        <el-input v-model="formInline.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题频道">
        <el-select v-model="formInline.channelVal" size="small">
          <el-option
          v-for="item in formInline.channelList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话题分类" >
        <el-select v-model="formInline.classificationVal" size="small" >
          <el-option
          v-for="item in formInline.classificationList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        {{formInline.createdAt}}
      </el-form-item>
      <el-form-item label="话题内容" style="display:block">
        <el-input v-model="formInline.content" size="small" type="textarea" maxlength="100" style="width:1015px"></el-input>
      </el-form-item>
      <el-form-item label="话题标签">
        <el-input v-model="formInline.tag" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建人：">
        {{formInline.adminName}}
      </el-form-item>
      <el-button @click="addWenda">添加问答</el-button>
      <el-button @click="onSubmit">提交</el-button>
      <el-button @click="onSubmit">取消</el-button>
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
      :page-size="1"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px" v-if="total > 0">
    </el-pagination>
    <!-- 问答列表查看 -->
    <InterlocutionListSee :dialogFormVisible.sync="dialogFormVisible" />
    <!-- 问答详情查看 -->
    <InterlocutionDetailSee :dialogFormVisible1.sync="dialogFormVisible1" />
  </div>
</template>
<script>
import InterlocutionListSee from '@/components/InterlocutionListSee.vue'
import InterlocutionDetailSee from '@/components/InterlocutionDetailSee.vue'
export default {
  name: 'interlocutionDetail',
  data () {
    return {
      formInline: {
        id: '',
        title: '',
        channelVal: '',
        channelList: [],
        classificationVal: '0',
        classificationList: [],
        createdAt: '',
        content: '',
        tag: '',
        adminName: ''
      },
      tableData: [],
      multipleSelection: [],
      currentPage: '',
      total: '0',
      dialogFormVisible: false,
      dialogFormVisible1: false
    }
  },
  components: {
    InterlocutionListSee, InterlocutionDetailSee
  },
  methods: {
    onSubmit (e) {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
    },
    handleDelete (qaId) {
      console.log(qaId)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('topic/detail/delete.json', {
          id: this.formInline.id,
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
      // console.log(multipleQaid)
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
        params: {id: this.formInline.id}, 
        query: {currentPage: val}
      })
      window.location.reload()
    },
    addWenda () {
      this.dialogFormVisible = true
    },
    goDetail () {
      this.dialogFormVisible1 = true
    },
    topicQuery () {
      /* 查询话题详情接口 */
      axios.post('topic/detail/detail.json', {
        id: this.$route.params.id,
        pageNo: this.currentPage,
        pageSize: 20,
        languages: 'zh'
      })
      .then(function (response) {
        this.formInline.title = response.data.result.name
        this.formInline.channelVal = response.data.result.business
        this.formInline.createdAt = response.data.result.createdAt
        this.formInline.content = response.data.result.content
        this.formInline.adminName = response.data.result.adminName
        this.tableData = response.data.result.qaData
        this.total = response.data.result.total
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    /* 话题频道接口 */
    axios.post('common/code/channel/list.json', {
    })
    .then(function (response) {
      this.formInline.channelList = response.data.result
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
    this.formInline.id = this.$route.params.id
    this.currentPage = Number(this.$route.query.currentPage) || 1
    this.topicQuery()
  }
}
</script>
<style>
  .right-box {
    display: flex;
    flex-direction: column
  }
  .nav {
    height:40px;
    font-size: 18px;
    line-height: 40px
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top:10px
  }
  .topic-id .el-form-item__label {
    padding-right:0
  }
</style>
