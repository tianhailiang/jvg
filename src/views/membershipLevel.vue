<template>
  <section class="member-content" style="margin-left:260px;">
    <h3 class="content-title">会员等级规则</h3>
    <div class="create-gz"><el-button size="small" type="primary" @click="addmemberData()">新建规则</el-button></div>
    <el-table :data="vipdata" size="medium" :header-cell-style="rowClass" style="cursor:default;" v-loading="loading">
        <el-table-column label="会员等级" align="center" prop="name"></el-table-column>
        <el-table-column label="积分值区间" align="center" prop="minIntegral">
          <table>
            <el-table-column label="最大值积分值" align="center" prop="maxIntegral"></el-table-column>
            <el-table-column label="最小值积分值" align="center" prop="minIntegral"></el-table-column>
          </table>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="button-group" style="margin-bottom:30px;">
        <el-button size="small" type="primary">保存</el-button>
        <el-button size="small" type="primary" @click="clearAll">清除</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'membershipLevel',
  data () {
    return {
      vipdata: [],
      loading: false,
      newVal: '',
      index: 0,
      name: ''
    }
  },
  created() {
    this.getsearchmemberList()
  },
  methods: {
    rowClass ({row, rowIndex}) {
      return 'background:#f5f7fa'
    },
    handleDelete(index, row) {
      axios.post(this.$store.state.api.removeVip, {
        "id": row.id
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(`请求出错啦`)
      })
      this.vipdata.splice(index, 1)
    },
    addmemberData() {
      let curentindex = this.index ++
      axios.post(this.$store.state.api.addVip, {
        name: this.name,
        minIntegral: 4000,
        maxIntegral: 8000
      }).then(res => {
        this.vipdata.push({
          name: this.name,
          minIntegral: 4000,
          maxIntegral: 8000})
      }).catch(error => {
        console.log(`请求出错啦`)
      })
    },
    clearAll() {
      axios.post(this.$store.state.api.clearvipAll).then(res => {
        this.vipdata = []
      }).catch(error => {
        console.log(`请求出错啦`)
      })
    },
    getsearchmemberList() {
      this.loading = true
      axios.post(this.$store.state.api.searchmemberList).then(res => {
        this.newVal = res.data.result[0].name
        this.vipdata = res.data.result
        this.loading = false
      }).catch(error => {
        console.log(`请求出错啦`)
      })
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
</style>