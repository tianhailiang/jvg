<template>
    <section class="advert-container personnel" style="overflow:hidden;">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">数据看板</p>
        </el-col>
        <el-col :span='18' class="chart-shu">
            <p class="personnel-title">用户数据</p>
            <el-row :gutter="20" style="margin-top: 20px;text-align: center;">
                <el-col :span="4"><div class="red-title">35000</div><div>昨日新增</div></el-col>
                <el-col :span="4"><div class="red-title">219000</div><div>昨日活跃</div></el-col>
                <el-col :span="4"><div class="red-title">30000</div><div>本月新增</div></el-col>
                <el-col :span="4"><div class="red-title">170000</div><div>本月活跃</div></el-col>
                <el-col :span="4"><div class="red-title">170000</div><div>本月流失</div></el-col>
                <el-col :span="4"><div class="red-title">170000</div><div>累计注册用户</div></el-col>
            </el-row>
        </el-col>
        <el-col :span='18' class="chart-shu">
            <p class="personnel-title">业务数据</p>
            <el-row :gutter="20" style="margin-top: 20px;text-align: center;">
                <el-col :span="4"><div class="red-title">35000</div><div>本月会员收入</div></el-col>
                <el-col :span="4"><div class="red-title">219000</div><div>本月邀请返利</div></el-col>
                <el-col :span="4"><div class="red-title">30000</div><div>累计订单数</div></el-col>
                <el-col :span="4"><div class="red-title">170000</div><div>累计商品收入</div></el-col>
                <el-col :span="4"><div class="red-title">170000</div><div>累计打赏金额</div></el-col>
                <el-col :span="4"><div class="red-title">170000</div><div>累计悬赏金额</div></el-col>
            </el-row>
        </el-col>
        <el-col :span='25' class='chart'>
            <p class="hui-title">新增用户趋势</p>
            <el-row class="chart-r" style="width: 200px;float: left;margin-top: 20px;">
                    <el-col ><div>本月新增用户</div></el-col>
                    <el-col ><div>10000</div></el-col>
                    <el-col class="chart-t"><i class="el-icon-caret-top"></i><em>10%</em><div>同比上月</div></el-col>
                    <el-col style="margin-top: 30px"></el-col>
                    <el-col ><div>本周新增用户</div></el-col>
                    <el-col ><div>1000</div></el-col>
                    <el-col class="chart-x"><i class="el-icon-caret-bottom"></i><em>10%</em><div>同比上周</div></el-col>
            </el-row>
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                        <div style="float: left;cursor: pointer;">折线图</div>
                        <div style="float: left;color: green;cursor: pointer;margin-left: 10px;">柱状图</div>
                        <el-date-picker style="float: right;margin-left: 10px;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <div style="float: right;margin-left: 10px;cursor: pointer;">本月</div>
                        <div style="float: right;margin-left: 10px;cursor: pointer;">本周</div>
                        <div style="float: right;color: green;margin-left: 10px;cursor: pointer;">今日</div>
                </div>
                <div id='userChart' style='height: 400px;width: 800px;' >图表加载失败</div>
            </el-row>
        </el-col>
        <el-col :span='25' class='chart'>
            <p class="hui-title">活动用户趋势</p>
            <el-row class="chart-r" style="width: 200px;float: left;margin-top: 20px;">
                    <el-col ><div>本月活跃用户</div></el-col>
                    <el-col ><div>10000</div></el-col>
                    <el-col class="chart-t"><i class="el-icon-caret-top"></i><em>10%</em><div>同比上月</div></el-col>
                    <el-col style="margin-top: 30px"></el-col>
                    <el-col ><div>本周活跃用户</div></el-col>
                    <el-col ><div>1000</div></el-col>
                    <el-col class="chart-x"><i class="el-icon-caret-bottom"></i><em>10%</em><div>同比上周</div></el-col>
            </el-row>
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                        <div style="float: left;cursor: pointer;color: green;">折线图</div>
                        <div style="float: left;cursor: pointer;margin-left: 10px;">柱状图</div>
                        <el-date-picker style="float: right;margin-left: 10px;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <div style="float: right;margin-left: 10px;cursor: pointer;">本月</div>
                        <div style="float: right;margin-left: 10px;cursor: pointer;">本周</div>
                        <div style="float: right;color: green;margin-left: 10px;cursor: pointer;">今日</div>
                </div>
                <div id='userChart1' style='height: 400px;width: 800px;' >图表加载失败</div>
            </el-row>
        </el-col>
    </section>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {}
  },
  methods: {
    // 加载用户来源图
    getUserChartInit () {
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
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '华东',
            type: 'bar',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
      const myChart1 = echarts.init(document.getElementById('userChart1'))
      myChart1.showLoading()
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
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '华东',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
      myChart1.setOption(option)
      myChart1.hideLoading()
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
.chart-container{
  margin-top:10px;
  margin-left: 10px;
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
