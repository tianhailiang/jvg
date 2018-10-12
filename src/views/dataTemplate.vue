<template>
    <section class='chart-container'>
      <el-row :gutter="24">
        <el-col :span='24' class='chart-title'>
            <p class="personnel-title">数据看板</p>
        </el-col>
        <el-col :span='24' class="chart-shu">
            <p class="personnel-title">用户数据</p>
            <el-row :gutter="20" style="margin-top: 20px;text-align: center;">
                <el-col :span="4"><div class="red-title">{{userdata.newlyAddedYesterday}}</div><div>昨日新增</div></el-col>
                <el-col :span="4"><div class="red-title">{{userdata.activeYesterday}}</div><div>昨日活跃</div></el-col>
                <el-col :span="4"><div class="red-title">{{userdata.newMonth}}</div><div>本月新增</div></el-col>
                <el-col :span="4"><div class="red-title">{{userdata.activeThinsMonth}}</div><div>本月活跃</div></el-col>
                <el-col :span="4"><div class="red-title">{{userdata.lossOfTheMonth}}</div><div>本月流失</div></el-col>
                <el-col :span="4"><div class="red-title">{{userdata.accumulativeRegisteredRsers}}</div><div>累计注册用户</div></el-col>
            </el-row>
        </el-col>
        <el-col :span='24' class="chart-shu">
            <p class="personnel-title">业务数据</p>
            <el-row :gutter="20" style="margin-top: 20px;text-align: center;">
                <el-col :span="4"><div class="red-title">{{businessdata.AccumulatedOfferARewardAmountRMB}}</div><div>本月会员收入</div></el-col>
                <el-col :span="4"><div class="red-title">{{businessdata.membershipIncomeThisTonthRMB}}</div><div>本月邀请返利</div></el-col>
                <el-col :span="4"><div class="red-title">{{businessdata.allOrderCount}}</div><div>累计订单数</div></el-col>
                <el-col :span="4"><div class="red-title">{{businessdata.allGoodsMoneyRMB}}</div><div>累计商品收入</div></el-col>
                <el-col :span="4"><div class="red-title">{{businessdata.accumulatedRewardAmountRMB}}</div><div>累计打赏金额</div></el-col>
                <el-col :span="4"><div class="red-title">{{businessdata.AccumulatedOfferARewardAmountRMB}}</div><div>累计悬赏金额</div></el-col>
            </el-row>
        </el-col>
        <el-col :span='24' class='chart'>
            <p class="hui-title">新增用户趋势</p>
            <el-row class="chart-r" style="width: 200px;float: left;margin-top: 20px;">
                    <el-col ><div>本月新增用户</div></el-col>
                    <el-col ><div>{{xinben}}</div></el-col>
                    <el-col :class="{'chart-x': iconbi, 'chart-t': !iconbi}"><i :class="{'el-icon-caret-top': iconbi, 'el-icon-caret-bottom': !iconbi}"></i><em>{{bai}}</em><div>同比上月</div></el-col>
                    <el-col style="margin-top: 30px"></el-col>
                    <!-- <el-col ><div>本周新增用户</div></el-col>
                    <el-col ><div>1000</div></el-col>
                    <el-col class="chart-x"><i class="el-icon-caret-bottom"></i><em>10%</em><div>同比上周</div></el-col> -->
            </el-row>
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                    <div :class="{'user_active_tu': isactivetu}" style="float: left;cursor: pointer;" @click="cliktu(1)">柱状图</div>
                    <div :class="{'user_active_tu': isactivetu1}" style="float: left;cursor: pointer;margin-left: 10px;" @click="cliktu(2)">折线图</div>
                    <el-date-picker  style="float: right;margin-left: 10px;" v-model="dataTime" @change="choose(dataTime)" value-format="yyyy-MM" type="daterange" align="center" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    <div :class="{'user_active_time': isactivetime}" style="float: right;margin-left: 10px;cursor: pointer;" @click="cliktime(3)">本月</div>
                    <!-- <div style="float: right;margin-left: 10px;cursor: pointer;" @click="cliktime(2)">本周</div>
                    <div style="float: right;margin-left: 10px;cursor: pointer;" @click="cliktime(1)">今日</div> -->
                </div>
                <el-container style="float: left;">
                    <div id='userChart' style='height: 400px;width: 800px;' >图表加载失败</div>
                </el-container>
            </el-row>
        </el-col>
        <el-col :span='24' class='chart'>
            <p class="hui-title">活动用户趋势</p>
            <el-row class="chart-r" style="width: 200px;float: left;margin-top: 20px;">
                    <el-col ><div>本月活跃用户</div></el-col>
                    <el-col ><div>{{xinbenhuo}}</div></el-col>
                    <el-col :class="{'chart-t': iconbihuo, 'chart-x': !iconbihuo}"><i :class="{'el-icon-caret-top': !iconbihuo, 'el-icon-caret-bottom': iconbihuo}"></i><em>{{baihuo}}</em><div>同比上月</div></el-col>
                    <el-col style="margin-top: 30px"></el-col>
                    <!-- <el-col ><div>本周活跃用户</div></el-col>
                    <el-col ><div>1000</div></el-col>
                    <el-col class="chart-x"><i class="el-icon-caret-bottom"></i><em>10%</em><div>同比上周</div></el-col> -->
            </el-row>
            <el-row style="float: left;width: 800px;">
                <div style="width: 800px;height: 50px;margin-top: 20px;line-height: 40px;">
                        <div :class="{'user_active_tu': isactivetuhuo}" style="float: left;cursor: pointer;" @click="cliktuhuo(2)">折线图</div>
                        <div :class="{'user_active_tu': isactivetuhuo1}" style="float: left;cursor: pointer;margin-left: 10px;" @click="cliktuhuo(1)">柱状图</div>
                        <el-date-picker style="float: right;margin-left: 10px;" v-model="dataTimehuo" @change="choosehuo(dataTimehuo)" value-format="yyyy-MM" type="daterange" align="center" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        <div :class="{'user_active_time': isactivetimehuo}" style="float: right;margin-left: 10px;cursor: pointer;" @click="cliktimehuo(3)">本月</div>
                        <!-- <div style="float: right;margin-left: 10px;cursor: pointer;">本周</div>
                        <div style="float: right;color: green;margin-left: 10px;cursor: pointer;">今日</div> -->
                </div>
                <el-container style="float: left;">
                    <div id='userChart1' style='height: 400px;width: 800px;' >图表加载失败</div>
                </el-container>
            </el-row>
        </el-col>
      </el-row>
    </section>
