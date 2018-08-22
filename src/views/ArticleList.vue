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
    <!-- 禁用编辑窗口 -->
    <ForbiddenDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>
<script>
import ForbiddenDialog from '@/components/ForbiddenDialog.vue'
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
        title: '美国留学1',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl1',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }, {
        articleId: '100002',
        title: '美国留学2',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl2',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }, {
        articleId: '100003',
        title: '美国留学3',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl3',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }],
      multipleSelection: [],
      currentPage3: 1,
      dialogFormVisible: false,
      dialogForm: {
        articleId: '',
        title: ''
      }
    }
  },
  components: {
    ForbiddenDialog
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
      if(row.editTxt=='禁用'){
        this.dialogFormVisible = true
        this.dialogForm = row
      }
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
  .demo-form-inline{
    border:1px solid #dcdcdc;
  }
  .demonstration{
    margin-right:10px;
  }
</style>
