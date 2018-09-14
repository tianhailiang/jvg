<template>
  <div class="right-box">
    <div class="nav" >
      课题列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="话题ID">
        <el-input v-model="id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题标题">
        <el-input v-model="title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题频道">
        <el-select v-model="channelVal" size="small">
          <el-option
          v-for="item in channelList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话题分类" >
        <el-select v-model="classificationVal" size="small" >
          <el-option
          v-for="item in classificationList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="timeVal"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" 
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <template v-if="total >0" >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange" border>
        <el-table-column
          type="selection"
          label="全部"
          width="55" >
        </el-table-column>
        <el-table-column
          label="话题id"
          width="80" align="center" >
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="goDetail(scope.$index, scope.row)">
              {{scope.row.id}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="话题标题"
          width="80" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="content"
          label="话题内容"
          width="200" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="business"
          label="话题频道"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="categorySigns"
          label="话题分类"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="lableIds"
          label="话题标签"
          width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="创建人"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="话题创建时间"
          width="120" align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center" width="160" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-box" >
        <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
      </div>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align:center;margin-top:20px" v-if="total > 0">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'interlocutionList',
  data () {
    return {
      id: '',
      title: '',
      channelVal: '',
      channelList: [],
      classificationVal: '0',
      classificationList: [{
        value: '0',
        label: '全部'
      },
      {
        value: '1',
        label: '托福'
      }, {
        value: '2',
        label: '雅思'
      }],
      timeVal: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    onSubmit (e) {
      axios.post('topic/list/list.json', {
        languages: "zh",
        // id: this.id,
        // name: this.title,
        // business: this.channelVal,
        // categorySigns: this.classificationVal,
        // createdAtFrom: this.timeVal[0],
        // createdAtTo: this.timeVal[1],
        pageNo: 1,
        pageSize: 20
      })
      .then(function (response) {
        this.total = response.data.result.total
        this.tableData = response.data.result.modelData
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
    },
    batchDelete () {

    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      this.$router.push({name: 'interlocutionDetail', params: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('topic/list/delete.json', {
          id: [row.id]
        })
        .then(function (response) {
          console.log(response)
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
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })     
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      axios.post('topic/list/list.json', {
        languages: "zh",
        pageNo: val,
        pageSize: 20
      })
      .then(function (response) {
        this.tableData = response.data.result.modelData
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
    },
    goDetail (index, row) {
      this.$router.push({name: 'interlocutionDetail', params: {id: row.id}})
    }
  },
  mounted () {
    axios.post('common/code/channel/list.json', {
    })
    .then(function (response) {
      this.channelList = response.data.result
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>
<style scoped>
  .right-box {
    display: flex;
    flex-direction: column
  }
  .nav {
    height:40px;
    font-size: 18px;
    line-height: 40px
  }
  .btn-box {
    display: flex;
    justify-content: flex-end
  }
</style>
