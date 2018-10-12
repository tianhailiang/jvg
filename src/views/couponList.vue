<template>
  <section class="coupon-content">
    <h3 class="coupon-title">优惠券列表</h3>
    <el-row :gutter="20">
        <el-form label-width="80px">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="优惠券名">
                    <el-input type="text" size="small" v-model="formgroup.title"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="发行人">
                    <el-input type="text" size="small" v-model="formgroup.userName"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="参与商品">
                    <el-select placeholder="" v-model="formgroup.productType" size="small">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in teacher"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="渠道">
                    <el-select placeholder="" v-model="formgroup.source" size="small">
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
                    <el-select placeholder="" v-model="formgroup.channel" size="small">
                        <el-option
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in defaultsuo"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="类型">
                    <el-select placeholder="" v-model="formgroup.couponType" size="small">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in defaultdata"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="发布状态">
                    <el-select placeholder="" v-model="formgroup.status" size="small">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in defaultdata2"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="领取方式">
                    <el-select placeholder="" v-model="formgroup.type" size="small">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in defaultdata1"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="发行方">
                    <el-select placeholder="" v-model="formgroup.issuer" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in faxingVal"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
        </el-form>
    </el-row>
    <div class="search-plane">
        <el-button size="small" type="primary">搜索</el-button>
        <el-button size="small" type="primary" @click="createCoupon()">创建优惠券</el-button>
    </div>
    <!--  -->
    <el-table :data="dataCoupon" @selection-change="handleSelectionChange" style="width: 100%" border size="medium">
        <el-table-column prop="id" type="selection" width="50" label="" align="center"></el-table-column>
        <el-table-column prop="id" width="90" label="优惠券Id" align="center">
            <template slot-scope="scope">
                <el-button size="small" @click="opencoupon(scope.$index, scope.row)">{{scope.row.id}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="title" width="90" label="优惠券名称" align="center"></el-table-column>
        <el-table-column prop="priceRatio" width="90" label="优惠金额/比例" align="center"></el-table-column>
        <el-table-column prop="couponTime" label="有效期" width="140" align="center"></el-table-column>
        <el-table-column prop="couponTypeVal" label="类型" width="100" align="center"></el-table-column>
        <el-table-column prop="useReceiveNumber" label="已使用/已领取" width="140" align="center"></el-table-column>
        <el-table-column prop="number" label="限量" width="140" align="center"></el-table-column>
        <el-table-column prop="issuerVal" label="发行方" width="100" align="center"></el-table-column>
        <el-table-column prop="typeVal" label="领取方式" width="100" align="center"></el-table-column>
        <el-table-column prop="statusVal" label="发布状态" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="removecouponList(scope.$index, scope.row)">删除</el-button>
                <el-button size="small" type="danger" @click="disableCoupon()">禁用</el-button>
                <el-button size="small" type="danger" @click="releaseCoupon()">发布</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="row-container" style="margin:30px 0;">
        <el-pagination background
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="15"
        :total="total"
        :current-page="pageNo"
        :page-sizes="[10, 15, 20, 25, 30]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" type="primary" class="remove" @click="batchDeletCoupon()">批量删除</el-button>
    </div>
    <!--  -->
    <el-dialog title="不通过编辑提示窗口" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="优惠券ID">
            <el-input type="text" size="small" v-model="id"></el-input>
          </el-form-item>
          <el-form-item label="优惠券名称">
              <el-input type="text" size="small" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建用户">
              <el-input type="text" size="small" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="原因">
            <el-input type="textarea" size="small" v-model="downMemo"></el-input>
          </el-form-item>
      </el-form>
      <span>提示：用户重新申请审核</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="opendisableCoupon()">确 定</el-button>               
      </span>
  </el-dialog>
  </section>
</template>
<script>
  import {couponList,removecouponList,disableCoupon,releaseCoupon} from '@/api/url.js'
  export default {
    name: 'couponList',
    data () {
      return {
        defaultValue: '',
        defaultselectVal: '',
        total: null,
        formgroup: {
          issuer: 1,
          productType:1,
          source: '',
          channel: '',
          issuer: '',
          userName:'',
          type:'',
          status:'',
          couponType: 1,
          title:''
        },
        teacher: [
          {value: '1', label: '课程'},
          {value: '2', label: '留学'},
          {value: '3', label: '出版物'}
        ],
        defaultdata: [
          {value: '1', label: 'PC'},
          {value: '2', label: 'APP'},
          {value: '3', label: 'WAP'}
        ],
        defaultsuo: [
          {value: '1', label: '全部'},
          {value: '2', label: '留学'},
          {value: '3', label: '语培'}
        ],
        faxingVal: [
          {value: '1', label: '全部'},
          {value: '2', label: '用户'},
          {value: '3', label: '平台'}
        ],
        defaultdata1: [
          {value: '1', label: '全部'},
          {value: '2', label: '购买前领取'},
          {value: '3', label: '购买后领取'}
        ],
        defaultdata2: [
          {value: '1', label: '已发布'},
          {value: '2', label: '审核通过'},
          {value: '3', label: '不通过'},
          {value: '4', label: '全部'}
        ],
        dataCoupon:[],
        multipleSelection: [],
        downMemo: '',
        id: '' ,
        dialogVisible: false,
        pageNo: 0,
        pageSize: 15
      }
    },
    created() {
      this.searchcouponList()
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.searchcouponList()
      },
      searchcouponList() {
        couponList({
          title: this.formgroup.title,
          productType: this.productType,
          source: this.source,
          channel: this.channel,
          issuer: this.issuer,
          userName: this.userName,
          type:this.type,
          status:this.status,
          couponType: this.couponType,
          pageNo:this.pageNo,
          pageSize:this.pageSize
        }).then(res => {
          this.dataCoupon = res.result.modelData
          this.total = res.result.total
          this.$message({
            type: 'success',
            message: '查询成功!'
          })
        }).catch(error => {

        })
      },
      opencoupon(index, row) {
        this.$router.push({ name: 'couponDetails', params: {id: row.id}})
      },
      createCoupon() {
        this.$router.push({ path: 'couponDetailsCopy' })
      },
      removecouponList(index, row) {
        removecouponList({
          id: [row.id]
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(error => {
          this.$message({
            type: 'info',
            message: '删除失败'
          })
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(val)
      },
      batchDeletCoupon() {
        let defaultObj = []
        this.multipleSelection.forEach((item, index, array) => {
          defaultObj.push(item.id)
        })
        removecouponList({id:defaultObj}).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(error => {

        })
      },
      disableCoupon() {
        this.dialogVisible = true
      },
      opendisableCoupon() {
        disableCoupon({
          id: this.id,
          upDown: 1,
          downMemo: this.downMemo
        }).then(res => {
          console.log(res)
        }).catch(error => {

        })
      },
      releaseCoupon() {
        releaseCoupon({
          id:1,
        }).then(res => {
          console.log(res)
        }).catch(error => {

        })
      }
    }
  }
</script>
<style scoped>
.coupon-content{
  overflow: hidden;
  margin-left:260px;
}
.coupon-title{
  height: 30px;
  line-height: 30px;
  border-bottom: solid 1px #ccc;
  text-indent: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}
.search-plane{
  display: flex;
  margin-bottom: 30px;
  justify-content:flex-end;
  margin-right: 30px;
}
.row-container{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.row-container .remove{
  margin-left:60px;
}
</style>