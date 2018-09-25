<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      文章列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="文章ID" :label-width="formLabelWidth">
        <el-input v-model="articleId" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户分类">
        <el-select v-model="userClassify" size="small" >
          <el-option
          v-for="item in userClassifyList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
        <el-input v-model="userId" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="userName" size="small"></el-input>
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
        @selection-change="handleSelectionChange" border>
        <el-table-column
          type="selection"
          label="全部"
          width="55" >
        </el-table-column>
        <el-table-column
          label="文章ID"
          align="center" width="80">
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
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="memo"
          label="文章描述（简述）"
          width="150" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="发布用户ID"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="realName"
          label="发布用户姓名"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="userTypeVal"
          label="用户分类"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="文章发布时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="upDownVal"
          label="状态"
          width="92" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160">
          <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleForbidden(scope.$index, scope.row)" v-if="scope.row.upDown ==1">
            禁用</el-button>
          <el-button
            size="mini"
            @click="handleRelieve(scope.$index, scope.row)" v-else-if="scope.row.upDown ==2">
            解禁</el-button>
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
      :total="total" style="text-align:center;margin-top:20px" v-if="total > 0">
    </el-pagination>
    <div class="vue-info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
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
      formLabelWidth: '80px',
      articleId: null,
      title: '',
      userClassify: null,
      userClassifyList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '人员'
      }, {
        value: 3,
        label: '机构'
      }, {
        value: 4,
        label: '院校'
      }],
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
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      dialogForm: '',
      total: 0,
      pageSize: 20,
      infoTotal: 1
    }
  },
  components: {
    ForbiddenDialog
  },
  methods: {
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('article/list/list.json', {
        id: this.articleId,
        title: this.title,
        userType: this.userClassify,
        upDown: this.state,
        userId: this.userId,
        realName: this.userName,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(response => {
        this.tableData = response.data.result.modelData
        this.total = response.data.result.total
        this.infoTotal = this.total
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleForbidden (index, row) {
      this.dialogFormVisible = true
      this.dialogForm = row
    },
    handleRelieve (index, row) {
      /* 解禁 */
      axios.post('article/list/change-updown.json', {
        id: row.id,
        upDown: 1
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
        }else {
          this.$message({
            type: 'error',
            message: response.data.message
          })
        }
      })
      .catch( error => {
        console.log(error);
      })
    },
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('article/list/delete.json', {
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
        multipleId.push(item.id)
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
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.id}})
    }
  }
}
</script>
<style scoped>
  .demonstration {
    margin-right:10px
  }
</style>
