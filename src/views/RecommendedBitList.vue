<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      推荐位列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：" :label-width="formLabelWidth">
        <el-input v-model="id" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="推荐位名称：">
        <el-input v-model="name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="platform" size="small">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="channel" size="small">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="位置：">
        <el-select v-model="position" >
          <el-option
            v-for="item in positionList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
        <el-button @click="createRecommend" size="small" >创建推荐位</el-button>
      </el-form-item>
    </el-form>
    <template v-if="total > 0" >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange" border>
        <el-table-column
          type="selection"
          label="全部"
          width="55" align="center">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="推荐位名称"
          width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="sourceName"
          label="渠道"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="频道"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="typeValue"
          label="类型"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          prop="productName"
          label="推荐物内容"
          width="250" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editor(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="vue-btn-box" >
        <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
      </div>
    </template>
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
  </div>
</template>

<script>
export default {
  name: 'recommendedBitList',
  data () {
    return {
      formLabelWidth: '80px',
      id: null,
      name: '',
      platform: null,
      platformList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: 'APP'
      }, {
        value: 2,
        label: 'WAP'
      }, {
        value: 3,
        label: 'PC'
      }],
      channel: null,
      channelList: [],
      type: null,
      typeList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '课程'
      }, {
        value: 2,
        label: '文章'
      }, {
        value: 3,
        label: '讲师'
      }, {
        value: 4,
        label: '顾问'
      }, {
        value: 5,
        label: '页面'
      }],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  created () {
    axios.post('/api/c/common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('/api/c/operation-management/arrposid/list.json', {
        id: this.id,
        name: this.name,
        source: this.platform,
        channel: this.channel,
        type: this.type,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        this.tableData = res.data.result.modelData
        this.total = res.data.result.total
        this.infoTotal = this.total
      })
      .catch(error => {
        console.log(error);
      })
    },
    createRecommend () {
      this.$router.push({name: 'recommendedBitDetailBuild'})
    },
    editor (index, row) {
      this.$router.push({name: 'recommendedBitDetail', params: {id: row.id}})
    },
    handleDelete (arrId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/api/c/operation-management/arrposid/delete.json', {
          ids: arrId
        })
        .then( response => {
          if (response.data.code == 'OK') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            setTimeout(function () {
              window.location.reload()
            },500)
          } else {
            this.$message({
              type: 'error',
              message: response.data.message
            })
          }
        })
        .catch( error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })     
      })
    },
    batchDelete () {
      let multipleId = []
      this.multipleSelection.forEach((item, index) => {
        multipleId.push(item.id)
      })
      if (multipleId.length == 0) {
        this.$message({
          type: 'warning',
          message: '请勾选至少一个'
        })
        return false
      }
      this.handleDelete(multipleId)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
    }
  }
}
</script>

<style scoped>
  
</style>