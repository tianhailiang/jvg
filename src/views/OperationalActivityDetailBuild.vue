<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      运营活动详请（新建）
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="活动标题：" :label-width="formLabelWidth">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="platform" size="small">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="channel" size="small">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动状态：">
        <el-select v-model="state" size="small">
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="activityTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" size="small"
          style="width:421px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动类型：">
        <el-select v-model="activityType" size="small">
          <el-option
            v-for="item in activityTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="固定金额：" v-if="activityType == 2 || activityType == 1">
        <el-input v-model="discountAmount" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="固定比例：" v-if="activityType == 3">
        <el-input v-model="ratio" size="small"></el-input>
      </el-form-item>
      <el-form-item label="参与商品：" :label-width="formLabelWidth">
        <el-select v-model="goods" size="small">
          <el-option
            v-for="item in goodsList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="selectGoods" size="small" >选择参与商品</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange" border
      show-summary>
      <el-table-column
        type="index"
        label="NO"
        width="55" align="center">
      </el-table-column>
      <el-table-column
        label="课程ID"
        align="center" width="120">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="goDetail(scope.$index, scope.row)">
            {{scope.row.id}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="activityName"
        label="课程名称（标题）"
        width="640" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="coursePrice"
        label="课程价格"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">X</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="detail-btn-box">
      <el-button type="primary" @click="sure">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <!-- 商品选择弹框 -->
    <GoodsSelectDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import GoodsSelectDialog from '@/components/GoodsSelectDialog.vue'
export default {
  name: 'operationalActivityDetailBuild',
  data () {
    return {
      formLabelWidth: '90px',
      title: '',
      platform: null,
      platformList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: 'APP'
      }, {
        value: 2,
        label: 'WAP'
      }, {
        value: 3,
        label: 'PC'
      }],
      channel: null,
      channelList: [],
      state: null,
      stateList: [{
        value: 1,
        label: '未开始'
      }, {
        value: 2,
        label: '进行中'
      }, {
        value: 3,
        label: '已结束'
      }],
      activityTime: [],
      activityType: null,
      activityTypeList: [{
        value: 1,
        label: '组合营销'
      }, {
        value: 2,
        label: '现金优惠'
      }, {
        value: 3,
        label: '现金折扣'
      }],
      goods: 1,
      goodsList: [{
        value: 1,
        label: '课程'
      }, {
        value: 2,
        label: '出版物'
      }, {
        value: 3,
        label: '留学服务'
      }],
      discountAmount: null,
      ratio: null,
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      dialogForm: ''
    }
  },
  components: {
    GoodsSelectDialog
  },
  created () {
    axios.post('common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    selectGoods () {
      this.dialogFormVisible = true
      this.dialogForm = this.goods
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
    sure () {
      // axios.post('operation-activity/detail/create.json', {
      //   title: this.activityName,
      //   activityStatus: this.state,
      //   source: this.platform,
      //   channel: this.channel,
      //   startTime: this.activityTime[0],
      //   endTime: this.activityTime[1],
      //   pageNo: this.currentPage,
      //   pageSize: this.pageSize
      // })
      // .then(res => {
      //   this.tableData = res.data.result.modelData
      //   this.total = res.data.result.total
      //   this.infoTotal = this.total
      // })
      // .catch(error => {
      //   console.log(error);
      // })
    },
    cancel () {

    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .detail-btn-box {
    display: flex;
    justify-content: center;
    margin-top:10px
  }
</style>
