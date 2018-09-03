<template>
  <div>
    <div class="nav">
      运营活动详请
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="活动ID：">
        {{formInline.activityId}}
      </el-form-item>
      <el-form-item label="活动标题：">
        <el-input v-model="formInline.activityTitle" size="small"></el-input>
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
      <el-form-item label="发行人：">
        {{formInline.issuerName}}
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
      <el-radio v-model="formInline.goodsRadio" label="1">全部商品</el-radio>
      <el-radio v-model="formInline.goodsRadio" label="2">部分商品</el-radio>
      <el-form-item label="参与人数：" v-if="formInline.activityId">
        {{formInline.partakeNumber}}
      </el-form-item>
      <el-form-item>
        <el-button @click="selectGoods" size="small" >选择参与商品</el-button>
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
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-box" >
      <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
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
    <GoodsSelectDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import GoodsSelectDialog from '@/components/GoodsSelectDialog.vue'
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
      },
      tableData: [{
        id: '110001',
        activityName: '美国留学',
        coursePrice: '120￥'
      }, {
        id: '110001',
        activityName: '美国留学',
        coursePrice: '120￥'
      }, {
        id: '110001',
        activityName: '美国留学',
        coursePrice: '120￥' 
      }],
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      dialogForm: ''
    }
  },
  components: {
    GoodsSelectDialog
  },
  methods: {
    selectGoods () {
      this.dialogFormVisible = true
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
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    if (this.$route.params.activityId == 0) {
      this.formInline.activityId = ''
    } else {
      this.formInline.activityId = this.$route.params.id
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
