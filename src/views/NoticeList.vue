<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      通知列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="id" size="small" type="number" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item label="内容关键词">
        <el-input v-model="contents" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="adminName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="createTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small" style="width:332px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="频道" :label-width="formLabelWidth">
        <el-select v-model="channel" style="width:150px">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知范围">
        <el-select v-model="rolesId" style="width:150px">
          <el-option
            v-for="item in rolesIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型">
        <el-select v-model="type" style="width:150px">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发送时间">
        <el-date-picker
          v-model="sendTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right" size="small" style="width:332px">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="submit-box">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
        <el-button @click="createNotice" size="small" >创建通知</el-button>
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
          label="通知ID"
          width="80" align="center" >
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="goDetail(scope.$index, scope.row)">
              {{scope.row.id}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="contents"
          label="通知内容"
          width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="频道"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="rolesName"
          label="通知范围"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="消息类型"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="创建人"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="isAutoName"
          label="自动"
          width="80" align="center" >
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="发送时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="goDetail(scope.$index, scope.row)">查看</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'noticeList',
  data () {
    return {
      formLabelWidth: '60px',
      id: '',
      contents: '',
      adminName: '',
      createTime: [],
      channel: null,
      channelList: [],
      rolesId: null,
      rolesIdList:[{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '部分用户'
      }, {
        value: 3,
        label: 'VIP'
      }, {
        value: 4,
        label: '会员'
      }],
      type: null,
      typeList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '公告'
      }, {
        value: 2,
        label: '广告'
      }, {
        value: 3,
        label: '审核'
      }, {
        value: 4,
        label: '运营'
      }],
      sendTime: [],
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
      },
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
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
    onSubmit () {
      axios.post('operation-management/notice/list.json', {
        id: this.id,
        contents: this.contents,
        adminName: this.adminName,
        createFrom: this.createTime[0],
        createTo: this.createTime[1],
        channel: this.channel,
        rolesId: this.rolesId,
        type: this.type,
        startFrom: this.sendTime[0],
        startTo: this.sendTime[1],
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
    createNotice () {
      this.$router.push({name: 'noticeDetailBuild'})
    },
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('operation-management/notice/delete.json', {
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
      this.$router.push({name: 'noticeDetail', params: {id: row.id}})
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .submit-box {
    display: flex;
    justify-content: flex-end
  }
</style>

