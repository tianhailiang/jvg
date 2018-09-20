<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      话题详情（编辑）
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="话题ID：" class="topic-id" :label-width="formLabelWidth">
        {{id}}
      </el-form-item>
      <el-form-item label="话题标题">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题频道">
        <el-select v-model="channelVal" size="small" style="width:180px"
          @change="channelChange">
          <el-option
          v-for="item in channelList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话题分类" >
        <el-select v-model="classificationVal" size="small" style="width:180px"
          @change="classificationChange">
          <el-option
          v-for="item in classificationList"
          :key="item.id"
          :label="item.name"
          :value="item.signs">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        {{createdAt}}
      </el-form-item>
      <el-form-item label="话题内容" style="display:block" :label-width="formLabelWidth">
        <el-input v-model="content" size="small" type="textarea" maxlength="100" style="width:995px"></el-input>
      </el-form-item>
      <el-form-item label="话题标签" :label-width="formLabelWidth">
        <el-select v-model="lableIds[0]" size="small" style="width:180px;margin-right:10px">
          <el-option
          v-for="item in lableIdsList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="lableIds[1]" size="small" style="width:180px">
          <el-option
          v-for="item in lableIdsList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人：">
        {{adminName}}
      </el-form-item>
      <el-button @click="addWenda">添加问答</el-button>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      border v-if="tableData.length > 0">
      <el-table-column
        type="index"
        label="NO"
        width="55" align="center">
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
        width="180" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="bestDetails"
        label="最佳答案"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="answerNum"
        label="回复数"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="joinNum"
        label="参与人数"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="questionUserId"
        label="问题创建人"
        width="100" align="center" >
      </el-table-column>
      <el-table-column
        prop="questionCreatedAt"
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
          @click="handleDelete(scope.$index, scope.row)">x</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="operation-btn-box">
      <el-button @click="sure">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <!-- 问答列表查看 -->
    <InterlocutionListSee :dialogFormVisible.sync="dialogFormVisible" v-on:select-question="onSelectQuestion"/>
    <!-- 问答详情查看 -->
    <InterlocutionDetailSee :dialogFormVisible1.sync="dialogFormVisible1" :id="questionId" />
  </div>
