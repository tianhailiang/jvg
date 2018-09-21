<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      私信列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="发送人" :label-width="formLabelWidth">
        <el-input v-model="senderName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="接收人">
        <el-input v-model="recipientName" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="demonstration">私信日期</span>
        <el-date-picker
        v-model="timeVal"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发送ID" :label-width="formLabelWidth">
        <el-input v-model="sender" size="small"></el-input>
      </el-form-item>
      <el-form-item label="接收人ID">
        <el-input v-model="recipient" size="small"></el-input>
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
        border>
        <el-table-column
          type="index"
          label="NO"
          width="55" align="center">
        </el-table-column>
        <el-table-column
          prop="sender"
          label="发送人ID"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="senderName"
          label="发送人"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="senderTypeName"
          label="发送人角色"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="recipient"
          label="接收人ID"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="recipientName"
          label="接收人"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="message"
          label="发送内容"
          width="261" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="发送时间"
          width="180" align="center" >
        </el-table-column>
      </el-table>
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
  name:'privateLetterList',
  data () {
    return {
      formLabelWidth: '80px',
      senderName: '',
      recipientName: '',
      timeVal: '',
      sender: null,
      recipient: null,
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
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  methods: {
    onSubmit (e) {
      axios.post('private-letter/list.json', {
        senderName: this.senderName,
        recipientName: this.recipientName,
        createFrom: this.timeVal[0],
        createTo: this.timeVal[1],
        sender: this.sender,
        recipient: this.recipient,
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.onSubmit()
    }
  }
}
</script>
<style scoped >
  .demonstration{
    margin-right:10px;
  }
</style>