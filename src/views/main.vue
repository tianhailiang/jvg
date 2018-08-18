<template>
    <div class='chart-container'>
        <el-col :span='18' class='chart-title'>
            <P>总控制台</P>
            <p>用于展示当前系统中的统计数据，统计报表及重要实时数据</p>
        </el-col>
        <el-col :span='18' class="chart-shu">
            <el-row :gutter="20">
                <el-col :span="6"><i class="el-icon-picture"></i><div>35000</div><div>用户总数</div></el-col>
                <el-col :span="6"><i class="el-icon-picture"></i><div>219000</div><div>访问总数</div></el-col>
                <el-col :span="6"><i class="el-icon-picture"></i><div>30000</div><div>订单总数</div></el-col>
                <el-col :span="6"><i class="el-icon-picture"></i><div>170000</div><div>总金额</div></el-col>
            </el-row>
        </el-col>
        <el-col :span='18' class='chart'>
            <el-container style="float: left;">
            <div id='userChart' style='height: 400px;width: 750px;' >图表加载失败</div>
            </el-container>
                <el-row :gutter="20" class="chart-r" style="margin-top: 50px;">
                    <el-col :span="3"><i class="el-icon-picture"></i><div>35000</div><div>用户总数</div></el-col>
                    <el-col :span="3"><i class="el-icon-picture"></i><div>219000</div><div>访问总数</div></el-col>
                </el-row>
                <el-row :gutter="20" class="chart-r">
                    <el-col :span="3"><i class="el-icon-picture"></i><div>35000</div><div>用户总数</div></el-col>
                    <el-col :span="3"><i class="el-icon-picture"></i><div>219000</div><div>访问总数</div></el-col>
                </el-row>
                <el-row :gutter="20" class="chart-r">
                    <el-col :span="3"><i class="el-icon-picture"></i><div>35000</div><div>用户总数</div></el-col>
                    <el-col :span="3"><i class="el-icon-picture"></i><div>219000</div><div>访问总数</div></el-col>
                </el-row>
        </el-col>
        <el-col :span='18' class="chart-k">
            <div>快捷入口</div>
            <el-row :gutter="20" class="chart-r" style="margin-top: 30px;margin-left: 0px;">
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div>用户</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div>课程</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div>财务</div></el-col>
            </el-row>
            <el-row :gutter="20" class="chart-r" style="margin-top: 30px;margin-left: 0px;">
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div>运营</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div>数据</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div>系统</div></el-col>
            </el-row>
        </el-col>
    </div>
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
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['华东', '华北', '华南', '西部', '其他']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
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
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '华南',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '西部',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '其他',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
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
<style>
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
.chart-shu i,.chart-r i{
    display: inline-block;
    width: 40px;
    height: 40px;
    float: left;
    background: url(../assets/main-icon.png);
    background-size: 100% 100%;
    border: 1px solid #eee;
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
.chart-b i{
    display: inline-block;
    width: 70px;
    height: 70px;
    float: left;
    background: url(../assets/main-icon.png);
    background-size: 100% 100%;
    border: 1px solid #eee;
}
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
.chart-r{

}
</style>
