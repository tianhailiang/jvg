<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      举报列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc" class="report-form">
      <el-form-item label="举报内容：" :label-width="formLabelWidth"
      style="margin-left:5px">
        <el-input v-model="details" size="small"></el-input>
      </el-form-item>
      <el-form-item label="举报人：">
        <el-input v-model="userName" size="small" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="举报时间：">
        <el-date-picker
          v-model="reportTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small" style="width:332px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回复状态：">
        <el-select v-model="status" size="small" style="width:100px">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="举报类别：" :label-width="formLabelWidth"
      style="margin-left:5px">
        <el-select v-model="reportCategory" style="width:95px"
        size="small">
          <el-option
            v-for="item in reportCategoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号：" v-if="reportCategory == 7">
        <el-input v-model="snid" size="small" style="width:65px"></el-input>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="channel" style="width:95px"
        size="small">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回复人：">
        <el-input v-model="adminName" size="small" style="width:75px"></el-input>
      </el-form-item>
      <el-form-item label="回复时间：">
        <el-date-picker
          v-model="replyTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small" style="width:332px">
        </el-date-picker>
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
          width="50" >
        </el-table-column>
        <el-table-column
          prop="details"
          label="举报内容"
          width="95" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="举报人"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="举报人ID"
          width="60" align="center" >
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="举报类别"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="professionName"
          label="频道"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="联系方式"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="举报时间"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="回复状态"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="回复人"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="replyTime"
          label="回复时间"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="150" >
          <template slot-scope="scope">
            <template v-if="scope.row.status == 1">
              <el-button
                size="mini"
                @click="reply(scope.$index, scope.row)">回复</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete([scope.row.id])">删除</el-button>
            </template>
            <template v-else>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete([scope.row.id])">删除</el-button>
            </template>
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
    <!-- 回复窗口 -->
    <ReportDetailDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import ReportDetailDialog from '@/components/ReportDetailDialog.vue'
export default {
  name: 'reportList',
  data () {
    return {
      formLabelWidth: '',
      id: null,
      details: '',
      userName: '',
      reportTime: '',
      status: null,
      statusList: [{
        value: 1,
        label: '未回复'
      }, {
        value: 2,
        label: '已回复'
      }],
      reportCategory: null,
      reportCategoryList: [{
        value: 1,
        label: '课程'
      }, {
        value: 2,
        label: '照片'
      }, {
        value: 3,
        label: '文章'
      }, {
        value: 4,
        label: '出版物'
      }, {
        value: 5,
        label: '圈子'
      }, {
        value: 6,
        label: '问答'
      }, {
        value: 7,
        label: '订单'
      }],
      snid: '',
      channel: null,
      channelList: [],
      adminName: '',
      replyTime: '',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1,
      dialogFormVisible: false,
      dialogForm: {},
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
      }
    }
  },
  components: {
    ReportDetailDialog
  },
  created () {
    axios.post('common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('operation-management/message-report/list.json', {
        id: this.id,
        details: this.details,
        userName: this.userName,
        createFrom: this.reportTime[0],
        createTo: this.reportTime[1],
        status: this.status,
        type: this.reportCategory,
        snid: this.snid,
        profession: this.channel,
        adminName: this.adminName,
        replyFrom: this.replyTime[0],
        replyTo: this.replyTime[1],
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
    reply (index, row) {
      this.dialogFormVisible = true
      this.dialogForm = row
    },
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('operation-management/message-report/delete.json', {
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
    }
  }
}
</script>

<style>
  .report-form .el-form-item__label {
    padding-right:0
  }
</style>