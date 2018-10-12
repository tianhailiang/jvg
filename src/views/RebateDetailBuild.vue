<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      返利新建-注册
    </div>
    <el-form :inline="true">
      <el-form-item label="渠道：" :label-width="formLabelWidth" >
        <el-select v-model="platform" size="small" style="width:110px">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邀请分类：">
        <el-select v-model="type" size="small" style="width:110px">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="返利名称：">
        <el-input v-model="name" size="small" style="width:130px"></el-input>
      </el-form-item>
      <el-form-item label="有效期：">
        <el-date-picker
          v-model="timeVal"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" 
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small">
        </el-date-picker>
      </el-form-item>
      <div class="user-box">
        <el-form-item label="邀请第一个好友：" :label-width="formLabelWidth1" style="display:block">
          <el-button @click="selectCoupon(0)">选择优惠券</el-button>
        </el-form-item>
        <div style="display:block" v-if="userRegisteredMemo[0]">
          <el-form-item  label="优惠券ID：" :label-width="formLabelWidth1">
            
          </el-form-item>
          <el-form-item  label="优惠券描述：">
            
          </el-form-item>
        </div>
        <el-form-item label="邀请第二个好友：" :label-width="formLabelWidth1" style="display:block">
          <el-button @click="selectCoupon(1)">选择优惠券</el-button>
        </el-form-item>
        <div style="display:block" v-if="userRegisteredMemo[1]">
          <el-form-item  label="优惠券ID：" :label-width="formLabelWidth1">
            
          </el-form-item>
          <el-form-item  label="优惠券描述：">
            
          </el-form-item>
        </div>
        <el-form-item label="邀请第三个好友：" :label-width="formLabelWidth1" style="display:block">
          <el-button @click="selectCoupon(2)">选择优惠券</el-button>
        </el-form-item>
        <div style="display:block" v-if="userRegisteredMemo[2]">
          <el-form-item  label="优惠券ID：" :label-width="formLabelWidth1">
          
          </el-form-item>
          <el-form-item  label="优惠券描述：">
            
          </el-form-item>
        </div>
        <el-form-item label="邀请第四个好友：" :label-width="formLabelWidth1" style="display:block">
          赠送会员金额：<el-input v-model="userRegisteredMore" size="small" style="display:inline-block;width:110px"></el-input>
        </el-form-item>
        <el-form-item label="被邀请人优惠：" :label-width="formLabelWidth1" style="display:block">
          <el-button @click="selectCoupon(3)">选择优惠券</el-button>
        </el-form-item>
        <div style="display:block" v-if="userRegisteredMemo[3]">
          <el-form-item  label="优惠券ID：" :label-width="formLabelWidth">
            
          </el-form-item>
          <el-form-item  label="优惠券描述：">
            
          </el-form-item>
        </div>
      </div>
      <el-form-item class="btn-box">
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
      formLabelWidth: '80px',
      formLabelWidth1: '150px',
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
      type: null,
      typeList: [{
        value: 1,
        label: '注册'
      }, {
        value: 2,
        label: '课程'
      }],
      name: '',
      timeVal: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      userRegisteredMemo:[],
      userRegisteredMore: '',
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
    selectCoupon () {
      if (!this.platform) {
        this.$message({
          type: 'warning',
          message: '请先选择渠道'
        })
        return false
      }
      if (!this.type) {
        this.$message({
          type: 'warning',
          message: '请先选择分类'
        })
        return false
      }
      this.dialogFormVisible = true
    },
    onSelectList ($event) {
      /* 先初始化去重 */
      this.tableData.forEach((item, index, arr) => {
        $event.forEach((eitem, eindex, earr) => {
          if (eitem.productId === item.productId) {
            earr.splice(eindex, 1)
          }
        })
      })
      this.tableData = [...$event, ...this.tableData]
    }
  }
}
</script>
<style scoped>
  .user-box {
    display:flex;
    flex-direction:column;
    padding-left: 37%;
  }
  .btn-box {
    display:flex;
    justify-content: center;
  }
</style>
