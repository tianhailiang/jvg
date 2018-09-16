<template>
    <section class="publishinglist-tabel" style="overflow:hidden;margin-left:260px;">
      <el-row :gutter="20">
        <el-form :inline="true" class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6">
                <el-form-item label="ID">
                    <el-input type="text" v-model="id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="名称">
                    <el-input type="text" v-model="title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="课程分类">
                    <el-select v-model="categorySigns">
                        <el-option 
                        :label="item.label"  
                        :value="item.value"
                        v-for="(item, index) in coursedata"></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="类型">
                    <el-select v-model="type">
                        <el-option 
                        :label="items.label"
                        :value="items.value"
                        v-for="(items, index) in types"></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="讲师名称">
                    <el-input v-model="userId"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="销售状态">
                    <el-select v-model="upDown">
                        <el-option 
                        :label="items.label"
                        :value="items.value"
                        v-for="(items, index) in xsdata"></el-option>
                      </el-select>
                </el-form-item>
            </el-col>
            <el-button size="small" type="primary" style="margin-top:26px;" @click="getOrderdata()">搜索</el-button>
        </el-form>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" border ref="tableCont" 
      @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="努力奔跑中...">
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column prop="id" label="出版物ID" width="60" align="center"></el-table-column>
          <el-table-column prop="title" label="出版物名称" width="100" align="center"></el-table-column>
          <el-table-column prop="memo" label="出版物介绍" width="100" align="center"></el-table-column>
          <el-table-column prop="realName" label="讲师名称" width="100" align="center"></el-table-column>
          <el-table-column prop="professionValue" label="频道" width="100" align="center"></el-table-column>
          <el-table-column prop="categorySignsValue" label="分类" width="80" align="center"></el-table-column>
          <el-table-column prop="typeValue" label="类型" width="90" align="center"></el-table-column>
          <el-table-column prop="price" label="价格" width="90" align="center"></el-table-column>
          <el-table-column prop="createdAtStr" label="创建时间" width="95" align="center"></el-table-column>
          <el-table-column prop="upDownValue" label="销售状态" width="95" align="center"></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="dialogVisible = true">冻结</el-button>
                  <el-button size="mini" type="danger" @click="openMadel(scope.$index, scope.row)">删除</el-button>
                </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row :gutter="20" style="margin:30px 0;" v-show="tableData.length">
          <el-col :span="11">
              <el-pagination background layout="prev, pager, next, jumper" 
              :total="total" :page-size="20"></el-pagination>
          </el-col>
          <el-col :span="7">
              <el-button size="small" type="primary">确定</el-button>
          </el-col>
          <el-col :span="5">
              <el-button size="small" type="primary" @click="clearAll">批量删除</el-button>
              <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button>
          </el-col>
      </el-row>
      <!-- 删除提示窗口 -->
      <el-dialog title="删除提示窗口" :visible.sync="dialogVisible" width="30%">
          <span>请确认是否继续删除？</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
        <!-- 冻结编辑窗口 -->
        <el-dialog title="冻结编辑提示窗口" :visible.sync="dialogVisible" width="30%">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID">
                  <el-input size="small" :disabled="true" v-model="id"></el-input>
                </el-form-item>
                <el-form-item label="出版物名称">
                    <el-input size="small" :disabled="true" v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="发布用户名">
                    <el-input size="small" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="冻结原因">
                  <el-input type="textarea" size="small" v-model="downMemo"></el-input>
                </el-form-item>
            </el-form>
            <span>提示：冻结后该出版物在前端无法显示</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handelfreezePublish()">确 定</el-button>
            </span>
        </el-dialog>
    </section>
  </template>
<script>
export default {
  name: 'publishingList',
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      total: null,
      loading: false,
      title: '',
      type: 1,
      id: '',
      userId: '',
      upDown: 1,
      categorySigns: '',
      pageNo: 2,
      pageSize: 20,
      downMemo: '',
      xsdata: [
          {label: '全部', value: '1'},
          {label: '已上架', value: '2'},
          {label: '已下架', value: '3'},
          {label: '冻结', value: '4'}
      ],
      types: [
          {label: '全部', value: '1'},
          {label: '实体', value: '2'},
          {label: '数字', value: '3'}
      ],
      coursedata: [
          {label: '全部', value: '1'},
          {label: '托福', value: '2'},
          {label: 'GRE', value: '3'}
      ],
      multipleSelection: []
    }
  },
  created() {
    //   this.getOrderdata()
  },
  methods: {
    openMadel (index, row) {
      this.$confirm('请确认是否继续删除', '删除提示窗口', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post(this.$store.state.api.removePublish, {
            ids:[row.id]
        }).then(res => {
            // console.log(res)
            this.$message({
                type: 'success',
                message: '删除成功'
            })
        }).catch(error => {
            console.log(`请求出错啦`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handelfreezePublish (index, row) {
        this.dialogVisible = false
        axios.post(this.$store.state.api.freezePublish, {
            ids: [this.id],
            upDown: "3",
	        downMemo: this.downMemo
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(`请求出错啦`)
        })
    },
    handleSelectionChange (val) {
        this.multipleSelection = val
    },
    clearAll () {
      this.multipleSelection.forEach((el) => {
        
      })
    },
    getOrderdata() {
        this.loading = true
        axios.post(this.$store.state.api.searchPublishList,{
            "id": this.id,
            // "title": "this.title",
            // "categorySigns": "tuofu",
            // "type": 1,
            // "userId": 1,
            // "updown": 1,
            // "pageNo": 2,
            // "pageSize": 20
        }).then((res) => {
            this.tableData = res.data.result.modelData
            this.total = res.data.result.total
            this.loading = false
            // console.log(res.data.result.total)
        }).catch((error) => {
            console.log(`请求出错啦`)
        })
    }
  }
}
</script>
