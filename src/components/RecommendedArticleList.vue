<template>
  <el-dialog title="文章推荐列表" :visible.sync="dialogFormVisible" :before-close="handleClose" 
  width="80%">
    <el-form :inline="true">
      <div >
        <el-form-item label="渠道：" >
          {{dialogForm.platformName}}
        </el-form-item>
        <el-form-item label="频道：" >
          {{dialogForm.channelName}}
        </el-form-item>
      </div>
      <el-form-item label="文章ID：" >
        <el-input v-model="articleId" size="small" type="number" style="width:105px"></el-input>
      </el-form-item>
      <el-form-item label="文章标题：">
        <el-input v-model="title" size="small" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="用户分类">
        <el-select v-model="userType" size="small" style="width:110px">
          <el-option
          v-for="item in userTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="userId" size="small" type="number" style="width:105px"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="realName" size="small" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-width:100%;width: 1035px"
      @selection-change="handleSelectionChange" border
      v-if="total > 0">
      <el-table-column
        type="selection"
        label="全部"
        width="55" align="center">
      </el-table-column>
      <el-table-column
        label="文章ID"
        align="center" width="80">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="goDetail(scope.$index, scope.row)">
            {{scope.row.id}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="memo"
        label="文章描述（简述）"
        width="138" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userId"
        label="发布用户ID"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="发布用户姓名"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="userTypeVal"
        label="用户分类"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="文章发布时间"
        width="120" align="center" >
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="recommend(scope.$index, scope.row)">推荐</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <div class="vue-btn-box" v-if="total > 0">
      <el-button type="primary" @click="batchRecommend()" >批量推荐</el-button>
    </div> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px"
      v-if="total > 0">
    </el-pagination>
    <div class="vue-info" v-if="infoTotal == 0">
      没有搜索到相关内容
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">确定</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'recommendedArticleList',
  props: ['dialogFormVisible','dialogForm'],
  data () {
    return {
      articleId: null,
      title: '',
      userType: null,
      userTypeList: [{
        value: 1,
        label: '人员'
      }, {
        value: 2,
        label: '机构'
      }, {
        value: 3,
        label: '院校'
      }],
      userId: null,
      realName: '',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('operation-management/arrposid/article/list.json', {
        id: this.articleId,
        title: this.title,
        userType: this.userType,
        userId: this.userId,
        realName: this.realName,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.tableData = res.data.result.modelData
          this.total = res.data.result.total
          this.infoTotal = this.total
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    recommend (index, row) {
      
    },
    batchRecommend () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.id}})
    },
    sure () {
      let productList = []
      this.multipleSelection.forEach((item, index) => {
        let productObj = {}
        productObj.productId = item.id
        productObj.productName = item.title
        productList.push(productObj)
      })
      if (productList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请至少选中一个'
        })
        return false
      }
      this.$emit('update:dialogFormVisible', false)
      this.$emit('select-list', productList)
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>