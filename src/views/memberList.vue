<template>
  <section class="member-content">
    <h3 class="content-title">会员列表</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="会员名称">
                  <el-input type="text" size="small" v-model="userName"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="当前状态">
                  <el-select placeholder="" v-model="status" size="small">
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
                  <el-input type="text" v-model="minLevel" style="width: 100%;" size="small"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="10">
                  <el-input type="text" v-model="maxLevel" style="width: 100%;" size="small"></el-input>
                </el-col>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6">
            <div class="grid-content">
                <el-form-item label="是否VIP">
                    <el-radio-group v-model="vip">
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
        <el-button size="small" type="primary" @click="getMenberData()">搜索</el-button>
    </div>
    <!--  -->
    <el-table :data="memberListdata" style="width: 100%" border v-loading="loading" element-loading-text="努力奔跑中...">
        <el-table-column prop="currentid" type="selection" width="50" label="" align="center"></el-table-column>
        <el-table-column prop="id" width="90" label="会员ID" align="center"></el-table-column>
        <el-table-column prop="userName" label="会员名称" width="120" align="center"></el-table-column>
        <el-table-column prop="vipName" label="是否VIP" width="100" align="center"></el-table-column>
        <el-table-column prop="type" label="会员等级" width="120" align="center"></el-table-column>
        <el-table-column prop="statusName" label="当前状态" width="120" align="center"></el-table-column>
        <el-table-column prop="startTime" label="会员加入时间" width="120" align="center"></el-table-column>
        <el-table-column prop="totalIntegral" label="会员积分" width="120" align="center"></el-table-column>
        <el-table-column prop="count" label="会员个数" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger">编辑</el-button>
                <el-button size="small" type="danger">冻结</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--  -->
    <div class="row-container" v-if="memberListdata.length">
      <el-pagination layout="prev, pager, next, jumper" background :total="60"></el-pagination>
      <el-button size="small" type="primary">确定</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'memberList',
  data () {
    return {
      status: '',
      teacher: [
        {value: '选项1', label: '全部'},
        {value: '选项2', label: '使用中'},
        {value: '选项3', label: '已过期'}
      ],
      data: [
        {currentid: '001'}
      ],
      vip: '',
      maxLevel: '',
      minLevel: '',
      userName: '',
      status: '',
      loading: false,
      memberListdata: []
    }
  },
  created() {
    // this.getMenberData()
  },
  methods: {
    getMenberData() {
      axios.post(this.$store.state.api.memberlist, {
        "userName": this.userName
      }).then((res) => {
        this.memberListdata = res.data.result
        console.log(this.memberListdata)
      }).catch((err) => {
        console.log(`请求出现错误`)
      })
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