<template>
  <section class="coupon-content">
      <h3 class="coupon-title">优惠券审核管理</h3>
      <el-form label-width="80px">
        <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="优惠券名">
                      <el-input type="text" size="small" v-model="dataReview.title"></el-input>
                    </el-form-item>  
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="发行人">
                      <el-input type="text" size="small" v-model="dataReview.userName"></el-input>
                    </el-form-item> 
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="参选商品">
                  <el-select placeholder="" v-model="dataReview.productType" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in goods"></el-option>
                  </el-select>
                  </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="渠道">
                  <el-select placeholder="" v-model="dataReview.source" size="small">
                      <el-option 
                      :label="item.label"
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in defaultdata"></el-option>
                  </el-select>
                  </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="所属频道">
                  <el-select placeholder="" v-model="dataReview.channel" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in suoshu"></el-option>
                  </el-select>
                  </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="领取方式">
                  <el-select placeholder="" v-model="dataReview.type" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in linqu"></el-option>
                  </el-select>
                  </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="审核状态">
                  <el-select placeholder="" v-model="dataReview.shenheData" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in shenhe"></el-option>
                  </el-select>
                  </el-form-item>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="类型">
                  <el-select placeholder="" v-model="dataReview.couponType" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in types"></el-option>
                  </el-select>
                  </el-form-item>
              </div></el-col>
        </el-row>
      </el-form>
      <div class="search">
        <el-button type="primary" size="medium" @click="couponReviewlist()">搜索</el-button>
      </div>
      <!--  -->
      <el-table :data="tabeldata" style="width: 100%" border size="medium">
            <el-table-column prop="" type="selection" width="50" label="" align="center"></el-table-column>
            <el-table-column prop="title" width="110" label="优惠券名称" align="center"></el-table-column>
            <el-table-column prop="priceRatio" width="115" label="优惠金额/比例" align="center"></el-table-column>
            <el-table-column prop="couponTime" label="有效期" width="120" align="center"></el-table-column>
            <el-table-column prop="couponTypeVal" label="类型" width="100" align="center"></el-table-column>
            <el-table-column prop="useReceiveNumber" label="使用范围" width="140" align="center"></el-table-column>
            <el-table-column prop="number" label="限量" width="100" align="center"></el-table-column>
            <el-table-column prop="issuerVal" label="发行方" width="100" align="center"></el-table-column>
            <el-table-column prop="statusVal" label="审核状态" width="100" align="center"></el-table-column>
            <el-table-column label="操作" width="170" align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="danger">删除</el-button>
                    <el-button size="small" type="danger" @click="openModel()">不通过</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination background layout="prev, pager, next, jumper" :total="total"></el-pagination>
            <el-button size="small" type="primary">确定</el-button>
            <el-button size="small" type="primary" class="remove">批量删除</el-button>
        </div>
        <el-dialog title="不通过编辑提示窗口" :visible.sync="dialogVisible" width="30%">
          <el-form label-width="100px" class="demo-ruleForm">
              <el-form-item label="优惠券ID">
                <el-input type="text" size="small" :disabled="true" v-model="id"></el-input>
              </el-form-item>
              <el-form-item label="优惠券名称">
                  <el-input type="text" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="创建用户">
                  <el-input type="text" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="原因">
                <el-input type="textarea" size="small" v-model="statusMemo"></el-input>
              </el-form-item>
          </el-form>
          <span>提示：用户重新申请审核</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="isOkCoupon()">确 定</el-button>
          </span>
      </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'couponReview',
  data () {
    return{
      suoshuData: '',
      typeData: '',
      shenheData: '',
      defaultdata: [
        {value: '1', label: 'WAP'},
        {value: '2', label: 'APP'},
        {value: '3', label: 'PC'}
      ],
      goods: [
        {value: '1', label: '课程'},
        {value: '2', label: '出版物'},
        {value: '3', label: '留学'}
      ],
      suoshu: [
        {value: '1', label: '全部'},
        {value: '2', label: '留学'},
        {value: '3', label: '语培'}
      ],
      linqu: [
        {value: '1', label: '全部'},
        {value: '2', label: '购买前领取'},
        {value: '3', label: '购买后领取'}
      ],
      shenhe: [
        {value: '1', label: '全部'},
        {value: '2', label: '已通过'},
        {value: '3', label: '未通过'},
        {value: '4', label: '待审核'}
      ],
      types: [
        {value: '1', label: '满减'},
        {value: '2', label: '折扣'}
      ],
      tabeldata: [],
      total: null,
      dataReview: {
        title: '',
        source: 1,
        channel:1,
        productType: 1,
        issuer:1,
        userName: '',
        type:1,
        status:1,	
        couponType:''
      },
      dialogVisible: false,
      statusMemo: '',
      id: ''
    }
  },
  methods: {
    couponReviewlist() {
      axios.post(this.$store.state.api.couponReviewlist, {
        title: this.dataReview.title,
        source: 1,
        channel:1,
        productType: 1,
        issuer:1,
        userName:this.dataReview.userName,
        type:1,
        status:1,	
        couponType:this.dataReview.couponType
      }).then(res => {
        console.log(res)
        this.total = res.data.result.total
        this.tabeldata = res.data.result.modelData
      }).catch(error => {

      })
    },
    openModel() {
      this.dialogVisible = true
    },
    isOkCoupon() {
      axios.post(this.$store.state.api.Reviewlist, {
        id: 2,
        status: 2,
        statusMemo : this.statusMemo
      }).then(res => {
        console.log(res)
      }).catch(error => {

      })
    }
  }
}
</script>
<style scoped>
.coupon-content{overflow:hidden;}
.coupon-title{margin-bottom:15px;height:30px;border-bottom:solid 1px #dcdfe6;text-indent:20px;font-weight:600;line-height:30px;}
.coupon-content .search{ display: flex; justify-content: flex-end;padding-right:30px;border-bottom:solid 1px #dcdfe6;padding-bottom:15px;margin-bottom:15px; }
.page-container{ display: flex; justify-content: center;margin-top:20px;}
</style>