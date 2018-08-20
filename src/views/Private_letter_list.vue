<template>
  <div>
    <div class="nav" >
      私信列表
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="发送人">
        <el-input v-model="formInline.sendPerson" size="small"></el-input>
      </el-form-item>
      <el-form-item label="接收人">
        <el-input v-model="formInline.receivePerson" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="demonstration">私信日期</span>
        <el-date-picker
        v-model="formInline.timeVal"
        type="datetimerange"
        :picker-options="pickerOptions2"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发送ID">
        <el-input v-model="formInline.sendId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="接收人ID">
        <el-input v-model="formInline.receiveId" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-width:100%;width: 1035px"
      border>
      <el-table-column
        type="index"
        label="NO"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="sendId"
        label="发送人ID"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="sendPerson"
        label="发送人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="sendRole"
        label="发送人角色"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="receiveId"
        label="接收人ID"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="receivePerson"
        label="接收人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="sendContent"
        label="发送内容"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="sendtime"
        label="发送时间"
        width="120" align="center" >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name:'Private_letter_list',
  data () {
    return {
      formInline : {
        sendPerson: '',
        receivePerson: '',
        timeVal: '',
        sendId: '',
        receiveId: ''
      },
      pickerOptions2: {
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
      tableData: [{
        sendId: '15242755275',
        sendPerson: 'thl',
        sendRole: '讲师',
        receiveId: '15242755275',
        receivePerson: '海盗',
        sendContent: 'For guide and recipes on how to configure / customize this project',
        sendtime: '2018-8-20 00:00:00'
      }, {
        sendId: '15242755275',
        sendPerson: 'thl',
        sendRole: '讲师',
        receiveId: '15242755275',
        receivePerson: '海盗',
        sendContent: 'For guide and recipes on how to configure / customize this project',
        sendtime: '2018-8-20 00:00:00'
      }, {
        sendId: '15242755275',
        sendPerson: 'thl',
        sendRole: '讲师',
        receiveId: '15242755275',
        receivePerson: '海盗',
        sendContent: 'For guide and recipes on how to configure / customize this project',
        sendtime: '2018-8-20 00:00:00'
      }],
      currentPage: 1
    }
  },
  methods: {
    onSubmit (e) {
      console.log('submit!')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped >
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .demo-form-inline{
    border:1px solid #dcdcdc;
  }
  .demonstration{
    margin-right:10px;
  }
</style>