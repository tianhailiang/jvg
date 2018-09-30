<template>
  <section class="courselist-tabel" style="overflow:hidden;margin-left:260px;">
    <el-row :gutter="20">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
          <el-col :span="6">
              <el-form-item label="课程ID">
                  <el-input placeholder="审批人" v-model="id"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="课程标题">
                  <el-input placeholder="课程标题" v-model="title"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="课程分类">
                  <el-select v-model="categorySigns">
                      <el-option
                      :label="list.label"
                      :value="list.value" v-for="(list, index) in coursetypes"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="上课模式">
                  <el-select v-model="couresModel">
                      <el-option 
                      :label="item.label"  
                      :value="item.value" v-for="(item, indx) in courseModel">
                    </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
            <el-col :span="6">
                <el-form-item label="审核状态">
                    <el-select v-model="status">
                        <el-option
                        :label="item.label"
                        :value="item.value" v-for="(item, index) in shenghe"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="讲师名称">
                    <el-input placeholder="讲师名称"></el-input>
                </el-form-item>
            </el-col>
            <el-button size="small" type="primary" style="margin-top:32px;" @click="getCourseReviewData">搜索</el-button>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="courseReviewData" border v-loading="loading" element-loading-text="努力奔跑中...">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="课程ID" width="90" align="center"></el-table-column>
        <el-table-column prop="title" label="课程标题" width="90" align="center"></el-table-column>
        <el-table-column prop="realName" label="讲师名称" width="90" align="center"></el-table-column>
        <el-table-column prop="profession" label="频道" width="90" align="center"></el-table-column>
        <el-table-column prop="categorySigns" label="课程分类" width="90" align="center"></el-table-column>
        <el-table-column prop="couresModel" label="上课模式" width="90" align="center"></el-table-column>
        <el-table-column prop="teachModel" label="教学模式" width="90" align="center"></el-table-column>
        <el-table-column prop="price" label="课程价格" width="90" align="center"></el-table-column>
        <el-table-column prop="beginTime" label="直播时间" width="90" align="center"></el-table-column>
        <el-table-column prop="status" label="审核状态" width="90" align="center"></el-table-column>
        <el-table-column label="操作" width="160" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="danger">通过</el-button>
                <el-button size="mini" type="danger" @click="dialogVisible = true">不通过</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row :gutter="20" v-if="courseReviewData.length" style="margin:30px 0; display:flex; justify-content:space-around;">
        <el-col :span="11">
            <el-pagination 
            background 
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="20"
            :total="total"
            :current-page="pageNo"
            :page-sizes="[20, 30, 40, 50]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
        </el-col>
        <el-col :span="8">
            <!-- <el-button size="small" type="primary">确定</el-button> -->
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary">批量通过</el-button>
        </el-col>
    </el-row>
    <!-- 模态框 -->
    <el-dialog title="不通过编辑提示窗口" :visible.sync="dialogVisible" width="30%">
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
            <el-form-item label="原因">
            <el-input type="textarea" size="small"></el-input>
            </el-form-item>
        </el-form>
        <span>提示：用户重新申请审核</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handelnoCourse">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'courseList',
  data () {
    return {
      tableData3: [
        {date: '2016', name: '张三', address: '查看'},
        {date: '2016', name: '张三', address: '查看'},
        {date: '2016', name: '张三', address: '查看'},
        {date: '2016', name: '张三', address: '查看'}
      ],
        dialogVisible: false,
        typesval: '',
        modlue: '',
        loading: false,
        total: '',
        title: '',
        id:'',
        categorySigns: '',
        couresModel: 1,
        userId: 1,
        status: 2,
        pageNo: 2,
        pageSize: 20,
      coursetypes: [
        {label: '全部', value: '1'},
        {label: '托福', value: '2'},
        {label: 'GRE', value: '3'}
      ],
      courseModel: [
        {label: '全部', value: '1'},
        {label: '普通个人', value: '2'},
        {label: '个人讲师', value: '3'},
        {label: '机构讲师', value: '4'},
        {label: '院校讲师', value: '5'},
        {label: '顾问', value: '6'},
        {label: '大咖', value: '7'},
        {label: '经纪人', value: '8'}
      ],
      shengheval: '',
      shenghe: [
        {label: '通过', value: '1'},
        {label: '未通过', value: '2'},
        {label: '已待审核', value: '3'},
        {label: '全部', value: '4'}
      ],
      courseReviewData: []
    }
  },
  created() {
    // this.getCourseReviewData()
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val
      this.getCourseReviewData()
      console.log(`每页 ${this.pageNo} 条`)
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    getCourseReviewData() {
      axios.post(this.$store.state.api.courseReview, {
            id:this.id,
            // "title": "",
            // "categorySigns": "tuofu",
            // "couresModel": 1,
            // "userId": 1,
            // "status": 2,
            pageNo: this.pageNo,
            pageSize: this.pageSize
        }).then(res => {
            this.courseReviewData = res.data.result.modelData
            this.total = res.data.result.total
      }).catch(error => {
            console.log(`返回错误消息`)
      })
    },
    handelnoCourse() {
        axios.post(this.$store.state.api.courseReviewInfo, {
            ids: [32],
            "status": 4,
            "statusMemo": "审核不通过原因审核不通过原因"
        }).then(res => {
            this.$message({
                type: 'success',
                message: '删除成功!'
            })
            this.dialogVisible = false
        }).catch(error => {
            console.log(`返回错误消息`)
        })
    }
  }
}
</script>
