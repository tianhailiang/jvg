<template>
  <section class="publishing-review-content" style="overflow:hidden;padding-left:10px;">
        <el-row :gutter="20">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
              <el-col :span="6">
                  <el-form-item label="课程ID">
                      <el-input type="text"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="课程标题">
                      <el-input placeholder="课程标题"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="分类">
                    <el-select v-model="course">
                            <el-option 
                            :label="item.label"  
                            :value="item.value"
                            v-for="(item, index) in coursedata"></el-option>
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
                      <el-select v-model="shenhe">
                          <el-option
                          :label="item.label"
                          :value="item.value"
                          v-for="(item, index) in shenhedata"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                  <el-button size="small" type="primary" style="margin-top:28px;">搜索</el-button>
              </el-col>
          </el-form>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData3" border ref="multipleTable">
            <el-table-column type="selection" width="40" align="center" :selectable='checkboxInit'></el-table-column>
            <el-table-column prop="date" label="出版物ID" width="90" align="center"></el-table-column>
            <el-table-column prop="name" label="出版物名称" width="120" align="center"></el-table-column>
            <el-table-column prop="name" label="出版物介绍" width="120" align="center"></el-table-column>
            <el-table-column prop="name" label="讲师名称" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="频道" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="类型" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="价格" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="创建时间" width="120" align="center"></el-table-column>
            <el-table-column prop="name" label="审核状态" width="100" align="center"></el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="">通过</el-button>
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
        {date: '001',name: '张三', address: '查看'},
        {date: '002',name: '张三', address: '查看'},
        {date: '003',name: '张三', address: '查看'},
        {date: '004',name: '张三', address: '查看'}
      ],
      shenhe: '',
      shenhedata: [
          {label: '全部', value: '选项1'},
          {label: '通过', value: '选项2'},
          {label: '未通过', value: '选项3'},
          {label: '已待审核', value: '选项4'}
      ],
      course: '',
      coursedata: [
          {label: '全部', value: '选项1'},
          {label: '托福', value: '选项2'},
          {label: 'GRE', value: '选项3'}
      ],
      sels: '', //存储选中的值
      onOff: false
    }
  },
  mounted() {
    // this.multipleTable()
    // this.handleCurrentChange()
  },
  methods: {
    // handleCurrentChange (row, event, column) {
    //     this.$refs.multipleTable.toggleRowSelection(row, true)
    //     this.tableData3.splice(row.index, 1)
    // },
  }
}
</script>
<style scoped>
  .row-container{
    display: flex;
    justify-content:center;
  }
</style>
