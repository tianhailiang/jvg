<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      返利规则列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="规则名称：" :label-width="formLabelWidth">
        <el-input v-model="name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="status" size="small">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="platform" size="small">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类：">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人：" :label-width="formLabelWidth">
        <el-input v-model="adminName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-date-picker
          v-model="createTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" 
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
        <el-button @click="createRecommend" size="small" >创建返利规则</el-button>
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
          width="55" align="center">
        </el-table-column>
        <el-table-column
          label="ID"
          width="120" align="center">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="goDetail(scope.$index, scope.row)">
              {{scope.row.id}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="规则名称"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sourceName"
          label="渠道"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="分类"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="创建人"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          width="175" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160" >
         <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditor(scope.$index, scope.row)">
              <template v-if="scope.row.status == 1">停用</template>
              <template v-if="scope.row.status == 2">启用</template>
            </el-button>
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
  name: 'divdeIntoRulesList',
  data () {
    return {
      formLabelWidth: '100px',
      name: '',
      status: null,
      statusList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '启用'
      }, {
        value: 2,
        label: '正常'
      }],
      platform: null,
      platformList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: 'APP'
      }, {
        value: 2,
        label: 'WAP'
      }, {
        value: 3,
        label: 'PC'
      }],
      type: null,
      typeList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '注册'
      }, {
        value: 2,
        label: '返利'
      }],
      adminName: '',
      createTime: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  methods: {
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      if (!this.createTime) {
        this.createTime = []
      }
      axios.post('/api/c/operation-management/rebate-rule/rebate/list.json', {
        name: this.name,
        status: this.status,
        source: this.platform,
        type: this.type,
        adminName: this.adminName,
        createFrom: this.createTime[0],
        createTo: this.createTime[1],
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        this.tableData = res.data.result.modelData
        this.total = res.data.result.total
        this.infoTotal = this.total
      })
      .catch(error => {
        console.log(error);
      })
    },
    createRecommend () {
      this.$router.push({name: 'rebateDetailBuild'})
    },
    handleEditor (index, row) {
      let status = null
      if (row.status == 1) {
        status = 2
      } else if (row.status == 2) {
        status = 1
      }
      axios.post('/api/c/operation-management/rebate-rule/rebate/set-status.json', {
        id: row.id,
        status: status
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
        axios.post('/api/c/operation-management/rebate-rule/rebate/delete.json', {
          ids: arrId
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
      this.$router.push({name: 'rebateDetail', params: {id: row.id}})
    }
  }
}
</script>

<style scoped>
  
</style>