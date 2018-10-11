<template>
    <section class="order-details" style="overflow:hidden;margin-left:260px;">
      <div class="order-details-item">
          <h3>订单基本信息</h3>
      </div>
      <div class="order-details-item">
        <el-row :gutter="20" class="from-group">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small" style="overflow:hidden;">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="订单编号">
                    <el-input type="text" :disabled="true" v-model="snId"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单状态">
                  <el-input type="text" :disabled="true" v-model="status"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="下单时间">
                  <el-input type="text" :disabled="true" v-model="createdAt"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="卖家ID">
                  <el-input type="text" :disabled="true" v-model="shopUserId"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="卖家名称">
                  <el-input type="text" :disabled="true" v-model="shopUserNm"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="买家ID">
                    <el-input type="text" :disabled="true" v-model="userId"></el-input>
                </el-form-item>
              </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="买家名称">
                    <el-input type="text" :disabled="true" v-model="userName"></el-input>
                </el-form-item>
              </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单类型">
                  <el-input type="text" :disabled="true" v-model="type"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单频道">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="订单总额">
                    <el-input type="text" :disabled="true" v-model="totalPrice"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="购买渠道">
                      <el-input type="text" :disabled="true" v-model="source"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="支付方式">
                        <el-input type="text" :disabled="true" v-model="payType"></el-input>
                    </el-form-item>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <el-form-item label="支付时间">
                          <el-input type="text" :disabled="true" v-model="payTime"></el-input>
                      </el-form-item>
                    </div></el-col>
                    <el-col :span="6" class="pay-warter">
                        <div class="grid-content bg-purple">
                        <el-form-item label="支付流水号">
                            <el-input type="text" :disabled="true" v-model="tradeNo"></el-input>
                        </el-form-item>
                    </div></el-col>
            </el-form>
            <el-row :gutter="20" style="padding-left:10px;" class="order-refund">
              <h3>订单退款详情</h3>
              <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
                <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="退款单号">
                  <el-input type="text" :disabled="true"></el-input>
                  </el-form-item> </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="退款状态">
                  <el-input type="text" :disabled="true" v-model="status"></el-input>
                  </el-form-item> </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="退款理由">
                  <el-input type="text" :disabled="true"></el-input>
                  </el-form-item> </div>
                </el-col>
              </el-form>
              <div class="btn-plane-group">
                  <el-button type="primary" size="medium">同意</el-button>
                  <el-button type="primary" size="medium">拒绝</el-button>
              </div>
            </el-row>
          </el-row>
      </div>
      <div class="order-details-item" style="margin-bottom:12px;">
          <h3>商品信息</h3>
          <el-table :data="priceData" border size="medium">
            <el-table-column prop="date" label="商品ID" width="200" align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="222" align="center"></el-table-column>
            <el-table-column prop="price" label="单价" width="215" align="center"></el-table-column>
            <el-table-column prop="number" label="数量" width="215" align="center"></el-table-column>
            <el-table-column prop="totalprice" label="小计金额" width="215" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="order-details-item order-details-item_2">
          <h3>收货人信息</h3>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="收货人姓名">
              <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="收货人联系方式">
                <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="收货人地址">
                <el-input type="text" :disabled="true" style="min-width:495px;"></el-input>
            </el-form-item>
        </el-form>
      </div>
      <div class="order-details-item">
          <h3>发票信息</h3>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
              <el-form-item label="是否要求发票">
                <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="发票是否邮寄">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
          </el-form>
      </div>
      <div class="order-details-item">
          <h3>优惠与积分</h3>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="是否参与优惠">
                    <el-input type="text" :disabled="true" size="small"></el-input>
                </el-form-item>
                <el-form-item label="优惠内容">
                    <el-table :data="priceData" border size="medium">
                        <el-table-column prop="date" label="ID" width="120" align="center"></el-table-column>
                        <el-table-column prop="name" label="类型" width="160" align="center"></el-table-column>
                        <el-table-column prop="price" label="抵扣金额" width="160" align="center"></el-table-column>
                        <el-table-column prop="number" label="折扣比例" width="160" align="center"></el-table-column>
                    </el-table>
                </el-form-item>
                <br>
                <el-form-item label="使用积分">
                    <el-input type="text" :disabled="true" size="small"></el-input>
                </el-form-item>
            </el-form>
      </div>
      <div class="lines"></div>
      <div class="price-content">
        <ul>
          <li>XX件商品,总金额：<strong>00.00元</strong></li>
          <li>运费：100元</li>
          <li>优惠金额：1000元</li>
          <li>积分：2000</li>
          <li><strong>实际支付金额：</strong>10000元</li>
        </ul>
      </div>
    </section>
  </template>
<script>
import {searchorderdetails} from '@/api/url.js'
export default {
  name: 'orederRefundDetail',
  data () {
    return {
      formInline: {},
      status: '',
      priceData: [],
      // createdAt: '',
      payType: '',
      userId:'',
      shopUserName: '',
      shopUserId: '',
      userName: '',
      payTime: '',
      tradeNo: '',
      source: '',
      totalPrice: '',
      type: '',
      shopUserNm: '',
      snId: '',
      createdAt: ''
    }
  },
  created() {
    this.getarguments()
  },
  methods: {
    getarguments() {
      const _PARMES = this.$route.params.id
      // this.refundSnid = _PARMES
      console.log(_PARMES)
      searchorderdetails({
        id: 2
      }).then(res => {
        console.log(res)
        this.createdAt = res.result.createdAt,
        this.payType = res.result.payType,
        this.userName = res.result.userName,
        this.userId = res.result.userId,
        this.shopUserName = res.result.shopUserName,
        this.shopUserId = res.result.shopUserId
        this.payTime = res.result.payTime,
        this.tradeNo = res.result.tradeNo,
        this.source = res.result.source,
        this.totalPrice = res.result.totalPrice,
        this.type = res.result.type
        this.shopUserNm = res.result.shopUserNm
        this.snId = res.result.snId
      })
    }
  }
}
</script>
<style>
.order-details{padding-left:7px;}
.order-details-item > h3,.order-refund > h3 { font-weight: 600; height: 30px; line-height: 30px; margin-bottom: 20px; border-bottom:solid 1px #e4e7ed;padding-bottom:5px;}
.order-refund > h3 { padding-left: 10px;}
.lines{margin-top:12px;margin-bottom:12px;width:100%;height:1px;background:#ccc;}
.price-content{margin-right:20px;}
.price-content ul{margin-bottom:15px;}
.price-content ul li{position:relative;height:28px;text-align:right;line-height:28px;}
.price-content ul li:nth-of-type(4)::after{position:absolute;right:0;display:block;width:30%;height:1px;background:#ccc;content:"";}
.pay-warter .bg-purple > .el-form-item > .el-form-item__label{width:auto!important;}
.btn-plane-group{display:inline-block;margin-top:30px; margin-left: 10px;}
</style>
