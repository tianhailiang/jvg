<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      通知详情（新建）
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="频道：" :label-width="formLabelWidth">
        <el-select v-model="channel" size="small">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知范围：" :label-width="formLabelWidth">
        <el-select v-model="rolesId" size="small">
          <el-option
            v-for="item in rolesIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型：" :label-width="formLabelWidth">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容关键词：" :label-width="formLabelWidth" style="display:block">
        <el-input v-model="contents" size="small"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:44px">
        <el-radio v-model="isAuto" label="1">不自动</el-radio>
        <el-radio v-model="isAuto" label="2">自动</el-radio>
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
        <!-- <el-button @click="cancel" type="primary" >取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'noticeDetailBuild',
  data () {
    return {  
      formLabelWidth: '100px',
      id: '',
      adminId: null,
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
      contents: '',
      isAuto: null,
      sendTime: ''
    }
  },
  created () {
    axios.post('common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    sureBtn () {
      if (this.contents) {
        this.$message({
          type: 'warning',
          message: '内容关键词不能为空'
        })
      }
      axios.post('operation-management/notice/update.json', {
        id: this.$route.params.id,
        channel: this.channel,
        rolesId: this.rolesId,
        type: this.type,
        contents: this.contents,
        isAuto: this.isAuto,
        startTime: this.startTime
      })
      .then(res => {
        if(res.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(function() {
            this.$router.push({name: 'noticeDetail', params: {id: res.data.result.id}})
          }.bind(this),500)
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
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
