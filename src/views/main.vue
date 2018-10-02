<template>
    <section class='chart-container'>
      <el-row :gutter="24">
        <el-col :span='24' class='chart-title'>
            <P>总控制台</P>
            <p>用于展示当前系统中的统计数据，统计报表及重要实时数据</p>
        </el-col>
        <el-col :span='24' class="chart-shu">
            <el-row :gutter="20">
                <el-col :span="6"><i class="el-icon-picture"></i><div>{{mainData.allUser}}</div><div>用户总数</div></el-col>
                <el-col :span="6"><i class="el-icon-picture"></i><div>{{mainData.totalNumberOfVisits}}</div><div>访问总数</div></el-col>
                <el-col :span="6"><i class="el-icon-picture"></i><div>{{mainData.allOrder}}</div><div>订单总数</div></el-col>
                <el-col :span="6"><i class="el-icon-picture"></i><div>{{mainData.allMoney}}</div><div>总金额</div></el-col>
            </el-row>
        </el-col>
        <el-col :span='24' class='chart'>
            <el-container style="float: left;">
            <div id='userChart' style='height: 400px;width: 750px;' >图表加载失败</div>
            </el-container>
                <el-row :gutter="20" class="chart-r" style="margin-top: 50px;">
                    <el-col :span="3"><i class="el-icon-picture"></i><div>{{mainData.todayRegister}}</div><div>今日注册</div></el-col>
                    <el-col :span="3"><i class="el-icon-picture"></i><div>{{mainData.todaySignIn}}</div><div>今日登陆</div></el-col>
                </el-row>
                <el-row :gutter="20" class="chart-r">
                    <el-col :span="3"><i class="el-icon-picture"></i><div>{{mainData.todayOrder}}</div><div>今日订单</div></el-col>
                    <el-col :span="3"><i class="el-icon-picture"></i><div>{{mainData.unprocessedOrders}}</div><div>未处理订单</div></el-col>
                </el-row>
                <el-row :gutter="20" class="chart-r">
                    <el-col :span="3"><i class="el-icon-picture"></i><div>{{mainData.sevenNewUser}}</div><div>七日新增</div></el-col>
                    <el-col :span="3"><i class="el-icon-picture"></i><div>{{mainData.sevenSignIn}}</div><div>七日活跃</div></el-col>
                </el-row>
        </el-col>
        <el-col :span='24' class="chart-k">
            <div>快捷入口</div>
            <el-row :gutter="20" class="chart-r" style="margin-top: 30px;margin-left: 0px;cursor: pointer;">
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div @click="onSkip(1)">用户</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div @click="onSkip(2)">课程</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div @click="onSkip(3)">财务</div></el-col>
            </el-row>
            <el-row :gutter="20" class="chart-r" style="margin-top: 30px;margin-left: 0px;cursor: pointer;">
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div @click="onSkip(4)">运营</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div @click="onSkip(5)">数据</div></el-col>
                <el-col :span="6" class="chart-b"><i class="el-icon-picture"></i><div @click="onSkip(6)">系统</div></el-col>
            </el-row>
        </el-col>
      </el-row>
    </section>
</template>
<script>
import echarts from 'echarts'
import { mainList } from '../api/url.js'
export default {
  data () {
    return {
      mainData: []
    }
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
          data: ['下单', '提交']
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
            data: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04', '2018-01-05', '2018-01-06', '2018-01-07']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '下单',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '提交',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
    },
    onSkip (id) {
      if (id === 1) {
        this.$router.push({ path: '/personnel' })
      } else if (id === 2) {
        this.$router.push({ path: '/courseList' })
      } else if (id === 3) {

      } else if (id === 4) {
        this.$router.push({ path: '/operational' })
      } else if (id === 5) {
        this.$router.push({ path: '/dataTemplate' })
      } else if (id === 6) {
        this.$router.push({ path: '/sensitive' })
      }
    },
    postData () {
      mainList().then(res => {
        console.log('data', res.result)
        if (res.success) {
          this.mainData = res.result
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getUserChartInit()
      this.postData()
    })
  }
}
</script>
<style scoped>
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
