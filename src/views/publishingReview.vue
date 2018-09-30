<template>
  <section class="publishing-review-content" style="overflow:hidden;margin-left:260px;">
        <el-row :gutter="20">
          <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
              <el-col :span="6">
                  <el-form-item label="课程ID">
                      <el-input type="text" v-model="id"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="课程标题">
                      <el-input placeholder="课程标题"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="分类">
                    <el-select v-model="course">
                            <el-option 
                            :label="item.label"  
                            :value="item.value"
                            v-for="(item, index) in coursedata"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="讲师名称">
                      <el-input placeholder="讲师名称"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="审核状态">
                      <el-select v-model="shenhe">
                          <el-option
                          :label="item.label"
                          :value="item.value"
                          v-for="(item, index) in shenhedata"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                  <el-button size="small" type="primary" style="margin-top:28px;" @click="publishingReview()">搜索</el-button>
              </el-col>
          </el-form>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData3" border ref="multipleTable" v-loading="loading">
            <el-table-column type="selection" width="40" align="center"></el-table-column>
            <el-table-column prop="id" label="出版物ID" width="90" align="center"></el-table-column>
            <el-table-column prop="title" label="出版物名称" width="120" align="center"></el-table-column>
            <el-table-column prop="memo" label="出版物介绍" width="120" align="center"></el-table-column>
            <el-table-column prop="realName" label="讲师名称" width="100" align="center"></el-table-column>
            <el-table-column prop="professionValue" label="频道" width="100" align="center"></el-table-column>
            <el-table-column prop="typeValue" label="类型" width="100" align="center"></el-table-column>
            <el-table-column prop="price" label="价格" width="100" align="center"></el-table-column>
            <el-table-column prop="createdAtStr" label="创建时间" width="120" align="center"></el-table-column>
            <el-table-column prop="statusValue" label="审核状态" width="100" align="center"></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="dialogVisible = true">通过</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="row-container" v-if="tableData3.length" style="margin:30px 0;">
          <!-- <el-pagination 
          layout="prev, pager, next, jumper" 
          :total="total" 
          background 
          :page-size="20" 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"></el-pagination> -->
          <el-pagination background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="20"
          :total="total"
          :current-page="pageNo"
          :page-sizes="[10, 20, 30, 40, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
          <!-- <el-button size="small" type="primary">确定</el-button> -->
        </div>
        <!-- 模态框 -->
        <el-dialog title="不通过编辑提示窗口" :visible.sync="dialogVisible" width="30%">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="出版物ID">
                <el-input type="text" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="出版物名称">
                    <el-input type="text" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发布用户名">
                    <el-input type="text" size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="原因">
                <el-input type="textarea" size="small" v-model="statusMemo"></el-input>
                </el-form-item>
            </el-form>
            <span>提示：用户重新申请审核</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="reviewListInfo()">确 定</el-button>
            </span>
        </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'publishingReview',
  data () {
    return {
      value: '',
      total: null,
      tableData3: [],
      shenhe: '',
      statusMemo:'',
      shenhedata: [
          {label: '全部', value: '1'},
          {label: '通过', value: '2'},
          {label: '未通过', value: '3'},
          {label: '已待审核', value: '4'}
      ],
      course: '',
      coursedata: [
          {label: '全部', value: '1'},
          {label: '托福', value: '2'},
          {label: 'GRE', value: '3'}
      ],
      sels: '', //存储选中的值
      onOff: false,
      id:'',
      loading: false,
      dialogVisible: false,
      pageNo: 0,
      pageSize: 20
    }
  },
  mounted() {
    // this.multipleTable()
    // this.handleCurrentChange()
    // this.publishingReview()
  },
  methods: {
    // handleCurrentChange (row, event, column) {
    //     this.$refs.multipleTable.toggleRowSelection(row, true)
    //     this.tableData3.splice(row.index, 1)
    // },
    handleCurrentChange(val) {
      this.pageNo = val
      this.publishingReview()
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${this.pageSize} 条`)
    },
    publishingReview() {
      this.loading = true
      axios.post(this.$store.state.api.publishReviewList, {
        "id": this.id,
        // "title": "出版物名称",
        // "categorySigns": "tuofu",
        // "status": 2,
        // "userId": 1,
          pageNo: this.pageNo,
          pageSize: this.pageSize
      }).then(res => {
        this.total = res.data.result.total
        this.tableData3 = res.data.result.modelData
        this.loading = false
        console.log(res)
      }).catch(error => {
        console.log(`请求出错啦`)
      })
    },
    reviewListInfo() {
      this.dialogVisible = true
      axios.post(this.$store.state.api.reviewListInfo, {
        "ids":[21],
        "status": 3,
        "statusMemo": this.statusMemo
      }).then(res => {
        this.dialogVisible = false
        console.log(res)
      }).catch(error => {
        console.log(`请求出错啦`)
      })
    }
  }
}
</script>
<style scoped>
  .row-container{
    display: flex;
    justify-content:center;
  }
</style>
