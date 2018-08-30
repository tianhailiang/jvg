<template>
  <section class="coupon-content">
      <h3 class="coupon-title">优惠券审核管理</h3>
      <el-form label-width="80px">
        <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="优惠券名">
                      <el-input type="text" size="small"></el-input>
                    </el-form-item>  
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="发行人">
                      <el-input type="text" size="small"></el-input>
                    </el-form-item> 
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="参选商品">
                  <el-select placeholder="" v-model="goodsVal" size="small">
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
                  <el-select placeholder="" v-model="qudaoData" size="small">
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
                  <el-select placeholder="" v-model="suoshuData" size="small">
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
                  <el-select placeholder="" v-model="lingquData" size="small">
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
                  <el-select placeholder="" v-model="shenheData" size="small">
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
                  <el-select placeholder="" v-model="typeData" size="small">
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
        <el-button type="primary" size="medium">搜索</el-button>
      </div>
      <!--  -->
      <el-table :data="tabeldata" style="width: 100%" border size="medium">
            <el-table-column prop="currentid" type="selection" width="50" label="" align="center"></el-table-column>
            <el-table-column prop="currentid" width="110" label="优惠券名称" align="center"></el-table-column>
            <el-table-column prop="currentid" width="115" label="优惠金额/比例" align="center"></el-table-column>
            <el-table-column prop="teacherid" label="有效期" width="120" align="center"></el-table-column>
            <el-table-column prop="name" label="类型" width="100" align="center"></el-table-column>
            <el-table-column prop="type" label="使用范围" width="140" align="center"></el-table-column>
            <el-table-column prop="typenum" label="限量" width="100" align="center"></el-table-column>
            <el-table-column prop="typenum" label="发行方" width="100" align="center"></el-table-column>
            <el-table-column prop="typenum" label="审核状态" width="100" align="center"></el-table-column>
            <el-table-column label="操作" width="170" align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="danger">删除</el-button>
                    <el-button size="small" type="danger">发布</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            <el-button size="small" type="primary">确定</el-button>
            <el-button size="small" type="primary" class="remove">批量删除</el-button>
        </div>
  </section>
</template>
<script>
export default {
  name: 'couponReview',
  data () {
    return{
      goodsVal: '',
      qudaoData: '',
      suoshuData: '',
      lingquData: '',
      typeData: '',
      shenheData: '',
      defaultdata: [
        {value: '选项1', label: 'WAP'},
        {value: '选项2', label: 'APP'},
        {value: '选项3', label: 'PC'}
      ],
      goods: [
        {value: '选项1', label: '课程'},
        {value: '选项2', label: '出版物'},
        {value: '选项3', label: '留学'}
      ],
      suoshu: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: '留学'},
        {value: '选项3', label: '语培'}
      ],
      linqu: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: '购买前领取'},
        {value: '选项3', label: '购买后领取'}
      ],
      shenhe: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: '已通过'},
        {value: '选项3', label: '未通过'},
        {value: '选项4', label: '待审核'}
      ],
      types: [
        {value: '选项2', label: '满减'},
        {value: '选项3', label: '折扣'}
      ],
      tabeldata: [
        {currentid: '001'}
      ]
    }
  },
  methods: {}
}
</script>
<style scoped>
.coupon-content{overflow:hidden;}
.coupon-title{margin-bottom:15px;height:30px;border-bottom:solid 1px #dcdfe6;text-indent:20px;font-weight:600;line-height:30px;}
.coupon-content .search{ display: flex; justify-content: flex-end;padding-right:30px;border-bottom:solid 1px #dcdfe6;padding-bottom:15px;margin-bottom:15px; }
.page-container{ display: flex; justify-content: center;margin-top:20px;}
</style>