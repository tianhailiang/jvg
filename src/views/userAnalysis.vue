<template>
    <section class="advert-container personnel" style="overflow:hidden;">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">用户分析</p>
        </el-col>
        <el-col :span='25' class='chart'>
            <p class="hui-title">新增用户趋势</p>
            <el-row class="chart-r" style="font-size: 25px;width: 150px;float: left;text-align: center;color: green;">
                    <el-col class="active"><div>总览新增</div></el-col>
                    <el-col ><div>地市新增</div></el-col>
                    <el-col ><div>活动新增</div></el-col>
            </el-row>
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                        <el-date-picker style="float: left;margin-left: 10px;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <el-input style="float: left;width: 100px;margin-left: 10px;" placeholder="对比时段" disabled></el-input>
                        <el-button style="margin-left: 10px" size="small" type="primary">查询</el-button>
                </div>
                <div id='userChart' style='height: 400px;width: 800px;margin-left: 10px;' >图表加载失败</div>
            </el-row>
        </el-col>
        <el-col :span='25' class='chart'>
            <p class="hui-title">渠道用户</p>
            <el-row class="chart-r" style="font-size: 25px;width: 150px;float: left;text-align: center;color: green;">
                    <el-col class="active"><div>版本分布</div></el-col>
            </el-row>
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                        <el-date-picker style="float: left;margin-left: 10px;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <el-button style="margin-left: 10px" size="small" type="primary">查询</el-button>
                </div>
                <div id='userChart1' style='height: 400px;width: 800px;margin-left: 10px;' >图表加载失败</div>
            </el-row>
        </el-col>
        <el-col :span='8.5' class='chart'>
            <p class="hui-title">用户性别分布</p>
            <el-row style="float: left;width: 400px;">
                <div>性别统计 <span>52%</span> <i>男</i> <em>|</em> <span>48%</span> <i>女</i></div>
                <div id='userChart2' style='height: 400px;width: 400px;margin-left: 10px;' >图表加载失败</div>
            </el-row>
        </el-col>
        <el-col :span='12' class='chart'>
            <p class="hui-title">用户年龄分布</p>
            <el-row style="float: left;width: 700px;">
                <div id='userChart3' style='height: 400px;width: 600px;margin-left: 10px;' >图表加载失败</div>
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
    getUserChartInit () {
      // 加载新增趋势图表
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
      // 加载用户渠道图表
      const myChart1 = echarts.init(document.getElementById('userChart1'))
      myChart1.showLoading()
      var option1 = {
        title: {
          y: '15'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['华东', '华北', '华南']
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
          },
          {
            name: '华北',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '华南',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
      myChart1.setOption(option1)
      myChart1.hideLoading()
      // 加载性别统计图表
      const myChart2 = echarts.init(document.getElementById('userChart2'))
      myChart2.showLoading()
      var option2 = {
        title: {
          y: '15'
        },
        legend: {
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: ['MAN', 'Woman']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [120, 132]
          }
        ]
      }
      myChart2.setOption(option2)
      myChart2.hideLoading()
      // 加载用户年龄分布图表
      const myChart3 = echarts.init(document.getElementById('userChart3'))
      myChart3.showLoading()
      var option3 = {
        title: {
          y: '20'
        },
        grid: {
          top: '10%',
          left: '-6%',
          right: '0%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '用户年龄分布',
            type: 'pie',
            radius: '90%',
            center: ['45%', '50%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 50,
                shadowOffsetX: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart3.setOption(option3)
      myChart3.hideLoading()
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
