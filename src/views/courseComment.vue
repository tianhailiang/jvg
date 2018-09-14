<template>
  <section class="courselist-tabel" style="overflow:hidden;margin-left:260px;">
    <h3 class="courseconment-title">课程评论列表</h3>
    <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
    <el-row :gutter="20">
          <el-col :span="5"><div class="grid-content bg-purple">
            <el-form-item label="课程ID">
              <el-input v-model="id"></el-input>
          </el-form-item></div>
        </el-col>
          <el-col :span="5"><div class="grid-content bg-purple">
              <el-form-item label="课程标题">
                  <el-input></el-input>
              </el-form-item>  
          </div>
        </el-col>
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
              <el-input></el-input>
          </el-form-item></div></el-col>
          <div class="search-btn" style="margin-top:30px;">
              <el-button size="small" type="primary" @click="getCourseComent()">搜索</el-button>
          </div>
    </el-row>
  </el-form>
    <!-- 表格 -->
    <el-table :data=courseComentTabel border v-loading="loading" element-loading-text="努力奔跑中...">
        <el-table-column prop="date" label="NO" width="80" align="center" type="index">
            <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleShow()">{{scope.$index + 1}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="课程ID" width="80" align="center"></el-table-column>
        <el-table-column prop="title" label="课程标题" width="160" align="center"></el-table-column>
        <el-table-column prop="realName" label="讲师名称" width="160" align="center"></el-table-column>
        <el-table-column prop="raveDegree" label="好评度" width="160" align="center"></el-table-column>
        <el-table-column prop="raveNumber" label="好评数" width="160" align="center"></el-table-column>
        <el-table-column prop="intermediateNumber" label="中评数" width="160" align="center"></el-table-column>
        <el-table-column prop="badNumber" label="差评" align="center"></el-table-column>
    </el-table>
    <div style="height:30px"></div>
    <!-- 分页 -->
    <div class="page-center" v-if="courseComentTabel.length">
      <el-pagination 
      background
      layout="prev, pager, next, jumper" :page-size="20" :total="total"></el-pagination>
      <el-button size="small" type="primary" style="margin-left:20px;">确定</el-button>
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
              <hr style="border:solid 1px #dcdfe6">
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
                              <el-select v-model="value">
                                <el-option v-for="(item, index) in options" 
                                  :label="item.label" 
                                  :value="item.value">
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
                  <!-- <el-table :data="tableData3" border>
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
                  </el-table> -->
                  <div style="height:30px"></div>
                  <!-- 分页 -->
                  <el-row :gutter="20">
                      <el-col :span="11">
                          <el-pagination background layout="prev, pager, next, jumper" :total="60"></el-pagination>
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
import { courseComent } from '../api/api.js'
export default {
  name: 'courseComment',
    data () {
      return {
        courseComentTabel: [],
        total: null,
        loading: false,
        formVisible: false,
        value: '',
        id: '',
        title: '',
        realName: '',
        raveFrom: '',
        raveTo: '',
        options: [
            {value: '选项1',label: '好评'},
            {value: '选项2',label: '中评'},
            {value: '选项3',label: '差评'}
        ]
    }
  },
  created() {
    this.getCourseComent ()
  },
  methods: {
    openDatilog (row) {
      this.formVisible = true
      this.row = row
    },
    getCourseComent () {
      this.loading = true
      axios.post(this.$store.state.api.courseComent, {id:this.id}).then(res => {
        if (res.data.success) {
            let dataComment = res.data.result.modelData
            this.courseComentTabel = dataComment
            this.total = res.data.result.total
            this.loading = false
            console.log(res.data.result)
        }
      }).catch(error => {
          console.log(`返回错误消息`)
      })
    },
    handleShow(index, row) {
        this.formVisible = true
    }
  }
}
</script>
<style scoped>
.page-center{
  display: flex;
  justify-content: center;
  margin-bottom:20px;
}
.search-btn{
  display: flex;
  justify-content: flex-end;
  margin-top:22px;
  margin-right:18px;
}
.courseconment-title{ height: 30px; line-height: 30px; border-bottom: 1px solid #dcdfe6; margin-bottom:15px;font-weight: 600; }
</style>