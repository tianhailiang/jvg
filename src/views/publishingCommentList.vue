<template>
    <section class="publishinglist-tabel" style="overflow:hidden; padding-left:10px;">
      <el-row :gutter="20">
        <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6">
                <el-form-item label="ID">
                    <el-input type="text"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="名称">
                    <el-input type="text"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="好评度">
                    <el-col :span="10">
                        <el-input type="text" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="10">
                        <el-input type="text" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="讲师名称">
                    <el-input placeholder="讲师名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="2" class="teacher">
                <el-button size="small" type="primary">搜索</el-button>
            </el-col>
        </el-form>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData3" border>
          <el-table-column label="出版物ID" align="center">
                <template scope="scope">
                    <span @click="openDatilog(scope.row)" class="link-span">{{scope.row.date}}</span>
                </template>
          </el-table-column>
          <el-table-column prop="name" label="出版物名称" align="center"></el-table-column>
          <el-table-column prop="name" label="讲师名称" align="center"></el-table-column>
          <el-table-column prop="name" label="好评度" align="center"></el-table-column>
          <el-table-column prop="name" label="好评数" align="center"></el-table-column>
          <el-table-column prop="name" label="中评数" align="center"></el-table-column>
          <el-table-column prop="active" label="差评" align="center"></el-table-column>
      </el-table>
      <div style="height:30px"></div>
      <!-- 分页 -->
      <div class="row-container">
          <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
          <el-button size="small" type="primary">确定</el-button>
      </div>
      <!-- 弹窗 -->
        <el-dialog title="出版物评论详情" :visible.sync="formVisible">
            <el-row :gutter="20">
                <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
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
                    <el-col :span="6" class="publish-name">
                        <el-form-item label="出版物名称">
                            <el-input type="text" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="好评度">
                            <el-input type="text" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row :gutter="20">
                    <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
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
                                <el-option 
                                v-for="(item, index) in comment" 
                                :label="item.label" 
                                :value="item.value" 
                                :key="index"></el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>
                          <el-button size="small" type="primary" style="margin-top:25px;">搜索</el-button>
                          <div class="comment-total">
                              <span>评论总数：<span class="comment-num">1000个</span></span>
                          </div>
                    </el-form>
                  </el-row>
            <!--  -->
            <el-table :data="tableData4" border>
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column prop="date" label="评论ID" width="105" align="center"></el-table-column>
                <el-table-column prop="name" label="评论内容" width="105" align="center"></el-table-column>
                <el-table-column prop="name" label="评论人" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="评论时间" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="评论渠道" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="回复内容" width="105" align="center"></el-table-column>
                <el-table-column prop="name" label="回复时间" width="105" align="center"></el-table-column>
                <el-table-column prop="name" label="回复渠道" width="105" align="center"></el-table-column>
                <el-table-column prop="name" label="评论类型" width="105" align="center"></el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                    <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--  -->
            <el-row :gutter="20" style="margin-top:20px;">
                    <el-col :span="11">
                        <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
                    </el-col>
                    <el-col :span="7">
                        <el-button size="small" type="primary">确定</el-button>
                    </el-col>
                    <el-col :span="5">
                        <el-button size="small" type="primary">批量删除</el-button>
                    </el-col>
            </el-row>
        </el-dialog>
    </section>
  </template>
<script>
export default {
  name: 'publishingCommentList',
  data () {
    return {
      tableData3: [
        {date: '01', name: '王小虎', type: '托福', address: '冻结', active: '冻结'},
        {date: '02', name: '王小虎', type: '托福', address: '冻结', active: '冻结'},
        {date: '03', name: '王小虎', type: '托福', address: '冻结', active: '冻结'},
        {date: '04', name: '王小虎', type: '托福', address: '冻结', active: '冻结'}
      ],
      options: [
        {label: '选项一',value: 'APP'},
        {label: '选项二',value: 'WAP'},
        {label: '选项三',value: 'PC'}
      ],
      comment: [
        {value: '选项一',label: '好评'},
        {value: '选项二',label: '中评'},
        {value: '选项三',label: '差评'}
      ],
      tableData4: [
        {date: '502', name: '张三', address: '删除'},
        {date: '502', name: '李四', address: '删除'},
        {date: '502', name: '王五', address: '删除'},
        {date: '502', name: '赵六', address: '删除'},
        {date: '502', name: '张三', address: '删除'}
      ],
      formVisible: false,
      value: ''
    }
  },
  methods: {
      openDatilog (row) {
        this.formVisible = true
        this.row = row
      }
  }
}
</script>
<style>
.row-container{display: flex;justify-content:center;}
.comment-total{display: block;margin-left:18px;margin-top:15px;}
.teacher{ display: inline-block;margin-bottom:15px;}
.link-span{cursor: pointer;display:block;color:#409EFF}
.publishinglist-tabel .publish-name .el-form-item .el-form-item__label{padding: 0;}
</style>
