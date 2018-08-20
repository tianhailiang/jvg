<template>
  <div >
    <div class="nav" >
      课题列表
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="话题ID">
        <el-input v-model="formInline.id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题标题">
        <el-input v-model="formInline.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题频道">
        <el-select v-model="formInline.region" size="small">
          <el-option
          v-for="item in formInline.channelList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="话题分类" >
        <el-select v-model="formInline.classification_val" size="small" placeholder="全部" >
          <el-option
          v-for="item in formInline.classificationList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span class="demonstration">创建时间</span>
        <el-date-picker
        v-model="formInline.timeVal"
        type="datetimerange"
        :picker-options="pickerOptions2"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData3"
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
        label="话题id"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="title"
        label="话题标题"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="话题内容"
        width="200" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="channel"
        label="话题频道"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="classification"
        label="话题分类"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="话题标签"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建人"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="time"
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        id: '',
        title: '',
        user: '',
        region: '',
        channelList: [{
          value: '选项1',
          label: '语培'
        }, {
          value: '选项2',
          label: '留学'
        }],
        classification_val: '0',
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
        timeVal: ''
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        id: '10001',
        title: '美国留学',
        describe: '美国留学非常好啊',
        channel: '语培',
        classification: '托福',
        tag: '时讯，非时讯',
        time: '2018.01.01',
      }, {
        date: '2016-05-02',
        name: '王小虎',
        id: '10001',
        title: '美国留学我是科比啊 哈哈哈',
        describe: '美国留学非常好啊',
        channel: '语培',
        classification: '托福',
        tag: '时讯，非时讯',
        time: '2018.01.01',
      }, {
        date: '2016-05-02',
        name: '王小虎',
        id: '10001',
        title: '美国留学',
        describe: '美国留学非常好啊',
        channel: '语培',
        classification: '托福',
        tag: '时讯，非时讯',
        time: '2018.01.01',
      }],
      multipleSelection: []
    }
  },
  methods: {
    onSubmit (e) {
      console.log('submit!')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
  .demo-form-inline{
    border:1px solid #dcdcdc;
  }
  .demonstration{
    margin-right:10px;
  }
</style>
