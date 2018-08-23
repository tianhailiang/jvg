<template>
  <section class="publishing-content" style="overflow:hidden;max-width:1200px;">
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
          <el-col :span="6">
              <el-form-item label="出版物ID">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="讲师名称">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="出版物名称">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="好评度">
                  <el-input type="text" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <div class="comment-total">
                  <span>评论总数：<span class="comment-num">1000个</span></span>
              </div>
          </el-col>
      </el-form>
    </el-row>
    <!--  -->
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
          <el-col :span="6">
              <el-form-item label="评论内容">
                  <el-input type="text"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="评论人">
                  <el-input type="text"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="评论ID">
                  <el-input type="text"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="评论时间">
                  <el-input type="text"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="回复内容">
                  <el-input type="text"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="回复时间">
                  <el-input type="text"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="评论类型">
                <el-select v-model="value" placeholder="全部">
                  <el-option v-for="item in options" :label="item.label" :value="item.label" :key="item.value"></el-option>
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
        <el-table-column prop="date" label="评论ID" width="120"></el-table-column>
        <el-table-column prop="name" label="评论内容" width="120"></el-table-column>
        <el-table-column prop="name" label="评论人" width="120"></el-table-column>
        <el-table-column prop="name" label="评论时间" width="120"></el-table-column>
        <el-table-column prop="name" label="评论渠道" width="120"></el-table-column>
        <el-table-column prop="name" label="回复内容" width="120"></el-table-column>
        <el-table-column prop="name" label="回复时间" width="120"></el-table-column>
        <el-table-column prop="name" label="回复渠道" width="120"></el-table-column>
        <el-table-column prop="name" label="评论类型" width="120"></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" type="danger">删除</el-button>
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
            <el-button size="small" type="primary">批量删除</el-button>
        </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  name: 'publishingCommentDetail',
  data () {
    return {
      value: '',
      options: [
        {label: '选项一',value: 'APP'},
        {label: '选项二',value: 'WAP'},
        {label: '选项三',value: 'PC'}
      ],
      tableData3: [
        {date: '20160502', name: '张三', address: '删除'},
        {date: '20160502', name: '李四', address: '删除'},
        {date: '20160502', name: '王五', address: '删除'},
        {date: '20160502', name: '赵六', address: '删除'},
        {date: '20160502', name: '张三', address: '删除'}
      ]
    }
  }
}
</script>
<style>
  .publishing-content .el-form-item--mini .el-form-item__label{
    padding-right:10px !important;
  }
  .comment-num{
    font-weight: 600;
  }
</style>
