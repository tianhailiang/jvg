<template>
  <section class="order-refund" style="overflow:hidden; margin-left:260px;">
    <h3>订单退款列表</h3>
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
      <el-col :span="7"><div class="grid-content bg-purple">
          <el-form-item label="订单号">
              <el-input type="text" v-model="orderData.snId"></el-input>
          </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="卖家名称">
            <el-input type="text" v-model="orderData.shopUserNm"></el-input>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="买家名称">
            <el-input type="text" v-model="orderData.userNm"></el-input>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="退款状态">
            <el-select v-model="orderData.status">
                <el-option
                :label="item.label" 
                :value="item.value"
                v-for="(item, index) in quitmoney"></el-option>
            </el-select>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="购买渠道">
            <el-select v-model="orderData.source">
                <el-option 
                :label="item.label"  
                :value="item.value" v-for="(item, index) in buyData"></el-option>
            </el-select>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="订单类型">
            <el-select v-model="orderData.orderType">
                <el-option
                :label="items.label"
                :value="items.value"
                v-for="(items, index) in orderlist"></el-option>
            </el-select>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
          <el-form-item label="支付方式">
                <el-select v-model="orderData.payType">
                    <el-option 
                    :label="items.label"  
                    :value="items.value"
                    v-for="(items, index) in paydata"></el-option>
                </el-select>
          </el-form-item></div>
    </el-col>
    <el-col :span="19"><div class="grid-content bg-purple">
            <el-form-item label="下单时间">
                <div class="time-group">
                    <el-col :span="8" style="margin-right:50px;">
                        <el-date-picker
                        v-model="orderData.orderCreatedAtFrom"
                        type="datetime"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="10">
                        <el-date-picker
                        v-model="orderData.orderCreatedAtTo"
                        type="datetime"
                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </div>
            </el-form-item>
            <div class="search-area">
                <el-button type="primary" size="medium">搜索</el-button>
              </div>
          </div></el-col>
      </el-form>
    </el-row>
    <!--  -->
    <el-table :data=tableData border v-loading="loading" element-loading-text="努力奔跑中...">
        <el-table-column prop="id" label="NO" width="50" align="center"></el-table-column>
        <el-table-column prop="refundSnid" label="退款单号" width="190" align="center">
            <template slot-scope="scope">
                <el-button size="small" @click="hanldclick(scope.$index, scope.row)">{{scope.row.refundSnid}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="snid" label="订单号" width="110" align="center"></el-table-column>
        <el-table-column prop="shopUserName" label="卖家名称" width="110" align="center"></el-table-column>
        <el-table-column prop="userName" label="买家名称" width="110" align="center"></el-table-column>
        <el-table-column prop="returnName" label="退款理由" width="110" align="center"></el-table-column>
        <el-table-column prop="status" label="退款状态" width="110" align="center"></el-table-column>
        <el-table-column prop="payType" label="支付方式" width="60" align="center"></el-table-column>
        <el-table-column prop="source" label="购买渠道" width="110" align="center"></el-table-column>
        <el-table-column label="操作" width="130" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" style="margin-bottom:5px;">同意</el-button>
                <el-button size="mini" type="danger" style="margin-left:0;">拒绝</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="row-container" v-if="tableData.length" style="margin:30px 0;">
      <el-pagination 
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="20"
        :total="total"
        :current-page="pageNo"
        :page-sizes="[20, 30, 40, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" type="primary" style="margin-left:200px">导出</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      tableData: [],
      ordertype: '',
      loading: false,
      total: null,
      orderData:{
        orderCreatedAtTo: '',
        orderCreatedAtFrom: '',
        shopUserNm: '',
        userNm: '',
        payType: '',
        snId: '',
        status: '',
        orderType: ''
      },
      paydata: [
        {label: '支付宝', value: '1'},
        {label: '微信', value: '2'},
        {label: '银联', value: '3'},
        {label: '全部', value: '4'}
      ],
      orderlist: [
        {label: '全部', value: '1'},
        {label: '课程订单', value: '2'},
        {label: '出版物订单', value: '3'},
        {label: 'VIP', value: '4'},
        {label: '打赏订单', value: '5'},
        {label: '悬赏订单', value: '6'}
      ],
      quitmoney: [
        {label: '申请退款', value: '1'},
        {label: '同意退款', value: '2'},
        {label: '出版物订单', value: '3'},
        {label: '确认退款', value: '4'},
        {label: '完成', value: '5'},
        {label: '拒绝退款', value: '6'}
      ],
      buy: '',
      pageSize: 20,
      pageNo: 0,
      buyData: [
        {label: '全部', value: '1'},
        {label: 'APP', value: '2'},
        {label: 'PC', value: '3'},
        {label: 'WAP', value: '4'},
      ]
    }
  },
  created() {
    this.searchOrder()
  },
  methods: {
    searchOrder() {
      this.loading = true
      axios.post(this.$store.state.api.searchOrder, {
        // snId: '1100315361307879485',
        // shopUserName: '卖家名称',
        // userName: '买家名称',
        // status:4,
        // createdAtFrom:"2018-01-11 11:11:11",    
        // createdAtTo:'2018-11-12 11:11:11',
        // source:1,
        // orderType:1,
        // payType:1,
        // channel: 1,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        orderCreatedAtTo: this.orderData.orderCreatedAtTo,
        orderCreatedAtFrom: this.orderData.orderCreatedAtFrom,
        shopUserNm: this.orderData.shopUserNm,
        userNm: this.orderData.userNm,
        payType: this.orderData.payType,
        snId: this.orderData.snId,
        status: this.orderData.status,
        orderType: this.orderData.orderType
      }).then(res => {
        console.log(res)
        this.tableData = res.data.result.modelData
        this.total = res.data.result.total
        this.loading = false
      }).catch(error => {

      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      
      this.pageNo = val
      this.searchOrder()
    },
    hanldclick(index, row) {
      this.$router.push({
        name: 'orederRefundDetail', 
        params: {
          id:row.id
        }
      })
    },
    removeactive() {
      
    }
  }
}
</script>
<style>
.order-refund{ position:relative;}
.order-refund .el-form-item--mini .el-form-item__content{position: absolute !important;}
.row-container{display: flex;justify-content:center;}
.order-refund h3{ height: 30px; line-height: 30px; border-bottom:1px solid #dcdfe6; margin-bottom:10px; font-weight: bold;}
.search-area{ display: inline-block; position:absolute;right: 265px;top: 150px;}
</style>