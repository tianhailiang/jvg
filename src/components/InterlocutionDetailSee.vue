<template>
  <el-dialog title="问答详情查看" :visible.sync="dialogFormVisible1"
  width="80%" :before-close="handleClose"
  custom-class="vue-goods-dialog">
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        {{id}}
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        {{title}}
      </el-form-item>
      <el-form-item label="悬赏状态：" :label-width="formLabelWidth">
        {{statusVal}}
      </el-form-item>
      <el-form-item label="悬赏内容：" :label-width="formLabelWidth">
        {{type}}
      </el-form-item>
      <el-form-item label="发布人ID：" :label-width="formLabelWidth">
        {{userId}}
      </el-form-item>
      <el-form-item label="发布人名称：" :label-width="formLabelWidth">
        {{userName}}
      </el-form-item>
      <el-form-item label="状态：" :label-width="formLabelWidth">
        {{upDownVal}}
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border max-height="300">
      <el-table-column
        type="index"
        label="NO"
        width="55" align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="回复ID"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="details"
        label="回复内容"
        width="303" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="回复人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="回复时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="sourceName"
        label="回复渠道"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="typeVal"
        label="最佳答案"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="answerCount"
        label="二级回复数"
        width="120" align="center" >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px">
    </el-pagination>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogFormVisible1','id'],
  data () {
    return {
      title: '',
      statusVal: '',
      type: '',
      userId: '',
      userName: '',
      upDownVal: '',
      formLabelWidth: '100px',
      tableData: [],
      currentPage: 1,
      total: 0
    }
  },
  watch: {
    id: function(newVal, oldVal) {
      this.id = newVal
      axios.post('/api/c/topic/qalist/detail.json', {
        id: this.id
      })
      .then( response => {
        this.title = response.data.result.title
        this.statusVal = response.data.result.statusVal
        this.type = response.data.result.type
        this.userId = response.data.result.userId
        this.userName = response.data.result.userName
        this.upDownVal = response.data.result.upDownVal
        this.tableData = response.data.result.qaData
        this.total = response.data.result.total
      })
      .catch( error => {
        console.log(error)
      })
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible1',false)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>