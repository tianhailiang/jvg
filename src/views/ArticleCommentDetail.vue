<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      文章评论详情
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="文章ID：" :label-width="formLabelWidth">
        {{$route.params.id}}
      </el-form-item>
      <el-form-item label="文章标题：" :label-width="formLabelWidth">
        {{title}}
      </el-form-item>
      <el-form-item label="评论总数：" :label-width="formLabelWidth">
        {{commentNum}}个
      </el-form-item>
      <el-form-item label="发布人ID：" :label-width="formLabelWidth">
        {{userId}}
      </el-form-item>
      <el-form-item label="发布人名称：" >
        {{realName}}
      </el-form-item>
    </el-form>
    <el-form :inline="true" style="border:1px solid #dcdcdc;margin-top:10px">
      <el-form-item label="评论内容" :label-width="formLabelWidth">
        <el-input v-model="commentDetails" size="small"></el-input>
      </el-form-item>
      <el-form-item label="评论人">
        <el-input v-model="commentUserName" size="small" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="评论ID">
        <el-input v-model="commentUser" size="small" type="number" style="width:90px"></el-input>
      </el-form-item>
      <el-form-item label="评论时间">
        <el-date-picker
          v-model="commentTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small" style="width:332px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回复内容" :label-width="formLabelWidth">
        <el-input v-model="reCommentDetails" size="small"></el-input>
      </el-form-item>
      <el-form-item label="回复人">
        <el-input v-model="reCommentUserName" size="small" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="回复ID">
        <el-input v-model="reCommentUser" size="small" type="number" style="width:90px"></el-input>
      </el-form-item>
      <el-form-item label="回复时间">
        <el-date-picker
          v-model="reCommentTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small" style="width:332px">
        </el-date-picker>
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
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          label="全部"
          width="55">
        </el-table-column>
        <el-table-column
          prop="commentUser"
          label="评论ID"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="commentDetails"
          label="评论内容"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="commentUserName"
          label="评论人"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="commentDate"
          label="评论时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="commentSourceVal"
          label="评论渠道"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="reCommentUser"
          label="回复ID"
          width="70" align="center" >
        </el-table-column>
        <el-table-column
          prop="reCommentUserName"
          label="回复人"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="reCommentDetails"
          label="回复内容"
          width="130" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="reCommentDate"
          label="回复时间"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="reCommentSourceVal"
          label="回复渠道"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="100">
          <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete([scope.row.commentId])">删除</el-button>
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
      :total="total" style="text-align:center;margin-top:20px"
      v-if="total > 0">
    </el-pagination>
    <div class="vue-info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
  </div>
</template>
<script>
export default {
  name: 'articleCommentDetail',
  data () {
    return {
      formLabelWidth: '90px',
      title: '',
      commentNum: null,
      userId: null,
      realName: '',
      commentDetails: '',
      commentUserName: '',
      commentUser: null,
      commentTime: [],
      reCommentDetails: '',
      reCommentUserName: '',
      reCommentUser: null,
      reCommentTime: [],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1,
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },
  components: {
    
  },
  methods: {
    onSubmit (e) {
      axios.post('article/comment/detail.json', {
        id: this.$route.params.id,
        commentDetails: this.commentDetails,
        commentUser: this.commentUser,
        commentUserName: this.commentUserName,
        commentDateFrom: this.commentTime[0],
        commentDateTo: this.commentTime[1],
        reCommentDetails: this.reCommentDetails,
        reCommentUser: this.reCommentUser,
        reCommentUserName: this.reCommentUserName,
        reCommentDateFrom: this.reCommentTime[0],
        reCommentDateFromTo: this.reCommentTime[1],
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.title = res.data.result.title
          this.userId = res.data.result.userId
          this.realName = res.data.result.realName
          this.commentNum = res.data.result.commentNum || 0
          this.tableData = res.data.result.commentData
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
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('article/comment/delete.json', {
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
      let multipleId = []
      this.multipleSelection.forEach((item, index) => {
        multipleId.push(item.commentId)
      })
      if (multipleId.length == 0) {
        this.$message({
          type: 'warning',
          message: '请勾选至少一个'
        })
        return false
      }
      this.handleDelete(multipleId)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
    }
  },
  mounted () {
    this.onSubmit()
  }
}
</script>
<style scoped>

</style>
