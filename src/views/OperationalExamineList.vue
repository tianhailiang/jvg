<template>
  <div class="vue-right-box">
    <div class="nav">
      运营活动审核
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="活动ID：" :label-width="formLabelWidth">
        <el-input v-model="id" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="活动标题：">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-select v-model="examineState" size="small">
          <el-option
            v-for="item in examineStateList"
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
      <el-form-item label="频道：" :label-width="formLabelWidth">
        <el-select v-model="channel" size="small">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期：">
        <el-date-picker
          v-model="activityTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" size="small"
          style="width:421px" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动类型：">
        <el-select v-model="activityType" size="small">
          <el-option
            v-for="item in activityTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参与商品：" :label-width="formLabelWidth">
        <el-select v-model="goods" size="small">
          <el-option
            v-for="item in goodsList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发行方：">
        <el-select v-model="issuer" size="small">
          <el-option
            v-for="item in issuerList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
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
          width="55" align="center"
          fixed>
        </el-table-column>
        <el-table-column
          label="活动ID"
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
          label="活动标题"
          width="200" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sourceName"
          label="渠道"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="频道"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="operationActivityTypeVal"
          label="活动类型"
          width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="discountRatio"
          label="活动价格/折扣"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="productTypeVal"
          label="参与商品"
          width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="issuerVal"
          label="发行方"
          width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="auditStatusVal"
          label="审核状态"
          width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="activityTime"
          label="活动有效期"
          width="175" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160"
          fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.auditStatus == 1">
              <el-button
              size="mini"
              @click="handleAdopt(scope.$index, scope.row)">通过</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleNoAdopt(scope.$index, scope.row)">不通过</el-button>
            </template>
            <template v-else>
              <el-button type="danger" @click="handleDelete([scope.row.id])" >删除</el-button>
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
      :total="total" style="text-align:center;margin-top:20px;height:50px"
      v-if="total > 0">
    </el-pagination>
    <div class="vue-info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
    <!-- 商品选择弹框 -->
    <NotThroughDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import NotThroughDialog from '@/components/NotThroughDialog.vue'
export default {
  name: 'operationalExamineList',
  data () {
    return {
      formLabelWidth: '90px',
      id: null,
      title: '',
      examineState: null,
      examineStateList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '待审核'
      }, {
        value: 2,
        label: '已通过'
      }, {
        value: 3,
        label: '不通过'
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
      activityTime: '',
      activityType: null,
      activityTypeList: [{
        value: 1,
        label: '组合营销'
      }, {
        value: 2,
        label: '现金优惠'
      }, {
        value: 3,
        label: '现金折扣'
      }],
      goods: null,
      goodsList: [{
        value: 1,
        label: '课程'
      }, {
        value: 2,
        label: '出版物'
      }, {
        value: 3,
        label: '留学服务'
      }],
      issuer: null,
      issuerList: [{
        value: 1,
        name: '平台'
      }, {
        value: 2,
        name: '用户'
      }, {
        value: 3,
        name: '机构或院校'
      }],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1,
      dialogFormVisible: false,
      dialogForm: '',
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
    NotThroughDialog
  },
  created () {
    axios.post('/api/c/common/code/channel/list.json', {
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
      axios.post('/api/c/operation-activity/verify/list.json', {
        id: this.id,
        title: this.title,
        auditStatus: this.examineState,
        source: this.platform,
        channel: this.channel,
        operationActivityTypeId: this.activityType,
        productType: this.goods,
        issuer: this.issuer,
        startTime: this.activityTime[0],
        endTime: this.activityTime[1],
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
    handleAdopt (index, row) {
      axios.post('/api/c/operation-activity/verify/verify.json', {
        id: row.id,
        auditStatus: 2
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleNoAdopt (index, row) {
      this.dialogFormVisible = true
      this.dialogForm = row
    },
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/api/c/operation-activity/list/delete.json', {
          id: arrId
        })
        .then(res => {
          if (res.data.code == 'OK') {
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
              message: res.data.message
            })
          }
        })
        .catch(error => {
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
  .nav {
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px
  }
  .btn-box {
    display: flex;
    justify-content: flex-end
  }
  .detail-btn-box {
    display: flex;
    justify-content: center
  }
</style>
