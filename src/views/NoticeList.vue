<template>
  <div>
    <div class="nav">
      通知列表
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：" :label-width="formLabelWidth">
        <el-input v-model="formInline.id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="内容关键词：" :label-width="formLabelWidth">
        <el-input v-model="formInline.keyword" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建人：" :label-width="formLabelWidth">
        <el-input v-model="formInline.creater" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="formInline.createTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="频道：" :label-width="formLabelWidth">
        <el-select v-model="formInline.channel" >
          <el-option
            v-for="item in formInline.channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知范围：" :label-width="formLabelWidth">
        <el-select v-model="formInline.noticeRange" >
          <el-option
            v-for="item in formInline.noticeRangeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型：" :label-width="formLabelWidth">
        <el-select v-model="formInline.newsType" >
          <el-option
            v-for="item in formInline.newsTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发送时间：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="formInline.sendTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
        <el-button @click="createNotice" size="small" >创建通知</el-button>
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
        label="通知ID"
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
        prop="noticeContent"
        label="通知内容"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="channel"
        label="频道"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="noticeRange"
        label="通知范围"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="newsType"
        label="消息类型"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="creater"
        label="创建人"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="automatic"
        label="自动"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="sendTime"
        label="发送时间"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="goDetail(scope.$index, scope.row)">查看</el-button>
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
  name: 'noticeList',
  data () {
    return {
      formInline: {
        id: '',
        keyword: '',
        creater: '',
        createTime: '',
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
        noticeRange: '0',
        noticeRangeList:[{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '全部用户'
        }, {
          value: '2',
          label: '部分用户'
        }, {
          value: '3',
          label: 'vip'
        }],
        newsType: '0',
        newsTypeList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '公告消息'
        }, {
          value: '2',
          label: '广告消息'
        }, {
          value: '3',
          label: '审核消息'
        }, {
          value: '4',
          label: '营销消息'
        }, {
          value: '5',
          label: '反馈消息'
        }]
      },
      formLabelWidth: '100px',
      tableData: [{
        id: '10001',
        noticeContent: '美国留学美国留学美国留学美国留学美国留学',
        channel: '语培',
        noticeRange: '所有用户',
        newsType: '所有用户',
        creater: 'thl',
        createTime: '2018.01.01',
        automatic: '是',
        sendTime: '2018.01.01'
      }, {
        id: '10001',
        noticeContent: '美国留学美国留学美国留学美国留学美国留学',
        channel: '语培',
        noticeRange: '所有用户',
        newsType: '所有用户',
        creater: 'thl',
        createTime: '2018.01.01',
        automatic: '是',
        sendTime: '2018.01.01'
      }, {
        id: '10001',
        noticeContent: '美国留学美国留学美国留学美国留学美国留学',
        channel: '语培',
        noticeRange: '所有用户',
        newsType: '所有用户',
        creater: 'thl',
        createTime: '2018.01.01',
        automatic: '是',
        sendTime: '2018.01.01'
      }],
      multipleSelection: [],
      currentPage: 1
    }
  },
  methods: {
    onSubmit () {

    },
    createNotice () {

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
    },
    goDetail (index, row) {
      this.$router.push({name: 'noticeDetail', params: {id: row.id}})
    }
  }
}
</script>

<style scoped>
  .nav{
    width:100%;
    height:40px;
    font-size: 18px;
    line-height: 40px;
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
  }
</style>

