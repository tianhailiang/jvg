<template>
    <section class="coursecomment-detail">
      <el-row :gutter="20">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="mini">
              <el-col :span="6">
                  <el-form-item label="课程ID">
                      <el-input type="text" :disabled="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="课程标题">
                      <el-input type="text" :disabled="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="讲师名称">
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
        <hr>
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
                          <el-option v-for="item in options" 
                            :label="item.label" 
                            :value="item.label">
                          </el-option>
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
      name:'courseCommentDetail',
      data () {
          return {
              value:'',
              tableData3:[{
                  date: '20160502',
                  name: '张三',
                  address: '删除'
              },{
                  date: '20160502',
                  name: '李四',
                  address: '删除'
              },{
                  date: '20160502',
                  name: '王五',
                  address: '删除'
              }],
              options: [
                {value: '选项1',label: '好评'},
                {value: '选项2',label: '中评'},
                {value: '选项3',label: '差评'}
              ]
            }
          }
        }
  </script>
<style>
  .coursecomment-detail{
    max-width: 1280px;
    margin: auto;
  }
  .coursecomment-detail .comment-total{
    margin-left:24px;
    
  }
  .comment-num{
    font-size: 22px;
  }
</style>