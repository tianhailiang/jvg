<template>
  <el-dialog title="优惠券列表" :visible.sync="dialogFormVisible" :before-close="handleClose" 
  width="50%">
    <el-form :inline="true" :model="formInline">
      <div >
        <el-form-item label="渠道：" >
          {{formInline.platform}}
        </el-form-item>
        <el-form-item label="分类：" >
          {{formInline.classify}}
        </el-form-item>
      </div>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-width:100%;width: 1035px"
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="index"
        label="NO"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="couponId"
        label="优惠券ID"
        align="center" width="80">
      </el-table-column>
      <el-table-column
        prop="couponIntroduction"
        label="优惠券简介"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="couponType"
        label="优惠类型"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="couponContent"
        label="优惠券内容"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="80">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="recommend(scope.$index, scope.row)">推荐</el-button>
       </template>
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
  </el-dialog>
</template>

<script>
export default {
  name: 'couponListDialog',
  props: ['dialogFormVisible','dialogForm'],
  data () {
    return {
      formInline: {
        platform: this.dialogForm.platform,
        channel: this.dialogForm.channel
      },
      tableData: [{
        couponId: '100001',
        couponIntroduction: '美国留学非常好啊',
        couponType: '金额',
        couponContent: '美国留学非常好啊'
      }, {
        couponId: '100001',
        couponIntroduction: '美国留学非常好啊',
        couponType: '金额',
        couponContent: '美国留学非常好啊'
      }, {
        couponId: '100001',
        couponIntroduction: '美国留学非常好啊',
        couponType: '金额',
        couponContent: '美国留学非常好啊'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  watch: {
    dialogForm (newValue, oldValue) {
      this.formInline.platform = newValue.platform
      this.formInline.channel = newValue.channel
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    recommend () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .btn-box {
    display: flex;
    justify-content: flex-end
  }
</style>