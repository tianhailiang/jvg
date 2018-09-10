<template>
    <section class="order-list" style="overflow:hidden;padding-left:10px;">
      <div class="order-item">
        <el-row :gutter="20">
            <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
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
                  <el-select v-model="orderval">
                      <el-option 
                      :label="items.label"  
                      :value="items.value"
                      v-for="(items, index) in orderdata"></el-option>
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
                        <el-select v-model="orderpdval">
                            <el-option 
                            :label="items.label"
                            :value="items.value"
                            v-for="(items, index) in orderpd"></el-option>
                        </el-select>
                    </el-form-item>
                  </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="订单类型">
                  <el-select v-model="ordertype">
                      <el-option 
                      :label="items.label"  
                      :value="items.value"
                      v-for="(items, index) in orderlist"></el-option>
                  </el-select>
              </el-form-item>
            </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="支付方式">
                        <el-select v-model="payval">
                            <el-option 
                            :label="items.label"  
                            :value="items.value"
                            v-for="(items, index) in paydata"></el-option>
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
                            <el-select v-model="buyvalue">
                                <el-option 
                                :label="items.label"  
                                :value="items.value"
                                v-for="(items, index) in buydata"></el-option>
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
        <el-table :data="priceData" border size="medium" align="center" :header-cell-style="{background:'#f0f9eb'}">
            <el-table-column prop="date" label="商品信息" width="190" align="center"></el-table-column>
            <el-table-column prop="price" label="单价" width="190" align="center"></el-table-column>
            <el-table-column prop="number" label="数量" width="190" align="center"></el-table-column>
            <el-table-column prop="totalprice" label="订单金额" width="190" align="center"></el-table-column>
            <el-table-column prop="totalactive" label="订单状态" width="190" align="center"></el-table-column>
            <el-table-column prop="totalprice" label="操作" width="98" align="center">
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
        price: [{
            dd: '订单号：1000120001201808120001',
            mj: '买家：XXX',
            mj2: '卖家：XXX',
            time: '下单时间：2018-08-12 00:00:00',
            type: '订单类型：课程订单',
            moteh: '支付方式：支付宝',
            ddp: '订单频道：语培',
            buy: '购买渠'}
        ],
        orderval: '',
        payval: '',
        buyvalue: '',
        ordertype: '',
        orderpdval: '',
        orderdata: [
            {label: '全部', value: '选项1'},
            {label: '待付款', value: '选项2'},
            {label: '待发货', value: '选项3'},
            {label: '已发货', value: '选项4'},
            {label: '已完成', value: '选项5'},
            {label: '取消', value: '选项6'}
        ],
        paydata: [
            {label: '支付宝', value: '选项1'},
            {label: '微信', value: '选项2'},
            {label: '银联', value: '选项3'},
            {label: '全部', value: '选项4'}
        ],
        buydata: [
            {label: '全部', value: '选项1'},
            {label: 'APP', value: '选项2'},
            {label: 'PC', value: '选项3'},
            {label: 'WAP', value: '选项4'}
        ],
        orderlist: [
            {label: '全部', value: '选项1'},
            {label: '课程订单', value: '选项2'},
            {label: '出版物订单', value: '选项3'},
            {label: 'VIP', value: '选项4'},
            {label: '打赏订单', value: '选项5'},
            {label: '悬赏订单', value: '选项6'}
        ],
        orderpd: [
            {label: '全部', value: '选项1'},
            {label: '语培', value: '选项2'},
            {label: '留学', value: '选项3'},
            {label: '移民', value: '选项4'}
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
