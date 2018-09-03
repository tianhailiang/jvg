<template>
  <section class="courselist-tabel" style="overflow:hidden;">
    <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
    <el-row :gutter="20">
          <el-col :span="5"><div class="grid-content bg-purple">
            <el-form-item label="课程ID">
              <el-input placeholder="审批人"></el-input>
          </el-form-item></div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
              <el-form-item label="课程标题">
                  <el-input placeholder="课程标题"></el-input>
              </el-form-item>  
          </div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple">
              <el-form-item label="好评度">
                  <el-col :span="9">
                    <el-input type="text"></el-input>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="9">
                      <el-input type="text"></el-input>
                  </el-col>
                </el-form-item>  
          </div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
            <el-form-item label="讲师名称">
              <el-input placeholder="讲师名称"></el-input>
          </el-form-item></div></el-col>
          <div class="search-btn">
              <el-button size="small" type="primary">搜索</el-button>
          </div>
    </el-row>
  </el-form>
    <!-- 表格 -->
    <el-table :data=tableData3 border>
        <el-table-column prop="date" label="NO" width="80" align="center">
            <template scope="scope">
                <span @click="openDatilog(scope.row)" class="link-span">{{scope.row.date}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="课程ID" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="课程标题" width="160" align="center"></el-table-column>
        <el-table-column prop="name" label="讲师名称" width="160" align="center"></el-table-column>
        <el-table-column prop="name" label="好评度" width="160" align="center"></el-table-column>
        <el-table-column prop="name" label="好评数" width="160" align="center"></el-table-column>
        <el-table-column prop="name" label="中评数" width="160" align="center"></el-table-column>
        <el-table-column prop="address" label="差评"></el-table-column>
    </el-table>
    <div style="height:30px"></div>
    <!-- 分页 -->
    <div class="page-center">
      <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
      <el-button size="small" type="primary">确定</el-button>
    </div>
    <!-- 课程详情model -->
    <el-dialog title="课程评论详情" :visible.sync="formVisible">
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
                                <el-option v-for="item in options" 
                                  :label="item.label" 
                                  :value="item.label">
                                </el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-button size="small" type="primary" style="margin-top:30px;">搜索</el-button>
                        </el-col>
                    </el-form>
                  </el-row>
                  <!-- 表格 -->
                  <el-table :data="tableData3" border>
                      <el-table-column type="selection" width="55"></el-table-column>
                      <el-table-column prop="date" label="评论ID" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="评论内容" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="评论人" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="评论时间" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="评论渠道" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="回复内容" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="回复时间" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="回复渠道" width="102" align="center"></el-table-column>
                      <el-table-column prop="name" label="评论类型" width="102" align="center"></el-table-column>
                      <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
                          <template slot-scope="scope">
                              <el-button size="mini" type="danger">删除</el-button>
                          </template>
                      </el-table-column>
                  </el-table>
                  <div style="height:30px"></div>
                  <!-- 分页 -->
                  <el-row :gutter="20">
                      <el-col :span="11">
                          <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
                      </el-col>
                      <el-col :span="8">
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
  name: 'courseComment',
    data () {
      return {
        tableData3: [
        {date: '001', name: '张三', address: '89'},
        {date: '002', name: '张三', address: '89'},
        {date: '003', name: '张三', address: '89'}
      ],
      formVisible: false,
      options: [
      {value: '选项1',label: '好评'},
      {value: '选项2',label: '好评'},
      {value: '选项3',label: '好评'},
      ]
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
<style scoped>
.page-center{
  display: flex;
  justify-content: center;
}
.search-btn{
  display: flex;
  justify-content: flex-end;
  margin-top:22px;
  margin-right:18px;
}
</style>