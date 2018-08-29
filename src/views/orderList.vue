<template>
    <section class="order-list" style="overflow:hidden;max-width:1200px;">
      <div class="order-item">
        <el-row :gutter="20">
            <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="订单号">
                    <el-input type="text"></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="卖家ID">
                  <el-input type="text"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="买家ID">
                    <el-input type="text"></el-input>
                </el-form-item>
              </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单状态">
                  <el-select placeholder="全部">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="待付款" value="beijing"></el-option>
                      <el-option label="待发货" value="beijing"></el-option>
                      <el-option label="已发货"  value="shanghai"></el-option>
                      <el-option label="已完成" value="beijing"></el-option>
                      <el-option label="取消" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="买家名称">
                    <el-input type="text"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="卖家名称">
                      <el-input type="text"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="订单频道">
                        <el-select placeholder="全部">
                            <el-option label="全部"  value="shanghai"></el-option>
                            <el-option label="语培" value="beijing"></el-option>
                            <el-option label="留学" value="beijing"></el-option>
                            <el-option label="移民"  value="shanghai"></el-option>
                        </el-select>
                    </el-form-item>
                  </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单类型">
                  <el-select placeholder="全部">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="课程订单" value="beijing"></el-option>
                      <el-option label="出版物订单" value="beijing"></el-option>
                      <el-option label="VIP" value="beijing"></el-option>
                      <el-option label="打赏订单" value="beijing"></el-option>
                      <el-option label="悬赏订单" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
            </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="支付方式">
                        <el-select placeholder="全部">
                            <el-option label="全部"  value="shanghai"></el-option>
                            <el-option label="微信" value="beijing"></el-option>
                            <el-option label="支付宝" value="beijing"></el-option>
                            <el-option label="银联" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <el-form-item label="支付时间">
                          <el-input type="text"></el-input>
                      </el-form-item>
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
                        <el-form-item label="购买渠道">
                            <el-select placeholder="全部">
                                <el-option label="全部"  value="shanghai"></el-option>
                                <el-option label="APP" value="beijing"></el-option>
                                <el-option label="PC" value="beijing"></el-option>
                                <el-option label="WAP" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                      </div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple" style="margin-top:20px;">
                          <el-button type="primary" size="medium">搜索</el-button>
                      </div></el-col>
            </el-form>
          </el-row>
      </div>
      <div class="order-details-item" style="margin-bottom:30px;">
        <el-table :data="priceData" border size="medium" :header-cell-style="{background:'#f0f9eb'}">
            <el-table-column prop="date" label="商品信息" width="190"></el-table-column>
            <el-table-column prop="price" label="单价" width="190"></el-table-column>
            <el-table-column prop="number" label="数量" width="190"></el-table-column>
            <el-table-column prop="totalprice" label="订单金额" width="190"></el-table-column>
            <el-table-column prop="totalactive" label="订单状态" width="190"></el-table-column>
            <el-table-column prop="totalprice" label="操作" width="98">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger">订单详情</el-button>
                  </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-table :data="price" border size="medium" class="myel-tabel">
            <el-table-column prop="dd" label="" width="150"></el-table-column>
            <el-table-column prop="mj" label="" width="100"></el-table-column>
            <el-table-column prop="mj2" label="" width="100"></el-table-column>
            <el-table-column prop="time" label="" width="150"></el-table-column>
            <el-table-column prop="type" label="" width="150"></el-table-column>
            <el-table-column prop="moteh" label="" width="150"></el-table-column>
            <el-table-column prop="ddp" label="" width="150"></el-table-column>
            <el-table-column prop="buy" label="" width="100"></el-table-column>
        </el-table>
      </div>
      <!--  -->
      <div class="row-container">
          <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          <el-button size="small" type="primary">确定</el-button>
      </div>
    </section>
  </template>
<script>
export default {
    name: 'orderList',
    data () {
    return {
        priceData: [
        {date: '英语入门', price: 5, number: 100, totalprice: 500, totalactive: '已付款'},
        {date: '俄语入门', price: 5, number: 100, totalprice: 500, totalactive: '已付款'}
        ],
        price: [
        {
            dd: '订单号：1000120001201808120001',
            mj: '买家：XXX',
            mj2: '卖家：XXX',
            time: '下单时间：2018-08-12 00:00:00',
            type: '订单类型：课程订单',
            moteh: '支付方式：支付宝',
            ddp: '订单频道：语培',
            buy: '购买渠'}
        ]
      }
    },
    methods: {
    //     arraySpanMethod({ column, rowIndex, columnIndex }) {
    //     if (rowIndex % 2 === 0) {
    //       if (columnIndex === 0) {
    //         return [1, 2];
    //       } else if (columnIndex === 1) {
    //         return [0, 0];
    //       }
    //     }
    //   }
    }
}
</script>
<style>
.row-container {
    display: flex;
    justify-content:center;
}
.el-table .warning-row {
    background: oldlace;
}
.myel-tabel table .has-gutter{
    display: none !important;
}
</style>
