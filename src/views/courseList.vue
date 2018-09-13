<template>
  <section class="courselist-tabel" style="overflow:hidden; margin-left:260px;">
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
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
                  <el-select v-model="courseVal">
                      <el-option 
                      :label="item.label"
                      :value="item.value"
                      v-for="(item, index) in course"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="上课模式">
                  <el-select v-model="module">
                      <el-option 
                      :label="item.label"  
                      :value="item.value" v-for="(item, index) in coursemodule"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="讲师名称">
                  <el-input placeholder="讲师名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="销售状态">
                  <el-select v-model="xsval">
                      <el-option 
                       :label="item.label"  
                       :value="item.value" v-for="(item, index) in xs"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="直播状态">
                <el-select v-model="zbval">
                    <el-option 
                    :label="item.label"  
                    :value="item.value" v-for="(item, index) in zb"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-top:30px;">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary">创建课程</el-button>
          </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="courseTableData" border v-loading.fullscreen.lock="fullscreenLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="课程ID" width="65" align="center"></el-table-column>
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
        <el-table-column prop="address" label="操作" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="dialogVisible = true" class="btn-edit">冻结</el-button>
                <el-button size="mini" type="danger" @click="removeCourse(4)" class="btn-edit">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="height:30px"></div>
    <!-- 分页 -->
    <el-row :gutter="20" class="pagina-tion">
        <el-col :span="11">
            <el-pagination background layout="prev, pager, next, jumper" 
            :total="total"
            :page-size="20"></el-pagination>
        </el-col>
        <el-col :span="8">
            <el-button size="small" type="primary">确定</el-button>
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
              <el-input type="text" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="课程标题">
                <el-input type="text" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="发布用户名">
                <el-input type="text" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="冻结原因">
              <el-input type="textarea" size="mini"></el-input>
            </el-form-item>
        </el-form>
        <span>提示：冻结后该课程在前端无法显示</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>
<script>
import { courseList,removeCourse } from '../api/api.js'
export default {
  name: 'courseList',
  data () {
    return {
      courseTableData: [],
      dialogVisible: false,
      fullscreenLoading: false, //加载动画
      courseVal: '',
      total: null,
      course: [
          {label: '全部' , value: '选项1'},
          {label: '托福' , value: '选项2'},
          {label: 'GRE' , value: '选项3'}
      ],
      module: '',
      coursemodule: [
        {label: '全部' , value: '选项1'},
        {label: '视频直播' , value: '选项2'},
        {label: '视频点播' , value: '选项3'}
      ],
      xsval: '',
      xs: [
        {label: '全部' , value: '选项1'},
        {label: '冻结' , value: '选项2'},
        {label: '已上架' , value: '选项3'},
        {label: '已下架' , value: '选项4'}
      ],
      zbval: '',
      zb: [
        {label: '全部' , value: '选项1'},
        {label: '直播中' , value: '选项2'},
        {label: '未开始' , value: '选项3'},
        {label: '已结束' , value: '选项4'}
      ]
    }
  },
  created() {
    this.getCourseData()
  },
  methods: {
    removeCourse (ids) {
    //   this.$confirm('请确认是否继续删除', '删除提示窗口', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     removeCourse({1}).then(res => {
    //         this.$message.success('删除成功!')
    //         this.getCourseData()
    //     })
    //   }).catch(() => {
    //     this.$message.success('取消删除!')
    //   })
        removeCourse().then(res => {
            console.log(res)
        })
    },
    getCourseData() {
        courseList().then(res => {
            if (res.success) {
                let courseTableData = res.result.modelData
                this.courseTableData = courseTableData
                this.total = res.result.total
            }
        }).catch(error => {
            console.log(`请求出现错误`)
        })
    }
  }
}
</script>
<style scoped>
.btn-edit{display:block; margin-top: 5px;}
.pagina-tion{ margin-bottom: 30px;}
</style>