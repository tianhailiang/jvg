<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">用户分析</p>
        </el-col>
        <el-col :span='24' class='chart'>
            <p class="hui-title">新增用户趋势</p>
            <!-- <el-row class="chart-r" style="font-size: 25px;width: 150px;float: left;text-align: center;color: green;">
                    <el-col class="active"><div>总览新增</div></el-col>
                    <el-col ><div>地市新增</div></el-col>
                    <el-col ><div>活动新增</div></el-col>
            </el-row> -->
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                        <span >统计时间范围：</span>
                        <el-date-picker style="margin-left: 10px;" v-model="dataTime" value-format="yyyy-MM" type="daterange" align="center" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <el-button style="margin-left: 10px" size="small" type="primary" @click="queryClikUser">查询</el-button>
                        <el-button style="margin-left: 10px" size="small" type="primary" @click="cleanClikUser">清除</el-button>
                </div>
                <div id='userChart' style='height: 400px;width: 800px;margin-left: 10px;' >图表加载失败</div>
            </el-row>
        </el-col>
        <el-col :span='24' class='chart'>
            <p class="hui-title">渠道用户</p>
            <el-row class="chart-r" style="font-size: 25px;width: 150px;float: left;text-align: center;color: green;">
                    <el-col class="active"><div>版本分布</div></el-col>
            </el-row>
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                        <el-date-picker style="float: left;margin-left: 10px;" v-model="dataTime1" value-format="yyyy-MM-dd" type="daterange" align="center" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <el-button style="margin-left: 10px" size="small" type="primary" @click="queryClikQudao">查询</el-button>
                </div>
                <div id='userChart1' style='height: 400px;width: 800px;margin-left: 10px;' >图表加载失败</div>
            </el-row>
        </el-col>
        <el-col :span='8.5' class='chart'>
            <p class="hui-title">用户性别分布</p>
            <el-row style="float: left;width: 400px;">
                <div>性别统计 <span>{{nan}}</span> <i>男</i> <em>|</em> <span>{{nv}}</span> <i>女</i></div>
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
import { dataUserSex,dataUserAge,dataUserLogin,dataCreated,dataBusiness } from '@/api/url.js'
import echarts from 'echarts'
export default {
  data () {
    return {
      nan: '',
      nv: '',
      dataTime: '',
      dataTime1: '',
      onequery: true
    }
  },
  methods: {
    cleanClikUser () {
      // 清除用户新增趋势数据
      this.dataTime = ''
      var created = []
      var count = []
      this.$nextTick(function () {
        this.onequery = true
        this.userChartInit (created, count)
      })
    },
    queryClikUser () {
      // 查询用户新增趋势
      if (this.dataTime === '' || this.dataTime === null) {
        this.$message('请选择筛选日期')
        return false
      }
      var data = {'startTime': this.dataTime[0], 'endTime': this.dataTime[1]}
      dataBusiness(data).then(res => {
        console.log('data', res)
        if (res.success) {
          var userdata = res.result
          var created = []
          var count = []
          for (var i = 0;i < userdata.length;i++) {
            created.push(userdata[i].createdAt)
            count.push(userdata[i].count)
          }
          this.$nextTick(function () {
            this.onequery = true
            this.userChartInit (created, count)
          })
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    getUserChartInit () {
      // 用户新增趋势
      var data = {'startTime': '2018-03-01 00:00:00', 'endTime': '2018-09-01 00:00:00'}
      dataBusiness(data).then(res => {
        console.log('data', res)
        if (res.success) {
          var userdata = res.result
          var created = []
          var count = []
          for (var i = 0;i < userdata.length;i++) {
            created.push(userdata[i].createdAt)
            count.push(userdata[i].count)
          }
          this.$nextTick(function () {
            this.onequery = true
            this.userChartInit (created, count)
          })
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    userChartInit (created, count) {
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
            data: created
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
            data: count
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
      var _this = this
      myChart.on('click', function (params) {
        // 点击呈现每日数据
        if (_this.onequery) {
          _this.onequery = false
          _this.queryClikUserInfo (params.name)
        } else {
          _this.$message('已经呈现每日数据，请筛选其他时间段呈现数据')
        }
      })
    },
    queryClikUserInfo (startTime) {
      // 点击图形筛选单月每日数据
      var data = {'startTime': startTime}
      dataCreated(data).then(res => {
        console.log('data', res)
        if (res.success) {
          var userdata = res.result
          var created = []
          var count = []
          for (var i = 0;i < userdata.length;i++) {
            created.push(userdata[i].createdAt)
            count.push(userdata[i].count)
          }
          this.$nextTick(function () {
            this.userChartInit (created, count)
          })
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    queryClikQudao () {
      // 查询渠道
      if (this.dataTime1 === '' || this.dataTime1 === null) {
        this.$message('请选择筛选日期')
        return false
      }
      var data = {"startTime": this.dataTime1[0] + ' 00:00:00', "endTime": this.dataTime1[1] + ' 00:00:00'}
      dataUserLogin(data).then(res => {
        console.log('data', res)
        if (res.success) {
          var data1 = res.result
          var days = []
          var yupei = []
          var liuxue = []
          var yuanxiao = []
          var yimin = []
          for (var i = 0; i < data1.length; i++) {
            days.push(data1[i].days)
            yupei.push(data1[i].value1)
            liuxue.push(data1[i].value2)
            yuanxiao.push(data1[i].value3)
            yimin.push(data1[i].value4)
          }
          this.$nextTick(function () {
            this.qudaoChartInit (days, yupei, liuxue, yuanxiao, yimin)
          })
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    getQudaoChartInit () {
      // 渠道
      var data = {"startTime": "2018-09-02 00:00:00", "endTime": "2018-09-10 00:00:00"}
      dataUserLogin(data).then(res => {
        console.log('data', res)
        if (res.success) {
          var data1 = res.result
          var days = []
          var yupei = []
          var liuxue = []
          var yuanxiao = []
          var yimin = []
          for (var i = 0; i < data1.length; i++) {
            days.push(data1[i].days)
            yupei.push(data1[i].value1)
            liuxue.push(data1[i].value2)
            yuanxiao.push(data1[i].value3)
            yimin.push(data1[i].value4)
          }
          this.$nextTick(function () {
            this.qudaoChartInit (days, yupei, liuxue, yuanxiao, yimin)
          })
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    qudaoChartInit (days, yupei, liuxue, yuanxiao, yimin) {
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
            data: days
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '语培',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: yupei
          },
          {
            name: '留学',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: liuxue
          },
          {
            name: '院校',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: yuanxiao
          },
          {
            name: '移民',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: yimin
          }
        ]
      }
      myChart1.setOption(option1)
      myChart1.hideLoading()
    },
    getSexChartInit () {
      // 性别
      dataUserSex().then(res => {
        console.log('data', res)
        if (res.success) {
          // 加载性别统计图表
          var data1 = res.result
          var values = []
          var zong = 0
          var nan = 0
          var nv = 0
          for (var i = 0 ; i < data1.length ; i++) {
            if (data1[i].sex === 1) {
              // 男
              values.push(data1[i].count)
              nan = data1[i].count
              zong += data1[i].count
            } else if (data1[i].sex === 2) {
              // 女
              values.push(data1[i].count)
              nv = data1[i].count
              zong += data1[i].count
            }
          }
          this.nan = Math.round(nan/zong*100) +'%'
          this.nv = Math.round(nv/zong*100) +'%'
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
            data: ['男', '女']
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
            data: values
          }
        ]
      }
      myChart2.setOption(option2)
      myChart2.hideLoading()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    getAgeChartInit () {
      // 年龄
      dataUserAge().then(res => {
        console.log('data', res)
        if (res.success) {
          // 加载用户年龄分布图表
          var data1 = res.result
          var years = []
          for (var i = 0 ; i < data1.length ; i++) {
            years.push({"value": data1[i].count, "name": data1[i].years})
          }
          console.log('y', years)
      const myChart3 = echarts.init(document.getElementById('userChart3'))
      myChart3.showLoading()
      var option3 = {
        title: {
          y: '20'
        },
        grid: {
          top: '0%',
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
            radius: '85%',
            center: ['45%', '50%'],
            data: [{value: 1,name: 88},{value: 1,name: 70},{value: 1,name: 80},{value: 2,name: 84},{value: 34,name: 90},{value: 1,name: 10},{value: 1,name: 18},],
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
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getUserChartInit()
      this.getQudaoChartInit()
      this.getSexChartInit()
      this.getAgeChartInit()
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
