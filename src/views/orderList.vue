<template>
    <section class="order-list" style="min-width:1200px;max-width:1200px;margin:0 auto;">
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
                      <el-col :span="6"><div class="grid-content bg-purple">
                          <el-button type="primary" size="medium">搜索</el-button>
                      </div></el-col>
            </el-form>
          </el-row>
      </div>
      <div class="order-details-item" style="margin-bottom:30px;">
          <el-table :data="priceData" border size="medium">
            <el-table-column prop="date" label="商品信息" width="100"></el-table-column>
            <el-table-column prop="price" label="单价" width="200"></el-table-column>
            <el-table-column prop="number" label="数量" width="200"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="totalprice" label="订单金额" width="200"></el-table-column>
            <el-table-column prop="totalprice" label="订单状态" width="200"></el-table-column>
            <el-table-column prop="totalprice" label="操作" width="98">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger">订单详情</el-button>
                  </template>
                </el-table-column>
            </el-table-column>
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
      name: '',
      data () {
        return {
          priceData: [
            {date:'001',name:'js语言精粹',price:10,number:20,totalprice:200},
            {date:'002',name:'js语言精粹',price:10,number:20,totalprice:200},
            {date:'003',name:'js语言精粹',price:10,number:20,totalprice:200},
            {date:'004',name:'js语言精粹',price:10,number:20,totalprice:200}
          ]
        }
      }
    }
  </script>
  <style scoped>
    .row-container{
      display: flex;
      justify-content:center;
    }
  </style>
  