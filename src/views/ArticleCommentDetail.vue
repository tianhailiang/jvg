<template>
  <div >
    <div class="nav" >
      文章评论详情
    </div>
    <div class="comment-top" >
      <div class="comment-top-list">
        <i>文章ID：</i>
        <span>{{articleId}}</span>
      </div>
      <div class="comment-top-list">
        <i>文章标题：</i>
        <span>{{title}}</span>
      </div>
      <div class="comment-top-list">
        <i>评论总数：</i>
        <span>{{commentNumber}}</span>
      </div>
      <div class="comment-top-list">
        <i>发布人ID：</i>
        <span>{{userId}}</span>
      </div>
      <div class="comment-top-list">
        <i>发布人名称：</i>
        <span>{{userName}}</span>
      </div>
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="评论内容">
        <el-input v-model="formInline.commentContent" size="small"></el-input>
      </el-form-item>
      <el-form-item label="评论人">
        <el-input v-model="formInline.commentName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="评论ID">
        <el-input v-model="formInline.commentId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="评论时间">
        <el-date-picker
          v-model="formInline.commentTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回复内容" >
        <el-input v-model="formInline.replayContent" size="small"></el-input>
      </el-form-item>
      <el-form-item label="回复人">
        <el-input v-model="formInline.replayName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="回复ID">
        <el-input v-model="formInline.replayId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="回复时间">
        <el-date-picker
          v-model="formInline.replayTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
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
        prop="commentId"
        label="评论ID"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="commentContent"
        label="评论内容"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="commentName"
        label="评论人"
        width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="commentTime"
        label="评论时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="commentChannel"
        label="评论渠道"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayId"
        label="回复ID"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayName"
        label="回复人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayContent"
        label="回复内容"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="replayTime"
        label="回复时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayChannel"
        label="回复时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160">
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
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'articleList',
  data () {
    return {
      articleId: '10001',
      title: '美国留学1',
      commentNumber: '1000',
      userId: '15242755275',
      userName: 'thl1',
      formInline: {
        commentContent: '',
        commentName: '',
        commentId: '',
        commentTime: '',
        replayContent: '',
        replayName: '',
        replayId: '',
        replayTime: ''
      },
      tableData: [{
        commentId: '100001',
        commentContent: '美国留学非常好啊',
        commentName: 'thl',
        commentTime: '2018-8-29 00:00:00',
        commentChannel: 'PC',
        replayId: '10001',
        replayName: 'haha',
        replayContent: '我也非常好啊',
        replayTime: '2018-8-29 00:00:00',
        replayChannel: 'PC'
      }, {
        commentId: '100001',
        commentContent: '美国留学非常好啊',
        commentName: 'thl',
        commentTime: '2018-8-29 00:00:00',
        commentChannel: 'PC',
        replayId: '10001',
        replayName: 'haha',
        replayContent: '我也非常好啊',
        replayTime: '2018-8-29 00:00:00',
        replayChannel: 'PC'
      }, {
        commentId: '100001',
        commentContent: '美国留学非常好啊',
        commentName: 'thl',
        commentTime: '2018-8-29 00:00:00',
        commentChannel: 'PC',
        replayId: '10001',
        replayName: 'haha',
        replayContent: '我也非常好啊',
        replayTime: '2018-8-29 00:00:00',
        replayChannel: 'PC'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  components: {
    
  },
  methods: {
    onSubmit (e) {
      console.log('submit!')
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.articleId}})
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
  .comment-top{
    display: flex;
    flex-wrap: wrap;
    border:1px solid #dcdcdc;
  }
  .comment-top-list{
    width:300px;
    margin-bottom:20px;
  }
</style>