</template>
<script>
import InterlocutionListSee from '@/components/InterlocutionListSee.vue'
import InterlocutionDetailSee from '@/components/InterlocutionDetailSee.vue'
import allAxios from 'axios'
export default {
  name: 'topicDetail',
  data () {
    return {
      formLabelWidth: '80px',
      id: null,
      title: '',
      channelVal: null,
      channelList: [],
      classificationVal: null,
      classificationList: [],
      createdAt: '',
      content: '',
      lableIds: [],
      lableIdsList: [],
      adminName: '',
      adminId: null,
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      questionId: '',
      questionIdArr: []
    }
  },
  watch: {
    tableData (newVal ,oldVal) {
      this.questionIdArr = this.tableData.map((item, index) => {
        return item.questionId
      })
    }
  },
  components: {
    InterlocutionListSee, InterlocutionDetailSee
  },
  methods: {
    channelChange () {
      /* 话题分类 */
      axios.post('common/code/label/list.json', {
        profession: this.channelVal,
        type: 0,
        languages: "zh",
        classes: 1,
        level: 1
      })
      .then( response => {
        this.classificationList = response.data.result
        this.classificationVal = null
        this.lableIdsList = []
        this.lableIds = []
      })
      .catch( error => {
        console.log(error)
      })
    },
    getChannelChange () {
      /* 话题分类 */
      axios.post('common/code/label/list.json', {
        profession: this.channelVal,
        type: 0,
        languages: "zh",
        classes: 1,
        level: 1
      })
      .then( response => {
        this.classificationList = response.data.result
        let classificationId = null
        this.classificationList.map(item => {
          if (this.classificationVal == item.signs) {
            classificationId = item.id
          }
        })
        this.getClassificationChange(classificationId)
      })
      .catch( error => {
        console.log(error)
      })
    },
    classificationChange () {
      let classificationId = null
      this.classificationList.map(item => {
        if (this.classificationVal == item.signs) {
          classificationId = item.id
        }
      })
      /* 话题标签 */
      axios.post('common/code/label/list.json', {
        profession: this.channelVal,
        type: 0,
        languages: "zh",
        classes: 2,
        level: 3,
        parentId: classificationId
      })
      .then(response => {
        this.lableIdsList = response.data.result
        this.lableIds = []
      })
      .catch(error => {
        console.log(error)
      })
    },
    getClassificationChange (parentId) {
      /* 话题标签 */
      axios.post('common/code/label/list.json', {
        profession: this.channelVal,
        type: 0,
        languages: "zh",
        classes: 2,
        level: 3,
        parentId: parentId
      })
      .then(response => {
        this.lableIdsList = response.data.result
      })
      .catch(error => {
        console.log(error)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete (index,row) {
      this.tableData.splice(index, 1)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
    },
    addWenda () {
      this.dialogFormVisible = true
    },
    goDetail (index, row) {
      this.dialogFormVisible1 = true
      this.questionId = row.questionId
    },
    sure () {
      if (!this.title) {
        this.$message({
          type: 'warning',
          message: '话题标题不能为空'
        })
        return false
      }
      if (!this.content) {
        this.$message({
          type: 'warning',
          message: '话题内容不能为空'
        })
        return false
      }
      if (!this.channelVal) {
        this.$message({
          type: 'warning',
          message: '话题频道不能为空'
        })
        return false
      }
      if (!this.classificationVal) {
        this.$message({
          type: 'warning',
          message: '话题分类不能为空'
        })
        return false
      }
      if (this.lableIds.length == 0) {
        this.$message({
          type: 'warning',
          message: '话题标签不能为空'
        })
        return false
      }
      let lableIdsStr = ''
      this.lableIds.forEach((item, index, arr) => {
        if (item) {
          lableIdsStr += item + ','
        }
        if(index == arr.length -1) {
          lableIdsStr = lableIdsStr.substring(0, lableIdsStr.length -1)
        } 
      })  
      /* 修改话题 */
      axios.post('topic/detail/update.json', {
        id: this.id,
        name: this.title,
        content: this.content,
        business: this.channelVal,
        categorySigns: this.classificationVal,
        lableIds: lableIdsStr,
        adminId: this.adminId,
        questionId: this.questionIdArr
      })
      .then( response => {
        if (response.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: response.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      })
      .catch( error => {
        console.log(error)
      })
    },
    cancel () {
      this.$router.push({name: 'topicList'})
    },
    postChannelList () {
      /* 话题频道 */
      return axios.post('common/code/channel/list.json')
    },
    postDetail () {
      /* 话题详情 */
      return axios.post('topic/detail/detail.json',{
        id: this.$route.params.id,
        languages: 'zh'
      })
    },
    onSelectQuestion ($event) {
      this.tableData.unshift(...$event)
      this.tableData = [...new Set(this.tableData)] /* 数组去重 */
    }
  },
  mounted () {
    this.id = Number(this.$route.params.id)
    /* 并发请求 */
    allAxios.all([this.postChannelList(), this.postDetail()])
      .then(allAxios.spread((res1, res2) => {
        this.channelList = res1.data.result
        this.title = res2.data.result.name
        this.channelVal = res2.data.result.business
        this.classificationVal = res2.data.result.categorySigns
        this.lableIds = res2.data.result.lableIds.split(',').map(item => {
          return Number(item)
        })
        this.createdAt = res2.data.result.createdAt
        this.content = res2.data.result.content
        this.adminName = res2.data.result.adminName
        this.adminId = res2.data.result.adminId
        this.tableData = res2.data.result.qaData || []
        this.getChannelChange()
      }))
  }
}
</script>
<style scoped>
  .operation-btn-box {
    display: flex;
    justify-content: center;
    margin-top: 10px
  }
</style>
<style>
  .topic-id .el-form-item__label {
    padding-right: 0
  }
</style>
