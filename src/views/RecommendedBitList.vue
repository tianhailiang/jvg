<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      推荐位列表
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：">
        <el-input v-model="id" size="small" type="number"></el-input>
      </el-form-item>
      <el-form-item label="推荐位名称：">
        <el-input v-model="name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="platform" >
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="channel" >
          <el-option
            v-for="item in channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置：">
        <el-select v-model="position" >
          <el-option
            v-for="item in positionList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select v-model="type" >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
        <el-button @click="createRecommend" size="small" >创建推荐位</el-button>
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
        prop="id"
        label="ID"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="推荐位名称"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="platform"
        label="渠道"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="channel"
        label="频道"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="position"
        label="位置"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="recommendContent"
        label="推荐物内容"
        width="120" align="center" show-overflow-tooltip>
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
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-box" >
      <el-button type="danger" @click="batchDelete()" >批量删除</el-button>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000" style="text-align:center;margin-top:20px">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'recommendedBitList',
  data () {
    return {
      id: null,
      name: '',
      platform: '0',
      platformList: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: 'APP'
      }, {
        value: '2',
        label: 'WAP'
      }, {
        value: '3',
        label: 'PC'
      }],
      channel: null,
      channelList: [],
      position: '0',
      positionList:[{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '留学首页'
      }, {
        value: '2',
        label: '语培首页'
      }, {
        value: '3',
        label: '留学达人'
      }, {
        value: '4',
        label: '语培达人'
      }],
      type: '0',
      typeList: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '课程'
      }, {
        value: '2',
        label: '文章'
      }, {
        value: '3',
        label: '讲师'
      }, {
        value: '4',
        label: '顾问'
      }, {
        value: '5',
        label: '页面'
      }],
      tableData: [{
        id: '10001',
        recommendName: '美国留学',
        platform: 'PC',
        channel: '语培',
        position: '留学首页',
        type: '课程',
        recommendContent: '你好啊'
      }, {
        id: '10001',
        recommendName: '美国留学',
        platform: 'PC',
        channel: '语培',
        position: '留学首页',
        type: '课程',
        recommendContent: '你好啊'
      }, {
        id: '10001',
        recommendName: '美国留学',
        platform: 'PC',
        channel: '语培',
        position: '留学首页',
        type: '课程',
        recommendContent: '你好啊'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  methods: {
    onSubmit () {

    },
    createRecommend () {
      //代表新建
      this.$router.push({name: 'recommendedBitEditor', params: {id: 0}})
    },
    editor (index, row) {
      this.$router.push({name: 'recommendedBitEditor', params: {id: row.id}})
    },
    handleDelete (index, row) {

    },
    batchDelete () {

    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px
  }
  .btn-box{
    display: flex;
    justify-content: flex-end
  }
</style>