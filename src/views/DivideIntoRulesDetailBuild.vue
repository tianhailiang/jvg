<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      分成规则（新建）
    </div>
    <el-form :inline="true">
      <el-form-item label="适用业务：" :label-width="formLabelWidth">
        <el-select v-model="suitBusiness" size="small" style="width:130px">
          <el-option
            v-for="item in suitBusinessList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="platform" size="small" style="width:130px">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="channel" size="small" style="width:130px">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分成名称：">
        <el-input v-model="name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分成类型：">
        <el-select v-model="dividedTypeId" size="small" style="width:130px">
          <el-option
            v-for="item in dividedTypeIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级类型：" :label-width="formLabelWidth">
        <el-select v-model="twoDividedTypeId" size="small" style="width:130px">
          <el-option
            v-for="item in twoDividedTypeIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="isStart" size="small"
          @change="onChange">
          <el-radio label="1">不自动</el-radio>
          <el-radio label="2">自动启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="启用时间：" v-if="isStart == 2">
        <el-date-picker
          v-model="timeVal"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" size="small"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <div class="divideInto-box">
        <span>分成方式：</span>
        <div class="divideIntoRadio-box">
          <el-radio v-model="type" label="1">按比例</el-radio>
          <el-form-item label="用户：">
            <el-input v-model="userProportion" size="small" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="平台：">
            <el-input v-model="userProportion" size="small" style="width:150px"></el-input>
          </el-form-item>
        </div>
        <div class="divideIntoRadio-box">
          <el-radio v-model="type" label="2">按固定金额</el-radio>
          <el-form-item label="平台：">
            <el-input v-model="userProportion" size="small" style="width:150px"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="btn-box" >
      <el-button @click="sureBtn" type="primary" >确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'divideIntoRulesDetailBuild',
  data () {
    return {
      formLabelWidth: '90px',
      suitBusiness: null,
      suitBusinessList:[{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '课程'
      }, {
        value: 2,
        label: '文章'
      }, {
        value: 3,
        label: '出版物'
      }],
      platform: null,
      platformList: [{
        value: 1,
        label: 'APP'
      }, {
        value: 2,
        label: 'WAP'
      }, {
        value: 3,
        label: 'PC'
      }],
      channel: null,
      channelList: [],
      name: '',
      dividedTypeId: null,
      dividedTypeIdList: [],
      twoDividedTypeId: null,
      twoDividedTypeIdList: [],
      isStart: null,
      timeVal: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      type: null,
      userProportion: ''
    }
  },
  components: {
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
  },
  methods: {
    onChange () {
      if (this.isStart == 1) {
        this.timeVal = []
      }
    },
    sureBtn () {
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .divideInto-box {
    display: flex;
    border:1px solid #dcdcdc;
    padding:10px
  }
  .divideIntoRadio-box {
    display: flex;
    flex-direction: column;
    border:1px solid #dcdcdc;
    align-items: center;
    padding-top:5px
  }
  .btn-box {
    display: flex;
    justify-content: center;
    margin-top:10px
  }
</style>
