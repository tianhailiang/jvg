<template>
  <section class="courselist-tabel">
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
          <el-col :span="12">
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
    <el-table :data="tableData3">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="课程ID" width="120"></el-table-column>
        <el-table-column prop="name" label="课程标题" width="120"></el-table-column>
        <el-table-column prop="name" label="讲师名称" width="120"></el-table-column>
        <el-table-column prop="name" label="频道" width="120"></el-table-column>
        <el-table-column prop="name" label="课程分类" width="120"></el-table-column>
        <el-table-column prop="name" label="上课模式" width="120"></el-table-column>
        <el-table-column prop="name" label="教学模式" width="120"></el-table-column>
        <el-table-column prop="name" label="课程价格" width="120"></el-table-column>
        <el-table-column prop="name" label="直播时间" width="120"></el-table-column>
        <el-table-column prop="name" label="审核状态" width="120"></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip></el-table-column>
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
            <el-button size="small" type="primary" @click="dialogVisible = true">批量通过</el-button>
        </el-col>
    </el-row>
    <!-- 模态框 -->
  <el-dialog title="不通过编辑提示窗口" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
        <el-form-item label="原因">
          <el-input type="textarea" size="mini"></el-input>
        </el-form-item>
    </el-form>
    <span>提示：用户重新申请审核</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
</el-dialog>
  </section>
</template>
<script>
  export default {
    name:'courseList',
    data () {
        return {
            tableData3:[{
                date: '20160502',
                name: '张三',
                address: '查看'
            },{
                date: '20160502',
                name: '李四',
                address: '查看'
            },{
                date: '20160502',
                name: '王五',
                address: '查看'
            }],
            dialogVisible: false
        }
    }
  }
</script>