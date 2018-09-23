<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      留言答疑列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="留言内容：" :label-width="formLabelWidth">
        <el-input v-model="contents" size="small"></el-input>
      </el-form-item>
      <el-form-item label="留言人：">
        <el-input v-model="userName" size="small" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="留言时间：">
        <el-date-picker
          v-model="leaveTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回复状态：" :label-width="formLabelWidth">
        <el-select v-model="isRead" size="small" style="width:176px">
          <el-option
            v-for="item in isReadList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回复人：">
        <el-input v-model="adminName" size="small" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="回复时间：">
        <el-date-picker
          v-model="replyTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small">
        </el-date-picker>
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
          prop="contents"
          label="留言内容"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="留言人"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="留言人ID"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="留言时间"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="isReadName"
          label="回复状态"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="回复人"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="replyTime"
          label="回复时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160" >
          <template slot-scope="scope">
            <template v-if="scope.row.isRead == 1" >
              <el-button
                size="mini"
                @click="reply(scope.$index, scope.row)">回复</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete([scope.row.id])">删除</el-button>
            </template>
            <template v-else >
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
    <ReplyDetailDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import ReplyDetailDialog from '@/components/ReplyDetailDialog.vue'
export default {
  name: 'leaveList',
  data () {
    return {
      formLabelWidth: '100px',
      id: null,
      contents: '',
      userName: '',
      leaveTime: '',
      isRead: null,
      isReadList: [{
        value: 1,
        label: '回复'
      }, {
        value: '2',
        label: '未回复'
      }],
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
    ReplyDetailDialog
  },
  methods: {
    onSubmit () {
      axios.post('operation-management/message-feedback/list.json', {
        id: this.id,
        contents: this.contents,
        userName: this.userName,
        createFrom: this.leaveTime[0],
        createTo: this.leaveTime[1],
        isRead: this.isRead,
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
        axios.post('operation-management/message-feedback/delete.json', {
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

<style scoped>
  
</style>

