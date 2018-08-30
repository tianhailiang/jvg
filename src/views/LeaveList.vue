<template>
  <div>
    <div class="nav">
      留言答疑列表
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="留言内容：" :label-width="formLabelWidth">
        <el-input v-model="formInline.leaveContent" size="small"></el-input>
      </el-form-item>
      <el-form-item label="留言人：" :label-width="formLabelWidth">
        <el-input v-model="formInline.leaveName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="留言时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="formInline.leaveTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回复状态：" :label-width="formLabelWidth">
        <el-select v-model="formInline.replyState" >
          <el-option
            v-for="item in formInline.replyStateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回复人：" :label-width="formLabelWidth">
        <el-input v-model="formInline.replyName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="回复时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="formInline.replyTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
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
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="selection"
        label="全部"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="leaveContent"
        label="留言内容"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="leaveName"
        label="留言人"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="leaveId"
        label="留言人ID"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="leaveTime"
        label="留言时间"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="replyState"
        label="回复状态"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replyName"
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
          <template v-if="scope.row.replyState=='未回复'" >
            <el-button
              size="mini"
              @click="reply(scope.$index, scope.row)">回复</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
          <template v-else >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-box" >
      <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
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
      formInline: {
        leaveContent: '',
        leaveName: '',
        leaveTime: '',
        createTime: '',
        replyState: '0',
        replyStateList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '未回复'
        }, {
          value: '2',
          label: '已回复'
        }],
        replyTime: ''
      },
      formLabelWidth: '100px',
      tableData: [{
        leaveContent: '美国留学美国留学美国留学美国留学美国留学',
        leaveName: 'thl',
        leaveId: '10001',
        leaveNameId: '2222',
        phone: '123456789',
        leaveTime: '2018.01.01',
        replyState: '未回复',
        replyName: 'thl',
        replyTime: '2018.01.01'
      }, {
        leaveContent: '美国留学美国留学美国留学美国留学美国留学',
        leaveName: 'thl',
        leaveId: '10001',
        leaveNameId: '2222',
        phone: '123456789',
        leaveTime: '2018.01.01',
        replyState: '未回复',
        replyName: 'thl',
        replyTime: '2018.01.01'
      }, {
        leaveContent: '美国留学美国留学美国留学美国留学美国留学',
        leaveName: 'thl',
        leaveId: '10001',
        leaveNameId: '2222',
        phone: '123456789',
        leaveTime: '2018.01.01',
        replyState: '未回复',
        replyName: 'thl',
        replyTime: '2018.01.01'
      }],
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      dialogForm: {}
    }
  },
  components: {
    ReplyDetailDialog
  },
  methods: {
    onSubmit () {

    },
    reply (index, row) {
      this.dialogFormVisible = true
      this.dialogForm = row
    },
    handleDelete (index, row) {

    },
    batchDelete () {

    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
  }
</style>

