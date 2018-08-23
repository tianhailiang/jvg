<template>
  <section class="courselist-tabel" style="overflow:hidden;max-width:1200px;">
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
              <el-form-item label="课程分类">
                  <el-select placeholder="课程分类">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="直播中" value="beijing"></el-option>
                      <el-option label="未开始" value="beijing"></el-option>
                      <el-option label="已结束" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="上课模式">
                  <el-select placeholder="上课模式">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="直播中" value="beijing"></el-option>
                      <el-option label="未开始" value="beijing"></el-option>
                      <el-option label="已结束" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="讲师名称">
                  <el-input placeholder="讲师名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="销售状态">
                  <el-select placeholder="销售状态">
                      <el-option label="全部"  value="shanghai"></el-option>
                      <el-option label="直播中" value="beijing"></el-option>
                      <el-option label="未开始" value="beijing"></el-option>
                      <el-option label="已结束" value="beijing"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="直播状态">
                <el-select placeholder="直播状态">
                    <el-option label="全部"  value="shanghai"></el-option>
                    <el-option label="直播中" value="beijing"></el-option>
                    <el-option label="未开始" value="beijing"></el-option>
                    <el-option label="已结束" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary">创建课程</el-button>
          </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData3">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="name" label="讲师名称" width="120"></el-table-column>
        <el-table-column prop="name" label="频道" width="120"></el-table-column>
        <el-table-column prop="name" label="课程分类" width="120"></el-table-column>
        <el-table-column prop="name" label="上课模式" width="120"></el-table-column>
        <el-table-column prop="name" label="教学模式" width="120"></el-table-column>
        <el-table-column prop="name" label="课程价格" width="120"></el-table-column>
        <el-table-column prop="name" label="直播时间" width="120"></el-table-column>
        <el-table-column prop="name" label="销售状态" width="120"></el-table-column>
        <el-table-column prop="name" label="直播状态" width="120"></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="dialogVisible = true">冻结</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="height:30px"></div>
    <!-- 分页 -->
    <el-row :gutter="20">
        <el-col :span="9">
            <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
        </el-col>
        <el-col :span="9">
            <el-button size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary" @click="openMadel">批量删除</el-button>
            <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button>
        </el-col>
    </el-row>
    <!--  -->
    <el-dialog title="冻结编辑提示窗口" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="课程ID">
              <el-input type="text" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="课程标题">
                <el-input type="text" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="发布用户名">
                <el-input type="text" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="冻结原因">
              <el-input type="textarea" size="mini"></el-input>
            </el-form-item>
        </el-form>
        <span>提示：冻结后该课程在前端无法显示</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'courseList',
  data () {
    return {
      tableData3: [
        {date: '2016-05-02', name: '王小虎', address: '冻结'},
        {date: '2016-05-02', name: '王小虎', address: '冻结'},
        {date: '2016-05-02', name: '王小虎', address: '冻结'},
        {date: '2016-05-02', name: '王小虎', address: '冻结'}
      ],
      dialogVisible: false
    }
  },
  methods: {
    openMadel () {
      this.$confirm('请确认是否继续删除', '删除提示窗口', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
