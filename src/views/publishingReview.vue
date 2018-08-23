<template>
  <section class="publishing-review-content" style="overflow:hidden;max-width:1200px;">
        <el-row :gutter="20">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
              <el-col :span="6">
                  <el-form-item label="课程ID">
                      <el-input placeholder="审批人"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="课程标题">
                      <el-input placeholder="课程标题"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="分类">
                      <el-select placeholder="课程分类">
                          <el-option label="全部"  value="shanghai"></el-option>
                          <el-option label="托福" value="beijing"></el-option>
                          <el-option label="GRE" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="讲师名称">
                      <el-input placeholder="讲师名称"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="审核状态">
                      <el-select placeholder="审核状态">
                          <el-option label="全部"  value="shanghai"></el-option>
                          <el-option label="通过" value="beijing"></el-option>
                          <el-option label="未通过" value="beijing"></el-option>
                          <el-option label="已待审核" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                  <el-button size="small" type="primary">搜索</el-button>
              </el-col>
          </el-form>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData3" border>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="出版物ID" width="120"></el-table-column>
            <el-table-column prop="name" label="出版物名称" width="120"></el-table-column>
            <el-table-column prop="name" label="出版物介绍" width="120"></el-table-column>
            <el-table-column prop="name" label="讲师名称" width="120"></el-table-column>
            <el-table-column prop="name" label="频道" width="120"></el-table-column>
            <el-table-column prop="name" label="类型" width="120"></el-table-column>
            <el-table-column prop="name" label="价格" width="120"></el-table-column>
            <el-table-column prop="name" label="创建时间" width="120"></el-table-column>
            <el-table-column prop="name" label="审核状态" width="120"></el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="mini" type="danger">通过</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div style="height:30px"></div>
        <!-- 分页 -->
        <div class="row-container">
          <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          <el-button size="small" type="primary">确定</el-button>
        </div>
        <!-- 模态框 -->
  </section>
</template>
<script>
export default {
  name: 'publishingReview',
  data () {
    return {
      value: '',
      tableData3: [
        {date: '20180502',name: '张三', address: '查看'},
        {date: '20160502',name: '张三', address: '查看'},
        {date: '20160502',name: '张三', address: '查看'},
        {date: '20160502',name: '张三', address: '查看'},
        {date: '20160502',name: '张三', address: '查看'},
        {date: '20160502',name: '张三', address: '查看'}
      ]
    }
  }
}
</script>
<style scoped>
  .row-container{
    display: flex;
    justify-content:center;
  }
</style>
