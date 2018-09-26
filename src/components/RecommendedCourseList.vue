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
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
        <el-input v-model="lecturerName" size="small" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="销售状态：">
        <el-select v-model="saleState" size="small" style="width:160px">
          <el-option
          v-for="item in saleStateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="直播状态：">
        <el-select v-model="liveState" size="small" style="width:160px">
          <el-option
          v-for="item in liveStateList"
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
      style="max-width:100%;width: 1035px"
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
            {{scope.row.courseId}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="课程标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="lecturerName"
        label="讲师名称"
        width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="频道"
        width="60" align="center" >
      </el-table-column>
      <el-table-column
        prop="courseClassify"
        label="课程分类"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="classMode"
        label="上课模式"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="teachingModel"
        label="教学模式"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="coursePrice"
        label="课程价格"
        width="60" align="center" >
      </el-table-column>
      <el-table-column
        prop="liveTime"
        label="直播时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="saleState"
        label="销售状态"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="liveState"
        label="直播状态"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="80">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="recommend(scope.$index, scope.row)">推荐</el-button>
       </template>
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
  props: ['dialogFormVisible','dialogForm'],
  data () {
    return {
      courseId: null,
      title: '',
      courseClassify: '0',
      courseClassifyList: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '托福'
      }, {
        value: '2',
        label: 'GRE'
      }],
      classMode: '0',
      classModeList: [{
        value: '0',
        label: '全部'
      },
      {
        value: '1',
        label: '视频直播'
      }, {
        value: '2',
        label: '视频点播'
      }],
      lecturerName: '',
      saleState: '0',
      saleStateList: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '已上架'
      }, {
        value: '2',
        label: '未上架'
      }],
      liveState: '0',
      liveStateList: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '进行中'
      }, {
        value: '2',
        label: '已结束'
      }, {
        value: '3',
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
    dialogForm (newValue, oldValue) {
      this.platform = newValue.platform
      this.channel = newValue.channel
    }
  },
  created () {
    axios.post('common/code/label/list.json', {
      profession: this.channelVal,
      type: 0,
      languages: "zh",
      classes: 1,
      level: 1
    })
    .then(response => {
      this.classificationList = response.data.result
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    onSubmit (e) {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    recommend () {

    },
    batchRecommend () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.courseId}})
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .btn-box {
    display: flex;
    justify-content: flex-end
  }
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>