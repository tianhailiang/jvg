<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">业务分析</p>
        </el-col>
        <el-col :span='24' class='chart'>
            <p class="hui-title">订单数据分析</p>
            <el-row style="float: left;width: 90%;">
                <div style="width: 90%;height: 50px;margin-top: 20px;line-height: 40px;">
                  <el-date-picker style="height: 40px;line-height: 40px;float: left;margin-left: 10px;" v-model="dataTime" value-format="yyyy-MM-dd" type="daterange" align="center" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  <el-input style="float: left;width: 100px;margin-left: 10px;line-height: 33px;height: 33px;" placeholder="对比时段" disabled></el-input>
                  <el-button style="margin-left: 10px" size="small" type="primary" @click="queryClik">查询</el-button>
                </div>
                <div id='userChart' style='height: 400px;width: 90%;margin-left: 10px;' >图表加载失败</div>
                <div class="tab-left">
                    <div style="border-bottom: 1px solid #eee;"><i style=""></i><span>数量</span></div>
                    <div><i style="background-color: #2f4554;"></i><span>金额</span></div>
                </div>
                <el-table :data="tableData" stripe border style="width: 662px;float: left;">
                  <el-table-column v-if="kecheng == 1001" prop="kecheng" label="课程" width="110" align="center"></el-table-column>
                  <el-table-column v-if="chubanwu == 1002" prop="chubanwu" label="出版物" width="110" align="center"></el-table-column>
                  <el-table-column v-if="vip == 1005" prop="vip" label="VIP会员购买" width="110" align="center"></el-table-column>
                  <el-table-column v-if="liuxue == 1006" prop="liuxue" label="留学" width="110" align="center"></el-table-column>
                  <el-table-column v-if="dashang == 1003" prop="dashang" label="打赏订单" width="110" align="center"></el-table-column>
                  <el-table-column v-if="xuanshang == 1004" prop="xuanshang" label="悬赏" width="110" align="center"></el-table-column>
                </el-table>
            </el-row>
        </el-col>
        <el-col :span='24' class='chart'>
            <div class="hui-title">
              <el-form :inline="true" class="demo-form-inline personnel" label-width="150px" size="mini">
                <el-form-item label="页面：" label-width="55px" style="margin-bottom: 0px;">
                <el-select v-model="region" placeholder="语培" style="width: 100px;">
                      <el-option label="语培" :value="0" :key="0"></el-option>
                      <el-option label="留学" :value="1" :key="1"></el-option>
                </el-select>
                </el-form-item>
              </el-form>
            </div>
            <el-table :data="tableData" stripe border style="width: 100%;float: left;">
                <el-table-column prop="courses" label="受访页面" width="" align="center"></el-table-column>
                <el-table-column prop="publication" label="平均加载时间（秒）" width="" align="center"></el-table-column>
                <el-table-column prop="member" label="平均停留时间（秒）" width="" align="center"></el-table-column>
                <el-table-column prop="overseas" label="访问量" width="" align="center"></el-table-column>
                <el-table-column prop="reward" label="跳出率" width="" align="center"></el-table-column>
            </el-table>
        </el-col>
    </section>
