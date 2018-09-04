<template>
  <el-dialog title="分成新建/编辑" :visible.sync="dialogFormVisible" :before-close="handleClose">
    <el-form :model="formInline" :inline="true">
      <el-form-item label="ID：" :label-width="formLabelWidth">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="适用业务：" >
        <el-select v-model="formInline.suitBusiness" >
          <el-option
            v-for="item in formInline.suitBusinessList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道：" :label-width="formLabelWidth">
        <el-select v-model="formInline.platform" >
          <el-option
            v-for="item in formInline.platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：" style="display: inline-block">
        <el-select v-model="formInline.channel" >
          <el-option
            v-for="item in formInline.channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div style="display:block">
        <el-form-item label="创建人：" :label-width="formLabelWidth">
          {{formInline.creater}}
        </el-form-item>
        <el-form-item label="创建时间：" style="display: inline-block"> 
          {{dialogForm.createTime}}
        </el-form-item>
      </div>
      <el-form-item label="分成名称：" :label-width="formLabelWidth" style="display:block">
        <el-input v-model="formInline.rulesName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分成类型：" :label-width="formLabelWidth" style="display:block">
        <el-select v-model="formInline.divideType" >
          <el-option
            v-for="item in formInline.divideTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级类型：" :label-width="formLabelWidth" style="display:block">
        <el-select v-model="formInline.secondaryType" >
          <el-option
            v-for="item in formInline.secondaryTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启用时间：" :label-width="formLabelWidth" style="display:block">
        <el-date-picker
          v-model="formInline.startTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" :label-width="formLabelWidth" style="display:block">
        <el-date-picker
          v-model="formInline.endTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <div class="divideInto-box" >
        <span>分成方式：</span>
        <div class="divideIntoRadio-box">
          <el-radio v-model="formInline.divideIntoRadio" label="1">按比例</el-radio>
          <el-form-item label="用户：">
            <el-input v-model="formInline.userProportion" size="small" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="平台：">
            <el-input v-model="formInline.platformProportion" size="small" style="width:150px"></el-input>
          </el-form-item>
        </div>
        <div class="divideIntoRadio-box">
          <el-radio v-model="formInline.divideIntoRadio" label="2">按固定金额</el-radio>
          <el-form-item label="平台：">
            <el-input v-model="formInline.platformMoney" size="small" style="width:150px"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:dialogFormVisible',false)">确定</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'divideBuildDialog',
  props: ['dialogFormVisible','dialogForm'],
  data () {
    return {
      formInline: {
        suitBusiness: '0',
        suitBusinessList:[{
          value: '0',
          label: '课程'
        }, {
          value: '1',
          label: '文章'
        }, {
          value: '2',
          label: '出版物'
        }],
        platform: '0',
        platformList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: 'APP'
        }, {
          value: '2',
          label: 'WAP'
        }, {
          value: '3',
          label: 'PC'
        }],
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
        creater: '',
        createTime: '',
        rulesName: '',
        divideType: '0',
        divideTypeList: [],
        secondaryType: '0',
        secondaryTypeList: [],
        startTime: '',
        endTime: '',
        divideIntoRadio: '',
        userProportion: '',
        platformProportion: '',
        platformMoney: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    }
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
</style>
