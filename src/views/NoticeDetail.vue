<template>
  <div>
    <div class="vue-nav">
      通知详情
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：" :label-width="formLabelWidth">
        {{$route.params.id}}
      </el-form-item>
      <el-form-item label="创建人：" :label-width="formLabelWidth">
        {{adminName}}
      </el-form-item>
      <el-form-item label="创建时间：" :label-width="formLabelWidth">
        {{createdAt}}
      </el-form-item>
      <el-form-item label="频道：" :label-width="formLabelWidth">
        <el-select v-model="channel" >
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知范围：" :label-width="formLabelWidth">
        <el-select v-model="rolesId" >
          <el-option
            v-for="item in rolesIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型：" :label-width="formLabelWidth">
        <el-select v-model="type" >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容关键词：" :label-width="formLabelWidth">
        <el-input v-model="keyword" size="small"></el-input>
      </el-form-item>
      <el-form-item >
        <el-radio v-model="isAuto" label="1">自动</el-radio>
      </el-form-item>
      <el-form-item label="发送时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="sendTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button @click="sureBtn" type="primary" >确定</el-button>
        <el-button @click="cancel" type="primary" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'noticeDetail',
  data () {
    return {  
      formLabelWidth: '100px',
      id: '',
      keyword: '',
      adminName: '',
      createdAt: '',
      channel: null,
      channelList: [],
      rolesId: null,
      rolesIdList:[{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '部分用户'
      }, {
        value: 3,
        label: 'VIP'
      }, {
        value: 4,
        label: '会员'
      }],
      type: null,
      typeList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '公告'
      }, {
        value: 2,
        label: '广告'
      }, {
        value: 3,
        label: '审核'
      }, {
        value: 4,
        label: '运营'
      }],
      isAuto: null,
      sendTime: ''
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      axios.post('operation-management/notice/detail.json', {
        id: this.$route.params.id
      })
      .then(res => {
        
      })
      .catch(error => {
        console.log(error);
      })
    },
    sureBtn () {

    },
    cancel () {
      
    }
  }
}
</script>

<style scoped>
  .btn-box {
    display: flex;
    justify-content: center;
  }
</style>
