<template>
  <el-dialog title="课程推荐列表" :visible.sync="dialogFormVisible" :before-close="handleClose" 
  width="80%">
    <el-form :inline="true">
      <div >
        <el-form-item label="渠道：" >
          {{dialogForm.platformName}}
        </el-form-item>
        <el-form-item label="频道：" >
          {{dialogForm.channelName}}
        </el-form-item>
      </div>
      <el-form-item label="课程ID：" >
        <el-input v-model="courseId" size="small" style="width:160px" type="number"></el-input>
      </el-form-item>
      <el-form-item label="课程标题：">
        <el-input v-model="title" size="small" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="课程分类：">
        <el-select v-model="courseClassify" size="small" style="width:160px">
          <el-option
          v-for="item in courseClassifyList"
          :key="item.id"
          :label="item.name"
          :value="item.signs">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上课模式：">
        <el-select v-model="classMode" size="small" style="width:160px">
          <el-option
          v-for="item in classModeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师名称："> 
        <el-input v-model="realName" size="small" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="销售状态：">
        已上架
      </el-form-item>
      <el-form-item label="直播状态：">
        <el-select v-model="liveStatus" size="small" style="width:160px">
          <el-option
          v-for="item in liveStatusList"
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
      @selection-change="handleSelectionChange" border
      v-if="total > 0">
      <el-table-column
        type="selection"
        label="全部"
        width="55" align="center">
      </el-table-column>
      <el-table-column
        label="课程ID"
        align="center" width="80">
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
        label="课程标题"
        width="150" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="realName"
        label="讲师名称"
        width="90" align="center">
      </el-table-column>
      <el-table-column
        prop="professionValue"
        label="频道"
        width="60" align="center" >
      </el-table-column>
      <el-table-column
        prop="categorySignsValue"
        label="课程分类"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="couresModelValue"
        label="上课模式"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="teachModelValue"
        label="教学模式"
        width="100" align="center" >
      </el-table-column>
      <el-table-column
        prop="price"
        label="课程价格"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="beginTime"
        label="直播时间"
        width="110" align="center" >
      </el-table-column>
      <el-table-column
        prop="upDownValue"
        label="销售状态"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="liveStatusValue"
        label="直播状态"
        width="80" align="center" >
      </el-table-column>
    </el-table>
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
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">确定</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'recommendedCourseList',
  props: ['dialogFormVisible','dialogForm', 'dialogChannel'],
  data () {
    return {
      courseId: null,
      title: '',
      courseClassify: null,
      courseClassifyList: [],
      classMode: null,
      classModeList: [{
        value: null,
        label: '全部'
      },
      {
        value: 1,
        label: '视频直播'
      }, {
        value: 2,
        label: '视频点播'
      }],
      realName: '',
      liveStatus: null,
      liveStatusList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '进行中'
      }, {
        value: 2,
        label: '已结束'
      }, {
        value: 3,
        label: '未开始'
      }],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  watch: {
    dialogChannel (newValue, oldValue) {
      this.courseClassify = null
      axios.post('/api/c/common/code/label/list.json', {
        profession: this.dialogChannel,
        type: 0,
        languages: "zh",
        classes: 1,
        level: 1
      })
      .then(res => {
        this.courseClassifyList = res.data.result
      })
      .catch(error => {
        console.log(error)
      })
    },
    dialogFormVisible (newValue, oldValue) {
      if (this.dialogFormVisible) {
        this.onSubmit()
      }
    }
  },
  created () {
    
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('/api/c/operation-management/arrposid/course/list.json', {
        id: this.courseId,
        title: this.title,
        categorySigns: this.courseClassify,
        couresModel: this.classMode,
        realName: this.realName,
        liveStatus: this.liveStatus,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.tableData = res.data.result.modelData
          this.total = res.data.result.total
          this.infoTotal = this.total
        }
      })
      .catch(error => {
        console.log(error)
      })
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
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.courseId}})
    },
    sure () {
      let productList = []
      this.multipleSelection.forEach((item, index) => {
        let productObj = {}
        productObj.productId = item.id
        productObj.productName = item.title
        productList.push(productObj)
      })
      if (productList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请至少选中一个'
        })
        return false
      }
      this.$emit('update:dialogFormVisible', false)
      this.$emit('select-list', productList)
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>