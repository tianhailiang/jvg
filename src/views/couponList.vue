<template>
  <section class="coupon-content">
    <h3 class="coupon-title">优惠券列表</h3>
    <el-row :gutter="20">
        <el-form label-width="80px">
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
                <el-form-item label="参与商品">
                    <el-select placeholder="" v-model="defaultValue" size="small">
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
                    <el-select placeholder="" v-model="defaultselectVal" size="small">
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
                    <el-select placeholder="" v-model="defaultselectVal" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in defaultdata"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="类型">
                    <el-select placeholder="" v-model="defaultselectVal" size="small">
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
                    <el-select placeholder="" v-model="defaultselectVal" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in defaultdata"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="领取方式">
                    <el-select placeholder="" v-model="defaultselectVal" size="small">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        :key="index"
                        v-for="(item, index) in defaultdata"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="发行方">
                    <el-select placeholder="" v-model="faxingValues" size="small">
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
        <el-button size="small" type="primary">创建优惠券</el-button>
    </div>
    <!--  -->
    <el-table :data="data" style="width: 100%" border size="medium">
        <el-table-column prop="currentid" type="selection" width="50" label="" align="center"></el-table-column>
        <el-table-column prop="currentid" width="90" label="优惠券名称" align="center"></el-table-column>
        <el-table-column prop="currentid" width="90" label="优惠金额/比例" align="center"></el-table-column>
        <el-table-column prop="teacherid" label="有效期" width="140" align="center"></el-table-column>
        <el-table-column prop="name" label="类型" width="100" align="center"></el-table-column>
        <el-table-column prop="type" label="已使用/已领取" width="140" align="center"></el-table-column>
        <el-table-column prop="typenum" label="限量" width="140" align="center"></el-table-column>
        <el-table-column prop="typenum" label="发行方" width="100" align="center"></el-table-column>
        <el-table-column prop="typenum" label="领取方式" width="100" align="center"></el-table-column>
        <el-table-column prop="typenum" label="发布状态" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger">删除</el-button>
                <el-button size="small" type="danger">发布</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="row-container">
        <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" type="primary" class="remove">批量删除</el-button>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'couponList',
    data () {
      return {
        defaultValue: '',
        defaultselectVal: '',
        faxingValues: '',
        teacher: [
          {value: '选项1', label: '全部'},
          {value: '选项2', label: '使用中'},
          {value: '选项3', label: '已过期'}
        ],
        defaultdata: [
          {value: '选项1', label: 'PC'},
          {value: '选项2', label: 'APP'},
          {value: '选项3', label: 'WAP'}
        ],
        faxingVal: [
          {value: '选项1', label: '全部'},
          {value: '选项2', label: '用户'},
          {value: '选项3', label: '平台'}
        ],

        data:[
          {teacherid: '001'}
        ]
      }
    }
  }
</script>
<style scoped>
.coupon-content{
  overflow: hidden;
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