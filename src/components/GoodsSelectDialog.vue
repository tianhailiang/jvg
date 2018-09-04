<template>
  <el-dialog title="商品选择画面" :visible.sync="dialogFormVisible" :before-close="handleClose" 
  width="80%">
    <el-form :inline="true" :model="formInline">
      <el-form-item >
        <el-input v-model="formInline.commodityName" size="small" placeholder="请输入商品名称" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-width:100%;width: 1035px"
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="selection"
        label="全部"
        width="55" >
      </el-table-column>
      <el-table-column
        label="课程ID"
        align="center" width="80">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="goDetail(scope.$index, scope.row)">
            {{scope.row.courseId}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称（标题）"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="coursePrice"
        label="课程价格"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="80">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="recommend(scope.$index, scope.row)">选择</el-button>
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
    <div class="btn-box" >
      <el-button type="primary" @click="batchRecommend()" >批量选择</el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:dialogFormVisible',false)">确定</el-button>
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
      formInline: {
        courseId: ''
      },
      tableData: [{
        courseId: '100001',
        courseName: '美国留学1',
        coursePrice: '120$',
        userId: '15242755275'
      }, {
        courseId: '100001',
        courseName: '美国留学1',
        coursePrice: '120$',
        userId: '15242755275'
      }, {
        courseId: '100001',
        courseName: '美国留学1',
        coursePrice: '120$',
        userId: '15242755275'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  watch: {
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    onSubmit (e) {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    recommend () {

    },
    batchRecommend () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.articleId}})
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
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>
