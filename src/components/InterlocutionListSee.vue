<template>
  <el-dialog title="问答列表查看" :visible.sync="dialogFormVisible" width="80%" :before-close="handleClose">
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="问答ID：" :label-width="formLabelWidth">
        <el-input v-model="id" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问题内容：" :label-width="formLabelWidth">
        <el-input v-model="details" size="small"></el-input>
      </el-form-item>
      <el-form-item label="问答标签：" :label-width="formLabelWidth">
        <el-select v-model="lableIds1" size="small" style="width:130px;margin-right:10px">
          <el-option
          v-for="item in lableIdsList"
          :key="item.id"
          :label="item.name"
          :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="lableIds2" size="small" style="width:130px">
          <el-option
          v-for="item in lableIdsList"
          :key="item.id"
          :label="item.name"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最佳答案：" :label-width="formLabelWidth">
        <el-select v-model="answerType" size="small" placeholder="请选择" style="width:130px">
          <el-option
            v-for="item in answerTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题创建人：" :label-width="formLabelWidth">
        <el-select v-model="userId" filterable placeholder="请选择" size="small">
          <el-option
            v-for="item in userIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
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
        label="问答id"
        width="80" align="center" >
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="goDetail(scope.$index, scope.row)">
            {{scope.row.questionId}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="questionTitle"
        label="问答标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="questionDetails"
        label="问题内容"
        width="183" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="bestDetails"
        label="最佳答案"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="answerNum"
        label="回复数"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="joinNum"
        label="参与人数"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="questionUserName"
        label="问题创建人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="questionCreatedAt"
        label="问题创建时间"
        width="120" align="center" >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px"
      v-if="total >0">
    </el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
      <el-button type="primary" @click="sure()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogFormVisible'],
  data () {
    return {
      id: null,
      title: null,
      details: null,
      lableIds1: null,
      lableIds2: null,
      lableIdsList: [{
        value: 0,
        name: '美国',
        id: 0
      }, {
        value: 1,
        name: '日本',
        id: 1
      }],
      answerType: null,
      answerTypeList: [{
        value: 0,
        name: '否'
      }, {
        value: 1,
        name: '是'
      }],
      userId: null,
      userIdList: [],
      formLabelWidth: '100px',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      total: 0,
      pageSize: 20
    }
  },
  methods: {
    onSubmit () {
      let lableIds = null;
      if (this.lableIds1 || this.lableIds2) {
        lableIds = this.lableIds1 +','+ this.lableIds2
      }
      axios.post('topic/qalist/list.json', {
        id: this.id,
        title: this.title,
        details: this.details,
        lableIds: lableIds,
        answerType: this.answerType,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(response => {
        if (response.data.code == 'OK') {
          this.tableData = response.data.result.qaData
          this.total = response.data.result.total
        }
      })
      .catch(error => {
        console.log(error)
      })
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
      this.currentPage = val
    },
    sure () {
      let questionId = []
      this.multipleSelection.forEach((item, index) => {
        questionId.push(item.questionId)
      })
      if (questionId.length == 0) {
        this.$message({
          type: 'warning',
          message: '请至少选中一个'
        })
        return false
      }
      axios.post('topic/qalist/create.json', {
        topicId: this.$route.params.id,
        questionId: questionId
      })
      .then( response => {
        if (response.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: response.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },2000)
        }
      })
      .catch( error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.onSubmit()
  }
}
</script>

<style>

</style>

