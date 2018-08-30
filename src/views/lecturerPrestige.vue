<template>
  <section class="member-content">
    <h3 class="content-title">讲师声望值规则</h3>
    <div class="create-gz"><el-button size="small" type="primary">新建规则</el-button></div>
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="currentid" width="211" label="NO" align="center"></el-table-column>
      <el-table-column prop="behaiver" label="行为" width="211" align="center"></el-table-column>
      <el-table-column prop="number" label="占百分比" width="211" align="center"></el-table-column>
      <el-table-column prop="variety" label="分值变化" width="211" align="center"></el-table-column>
      <el-table-column label="操作" width="211">
          <template slot-scope="scope">
              <el-button size="small" type="danger">删除</el-button>
          </template>
      </el-table-column>
  </el-table>
  <div class="button-group">
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" type="primary">清除</el-button>
  </div>
  </section>
</template>
<script>
export default {
  name: 'lecturerPrestige',
  data () {
    return {
      data: [
        {currentid: '001', behaiver: '发布课程&出版物 ', number: '40%', variety: '增加'},
        {currentid: '002', behaiver: '发布课程&出版物 ', number: '50%', variety: '增加'}
      ]
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
</style>