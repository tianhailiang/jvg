<template>
  <div >
    <div class="nav" >
      文章评论列表
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="文章ID">
        <el-input v-model="formInline.articleId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="formInline.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户分类">
        <el-select v-model="formInline.userClassify" size="small" >
          <el-option
          v-for="item in formInline.userClassifyList"
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
      border>
      <el-table-column
        type="index"
        label="NO"
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
        prop="state"
        label="状态"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论数"
        width="120" align="center" >
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
      formInline: {
        articleId: '',
        title: '',
        userClassify: '0',
        userClassifyList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '人员'
        }, {
          value: '2',
          label: '机构'
        }, {
          value: '3',
          label: '院校'
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
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用',
        userRole: '个人',
        commentNumber: '1000'
      }, {
        articleId: '100002',
        title: '美国留学2',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl2',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用',
        userRole: '个人',
        commentNumber: '1000'
      }, {
        articleId: '100003',
        title: '美国留学3',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl3',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用',
        userRole: '个人',
        commentNumber: '1000'
      }],
      currentPage: 1
    }
  },
  methods: {
    onSubmit (e) {
      console.log('submit!')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goDetail (index,row) {
      this.$router.push({name: 'commentDeatil', params: {id: row.articleId}})
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
