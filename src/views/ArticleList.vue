<template>
  <div >
    <div class="nav" >
      文章列表
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="selection"
        label="全部"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="articleId"
        label="文章ID"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="title"
        label="话题标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="话题内容"
        width="200" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户姓名"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="userClassify"
        label="用户分类"
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
        label="操作"
        align="center" width="160">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">{{scope.row.editTxt}}</el-button>
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
      :current-page.sync="currentPage3"
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
        }]
      },
      userId: '',
      userName: '',
      tableData: [{
        articleId: '100001',
        title: '美国留学',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }, {
        articleId: '100001',
        title: '美国留学',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }, {
        articleId: '100001',
        title: '美国留学',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }],
      multipleSelection: [],
      currentPage3: 1
    }
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
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
  .demo-form-inline{
    border:1px solid #dcdcdc;
  }
  .demonstration{
    margin-right:10px;
  }
</style>
