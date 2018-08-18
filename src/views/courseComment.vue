<template>
  <section class="courselist-tabel">
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
          <el-col :span="5"><div class="grid-content bg-purple">
            <el-form-item label="课程ID">
              <el-input placeholder="审批人"></el-input>
          </el-form-item></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
              <el-form-item label="课程标题">
                  <el-input placeholder="课程标题"></el-input>
              </el-form-item>  
          </div></el-col>
          <el-col :span="9"><div class="grid-content bg-purple">
            <el-form-item label="好评度">
                <el-col :span="5">
                  <el-input type="text"></el-input>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="5">
                    <el-input type="text"></el-input>
                </el-col>
              </el-form-item>  
          </div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">
            <el-form-item label="讲师名称">
              <el-input placeholder="讲师名称"></el-input>
          </el-form-item></div></el-col>
          <el-col :span=7>
              <el-button size="small" type="primary">搜索</el-button>
          </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data=tableData3>
        <el-table-column prop="date" label="NO" width="180"></el-table-column>
        <el-table-column prop="date" label="课程ID" width="180"></el-table-column>
        <el-table-column prop="name" label="课程标题" width="180"></el-table-column>
        <el-table-column prop="name" label="讲师名称" width="180"></el-table-column>
        <el-table-column prop="name" label="好评度" width="180"></el-table-column>
        <el-table-column prop="name" label="好评数" width="180"></el-table-column>
        <el-table-column prop="name" label="中评数" width="180"></el-table-column>
        <el-table-column prop="address" label="差评"></el-table-column>
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
    </el-row>
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
                address: '89'
            },{
                date: '20160502',
                name: '李四',
                address: '10'
            },{
                date: '20160502',
                name: '王五',
                address: '55'
            }]
        }
    }
  }
</script>