<template>
  <div >
    <div class="nav" >
      话题详情（新建/编辑）
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="话题ID">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="话题标题">
        <el-input v-model="formInline.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题频道">
        <el-select v-model="formInline.region" size="small">
          <el-option
          v-for="item in formInline.channelList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话题分类" >
        <el-select v-model="formInline.classification_val" size="small" >
          <el-option
          v-for="item in formInline.classificationList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        {{formInline.timeVal}}
      </el-form-item>
      <el-form-item label="话题内容">
        <el-input v-model="formInline.describe" size="small" type="textarea" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="话题标签">
        <el-input v-model="formInline.tag" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        {{formInline.name}}
      </el-form-item>
      <el-button @click="addWenda">添加问答</el-button>
      <el-button @click="onSubmit">提交</el-button>
      <el-button @click="onSubmit">取消</el-button>
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
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
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
    <!-- 问答列表查看 -->
    <InterlocutionListSee :dialogFormVisible.sync="dialogFormVisible" />
    <!-- 问答详情查看 -->
    <InterlocutionDetailSee :dialogFormVisible1.sync="dialogFormVisible1" />
  </div>
</template>
<script>
import InterlocutionListSee from '@/components/InterlocutionListSee.vue'
import InterlocutionDetailSee from '@/components/InterlocutionDetailSee.vue'
export default {
  name: 'Interlocution',
  data () {
    return {
      formInline: {
        id: '',
        title: '',
        user: '',
        region: '',
        channelList: [{
          value: '选项1',
          label: '语培'
        }, {
          value: '选项2',
          label: '留学'
        }],
        classification_val: '0',
        classificationList: [{
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '托福'
        }, {
          value: '2',
          label: '雅思'
        }],
        timeVal: '2018-8-23',
        describe: '',
        tag: '',
        name: 'thl'
      },
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
      currentPage: 1,
      dialogFormVisible: false,
      dialogFormVisible1: false
    }
  },
  components: {
    InterlocutionListSee, InterlocutionDetailSee
  },
  methods: {
    onSubmit (e) {
      console.log('submit!')
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    addWenda () {
      this.dialogFormVisible = true
    },
    goDetail () {
      this.dialogFormVisible1 = true
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
</style>
