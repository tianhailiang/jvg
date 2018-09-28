<template>
  <section class="reservation-content" style="margin-left:260px;">
    <h3 class="reservation-title">预约活动列表</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="活动名称">
                  <el-input v-model="reserform.title" size="small"></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="所属频道">
                    <el-select placeholder="" v-model="reserform.channelName" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in value1Data"></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="渠道">
                    <el-select placeholder="" v-model="reserform.sourceName" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in value2Data"></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="状态">
                    <el-select placeholder="" v-model="reserform.status" size="small">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in value3Data"></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
              <div class="grid-content bg-purple">
                  <el-form-item label="活动时间">
                      <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="reserform.activityStartTime" size="small"></el-date-picker>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="reserform.activityEntTime" style="width: 100%;" size="small"></el-time-picker>
                      </el-col>
                  </el-form-item>
              </div>
          </el-col>
          <div class="search">
            <el-button type="primary" size="small" @click="searchreservation()">搜索</el-button>
            <el-button type="primary" size="small" @click="addactivitydetail()">创建活动</el-button>
          </div>
      </el-form>
    </el-row>
    <!--  -->
    <el-table :data="tabeldata" style="width: 100%" border size="medium" v-loading="loading">
        <el-table-column type="selection" width="60" label="" align="center"></el-table-column>
        <el-table-column prop="title" width="160" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="startTime" label="活动开始时间" width="165" align="center"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="140" align="center"></el-table-column>
        <el-table-column prop="source" label="渠道" width="140" align="center"></el-table-column>
        <el-table-column prop="channel" label="频道" width="140" align="center"></el-table-column>
        <el-table-column prop="cityName" label="活动城市" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="removereservation(scope.$index, scope.row)">删除</el-button>
                <el-button size="small" type="danger" @click="searchActivityDetail(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="page-container" v-if="tabeldata.length">
        <el-pagination 
        layout="prev, pager, next, jumper"
        background
        :total="total" :page-size="20"></el-pagination>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" type="primary" class="remove">批量删除</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      reserform: {
        title: '',
        activityEntTime: '',
        activityStartTime: '',
        status: '',
        sourceName: '',
        channelName: ''
      },
      loading: false,
      total: null,
      value1Data: [
        {value: '1',label: '全部'},
        {value: '2',label: '留学'},
        {value: '3',label: '语培'}
      ],
      value2Data: [
        {value: '1',label: 'APP'},
        {value: '2',label: 'PC'},
        {value: '3',label: 'WAP'}
      ],
      value3Data: [
        {value: '1',label: '全部'},
        {value: '2',label: '进行中'},
        {value: '3',label: '已结束'}
      ],
      tabeldata: []
    }
  },
  created() {
    // this.searchreservation()
  },
  methods: {
    searchreservation() {
      this.loading = true
      axios.post(this.$store.state.api.searchreservation, {
        title: this.reserform.title,
        // activityEntTime: this.reserform.activityEntTime,
        // activityStartTime: this.reserform.activityStartTime,
        // status: this.reserform.status,
        // sourceName: this.reserform.sourceName,
        // channelName: this.reserform.channelName
      }).then(res => {
        this.tabeldata = res.data.result.modelData
        this.total = res.data.result.total
        this.loading = false
      }).catch(error => {

      })
    },
    removereservation(index, row) {
      axios.post(this.$store.state.api.removereservation, {
        ids: [row.id]
      }).then(res => {
        
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(error => {

      })
    },
    addactivitydetail() {
      this.$router.push({name: 'scheduledEventDetail', params:{id: 2}})
    },
    searchActivityDetail(index, row) {
      this.$router.push({name: 'scheduledEventDetail', params:{id: row.id}})
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_reserva.css';
.search{display: inline-block;margin-top:5px;}
</style>