<template>
  <section class="order-details" style="overflow:hidden;max-width:1200px;">
    <div class="order-details-item">
      <h3>订单基本信息</h3>
      <el-row :gutter="20">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单编号">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="订单状态">
                <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="下单时间">
                <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="卖家ID">
                <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="卖家名称">
                <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="买家ID">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
            </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="买家名称">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
            </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="订单类型">
                <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="订单频道">
                <el-input type="text" :disabled="true"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单总额">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="购买渠道">
                    <el-input type="text" :disabled="true"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="支付方式">
                      <el-input type="text" :disabled="true"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="支付时间">
                        <el-input type="text" :disabled="true"></el-input>
                    </el-form-item>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple pay-purple">
                      <el-form-item label="支付流水号">
                          <el-input type="text" :disabled="true"></el-input>
                      </el-form-item>
                    </div></el-col>
          </el-form>
        </el-row>
    </div>
    <div class="order-details-item" style="margin-bottom:12px;">
        <h3>商品信息</h3>
        <el-table :data="priceData" border size="medium">
          <el-table-column prop="date" label="商品ID" width="210"></el-table-column>
          <el-table-column prop="name" label="商品名称" width="210"></el-table-column>
          <el-table-column prop="price" label="单价" width="210"></el-table-column>
          <el-table-column prop="number" label="数量" width="210"></el-table-column>
          <el-table-column prop="totalprice" label="小计金额" width="210"></el-table-column>
      </el-table>
    </div>
    <div class="order-details-item order-details-item_2">
        <h3>收货人信息</h3>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
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
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
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
                  <el-input type="text" :disabled="true" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="优惠内容">
                  <el-table :data="priceData" border size="medium">
                      <el-table-column prop="date" label="商品ID" width="109"></el-table-column>
                      <el-table-column prop="name" label="商品名称" width="160"></el-table-column>
                      <el-table-column prop="price" label="单价" width="160"></el-table-column>
                      <el-table-column prop="number" label="数量" width="160"></el-table-column>
                  </el-table>
              </el-form-item>
              <br>
              <el-form-item label="使用积分">
                  <el-input type="text" :disabled="true" size="mini"></el-input>
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
      priceData: [
        {date: '001', name: 'js语言精粹', price: 10, number: 20, totalprice: 200},
        {date: '001', name: 'js语言精粹', price: 10, number: 20, totalprice: 200},
        {date: '001', name: 'js语言精粹', price: 10, number: 20, totalprice: 200},
        {date: '001', name: 'js语言精粹', price: 10, number: 20, totalprice: 200},
        {date: '001', name: 'js语言精粹', price: 10, number: 20, totalprice: 200},
        {date: '001', name: 'js语言精粹', price: 10, number: 20, totalprice: 200}
      ]
    }
  }
}
</script>
<style>
  .order-details-item h3{
    margin-bottom: 12px;
    font-weight:600;
  }
  .lines{
    height:1px;
    width:100%;
    background:#ccc;
    margin-top:12px;
    margin-bottom: 12px;
  }
  .price-content ul{
    margin-bottom: 15px
  }
  .price-content ul li{
    text-align: right;
    height: 28px;
    line-height: 28px;
    position: relative;
  }
  .price-content ul li:nth-of-type(4)::after{
    display: block;
    content: "";
    height: 1px;
    background: #ccc;
    width: 30%;
    position: absolute;
    right: 0;
  }
  .pay-purple .el-form-item--mini .el-form-item__label{
    width:85px !important;
  }
</style>
