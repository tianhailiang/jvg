<template>
  <div>
    <div class="nav">
      运营活动审核
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="活动ID：">
        <el-input v-model="formInline.activityId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="活动标题：">
        <el-input v-model="formInline.activityTitle" size="small"></el-input>
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-select v-model="formInline.examineState" >
          <el-option
            v-for="item in formInline.examineStateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="formInline.platform" >
          <el-option
            v-for="item in formInline.platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="formInline.channel" >
          <el-option
            v-for="item in formInline.channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动状态：" v-if="formInline.activityId">
        <span v-if="formInline.state == 1">进行中</span>
        <span v-else-if="formInline.state == 2">已结束</span>
      </el-form-item>
      <el-form-item label="发行方：">
        {{formInline.issuer}}
      </el-form-item>
      <el-form-item label="有效期：">
        <el-date-picker
          v-model="formInline.activityTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动类型：">
        <el-select v-model="formInline.activityType" >
          <el-option
            v-for="item in formInline.activityTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参与商品：">
        <el-select v-model="formInline.goods" >
          <el-option
            v-for="item in formInline.goodsList"
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
        label="课程名称"
        width="200" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="platform"
        label="渠道"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="频道"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="activityType"
        label="活动类型"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop=""
        label="活动价格/折扣"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="goods"
        label="参与商品"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="issuer"
        label="发行方"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="examineState"
        label="审核状态"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="activityTime"
        label="活动有效期"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleAdopt(scope.$index, scope.row)">通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-box" >
      <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
      <el-button type="danger" @click="batchFrozen()" >批量冻结</el-button>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px;height:50px">
    </el-pagination>
    <div class="detail-btn-box">
      <el-button >保存</el-button>
      <el-button >提交</el-button>
      <el-button >取消</el-button>
    </div>
    <!-- 商品选择弹框 -->
    <NotThroughDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import NotThroughDialog from '@/components/NotThroughDialog.vue'
export default {
  name: 'operationalActivityDetail',
  data () {
    return {
      formInline: {
        activityId: '',
        activityTitle: '',
        platform: '0',
        platformList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: 'APP'
        }, {
          value: '2',
          label: 'WAP'
        }, {
          value: '3',
          label: 'PC'
        }],
        channel: '0',
        channelList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '语培'
        }, {
          value: '2',
          label: '留学'
        }],
        state: '1',
        issuer: '',
        issuerName: '',
        activityTime: [],
        activityType: '0',
        activityTypeList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '现金优惠'
        }, {
          value: '2',
          label: '组合优惠'
        }],
        goods: '0',
        goodsList: [{
          value: '0',
          label: '课程'
        }, {
          value: '1',
          label: '出版物'
        }, {
          value: '2',
          label: '留学'
        }],
        goodsRadio: '',
        examineState: '0',
        examineState: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '已通过'
        }, {
          value: '3',
          label: '不通过'
        }]
      },
      tableData: [{
        id: '110001',
        activityName: '美国留学',
        platform: 'PC',
        channel: '语培',
        activityType: '现金优惠',
        goods: '课程',
        issuer: '平台管理员',
        examineState: '已通过',
        activityTime: '2018-9-3'
      }, {
        id: '110001',
        activityName: '美国留学',
        platform: 'PC',
        channel: '语培',
        activityType: '现金优惠',
        goods: '课程',
        issuer: '平台管理员',
        examineState: '已通过',
        activityTime: '2018-9-3'
      }, {
        id: '110001',
        activityName: '美国留学',
        platform: 'PC',
        channel: '语培',
        activityType: '现金优惠',
        goods: '课程',
        issuer: '平台管理员',
        examineState: '已通过',
        activityTime: '2018-9-3' 
      }],
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      dialogForm: ''
    }
  },
  components: {
    NotThroughDialog
  },
  methods: {
    onSubmit () {

    },
    handleAdopt (index, row) {
      
    },
    handleDelete (index, row) {
      this.dialogFormVisible = true
      this.dialogForm = row
    },
    batchDelete () {

    },
    batchFrozen () {

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

<style scoped>
  .nav {
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px
  }
  .btn-box {
    display: flex;
    justify-content: flex-end
  }
  .detail-btn-box {
    display: flex;
    justify-content: center
  }
</style>
