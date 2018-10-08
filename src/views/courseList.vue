<template>
  <section class="courselist-tabel" style="overflow:hidden; margin-left:260px;">
        <h3 class="courselist-title">课程列表</h3>
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
          <el-col :span="6">
              <el-form-item label="课程ID">
                  <el-input v-model="id"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="课程标题">
                  <el-input v-model="title"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="课程分类">
                  <el-select v-model="categorySigns">
                      <el-option 
                      :label="item.label"
                      :value="item.value"
                      v-for="(item, index) in course"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="上课模式">
                  <el-select v-model="couresModel">
                      <el-option 
                      :label="item.label"  
                      :value="item.value" v-for="(item, index) in coursemodule"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="讲师名称">
                  <el-input v-model="realName"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="销售状态">
                  <el-select v-model="upDown">
                      <el-option 
                       :label="item.label"  
                       :value="item.value" v-for="(item, index) in xs"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="直播状态">
                <el-select v-model="liveStatus">
                    <el-option 
                    :label="item.label"  
                    :value="item.value" v-for="(item, index) in zb"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-top:30px;">
              <el-button size="small" type="primary" @click="searchData()">搜索</el-button>
              <el-button size="small" type="primary">创建课程</el-button>
          </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="courseTableData" border v-loading="loading" element-loading-text="努力奔跑中...">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="课程ID" width="65" align="center">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleCard()">{{scope.row.id}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="课程标题" width="120" align="center"></el-table-column>
        <el-table-column prop="realName" label="讲师名称" width="80" align="center"></el-table-column>
        <el-table-column prop="professionValue" label="频道" width="80" align="center"></el-table-column>
        <el-table-column prop="categorySignsValue" label="课程分类" width="90" align="center"></el-table-column>
        <el-table-column prop="couresModelValue" label="上课模式" width="100" align="center"></el-table-column>
        <el-table-column prop="teachModelValue" label="教学模式" width="120" align="center"></el-table-column>
        <el-table-column prop="price" label="课程价格" width="60" align="center"></el-table-column>
        <el-table-column prop="beginTime" label="直播时间" width="120" align="center"></el-table-column>
        <el-table-column prop="upDownValue" label="销售状态" width="100" align="center"></el-table-column>
        <el-table-column prop="liveStatusValue" label="直播状态" width="100" align="center"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="dialogVisible = true" class="btn-edit">冻结</el-button>
                <el-button size="mini" type="danger" @click="removeCourse" class="btn-edit">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row :gutter="20" v-if="courseTableData.length" class="pagina-tion">
        <el-col :span="17">
            <el-pagination 
            background 
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="20"
            :total="total"
            :current-page="pageNo"
            :page-sizes="[20, 30, 40, 50]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
            <!-- <el-button size="small" type="primary">确定</el-button> -->
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary" @click="">批量删除</el-button>
            <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button>
        </el-col>
    </el-row>
    <!--  -->
    <el-dialog title="冻结编辑提示窗口" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="课程ID">
              <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="课程标题">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="发布用户名">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="冻结原因">
              <el-input type="textarea" size="small" v-model="downMemo"></el-input>
            </el-form-item>
        </el-form>
        <span>提示：冻结后该课程在前端无法显示</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="jiedCourse()">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>
<script>
  import {removeCourseList,courseList,jdCourse,} from '@/api/url.js'
export default {
  name: 'courseList',
  data () {
    return {
      courseTableData: [],
      dialogVisible: false,
      categorySigns: '',
      total: null,
      id:'',
      title: '',
      loading:false,
      couresModel: '',
      realName: '',
      upDown: '',
      liveStatus: '',
      downMemo: '',
      course: [
          {label: '全部' , value: '1'},
          {label: '托福' , value: '2'},
          {label: 'GRE' , value: '3'}
      ],
      coursemodule: [
        {label: '全部' , value: '1'},
        {label: '视频直播' , value: '2'},
        {label: '视频点播' , value: '3'}
      ],
      xsval: '',
      xs: [
        {label: '全部' , value: '1'},
        {label: '冻结' , value: '2'},
        {label: '已上架' , value: '3'},
        {label: '已下架' , value: '4'}
      ],
      zbval: '',
      zb: [
        {label: '全部' , value: '1'},
        {label: '直播中' , value: '2'},
        {label: '未开始' , value: '3'},
        {label: '已结束' , value: '4'}
      ],
      pageNo:0,
      pageSize: 20
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      
      this.pageNo = val
      this.searchData()
    },
    removeCourse() {    //删除课程
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
            removeCourseList({
                ids: [36]
            }).then( res => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                setTimeout(() => {
                    window.location.reload()
                },500)
            }).catch(error => {
                console.log(error)
            })
        }).catch(erroe => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        })
    },
    searchData() {
        this.loading = true
        courseList({
        id: this.id,
        title: "",
        // // "categorySigns": "",
        // // "couresModel": 1,
        // // "userId": 1,
        // // "upDown": 1,
        // // "liveStatus": 1,
        // // "profession": 1,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
      .then(res => {
        this.courseTableData = res.result.modelData
        this.total = res.result.total
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    jiedCourse() { // 冻结课程
      jdCourse({
        ids:[22],
        upDown: 3,
        downMemo: "不合理不合理"
      }).then(res => {
        this.dialogVisible = false
      }).catch(error => {
        console.log(error)
      })
    },
    handleCard(){
      this.$router.push({ name: 'courseDetail', params: { id: this.id }})
    }
  },
    created() {
        // this.searchData()
    },
}
</script>
<style scoped>
.btn-edit{display:block; margin-top: 5px;}
.pagina-tion{ margin-bottom: 30px; margin-top:30px; display: flex; justify-content: space-around;}
.courselist-title{height: 30px; line-height: 30px; border-bottom: 1px solid #dcdfe6; margin-bottom:15px;font-weight: 600;}
</style>