<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      运营活动详请（编辑）
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="活动ID：" :label-width="formLabelWidth">
        {{$route.params.id}}
      </el-form-item>
      <el-form-item label="活动标题：">
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
        {{activityStatusVal}}
      </el-form-item>
      <el-form-item label="发行方：" :label-width="formLabelWidth">
        {{issuerVal}}
      </el-form-item>
      <el-form-item label="发行人：">
        {{userName}}
      </el-form-item>
      <el-form-item label="有效期：">
        <el-date-picker
          v-model="activityTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" size="small"
          style="width:421px" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动类型：">
        <el-select v-model="activityType" >
          <el-option
            v-for="item in activityTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="固定金额：" :label-width="formLabelWidth"
        v-if="activityType == 2 || activityType == 1">
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
            {{scope.row.productId}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="课程名称（标题）"
        width="640" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="productPrice"
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
    <GoodsSelectDialog :dialogFormVisible.sync="dialogFormVisible"
      :dialogForm="dialogForm"
      v-on:select-question="onSelectQuestion" />
  </div>
</template>

<script>
import GoodsSelectDialog from '@/components/GoodsSelectDialog.vue'
export default {
  name: 'operationalActivityDetail',
  data () {
    return {
      formLabelWidth: '90px',
      title: '',
      platform: null,
      platformList: [{
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
      activityStatusVal: null,
      issuer: null,
      issuerVal: null,
      userName: '',
      activityTime: '',
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
      discountAmount: 0,
      ratio: 0,
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      dialogForm: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  components: {
    GoodsSelectDialog
  },
  created () {
    axios.post('/api/c/common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      axios.post('/api/c/operation-activity/detail/detail.json', {
        id: this.$route.params.id
      })
      .then(res => {
        this.title = res.data.result.title
        this.platform = res.data.result.source
        this.channel = res.data.result.channel
        this.activityStatusVal = res.data.result.activityStatusVal
        this.issuer = res.data.result.issuer
        this.issuerVal = res.data.result.issuerVal
        this.activityTime = [res.data.result.startTime, res.data.result.endTime]
        this.activityType = res.data.result.operationActivityTypeId
        this.discountAmount = res.data.result.discountAmount
        this.ratio = res.data.result.ratio
        this.productType = res.data.result.productType
        this.tableData = res.data.result.productData
      })
      .catch(error => {
        console.log(error);
      })
    },
    selectGoods () {
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      this.tableData.splice(index, 1)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    onSelectQuestion ($event) {
      /* 先初始化去重 */
      this.tableData.forEach((item, index, arr) => {
        $event.forEach((eitem, eindex, earr) => {
          if (eitem.productId === item.productId) {
            earr.splice(eindex, 1)
          }
        })
      })
      this.tableData = [...$event, ...this.tableData]
    },
    sure () {
      if (!this.title) {
        this.$message({
          type: 'warning',
          message: '活动标题不能为空'
        })
        return false
      }
      if (!this.activityTime) {
        this.$message({
          type: 'warning',
          message: '有效期不能为空'
        })
        return false
      } 
      axios.post('/api/c/operation-activity/detail/update.json', {
        id: this.$route.params.id,
        title: this.title,
        source: this.platform,
        channel: this.channel,
        issuer: this.issuer,
        startTime: this.activityTime[0],
        endTime: this.activityTime[1],
        operationActivityTypeId: this.activityType,
        discountAmount: this.discountAmount,
        ratio: this.ratio,
        productType: this.goods,
        productData: this.tableData,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if(res.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    cancel () {
      this.$router.push({name: 'operational'})
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .detail-btn-box {
    display: flex;
    justify-content: center
  }
</style>
