<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      通知详情（编辑）
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
      <el-form-item label="频道：">
        <el-select v-model="channel" size="small" style="width:110px">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知范围：">
        <el-select v-model="rolesId" size="small" style="width:110px">
          <el-option
            v-for="item in rolesIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型：" style="margin-right:0">
        <el-select v-model="type" size="small" style="width:110px">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth"
      style="display:block;margin-right:0">
        <el-input v-model="name" size="small" style="min-width:1002px"></el-input>
      </el-form-item>
      <el-form-item label="内容关键词：" :label-width="formLabelWidth"
      style="display:block;margin-right:0">
        <el-input v-model="contents" size="small" style="min-width:1002px"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:44px">
        <el-radio v-model="isAuto" label="1">不自动</el-radio>
        <el-radio v-model="isAuto" label="2">自动</el-radio>
      </el-form-item>
      <el-form-item label="发送时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="sendTime"
          type="datetime"
          placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="part-top">
      选择部分推送用户
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="用户/联系人名称：" label-width="150px">
      </el-form-item>
    </el-form>
    <div class="btn-box" >
      <el-button @click="sureBtn" type="primary" >确定</el-button>
      <el-button @click="cancel" type="primary" >取消</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'noticeDetail',
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
      name: '',
      contents: '',
      isAuto: null,
      sendTime: '',
      userList: []
    }
  },
  created () {
    axios.post('/api/c/common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      axios.post('/api/c/operation-management/notice/detail.json', {
        id: this.$route.params.id
      })
      .then(res => {
        this.id = res.data.result.id
        this.adminId = res.data.result.adminId
        this.adminName = res.data.result.adminName
        this.createdAt = res.data.result.createdAt
        this.channel = res.data.result.channel
        this.rolesId = res.data.result.rolesId
        this.type = res.data.result.type
        this.name = res.data.result.name
        this.contents = res.data.result.contents
        this.isAuto = res.data.result.isAuto.toString()
        this.sendTime = res.data.result.startTime
      })
      .catch(error => {
        console.log(error);
      })
    },
    sureBtn () {
      if (!this.contents) {
        this.$message({
          type: 'warning',
          message: '内容关键词不能为空'
        })
        return false
      }
      axios.post('/api/c/operation-management/notice/update.json', {
        id: this.$route.params.id,
        channel: this.channel,
        rolesId: this.rolesId,
        type: this.type,
        name: this.name,
        contents: this.contents,
        isAuto: this.isAuto,
        startTime: this.sendTime,
        userList: this.userList
      })
      .then(res => {
        if(res.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(function () {
            window.location.reload()
          },500)
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
      this.$router.push({name: 'notice'})
    }
  }
}
</script>

<style scoped>
  .part-top {
    height:40px;
    line-height: 40px;
    font-size: 16px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
</style>
