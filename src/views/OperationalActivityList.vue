<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      运营活动列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="活动名称：" :label-width="formLabelWidth">
        <el-input v-model="activityName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="state" size="small">
          <el-option
            v-for="item in stateList"
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
      <el-form-item label="所属频道：">
        <el-select v-model="channel" size="small">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="activityTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
        <el-button @click="createActivity" size="small" >创建活动</el-button>
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
          prop="title"
          label="活动名称"
          width="340" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="活动开始时间"
          width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="activityStatusVal"
          label="状态"
          width="120" align="center">
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
          label="操作"
          align="center" width="160" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
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
  name: 'operationalActivityList',
  data () {
    return {
      formLabelWidth: '90px',
      activityName: '',
      state: null,
      stateList: [{
        value: 1,
        label: '未开始'
      }, {
        value: 2,
        label: '进行中'
      }, {
        value: 3,
        label: '已结束'
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
      activityTime: [],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1,
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
      if (!this.activityTime) {
        this.activityTime = []
      }
      axios.post('/api/c/operation-activity/list/list.json', {
        title: this.activityName,
        activityStatus: this.state,
        source: this.platform,
        channel: this.channel,
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
    createActivity () {
      this.$router.push({name: 'operationalActivityDetailBuild'})
    },
    handleEditor (index, row) {
      this.$router.push({name: 'operationalActivityDetail', params: {id: row.id}})
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
  
</style>