<template>
  <div>
    <div class="nav" >
      文章打赏详情
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="文章ID">
        <el-input v-model="formInline.articleId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="formInline.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="formInline.userRole" size="small" >
          <el-option
          v-for="item in formInline.userRoleList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" >
        <el-select v-model="formInline.state" size="small" >
          <el-option
          v-for="item in formInline.stateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="formInline.userId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="formInline.userName" size="small"></el-input>
      </el-form-item>
    </el-form>
    <div class="sum-box" >
      <div style="margin-right:10px">
        <i>打赏总数：</i>
        <span>{{rewardSumNuber}}</span>
      </div>
      <div>
        <i>打赏总金额：</i>
        <span>{{rewardSumMoney}}</span>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-width:100%;width: 1035px" border>
      <el-table-column
        type="index"
        label="NO"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="rewardOrderId"
        label="打赏订单ID"
        align="center" width="120">
      </el-table-column>
      <el-table-column
        prop="rewardPersonId"
        label="打赏人ID"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="rewardPersonName"
        label="打赏人名称"
        width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="rewardTime"
        label="打赏时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="rewardChannel"
        label="打赏渠道"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="rewardPersonRole"
        label="打赏人角色"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="rewardMoney"
        label="打赏金额"
        width="120" align="center" >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ArticleRewardDetail',
   data () {
    return {
      formInline: {
        articleId: '',
        title: '',
        userRole: '0',
        userRoleList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '普通个人'
        }, {
          value: '2',
          label: '讲师'
        }],
        state: '0',
        stateList: [{
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '禁用'
        }, {
          value: '2',
          label: '正常'
        }],
        userId: '',
        userName: ''
      },
      rewardSumNuber: 1000,
      rewardSumMoney: 10000,
      tableData: [{
        rewardOrderId: '100001',
        rewardPersonId: 'xxx',
        rewardPersonName: 'thl',
        rewardTime: '2018-8-29 00:00:00',
        rewardChannel: 'PC',
        rewardPersonRole: '人员',
        rewardMoney: '10000'
      }, {
        rewardOrderId: '100001',
        rewardPersonId: 'xxx',
        rewardPersonName: 'thl',
        rewardTime: '2018-8-29 00:00:00',
        rewardChannel: 'PC',
        rewardPersonRole: '人员',
        rewardMoney: '10000'
      }, {
        rewardOrderId: '100001',
        rewardPersonId: 'xxx',
        rewardPersonName: 'thl',
        rewardTime: '2018-8-29 00:00:00',
        rewardChannel: 'PC',
        rewardPersonRole: '人员',
        rewardMoney: '10000'
      }],
      currentPage: 1
    }
  },
  methods: {
     handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .sum-box{
    display: flex;
    justify-content: flex-end;
  }
</style>
