<template>
  <el-dialog title="文章推荐列表" :visible.sync="dialogFormVisible" :before-close="handleClose" 
  width="80%">
    <el-form :inline="true" :model="formInline">
      <div >
        <el-form-item label="渠道：" >
          {{formInline.platform}}
        </el-form-item>
        <el-form-item label="频道：" >
          {{formInline.channel}}
        </el-form-item>
      </div>
      <el-form-item label="文章ID：" >
        <el-input v-model="formInline.articleId" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="文章标题：">
        <el-input v-model="formInline.title" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="用户分类">
        <el-select v-model="formInline.userClassify" size="small" >
          <el-option
          v-for="item in formInline.userClassifyList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" >
        <el-select v-model="formInline.state" size="small" >
          <el-option
          v-for="item in formInline.stateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="formInline.userId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="formInline.userName" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-width:100%;width: 1035px"
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="selection"
        label="全部"
        width="55" >
      </el-table-column>
      <el-table-column
        label="文章ID"
        align="center" width="80">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="goDetail(scope.$index, scope.row)">
            {{scope.row.articleId}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="describe"
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
        prop="userClassify"
        label="用户分类"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="time"
        label="文章发布时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="80">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="recommend(scope.$index, scope.row)">推荐</el-button>
       </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
    <div class="btn-box" >
      <el-button type="primary" @click="batchRecommend()" >批量推荐</el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:dialogFormVisible',false)">确定</el-button>
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
      formInline: {
        platform: this.dialogForm.platform,
        channel: this.dialogForm.channel,
        articleId: '',
        title: '',
        userClassify: '0',
        userClassifyList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '人员'
        }, {
          value: '2',
          label: '机构'
        }, {
          value: '3',
          label: '院校'
        }],
        state: '0',
        stateList: [{
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '禁用'
        }, {
          value: '2',
          label: '正常'
        }],
        userId: '',
        userName: ''
      },
      tableData: [{
        articleId: '100001',
        title: '美国留学1',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl1',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }, {
        articleId: '100002',
        title: '美国留学2',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl2',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }, {
        articleId: '100003',
        title: '美国留学3',
        describe: '美国留学非常好啊',
        userId: '15242755275',
        userName: 'thl3',
        userClassify: '人员',
        time: '2018-8-29 00:00:00',
        state: '正常',
        editTxt: '禁用'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  watch: {
    dialogForm (newValue, oldValue) {
      this.formInline.platform = newValue.platform
      this.formInline.channel = newValue.channel
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible',false)
    },
    onSubmit (e) {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    recommend () {

    },
    batchRecommend () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goDetail (index,row) {
      this.$router.push({name: 'articleDetail', params: {id: row.articleId}})
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .btn-box {
    display: flex;
    justify-content: flex-end
  }
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>