<template>
  <section class="reservation-content">
    <h3 class="reservation-title">预约活动详情</h3>
    <el-row :gutter="20">
        <el-form label-width="80px">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动名称">
                    <el-input type="text" size="small" v-model="activityData.title"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动ID">
                    <el-input v-model="activityData.id" size="small" :disabled="true" placeholder="自动获取"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动地点">
                    <el-input type="text" size="small" v-model="activityData.address"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="渠道">
                    <el-select v-model="activityData.sourceName" size="small">
                      <el-option 
                      :label="items.label" 
                      :value="items.value"
                      v-for="(items, index) in value2Data"
                      ></el-option>
                    </el-select>
                  </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="所属频道">
                    <el-select v-model="activityData.channelName" size="small">
                      <el-option 
                      :label="items.label" 
                      :value="items.value"
                      v-for="(items, index) in value1Data"></el-option>
                    </el-select>
                  </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="开始时间">
                    <el-input type="text" size="small" v-model="activityData.startTime"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="结束时间">
                    <el-input type="text" size="small" v-model="activityData.endTime"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="针对人群">
                    <el-input type="text" size="small" v-model="activityData.crowd"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="预约专线">
                    <el-input type="text" size="small" v-model="activityData.tel"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="活动亮点">
                    <el-input type="text" size="small" v-model="activityData.lightspot"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="举办城市">
                    <el-autocomplete size="small" class="inline-input" 
                    v-model="activityData.cityName" 
                    :fetch-suggestions="querySearch">
                  </el-autocomplete>
                  </el-form-item>
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple">
                  <el-form-item label="活动内容">
                      <el-input type="textarea" v-model="activityData.content"></el-input>
                  </el-form-item>
            </div></el-col>
        </el-form>
    </el-row>
    <div class="submit-group">
        <el-button type="primary" size="small">提交</el-button>
        <el-button type="primary" size="small">取消</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      region: '',
      activityData:{
        id:'',
        title:'',
        startTime:'',
        endTime:'',
        crowd: '',
        lightspot: '',
        tel: '',
        cityName: '',		
        content: '',
        source: 2,
        sourceName: '',
        channel: 1,
        channelName: '',
        address: ''
      },
      city: [
        {value: '北京'},
        {value: '济南'},
        {value: '郑州'}
      ],
      value2Data: [
        {value: '1',label: 'APP'},
        {value: '2',label: 'PC'},
        {value: '3',label: 'WAP'}
      ],
      value1Data: [
        {value: '1',label: '全部'},
        {value: '2',label: '留学'},
        {value: '3',label: '语培'}
      ]
    }
  },
  created() {
    this.scheduledEventDetail()
  },
  methods: {
    querySearch(queryString, cb) {
        var cityName = this.city
        var results = queryString ? cityName.filter(this.createFilter(queryString)) : cityName
        // 调用 callback 返回建议列表的数据
        cb(results)
    },
    createFilter(queryString) {
      return (cityName) => {
        return (cityName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    scheduledEventDetail() {
      axios.post(this.$store.state.api.searchActivityDetail, {
        id:1
      }).then(res => {
        console.log(res)
        // this.activityData.id = res.data.result.id
        // this.activityData.channelName = res.data.result.channelName
        // this.activityData.title = res.data.result.title
        // this.activityData.cityName = res.data.result.cityName
        // this.activityData.content = res.data.result.content
        // this.activityData.startTime = res.data.result.startTime
        // this.activityData.endTime = res.data.result.endTime
        // this.activityData.aaddress = res.data.result.aaddress
        // this.activityData.crowd = res.data.result.crowd
        // this.activityData.lightspot = res.data.result.lightspot
        // this.activityData.tel = res.data.result.tel
        // this.activityData.cityName = res.data.result.cityName
        // this.activityData.content = res.data.result.content
        // this.activityData.sourceName = res.data.result.sourceName
        // this.activityData.address = res.data.result.address
        let { id,
              title,
              startTime,
              endTime,
              crowd,
              lightspot,
              tel,
              cityName,		
              content,
              source,
              sourceName,
              channel,
              channelName,
              address } = res.data.result

      }).catch(error => {

      })
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_reserva.css';
.submit-group{
  display: flex;
  justify-content: center;
  margin-top:20px;
}
</style>