</template>
<script>
import { dataUser,dataOrder,dataUserActive,dataUserList } from '@/api/url.js'
import echarts from 'echarts'
export default {
  data () {
    return {
      userdata: [],
      businessdata: [],
      dataUser: [],
      dataUserList: [],
      isactivetu: true,
      isactivetu1: false,
      isactivetime: true,
      dataTime: '',
      iconbi: true,
      type: '',
      xinben: '',
      bai: '',
      isactivetuhuo: true,
      isactivetuhuo1: false,
      isactivetimehuo: true,
      dataTimehuo: '',
      iconbihuo: true,
      typehuo: '',
      xinbenhuo: '',
      baihuo: ''
    }
  },
  methods: {
    cliktu (type) {
      // 新增用户趋势曲线图/柱状图切换
      if (type === 2) {
        // 曲线图
        this.isactivetu = false
        this.isactivetu1 = true
        if (this.isactivetime) {
          this.cliktime(3)
        } else {
          this.choose(this.dataTime)
        }
      } else if (type === 1) {
        // 柱状图
        this.isactivetu = true
        this.isactivetu1 = false
        if (this.isactivetime) {
          this.cliktime(3)
        } else {
          this.choose(this.dataTime)
        }
      }
    },
    choose (value) {
      // 新增用户趋势日期监听
      console.log('data', value)
      console.log('dataTime', this.dataTime)
      if (value !== null) {
        this.type = ''
        this.isactivetime = false
        this.userhttp (value)
      }
    },
    cliktime (type) {
      // 新增用户趋势本月按钮
      if (type === 3) {
        // 本月
        this.type = type
        this.dataTime = ''
        this.isactivetime = true
        this.isactivetime1 = false
        this.isactivetime2 = false
        var date = new Date()
        var seperator1 = "-"
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var months = date.getMonth()
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = "0" + month
        }
        if (months >= 1 && months <= 9) {
          months = "0" + months
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate
        }
        var datas = year + seperator1 + months
        var data = []
        data[0] = year + seperator1 + month
        data[1] = year + seperator1 + month
        console.log('t', data)
        this.userhttp (data, datas)
      }
    },
    userhttp (data, datas) {
      // 请求新增用户趋势数据
      var data1 = {'addUserFrom': data[0], 'addUserTo': data[1]}
      dataUser(data1).then(res => {
        if (res.success) {
          console.log('aaaaaa111')
          var dataUser1 = res.result
          var days = []
          var values = []
          console.log('datauser',dataUser1)
          for (var i = 0;i < dataUser1.length;i++) {
            days.push(dataUser1[i].days)
            values.push(dataUser1[i].value)
          }
          console.log('days',days)
          console.log('values',values)
          if (this.isactivetu) {
            // 当前选择的是柱状图
            this.$nextTick(function () {
              this.getUserChartInit (days, values)
            })
          } else {
            // 当前选择的是曲线图
            this.$nextTick(function () {
              this.clikqu (days, values)
            })
          }
          if (this.type === 3) {
            this.xinben = res.result[0].value
            this.getsuan (res.result[0].value, data[0], datas)
          }
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    getsuan (value, data, datas) {
      // 新增用户趋势-左侧同比
      var data1 = {'addUserFrom': datas, 'addUserTo': datas}
      dataUser(data1).then(res => {
        if (res.success) {
          // 同比=（本月-上月）/上月*100%
          var shang = res.result[0].value
          if ((value - shang) < 0) {
            // 下降
            this.iconbi = false
            console.log('v', value)
            console.log('s', shang)
            this.bai = Math.floor(Math.abs((value - shang)/value*100)) + '%'
            console.log('bai', this.bai)
          } else {
            // 上升
            this.iconbi = true
            console.log('v1', value)
            console.log('s1', shang)
            this.bai = Math.floor((value - shang)/value*100) + '%'
            console.log('bai1', this.bai)
          }
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    clikqu (days, values) {
      // 用户新增数据-曲线图
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
            name: '华东',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: values
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
    },
    getUserChartInit (days, values) {
      // 用户新增数据-柱状图
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
            name: '华东',
            type: 'bar',
            stack: '总量',
            areaStyle: { normal: {} },
            data: values
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
    },
    cliktuhuo (type) {
      // 活动用户趋势曲线图/柱状图切换
      if (type === 2) {
        // 曲线图
        this.isactivetuhuo = true
        this.isactivetuhuo1 = false
        if (this.isactivetimehuo) {
          this.cliktimehuo(3)
        } else {
          this.choosehuo(this.dataTimehuo)
        }
      } else if (type === 1) {
        // 柱状图
        this.isactivetuhuo = false
        this.isactivetuhuo1 = true
        if (this.isactivetimehuo) {
          this.cliktimehuo(3)
        } else {
          this.choosehuo(this.dataTimehuo)
        }
      }
    },
    choosehuo (value) {
      // 活动用户趋势日期监听
      console.log('data', value)
      console.log('dataTime', this.dataTimehuo)
      if (value !== null) {
        this.typehuo = ''
        this.isactivetimehuo = false
        this.userhttphuo (value)
      }
    },
    cliktimehuo (type) {
      // 活动用户趋势本月按钮
      if (type === 3) {
        // 本月
        this.typehuo = 3
        this.dataTimehuo = ''
        this.isactivetimehuo = true
        var date = new Date()
        var seperator1 = "-"
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var months = date.getMonth()
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = "0" + month
        }
        if (months >= 1 && months <= 9) {
          months = "0" + months
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate
        }
        var datas = year + seperator1 + months
        var data = []
        data[0] = year + seperator1 + month
        data[1] = year + seperator1 + month
        console.log('t', data)
        this.userhttphuo (data, datas)
      }
    },
    userhttphuo (data, datas) {
      // 请求活动用户趋势数据
      var data1 = {'activeFrom': data[0], 'activeTo': data[1]}
      dataUserActive(data1).then(res => {
        if (res.success) {
          console.log('aaaaaa111')
          var dataUser1 = res.result
          var days = []
          var values = []
          console.log('datauser',dataUser1)
          for (var i = 0;i < dataUser1.length;i++) {
            days.push(dataUser1[i].days)
            values.push(dataUser1[i].value)
          }
          console.log('days',days)
          console.log('values',values)
          if (this.isactivetuhuo) {
            // 当前选择的是曲线图
            this.$nextTick(function () {
              this.getActiveChartInit (days, values)
            })
          } else {
            // 当前选择的是柱状图
            this.$nextTick(function () {
              this.clikquhuo (days, values)
            })
          }
          if (this.typehuo === 3) {
            this.xinbenhuo = res.result[0].value
            this.getsuanhuo (res.result[0].value, data[0], datas)
          }
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    getsuanhuo (value, data, datas) {
      // 活动用户趋势-左侧同比
      var data1 = {'activeFrom': datas, 'activeTo': datas}
      dataUserActive(data1).then(res => {
        if (res.success) {
          // 同比=（本月-上月）/上月*100%
          var shang = res.result[0].value
          if ((value - shang) < 0) {
            // 下降
            this.iconbihuo = true
            console.log('vb', value)
            console.log('sb', shang)
            this.baihuo = Math.floor(Math.abs((value - shang)/value*100)) + '%'
            console.log('baib', this.baihuo)
          } else {
            // 上升
            this.iconbihuo = false
            console.log('v1b', value)
            console.log('s1b', shang)
            this.baihuo = Math.floor((value - shang)/value*100) + '%'
            console.log('bai1b', this.baihuo)
          }
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    clikquhuo (days, values) {
      // 活动用户数据-柱状图
      console.log('zhu')
      const myChart = echarts.init(document.getElementById('userChart1'))
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
            name: '华东',
            type: 'bar',
            stack: '总量',
            areaStyle: { normal: {} },
            data: values
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
    },
    getActiveChartInit (days, values) {
      // 用户活跃数据-曲线图
      console.log('qu')
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
            name: '华东',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: values
          }
        ]
      }
      myChart1.setOption(option)
      myChart1.hideLoading()
    },
    postData () {
      // 用户数据
      dataUserList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.userdata = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // 业务数据
      dataOrder().then(res => {
        console.log('data', res)
        if (res.success) {
          console.log('aaaaaa')
          this.businessdata = res.result
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
      this.postData()
      this.cliktime(3)
      this.cliktimehuo(3)
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
.chart{
  margin-left: 10px;
  margin-top:30px;
  background-color: white;
  border-radius: 4px;
}
.chart_left{
  margin-right:100px;
}
.user_active_tu{
  color: green;
}
.user_active_time{
  color: green;
}
</style>
