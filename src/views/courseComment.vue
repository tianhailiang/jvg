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
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="20"
      :total="total"
      :current-page="pageNo"
      :page-sizes="[20, 30, 40, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
      </el-pagination>
      <el-button size="small" type="primary" style="margin-left:20px;">确定</el-button>
    </div>
    <!-- 课程详情model -->
    <el-dialog title="课程评论详情" :visible.sync="formVisible">
        <el-row :gutter="20">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6">
                <el-form-item label="课程ID">
                    <el-input type="text" v-model="copyId" :disabled="true"></el-input>
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
                                <el-input type="text" v-model="details"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="评论人">
                                <el-input type="text" v-model="userName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="评论ID">
                                <el-input type="text" v-model="commentId"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="评论时间">
                                <el-input type="text" v-model="createdAt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="回复内容">
                                <el-input type="text" v-model="replyDetails"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="回复时间">
                                <el-input type="text" v-model="replyCreatedAt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="评论类型">
                              <el-select v-model="num">
                                <el-option v-for="(item, index) in options" 
                                  :label="item.label" 
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>
                <el-col :span="3">
                    <el-button size="small" type="primary" style="margin-top:30px;" @click="getCourseComentDetail()">搜索</el-button>
                </el-col>
                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table :data="CourseDetailData" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="commentId" label="评论ID" width="70" align="center"></el-table-column>
                <el-table-column prop="details" label="评论内容" width="102" align="center"></el-table-column>
                <el-table-column prop="userName" label="评论人" width="80" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="评论时间" width="102" align="center"></el-table-column>
                <el-table-column prop="source" label="评论渠道" width="85" align="center"></el-table-column>
                <el-table-column prop="replyDetails" label="回复内容" width="102" align="center"></el-table-column>
                <el-table-column prop="replyCreatedAt" label="回复时间" width="102" align="center"></el-table-column>
                <el-table-column prop="replySource" label="回复渠道" width="80" align="center"></el-table-column>
                <el-table-column prop="num" label="评论类型" width="80" align="center"></el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="removeCourse()">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row :gutter="20" style="margin-top:20px;" v-if="CourseDetailData.length">
                <el-col :span="11">
                    <el-pagination background
                    layout="prev, pager, next, jumper" 
                    :total="total"
                    :page-size="3"></el-pagination>
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
        courseComentTabel: [],
        total: null,
        loading: false,
        formVisible: false,
        num: '', //评论类型
        id: '',
        title: '',
        realName: '',
        raveFrom: '',
        raveTo: '',
        CourseDetailData: [],
        courseId: '',
        pageNo: 1,
        pageSize: 20,
        options: [
            {value: '1',label: '好评'},
            {value: '2',label: '中评'},
            {value: '3',label: '差评'}
        ],
        replyCreatedAt: '',
        replyDetails: '',
        createdAt: '',
        commentId: '',
        userName: '',
        details: ''
    }
  },
  created() {
    // this.getCourseComent ()
  },
  computed: {
    copyId () {
        return this.courseId = this.id
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val
      this.getCourseComent()
      console.log(`每页 ${this.pageNo} 条`)
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    openDatilog (row) {
      this.formVisible = true
      this.row = row
    },
    getCourseComent () {
      this.loading = true
      axios.post(this.$store.state.api.courseComent, {
        id:this.id,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(res => {
        if (res.data.success) {
            let dataComment = res.data.result.modelData
            this.courseComentTabel = dataComment
            this.total = res.data.result.total
            this.loading = false
        }
      }).catch(error => {
          console.log(`返回错误消息`)
      })
    },
    getCourseComentDetail() {
        axios.post(this.$store.state.api.courseComentDetail, {
            "courseId": 1,
            // "details": "评论内容评论内容评论内容",
            // "userName": "张三",
            // "createdAt": "2018-08-12 12:00:00",
            // "replyDetails": "回复内容回复内容回复内容",
            // "replyCreatedAt": "2018-08-13 08:00:00",
            // "num": 5,
            // "pageNo": 1,
            // "pageSize": 20
        }).then(res => {
            console.log(res)
            this.CourseDetailData = res.data.result.modelData
            this.total = res.data.result.total
            // console.log(res.data.result.modelData)
        }).catch(erroe => {
            console.log(`返回错误消息`)
        })
    },
    removeCourse() {
        if (this.ids) {
            axios.post(this.$store.state.api.removeCourseComent, {
                ids:[2]
            }).then(res => {
                console.log(res)
                setTimeout(() => {
                    window.location.reload()
                },500)
            }).catch(error => {
                console.log(`返回错误消息`)
            })
        } else {
            return false
        }
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