<template>
  <div class="right-box">
    <div class="nav">
      问答列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        <el-input v-model="id" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问题内容：" :label-width="formLabelWidth">
        <el-input v-model="details" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问答标签：" :label-width="formLabelWidth">
        <el-select v-model="lableIds[0]" size="small"
          style="width:130px;margin-right:10px">
          <el-option
            v-for="item in lableIdsList"
            :key="item.id"
            :label="item.name"
            :value="item.signs">
          </el-option>
        </el-select>
        <el-select v-model="lableIds[1]" size="small" style="width:130px">
          <el-option
            v-for="item in lableIdsList"
            :key="item.id"
            :label="item.name"
            :value="item.signs">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最佳答案：" :label-width="formLabelWidth">
        <el-radio v-model="answerType" label="1">是</el-radio>
        <el-radio v-model="answerType" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="问题创建人：" :label-width="formLabelWidth">
        <el-select
          v-model="userId"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in userIdList"
            :key="item.userId"
            :label="item.realName"
            :value="item.userId">
          </el-option>
        </el-select>
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
          width="100" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="questionDetails"
          label="问题内容"
          width="150" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="bestDetails"
          label="最佳答案"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="answerNum"
          label="回复数"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="joinNum"
          label="参与人数"
          width="110" align="center">
        </el-table-column>
        <el-table-column
          prop="questionUserName"
          label="问题创建人"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="questionCreatedAt"
          label="问题创建时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="140" >
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
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px" v-if="total > 0">
    </el-pagination>
    <div class="info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
  </div>
</template>

<script>
export default {
  name: 'answerList',
  data () {
    return {
      id: null,
      title: '',
      details: '',
      lableIds: [],
      lableIdsList: [],
      answerType: null,
      userId: null,
      userIdList: [],
      loading: false,
      formLabelWidth: '100px',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      total: 0,
      pageSize: 20,
      infoTotal: 1
    }
  },
  methods: {
    onSubmit () {
      let lableIdsStr = ''
      this.lableIds.forEach((item, index, arr) => {
        if (item) {
          lableIdsStr += item + ','
        }
        if(index == arr.length -1) {
          lableIdsStr = lableIdsStr.substring(0, lableIdsStr.length -1)
        } 
      })
      axios.post('topic/qalist/list.json', {
        id: this.id,
        title: this.title,
        details: this.details,
        lableIds: lableIdsStr,
        answerType: this.answerType,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(response => {
        if (response.data.code == 'OK') {
          this.tableData = response.data.result.qaData
          this.total = response.data.result.total
          this.infoTotal = this.total
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('topic/qalist/delete.json', {
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
          message: '请勾选至少一个'
        })
        return false
      }
      this.handleDelete(multipleQaid)
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
    goDetail (index, row) {
      this.$router.push({name: 'answerDetail', params: {id: row.questionId}})
    },
     remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        /* 查询用户信息列表 */
        axios.post('common/code/user-info/list.json', {
          realName: query
        })
        .then(response => {
          this.loading = false
          if (response.data.code == 'OK') {
            this.userIdList = response.data.result
          }
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        this.userIdList = [];
      }
    }
  },
  mounted () {
    /* 问答标签 */
    axios.post('common/code/label/list.json', {
      profession: 1,
      type: 6,
      languages: "zh",
      classes: 2,
      level: 3
    })
    .then(response => {
      this.lableIdsList = response.data.result
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .right-box {
    display: flex;
    flex-direction: column
  }
  .nav {
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top:10px
  }
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px
  }
</style>

