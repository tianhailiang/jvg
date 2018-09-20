<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      文章评论列表
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
        <el-input v-model="userId" size="small" type="numer"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="userName" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
      v-if="total > 0">
      <el-table-column
        type="index"
        label="NO"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        label="文章ID"
        align="center" width="120">
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
        width="201"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userId"
        label="发布用户ID"
        width="120"
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
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="文章发布时间"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="upDownVal"
        label="状态"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="commentNum"
        label="评论数"
        width="120" align="center" >
      </el-table-column>
    </el-table>
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
  </div>
</template>
<script>
export default {
  name: 'articleCommentList',
  data () {
    return {
      formLabelWidth: '80px',
      articleId: null,
      title: '',
      userType: null,
      userTypeList: [],
      state: null,
      stateList: [{
        value: null,
        label: '全部'
      },
      {
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '禁用'
      }],
      userId: null,
      userName: '',
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  methods: {
    onSubmit (e) {
      axios.post('article/comment/list.json', {
        id: this.articleId,
        title: this.title,
        userType: this.userType,
        upDown: this.state,
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
    },
    goDetail (index,row) {
      this.$router.push({name: 'commentDeatil', params: {id: row.id}})
    }
  }
}
</script>
<style scoped>
  
</style>
