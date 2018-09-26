<template>
  <el-dialog title="商品选择画面"
    :visible.sync="dialogFormVisible"
    :before-close="handleClose" 
    width="80%" custom-class="goods-dialog">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="name" size="small"
          placeholder="请输入商品名称"
          style="width:450px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange" border
      v-if="total > 0" max-height="300">
      <el-table-column
        type="selection"
        label="全部"
        width="55" align="center">
      </el-table-column>
      <el-table-column
        label="课程ID"
        align="center" width="120">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="goDetail(scope.$index, scope.row)">
            {{scope.row.productId}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="课程名称（标题）"
        width="742" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="productPrice"
        label="课程价格"
        width="120" align="center" >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px"
      v-if="total > 0">
    </el-pagination>
    <div class="vue-info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">确定</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'goodsSelectDialog',
  props: ['dialogFormVisible','dialogForm'],
  data () {
    return {
      name: '',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  watch: {
    dialogForm: function (newVal, oldVal) {
      this.onSubmit()
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('operation-activity/product/list.json', {
        name: this.name,
        productType: this.dialogForm,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        this.tableData = res.data.result.modelData
        this.total = res.data.result.total
        this.infoTotal = this.total
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.productId}})
    },
    sure () {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请至少选中一个'
        })
        return false
      }
      this.$emit('update:dialogFormVisible', false)
      this.$emit('select-question', this.multipleSelection)
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>
<style>
  .goods-dialog .el-dialog__body {
    padding-top:0;
    padding-bottom:0
  }
</style>
