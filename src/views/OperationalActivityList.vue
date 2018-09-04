<template>
  <div>
    <div class="nav">
      运营活动列表
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="活动名称：">
        <el-input v-model="formInline.activityName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="formInline.state" >
          <el-option
            v-for="item in formInline.stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="formInline.platform" >
          <el-option
            v-for="item in formInline.platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属频道：">
        <el-select v-model="formInline.channel" >
          <el-option
            v-for="item in formInline.channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间：">
        <el-date-picker
          v-model="formInline.activityTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
        <el-button @click="createActivity" size="small" >创建活动</el-button>
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
        prop="activityName"
        label="活动名称"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="activityTime"
        label="活动开始时间"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="120" align="center" show-overflow-tooltip>
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
        prop="activityCity"
        label="活动城市"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
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
  name: 'operationalActivityList',
  data () {
    return {
      formInline: {
        activityName: '',
        state: '0',
        stateList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '进行中'
        }, {
          value: '2',
          label: '已结束'
        }],
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
        channel: '0',
        channelList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '语培'
        }, {
          value: '2',
          label: '留学'
        }],
        activityTime: ''
      },
      tableData: [{
        id: '10001',
        activityName: '美国留学',
        activityTime: '2018-9-3',
        state: '进行中',
        platform: 'PC',
        channel: '语培',
        activityCity: '北京'
      }, {
        id: '10002',
        activityName: '美国留学',
        activityTime: '2018-9-3',
        state: '进行中',
        platform: 'PC',
        channel: '语培',
        activityCity: '北京'
      }, {
        id: '10003',
        activityName: '美国留学',
        activityTime: '2018-9-3',
        state: '进行中',
        platform: 'PC',
        channel: '语培',
        activityCity: '北京' 
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  methods: {
    onSubmit () {

    },
    createActivity () {
      this.$router.push({name: 'operationalActivityDetail', params: {id: 0}})
    },
    editor (index, row) {
      this.$router.push({name: 'operationalActivityDetail', params: {id: row.id}})
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