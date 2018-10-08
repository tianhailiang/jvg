<template>
  <section class="order-details" style="overflow:hidden;margin-left:260px;">
    <div class="order-details-item">
      <h3 class="order-title">订单基本信息</h3>
      <el-row :gutter="20">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单编号">
                  <el-input type="text" :disabled="true" v-model="snid"></el-input>
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
                  <el-input type="text" :disabled="true" v-model="userNm"></el-input>
              </el-form-item>
            </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="订单类型">
                <el-input type="text" :disabled="true" v-model="typeVal"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="订单频道">
                <el-input type="text" :disabled="true" v-model="userNm"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单总额">
                  <el-input type="text" :disabled="true" v-model="totalPrice"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="购买渠道">
                    <el-input type="text" :disabled="true" v-model="sourceVal"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="支付方式">
                      <el-input type="text" :disabled="true" v-model="payTypeVal"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="支付时间">
                        <el-input type="text" :disabled="true" v-model="payTime"></el-input>
                    </el-form-item>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple pay-purple">
                      <el-form-item label="支付流水号">
                          <el-input type="text" :disabled="true" v-model="tradeNo"></el-input>
                      </el-form-item>
                    </div></el-col>
          </el-form>
        </el-row>
    </div>
    <div class="order-details-item" style="margin-bottom:12px;">
        <h3 >商品信息</h3>
        <el-table :data="priceData" border size="medium">
          <el-table-column prop="date" label="商品ID" width="212" align="center"></el-table-column>
          <el-table-column prop="userName" label="商品名称" width="230" align="center"></el-table-column>
          <el-table-column prop="price" label="单价" width="215" align="center"></el-table-column>
          <el-table-column prop="number" label="数量" width="215" align="center"></el-table-column>
          <el-table-column prop="totalprice" label="小计金额" width="212" align="center"></el-table-column>
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
                      <el-table-column prop="date" label="商品ID" width="109" align="center"></el-table-column>
                      <el-table-column prop="name" label="商品名称" width="160" align="center"></el-table-column>
                      <el-table-column prop="price" label="单价" width="160" align="center"></el-table-column>
                      <el-table-column prop="number" label="数量" width="160" align="center"></el-table-column>
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
export default {
  name: '',
  data () {
    return {
      formInline: {},
      snid:'',
      status: '',
      createdAt: '',
      shopUserId: '',
      shopUserNm: '',
      userId: '',
      userNm: '',
      tradeNo: '',
      payTime: '',
      payTypeVal: '',
      sourceVal: '',
      totalPrice: '',
      typeVal: '',
      tradeNo:'',
      priceData: []
    }
  },
  created() {
    this.searchorderdetail()
  },
  methods: {
    searchorderdetail() {
      const _PARMES = this.$route.params.id
      axios.post(this.$store.state.api.searchorderdetail, {
        snId: _PARMES
      }).then(res => {
        console.log(res)
        this.snid = res.data.result.snid
        this.status = res.data.result.status
        this.createdAt = res.data.result.createdAt
        this.shopUserId	= res.data.result.shopUserId
        this.shopUserNm	= res.data.result.shopUserNm
        this.userId	= res.data.result.userId
        this.userNm = res.data.result.userNm
        this.tradeNo = res.data.result.tradeNo
        this.payTime = res.data.result.payTime
        this.payTypeVal = res.data.result.payTypeVal
        this.sourceVal = res.data.result.sourceVal
        this.totalPrice = res.data.result.totalPrice
        this.typeVal = res.data.result.typeVal
        this.tradeNo = res.data.result.tradeNo
        this.priceData = res.data.result.orderInfoList
      }).catch(error => {

      })
    }
  }
}
</script>
<style>
.lines{margin-top:12px;margin-bottom:12px;width:100%;height:1px;background:#ccc;}
h3{ height: 30px; line-height: 30px; margin-bottom: 20px; border-bottom: solid 1px #ebeef5;padding-bottom:5px;}
.price-content{ margin-right:20px;}
.price-content ul{margin-bottom:15px;}
.price-content ul li{position:relative;height:28px;text-align:right;line-height:28px;}
.price-content ul li:nth-of-type(4)::after{position:absolute;right:0;display:block;width:30%;height:1px;background:#ccc;content:"";}
.pay-purple .el-form-item--small .el-form-item__label{padding:0 !important;}
.order-details{padding-left:10px;}
.order-title{ height: 30px; line-height: 30px; font-weight: 600; border-bottom: solid 1px #dcdfe6; margin-bottom: 15px;}
</style>
