<template>
  <el-dialog title="课程推荐列表" :visible.sync="dialogFormVisible" :before-close="handleClose" 
  width="80%">
    <el-form :inline="true" :model="formInline">
      <div >
        <el-form-item label="渠道：" >
          {{formInline.platform}}
        </el-form-item>
        <el-form-item label="频道：" >
          {{formInline.channel}}
        </el-form-item>
      </div>
      <el-form-item label="课程ID：" >
        <el-input v-model="formInline.courseId" size="small" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="课程标题：">
        <el-input v-model="formInline.title" size="small" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="课程分类：">
        <el-select v-model="formInline.courseClassify" size="small" style="width:160px">
          <el-option
          v-for="item in formInline.courseClassifyList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上课模式：">
        <el-select v-model="formInline.classMode" size="small" style="width:160px">
          <el-option
          v-for="item in formInline.classModeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师名称："> 
        <el-input v-model="formInline.lecturerName" size="small" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="销售状态：">
        <el-select v-model="formInline.saleState" size="small" style="width:160px">
          <el-option
          v-for="item in formInline.saleStateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="直播状态：">
        <el-select v-model="formInline.liveState" size="small" style="width:160px">
          <el-option
          v-for="item in formInline.liveStateList"
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
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="selection"
        label="全部"
        width="55" >
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
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
    <div class="btn-box" >
      <el-button type="primary" @click="batchRecommend()" >批量推荐</el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:dialogFormVisible',false)">确定</el-button>
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
      formInline: {
        platform: this.dialogForm.platform,
        channel: this.dialogForm.channel,
        courseId: '',
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
        }]
      },
      tableData: [{
        courseId: '100001',
        title: '美国留学1',
        lecturerName: 'thl',
        channel: '语培',
        courseClassify: '托福',
        classMode: '视频直播',
        teachingModel: '1V1',
        coursePrice: '120',
        liveTime: '2018-8-31',
        saleState: '已上架',
        liveState: '未开始'
      }, {
        courseId: '100001',
        title: '美国留学1',
        lecturerName: 'thl',
        channel: '语培',
        courseClassify: '托福',
        classMode: '视频直播',
        teachingModel: '1V1',
        coursePrice: '120',
        liveTime: '2018-8-31',
        saleState: '已上架',
        liveState: '未开始'
      }, {
        courseId: '100001',
        title: '美国留学1',
        lecturerName: 'thl',
        channel: '语培',
        courseClassify: '托福',
        classMode: '视频直播',
        teachingModel: '1V1',
        coursePrice: '120',
        liveTime: '2018-8-31',
        saleState: '已上架',
        liveState: '未开始'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  watch: {
    dialogForm (newValue, oldValue) {
      this.formInline.platform = newValue.platform
      this.formInline.channel = newValue.channel
    }
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