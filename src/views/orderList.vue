<template>
    <section class="order-list" style="overflow:hidden;margin-left:260px;">
      <h3>订单列表</h3>
      <div class="order-item">
        <el-row :gutter="20">
            <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="订单号">
                    <el-input type="text" v-model="orderListData.snId"></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="卖家ID">
                  <el-input type="text" v-model="orderListData.snId"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="买家ID">
                    <el-input type="text" v-model="orderListData.snId"></el-input>
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
                    <el-input type="text" v-model="orderListData.snId"></el-input>
                </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="卖家名称">
                      <el-input type="text" v-model="orderListData.snId"></el-input>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="订单频道">
                        <el-select v-model="channel">
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
                        <el-select v-model="orderListData.payval">
                            <el-option 
                            :label="items.label"  
                            :value="items.value"
                            v-for="(items, index) in paydata"></el-option>
                        </el-select>
                    </el-form-item>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <el-form-item label="支付时间">
                          <el-input type="text" v-model="orderListData.createdAt"></el-input>
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
                          <el-button type="primary" size="medium" @click="getOrderdata()">搜索</el-button>
                      </div></el-col>
            </el-form>
          </el-row>
      </div>
      <!-- 表格集合 -->
    <div class="order-details-item" style="margin-bottom:30px;">
        <el-table border align="center" :header-cell-style="{background:'#f0f9eb'}">
            <el-table-column label="商品信息" width="200" align="center"></el-table-column>
            <el-table-column label="单价" width="200" align="center"></el-table-column>
            <el-table-column label="数量" width="200" align="center"></el-table-column>
            <el-table-column label="订单金额" width="195" align="center"></el-table-column>
            <el-table-column label="订单状态" width="190" align="center"></el-table-column>
            <el-table-column label="操作" width="98" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="openorderDetail(scope.$index, scope.row)">订单详情</el-button>
                </template>
            </el-table-column>
          </el-table>        
        <el-table :data="goodInfo" border  class="myel-tabel">
            <el-table-column width="170">
              <template slot-scope="scope">
                <span>订单编号：{{scope.row.snid}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mj" label="" width="100">
                <template slot-scope="scope">
                    <span>买家：{{scope.row.userName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="mj2" label="" width="100">
              <template slot-scope="scope">
                <span>卖家：{{scope.row.shopUserName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="" width="150">
              <template slot-scope="scope">
                <span>下单时间：{{scope.row.createdAt}}</span>
              </template>
            </el-table-column>
            <el-table-column label="" width="150">
              <template slot-scope="scope">
                <span>订单类型：{{scope.row.typeVal}}</span>
              </template>
            </el-table-column>
            <el-table-column label="" width="150">
              <template slot-scope="scope">
                <span>支付方式：{{scope.row.payTypeVal}}</span>
              </template>
            </el-table-column>
            <el-table-column label="" width="150">
                <template slot-scope="scope">
                    <span>订单频道：{{scope.row.academyNature}}</span>
                  </template>
            </el-table-column>
            <el-table-column abel="" width="115">
                <template slot-scope="scope">
                    <span>购买渠道：{{scope.row.sourceVal}}</span>
                  </template>
            </el-table-column>
        </el-table>
    </div>
      <!--  -->
      <div class="row-container" style="margin:30px 0;">
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
      </div>
    </section>
  </template>
<script>
import { searchorderlist } from '@/api/url.js'
export default {
    name: 'orderList',
    data () {
    return {
        priceData: [],
        goodInfo: [],
        orderval: '',
        payval: '',
        buyvalue: '',
        ordertype: '',
        channel: '',
        orderdata: [
            {label: '全部', value: '1'},
            {label: '待付款', value: '2'},
            {label: '待发货', value: '3'},
            {label: '已发货', value: '4'},
            {label: '已完成', value: '5'},
            {label: '取消', value: '6'}
        ],
        orderstore: [],
        paydata: [
            {label: '支付宝', value: '1'},
            {label: '微信', value: '2'},
            {label: '银联', value: '3'},
            {label: '全部', value: '4'}
        ],
        buydata: [
            {label: '全部', value: '1'},
            {label: 'APP', value: '2'},
            {label: 'PC', value: '3'},
            {label: 'WAP', value: '4'}
        ],
        orderlist: [
            {label: '全部', value: '1'},
            {label: '课程订单', value: '2'},
            {label: '出版物订单', value: '3'},
            {label: 'VIP', value: '4'},
            {label: '打赏订单', value: '5'},
            {label: '悬赏订单', value: '6'}
        ],
        orderpd: [
            {label: '全部', value: '1'},
            {label: '语培', value: '2'},
            {label: '留学', value: '3'},
            {label: '移民', value: '4'}
        ],
        total: null,
        pageNo: 1,
        pageSize: 20,
        orderListData: {
          snId: '',
          userId: '',
          shopUserId: '',
          userName: '',
          shopUserName: '',
          status:1,
          createdAt:'',
          payType:1,
          source:1,
          type:1,
          channel:1,
          pageNo:1,
          pageSize:20
        },
        nullorderData: []
      }
    },
    created() {
      this.getOrderdata()
    },
    methods: {
      //   arraySpanMethod({ row, rowIndex }) {
      //   if (rowIndex % 2 === 0) {
      //     if (columnIndex === 0) {
      //       return [1, 8];
      //     } else if (columnIndex === 1) {
      //       return [0, 0];
      //     }
      //   }
      // },
        handleSizeChange(val) {
          this.pageSize = val
        },
        handleCurrentChange(val) {
          this.pageNo = val
          this.getOrderdata()
        },
        getOrderdata() {
          let Objectdata = {
          // userId: this.orderListData.userId,
          // shopUserId: this.orderListData.shopUserId,
          // userName: this.orderListData.userName,
          // shopUserName: this.orderListData.shopUserName,
          // status:this.orderListData.status,
          // createdAt:this.orderListData.createdAt,
          // payType:this.orderListData.payType,
          // source:this.orderListData.source,
          // type:this.orderListData.type,
          // channel:this.orderListData.channel, orderInfoList
          pageNo:this.pageNo,
          pageSize:this.pageSize
          }
          searchorderlist(Objectdata).then(res => {
            console.log(res)
            this.total = res.result.total
            this.goodInfo = res.result.modelData
            this.goodInfo.forEach((el, index) => {
              this.priceData.push(this.goodInfo[index].orderInfoList[0])
            })
          }).catch(error => {
            console.log(`请求出错啦`)
          })
    },
    openorderDetail(index, row) {
      this.$router.push({name: 'orderDetail', params: {id: row.snid}})
    }
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
.order-list > h3{
  height: 30px;
  line-height: 30px;
  margin-bottom:15px;
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 5px;
}
</style>
