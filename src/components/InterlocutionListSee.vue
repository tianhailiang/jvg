<template>
  <el-dialog title="问答列表查看" :visible.sync="dialogFormVisible" width="80%" :before-close="handleClose">
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        <el-input v-model="formInline.id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        <el-input v-model="formInline.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问题内容：" :label-width="formLabelWidth">
        <el-input v-model="formInline.describe" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问答标签：" :label-width="formLabelWidth">
        <el-input v-model="formInline.tag" size="small"></el-input>
      </el-form-item>
      <el-form-item label="最佳答案：" :label-width="formLabelWidth">
        <el-input v-model="formInline.bestAnswer" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问题创建人：" :label-width="formLabelWidth">
        <el-input v-model="formInline.name" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
        <el-button>确定</el-button>
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
        label="问答id"
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
        prop="title"
        label="问答标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="问题内容"
        width="200" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="bestAnswer"
        label="最佳答案"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="replayNumber"
        label="回复数"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="partakeNumber"
        label="参与人数"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="问题创建人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="time"
        label="问题创建时间"
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
      <el-button type="primary" @click="$emit('update:dialogFormVisible',false)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogFormVisible'],
  data () {
    return {
      formInline: {
        id: '',
        title: '',
        describe: '',
        tag: '',
        bestAnswer: '',
        name: ''
      },
      formLabelWidth: '100px',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        id: '10001',
        title: '美国留学',
        describe: '美国留学非常好啊',
        channel: '语培',
        classification: '托福',
        tag: '时讯，非时讯',
        time: '2018.01.01',
        bestAnswer: '你好啊',
        replayNumber: '100',
        partakeNumber: '200'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        id: '10001',
        title: '美国留学我是科比啊 哈哈哈',
        describe: '美国留学非常好啊',
        channel: '语培',
        classification: '托福',
        tag: '时讯，非时讯',
        time: '2018.01.01',
        bestAnswer: '你好啊',
        replayNumber: '100',
        partakeNumber: '200'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        id: '10001',
        title: '美国留学',
        describe: '美国留学非常好啊',
        channel: '语培',
        classification: '托福',
        tag: '时讯，非时讯',
        time: '2018.01.01',
        bestAnswer: '你好啊',
        replayNumber: '100',
        partakeNumber: '200'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  methods: {
    onSubmit () {

    },
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
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

