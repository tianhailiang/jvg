<template>
  <div >
    <div class="nav" >
      返利新建
    </div>
    <el-form :model="formInline" :inline="true" style="float:left">
      <el-form-item label="ID：" :label-width="formLabelWidth" style="display:block">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="渠道：" :label-width="formLabelWidth" >
        <el-select v-model="formInline.platform" >
          <el-option
            v-for="item in formInline.platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邀请分类：">
        <el-select v-model="formInline.classify" >
          <el-option
            v-for="item in formInline.classifyList"
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
      <el-form-item label="返利名称：" :label-width="formLabelWidth" style="display:block">
        <el-input v-model="formInline.rebateName" size="small"></el-input>
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
      <el-form-item label="邀请第一个好友：" :label-width="formLabelWidth" style="display:block">
        <el-button @click="selectCoupon1">选择优惠券</el-button>
      </el-form-item>
      <div style="display:block">
        <el-form-item  label="优惠券ID：" :label-width="formLabelWidth">
          {{formInline.couponId1}}
        </el-form-item>
        <el-form-item  label="优惠券描述：" :label-width="formLabelWidth">
          {{formInline.couponDescribe1}}
        </el-form-item>
      </div>
      <el-form-item label="邀请第二个好友：" :label-width="formLabelWidth" style="display:block">
        <el-button @click="selectCoupon2">选择优惠券</el-button>
      </el-form-item>
      <div style="display:block">
        <el-form-item  label="优惠券ID：" :label-width="formLabelWidth">
          {{formInline.couponId2}}
        </el-form-item>
        <el-form-item  label="优惠券描述：" :label-width="formLabelWidth">
          {{formInline.couponDescribe2}}
        </el-form-item>
      </div>
      <el-form-item label="邀请第三个好友：" :label-width="formLabelWidth" style="display:block">
        <el-button @click="selectCoupon3">选择优惠券</el-button>
      </el-form-item>
      <div style="display:block">
        <el-form-item  label="优惠券ID：" :label-width="formLabelWidth">
          {{formInline.couponId3}}
        </el-form-item>
        <el-form-item  label="优惠券描述：" :label-width="formLabelWidth">
          {{formInline.couponDescribe3}}
        </el-form-item>
      </div>
      <el-form-item label="邀请第四个好友：" :label-width="formLabelWidth" style="display:block">
        赠送会员金额：<el-input v-model="formInline.giveMoney" size="small" style="display:inline-block;width:110px"></el-input>
      </el-form-item>
      <el-form-item label="被邀请人优惠：" :label-width="formLabelWidth" style="display:block">
        <el-button @click="selectCoupon4">选择优惠券</el-button>
      </el-form-item>
      <div style="display:block">
        <el-form-item  label="优惠券ID：" :label-width="formLabelWidth">
          {{formInline.couponId4}}
        </el-form-item>
        <el-form-item  label="优惠券描述：" :label-width="formLabelWidth">
          {{formInline.couponDescribe4}}
        </el-form-item>
      </div>
      <el-form-item style="padding-left:100px">
        <el-button type="primary">确定</el-button>
        <el-button>取 消</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择优惠券列表 -->
    <CouponListDialog :dialogFormVisible.sync="dialogFormVisible" :dialogForm="dialogForm" />
  </div>
</template>

<script>
import CouponListDialog from '@/components/CouponListDialog.vue'
export default {
  name: 'rebateRegister',
  data () {
    return {
      formInline: {
        id: '',
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
        rebateName: '',
        startTime: '',
        endTime: '',
        classify: '0',
        classifyList: [{
          value: '0',
          label: '注册'
        }, {
          value: '1',
          label: '课程'
        }],
        couponId1: '',
        couponDescribe1: '',
        couponId2: '',
        couponDescribe2: '',
        couponId3: '',
        couponDescribe3: '',
        couponId4: '',
        couponDescribe4: '',
        giveMoney: ''
      },
      formLabelWidth: '125px',
      dialogFormVisible: false,
      dialogForm: ''
    }
  },
  components: {
    CouponListDialog
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    selectCoupon1 () {
      this.dialogFormVisible = true
    },
    selectCoupon2 () {
      this.dialogFormVisible = true
    },
    selectCoupon3 () {
      this.dialogFormVisible = true
    },
    selectCoupon4 () {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px
  }
</style>
