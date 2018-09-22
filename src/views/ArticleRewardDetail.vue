<template>
  <div class="vue-right-box">
    <div class="vue-nav" >
      文章打赏详情
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="文章ID：" :label-width="formLabelWidth">
        {{$route.params.id}}
      </el-form-item>
      <el-form-item label="问答标题：" :label-width="formLabelWidth">
        {{title}}
      </el-form-item>
      <el-form-item label="发布人角色：" :label-width="formLabelWidth">
        {{userTypeVal}}
      </el-form-item>
      <el-form-item label="发布人ID：" :label-width="formLabelWidth">
        {{userId}}
      </el-form-item>
      <el-form-item label="发布人名称：" :label-width="formLabelWidth">
        {{realName}}
      </el-form-item>
      <div class="reward-count-box">
        <div>
          <i>打赏总数：</i><span>{{rewardCount}}个</span>
        </div>
        <div>
          <i>打赏总金额：</i><span>{{rewardPrice}}元</span>
        </div>
      </div>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border v-if="total >0">
      <el-table-column
        type="index"
        label="NO"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="rewardId"
        label="打赏订单ID"
        width="150"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="rewardUserId"
        label="打赏人ID"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="rewardUserName"
        label="打赏人名称"
        width="150"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="打赏时间"
        width="172"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="sourceVal"
        label="打赏渠道"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="rewardUserType"
        label="打赏人角色"
        width="120"
        align="center" >
      </el-table-column>
      <el-table-column
        prop="rewardPrice"
        label="打赏金额"
        width="120"
        align="center" >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
      style="text-align:center;margin-top:20px"
      v-if="total > 0">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'articleRewardDetail',
   data () {
    return {
      id: null,
      title: '',
      userTypeVal: '',
      userId: null,
      realName: '',
      formLabelWidth: '100px',
      rewardCount: 0,
      rewardPrice: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    /* 如果路由有变化，会再次执行该方法 */
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      axios.post('article/reward/detail.json', {
        id: this.$route.params.id,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.title = res.data.result.title
          this.userTypeVal = res.data.result.userTypeVal
          this.userId = res.data.result.userId
          this.realName = res.data.result.realName
          this.rewardCount = res.data.result.rewardCount
          this.rewardPrice = res.data.result.rewardPrice
          this.tableData = res.data.result.rewardData
          this.total = res.data.result.total
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      axios.post('article/reward/detail.json', {
        id: this.id,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.tableData = res.data.result.rewardData
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .reward-count-box {
    display: flex;
    justify-content: flex-end
  }
  .reward-count-box div {
    margin-right:20px
  }
</style>