</template>
<script>
import { businessQuery } from '@/api/url.js'
import echarts from 'echarts'
export default {
  data () {
    return {
      region: '',
      tableData: [{
        kecheng: '',
        chubanwu: '',
        vip: '',
        liuxue: '',
        dashang: '',
        xuanshang: ''
      }, {
        kecheng: '',
        chubanwu: '',
        vip: '',
        liuxue: '',
        dashang: '',
        xuanshang: ''
      }],
      chubanwu: '',
      dashang: '',
      kecheng: '',
      xuanshang: '',
      vip: '',
      liuxue: '',
      dataTime: ''
    }
  },
  methods: {
    queryClik () {
      // 查询渠道
      if (this.dataTime === '' || this.dataTime === null) {
        this.$message('请选择筛选日期')
        return false
      }
      var data = {"startTime": this.dataTime[0] + ' 00:00:00', "endTime": this.dataTime[1] + ' 00:00:00'}
      businessQuery(data).then(res => {
        console.log('data', res)
        if (res.success) {
          // 加载新增趋势图表
          var data = res.result
          var type = []
          var count = []
          var totalPrice = []
          for (var i = 0;i < data.length;i++) {
            type.push(data[i].typeName)
            count.push(data[i].count)
            totalPrice.push(data[i].price)
            if (data[i].type === 1002) {
              this.chubanwu = data[i].type
              this.tableData[0].chubanwu = data[i].count
              this.tableData[1].chubanwu = data[i].price
            } else if (data[i].type === 1003) {
              this.dashang = data[i].type
              this.tableData[0].dashang = data[i].count
              this.tableData[1].dashang = data[i].price
            } else if (data[i].type === 1001) {
              this.kecheng = data[i].type
              this.tableData[0].kecheng = data[i].count
              this.tableData[1].kecheng = data[i].price
            } else if (data[i].type === 1004) {
              this.xuanshang = data[i].type
              this.tableData[0].xuanshang = data[i].count
              this.tableData[1].xuanshang = data[i].price
            } else if (data[i].type === 1005) {
              this.vip = data[i].type
              this.tableData[0].vip = data[i].count
              this.tableData[1].vip = data[i].price
            } else if (data[i].type === 1006) {
              this.liuxue = data[i].type
              this.tableData[0].liuxue = data[i].count
              this.tableData[1].liuxue = data[i].price
            }
          }
          if (data.length === 0) {
            this.tableData = []
          }
          console.log('tab',this.tableData)
          this.$nextTick(function () {
            this.userChartInit (count, totalPrice)
          })
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    getUserChartInit () {
      // 渠道
      var data = {"startTime": "2018-09-02 00:00:00", "endTime": "2018-09-10 00:00:00"}
      businessQuery(data).then(res => {
        console.log('data', res)
        if (res.success) {
          // 加载新增趋势图表
          var data = res.result
          var type = []
          var count = []
          var totalPrice = []
          for (var i = 0;i < data.length;i++) {
            type.push(data[i].typeName)
            count.push(data[i].count)
            totalPrice.push(data[i].price)
            if (data[i].type === 1002) {
              this.chubanwu = data[i].type
              this.tableData[0].chubanwu = data[i].count
              this.tableData[1].chubanwu = data[i].price
            } else if (data[i].type === 1003) {
              this.dashang = data[i].type
              this.tableData[0].dashang = data[i].count
              this.tableData[1].dashang = data[i].price
            } else if (data[i].type === 1001) {
              this.kecheng = data[i].type
              this.tableData[0].kecheng = data[i].count
              this.tableData[1].kecheng = data[i].price
            } else if (data[i].type === 1004) {
              this.xuanshang = data[i].type
              this.tableData[0].xuanshang = data[i].count
              this.tableData[1].xuanshang = data[i].price
            } else if (data[i].type === 1005) {
              this.vip = data[i].type
              this.tableData[0].vip = data[i].count
              this.tableData[1].vip = data[i].price
            } else if (data[i].type === 1006) {
              this.liuxue = data[i].type
              this.tableData[0].liuxue = data[i].count
              this.tableData[1].liuxue = data[i].price
            }
          }
          if (data.length === 0) {
            this.tableData = []
          }
          console.log('tab',this.tableData)
          this.$nextTick(function () {
            this.userChartInit (count, totalPrice)
          })
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    userChartInit (count, totalPrice) {
      const myChart = echarts.init(document.getElementById('userChart'))
      myChart.showLoading()
      var option = {
        title: {
          y: '15'
        },
        tooltip: {
          axisPointer: {
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['数量', '金额']
        },
        grid: {
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            areaStyle: { normal: {} },
            data: count
          },
          {
            name: '金额',
            type: 'bar',
            areaStyle: {normal: {}},
            data: totalPrice
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getUserChartInit()
    })
  }
}
</script>
<style scoped>
.tab-left{
  margin-left: 33px;
  margin-top: 48px;
  float: left;
  border: 1px solid #eee;
}
.tab-left div{
  padding: 14px;
}
.tab-left i {
  display: inline-block;
  margin-right: 5px;
  border-radius: 10px;
  width: 25px;
  height: 10px;
  background-color: #c23531;
}
.personnel{
    margin-left: 10px;
}
.personnel-title{
    font-size: 20px;
    font-weight: 700;
}
.hui-title{
    background: #eee;
    font-size: 15px;
    padding: 20px;
    color: #000;
}
.red-title{
    font-size: 20px;
    color: #C13232;
    font-weight: 600;
    margin-bottom: 10px;
}
.chart-title{
    margin-left: 10px;
    background: #eee;
}
.chart-shu,.chart-k{
    margin-top: 30px;
    margin-left: 10px;
}
.chart-r{
    height: 150px;
    margin-left: 10px;
}
.chart-r div{
    cursor: pointer;
    padding: 10px 0;
}
.chart-r .active{
    border-bottom: 3px solid green;
}
.chart-x i,.chart-x em{
    display: inline-block;
    float: left;
    color: #C13232;
    line-height: 20px;
}
.chart-t i,.chart-t em{
    display: inline-block;
    float: left;
    color: green;
    line-height: 20px;
}
.chart-k{
    margin-top: 0px;
    margin-left: 10px;
}
.chart-b{
    background: #eee;
    margin-right: 8%;
    padding: 20px;
}
/* .chart-b i{
    display: inline-block;
    width: 70px;
    height: 70px;
    float: left;
    background: url(../assets/main-icon.png);
    background-size: 100% 100%;
    border: 1px solid #eee;
} */
.chart-b div{
    margin-left: 100px;
    line-height: 70px;
    font-weight: 800;
}
.chart{
  margin-left: 10px;
  margin-top:30px;
  background-color: white;
  border-radius: 4px;
}
.chart_left{
  margin-right:100px;
}
</style>
