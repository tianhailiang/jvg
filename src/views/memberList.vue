<template>
  <section class="member-content">
    <h3 class="content-title">会员列表</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="会员名称">
                  <el-input type="text" size="small"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="当前状态">
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
            <el-form-item label="会员等级">
                <el-col :span="10">
                  <el-input type="text" v-model="form.date1" style="width: 100%;" size="small"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="10">
                  <el-input type="text" v-model="form.date2" style="width: 100%;" size="small"></el-input>
                </el-col>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6">
            <div class="grid-content">
                <el-form-item label="是否VIP">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
          </el-col>
      </el-form>
    </el-row>
    <!--  -->
    <div class="vip-content">
        <span>累计会员<strong>5000</strong></span>
        <el-button size="small" type="primary">搜索</el-button>
    </div>
    <!--  -->
    <el-table :data="data" style="width: 100%" border>
        <el-table-column prop="currentid" type="selection" width="50" label="" align="center"></el-table-column>
        <el-table-column prop="currentid" width="90" label="会员ID" align="center"></el-table-column>
        <el-table-column prop="teacherid" label="会员名称" width="120" align="center"></el-table-column>
        <el-table-column prop="name" label="是否VIP" width="100" align="center"></el-table-column>
        <el-table-column prop="type" label="会员等级" width="120" align="center"></el-table-column>
        <el-table-column prop="typenum" label="当前状态" width="120" align="center"></el-table-column>
        <el-table-column prop="typenum" label="会员加入时间" width="120" align="center"></el-table-column>
        <el-table-column prop="typenum" label="会员积分" width="120" align="center"></el-table-column>
        <el-table-column prop="typenum" label="会员加入时间" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger">编辑</el-button>
                <el-button size="small" type="danger">冻结</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--  -->
    <div class="row-container">
      <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
      <el-button size="small" type="primary">确定</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'memberList',
  data () {
    return {
      defaultValue: '',
      teacher: [
        {value: '选项1', label: '全部'}, 
        {value: '选项2', label: '使用中'},
        {value: '选项3', label: '已过期'}
      ],
      data: [
        {currentid: '001'}
      ],
      form: {
        date1: '',
        date2: '',
        resource: ''
      }
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
.vip-content{
  text-align:right;
  margin-right: 30px;
  margin-bottom: 30px;
}
.vip-content strong {
  margin: 0 120px 0 10px;
  display: inline-block;
  font-size: 20px;
}
</style>