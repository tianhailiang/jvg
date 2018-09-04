<template>
  <section class="order-refund" style="overflow:hidden;max-width:1200px;">
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
      <el-col :span="7"><div class="grid-content bg-purple">
          <el-form-item label="订单号">
              <el-input type="text"></el-input>
          </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="卖家名称">
            <el-input type="text"></el-input>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="买家名称">
            <el-input type="text"></el-input>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="退款状态">
            <el-select v-model="quitval">
                <el-option
                :label="item.label" 
                :value="item.value"
                v-for="(item, index) in quitmoney"></el-option>
            </el-select>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="购买渠道">
            <el-select placeholder="全部">
                <el-option label="全部"  value="shanghai"></el-option>
                <el-option label="APP" value="beijing"></el-option>
                <el-option label="PC" value="beijing"></el-option>
                <el-option label="WAP" value="beijing"></el-option>
            </el-select>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item label="订单类型">
            <el-select v-model="ordertype">
                <el-option 
                :label="items.label"  
                :value="items.value"
                v-for="(items, index) in orderlist"></el-option>
            </el-select>
        </el-form-item>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
          <el-form-item label="支付方式">
                <el-select v-model="payval">
                    <el-option 
                    :label="items.label"  
                    :value="items.value"
                    v-for="(items, index) in paydata"></el-option>
                </el-select>
          </el-form-item></div>
    </el-col>
    <el-col :span="15"><div class="grid-content bg-purple">
            <el-form-item label="下单时间">
                <div class="time-group">
                    <el-col :span="8">
                        <el-date-picker type="date" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="8">
                        <el-time-picker type="fixed-time" style="width: 100%;"></el-time-picker>
                    </el-col>
                </div>
            </el-form-item>
          </div></el-col>
      </el-form>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="6" :offset="21"><div class="grid-content bg-purple">
            <el-button type="primary" size="medium">搜索</el-button>
        </div></el-col>
    </el-row>
    <!--  -->
    <el-table :data=tableData border>
        <el-table-column prop="index" label="NO" width="120" align="center"></el-table-column>
        <el-table-column prop="date" label="退款单号" width="110" align="center"></el-table-column>
        <el-table-column prop="date" label="订单号" width="110" align="center"></el-table-column>
        <el-table-column prop="name" label="卖家名称" width="110" align="center"></el-table-column>
        <el-table-column prop="name" label="买家名称" width="110" align="center"></el-table-column>
        <el-table-column prop="name" label="退款理由" width="110" align="center"></el-table-column>
        <el-table-column prop="tuiname" label="退款状态" width="110" align="center"></el-table-column>
        <el-table-column prop="pricetype" label="支付方式" width="110" align="center"></el-table-column>
        <el-table-column prop="address" label="购买渠道"></el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="danger">同意</el-button>
              </template>
        </el-table-column>
    </el-table>
    <div class="page-line" style="height:30px"></div>
    <div class="row-container">
        <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
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
      tableData: [
        {date: '20160502', index: 1, name: '张三', address: '89', tuiname: '已退款', pricetype: '支付宝'},
        {date: '20160502', index: 3, name: '张三', address: '89', tuiname: '已退款', pricetype: '支付宝'},
        {date: '20160502', index: 4, name: '张三', address: '89', tuiname: '已退款', pricetype: '支付宝'},
        {date: '20160502', index: 5, name: '张三', address: '89', tuiname: '已退款', pricetype: '支付宝'}
      ],
      payval: '',
      ordertype: '',
      quitval: '',
      paydata: [
        {label: '支付宝', value: '选项1'},
        {label: '微信', value: '选项2'},
        {label: '银联', value: '选项3'},
        {label: '全部', value: '选项4'}
      ],
      orderlist: [
        {label: '全部', value: '选项1'},
        {label: '课程订单', value: '选项2'},
        {label: '出版物订单', value: '选项3'},
        {label: 'VIP', value: '选项4'},
        {label: '打赏订单', value: '选项5'},
        {label: '悬赏订单', value: '选项6'}
      ],
      quitmoney: [
        {label: '申请退款', value: '选项1'},
        {label: '同意退款', value: '选项2'},
        {label: '出版物订单', value: '选项3'},
        {label: '确认退款', value: '选项4'},
        {label: '完成', value: '选项5'},
        {label: '拒绝退款', value: '选项6'}
      ]
    }
  },
  methods: {}
}
</script>
<style>
  .order-refund .el-form-item--mini .el-form-item__content{
    position: absolute !important;
  }
  .row-container{
    display: flex;
    justify-content:center;
}
</style>