<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      分成规则列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="规则名称：" :label-width="formLabelWidth">
        <el-input v-model="name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分成方式：">
        <el-select v-model="dividedTypeId" size="small" style="width:120px">
          <el-option
            v-for="item in dividedTypeIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="platform" size="small" style="width:120px">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="channel" size="small" style="width:120px">
          <el-option
            v-for="item in channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用业务：">
        <el-select v-model="suitBusiness" size="small" style="width:120px">
          <el-option
            v-for="item in suitBusinessList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人：" :label-width="formLabelWidth">
        <el-input v-model="adminName" size="small" style="width:130px"></el-input>
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
      <el-form-item label="状态：">
        <el-select v-model="status" size="small" style="width:110px">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
        <el-button @click="createRecommend" size="small" >创建分成规则</el-button>
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
          width="55" align="center" fixed>
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
          width="200" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sourceName"
          label="渠道"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="频道"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="businessName"
          label="适用业务"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="dividedTypeName"
          label="分成类型"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="twoDividedTypeName"
          label="二级类型"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="分成方式"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="dividedMemo"
          label="具体分成"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="创建人"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          width="110" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160"
          fixed="right">
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
    <!-- 分成新建弹框 -->
    <!-- <DivideBuildDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" /> -->
  </div>
</template>

<script>
// import DivideBuildDialog from '@/components/DivideBuildDialog.vue'
export default {
  name: 'divdeIntoRulesList',
  data () {
    return {
      formLabelWidth: '100px',
      name: '',
      dividedTypeId: null,
      dividedTypeIdList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '按比例'
      }, {
        value: 2,
        label: '按金额'
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
      channel: null,
      channelList: [],
      suitBusiness: null,
      suitBusinessList:[{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '课程'
      }, {
        value: 2,
        label: '文章'
      }, {
        value: 3,
        label: '出版物'
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
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1,
      dialogFormVisible: false,
      dialogForm: ''
    }
  },
  components: {
  },
  methods: {
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      if (!this.createTime) {
        this.createTime = []
      }
      axios.post('/api/c/operation-management/extract-rule/list.json', {
        name: this.name,
        dividedTypeId: this.dividedTypeId,
        source: this.platform,
        channel: this.channel,
        business: this.business,
        adminName: this.adminName,
        createFrom: this.createTime[0],
        createTo: this.createTime[1],
        status: this.status,
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
      // this.dialogFormVisible = true
      this.$router.push({name: 'divideIntoRulesDetailBuild'})
    },
    handleEditor (index, row) {
      let status = null
      if (row.status == 1) {
        status = 2
      } else if (row.status == 2) {
        status = 1
      }
      axios.post('/api/c/operation-management/extract-rule/set-status.json', {
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
        axios.post('/api/c/operation-management/extract-rule/delete.json', {
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
      this.$router.push({name: 'divideIntoRulesDetail', params: {id: row.id}})
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px
  }
  .btn-box{
    display: flex;
    justify-content: flex-end
  }
</style>