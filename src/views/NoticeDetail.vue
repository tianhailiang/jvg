<template>
  <div>
    <div class="nav">
      通知详情
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：" :label-width="formLabelWidth">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="创建人：" :label-width="formLabelWidth">
        {{formInline.creater}}
      </el-form-item>
      <el-form-item label="创建时间：" :label-width="formLabelWidth">
        {{formInline.createTime}}
      </el-form-item>
      <el-form-item label="频道：" :label-width="formLabelWidth">
        <el-select v-model="formInline.channel" >
          <el-option
            v-for="item in formInline.channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知范围：" :label-width="formLabelWidth">
        <el-select v-model="formInline.noticeRange" >
          <el-option
            v-for="item in formInline.noticeRangeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型：" :label-width="formLabelWidth">
        <el-select v-model="formInline.newsType" >
          <el-option
            v-for="item in formInline.newsTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容关键词：" :label-width="formLabelWidth">
        <el-input v-model="formInline.keyword" size="small"></el-input>
      </el-form-item>
      <el-form-item >
        <el-radio v-model="formInline.automatic" label="1">自动</el-radio>
      </el-form-item>
      <el-form-item label="发送时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="formInline.sendTime"
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
      formInline: {
        id: '',
        keyword: '',
        creater: '',
        createTime: '',
        channel: '0',
        channelList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '语培'
        }, {
          value: '2',
          label: '留学'
        }],
        noticeRange: '0',
        noticeRangeList:[{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '全部用户'
        }, {
          value: '2',
          label: '部分用户'
        }, {
          value: '3',
          label: 'vip'
        }],
        newsType: '0',
        newsTypeList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '公告消息'
        }, {
          value: '2',
          label: '广告消息'
        }, {
          value: '3',
          label: '审核消息'
        }, {
          value: '4',
          label: '营销消息'
        }, {
          value: '5',
          label: '反馈消息'
        }],
        automatic: '0'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    sureBtn () {

    },
    cancel () {
      
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .btn-box{
    display: flex;
    justify-content: center;
  }
</style>
