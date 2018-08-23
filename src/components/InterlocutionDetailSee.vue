<template>
  <el-dialog title="问答详情查看" :visible.sync="dialogFormVisible1" width="80%" :before-close="handleClose">
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        {{formInline.title}}
      </el-form-item>
      <el-form-item label="悬赏状态：" :label-width="formLabelWidth">
        {{formInline.rewardState}}
      </el-form-item>
      <el-form-item label="悬赏内容：" :label-width="formLabelWidth">
        {{formInline.rewardContent}}
      </el-form-item>
      <el-form-item label="发布人ID：" :label-width="formLabelWidth">
        {{formInline.userId}}
      </el-form-item>
      <el-form-item label="发布人名称：" :label-width="formLabelWidth">
        {{formInline.userName}}
      </el-form-item>
      <el-form-item label="状态：" :label-width="formLabelWidth">
        {{formInline.state}}
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
        prop="replayId"
        label="回复ID"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayContent"
        label="回复内容"
        width="200" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="replayName"
        label="回复人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayTime"
        label="回复时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayChannel"
        label="回复渠道"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="bestAnswer"
        label="最佳答案"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayTwoNumber"
        label="二级回复数"
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
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogFormVisible1'],
  data () {
    return {
      formInline: {
        id: '',
        title: '',
        rewardState: '悬赏中',
        rewardContent: '积分500',
        userId: '15242755275',
        userName: 'thl'
      },
      formLabelWidth: '100px',
      tableData: [{
        replayId: '10001',
        replayContent: '美国留学非常好啊',
        replayName: 'thl',
        replayTime: '2018-8-23',
        replayChannel: 'PC',
        bestAnswer: '是',
        replayTwoNumber: '10'
      }, {
        replayId: '10001',
        replayContent: '美国留学非常好啊',
        replayName: 'thl',
        replayTime: '2018-8-23',
        replayChannel: 'PC',
        bestAnswer: '是',
        replayTwoNumber: '10'
      }, {
        replayId: '10001',
        replayContent: '美国留学非常好啊',
        replayName: 'thl',
        replayTime: '2018-8-23',
        replayChannel: 'PC',
        bestAnswer: '是',
        replayTwoNumber: '10'
      }],
      currentPage: 1
    }
  },
  methods: {
    onSubmit () {

    },
    handleClose (done) {
      this.$emit('update:dialogFormVisible1',false)
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

<style>

</style>