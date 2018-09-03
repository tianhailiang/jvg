<template>
  <div>
    <div class="nav">
      分成规则列表
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="规则名称：">
        <el-input v-model="formInline.rulesName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分成方式：">
        <el-select v-model="formInline.divisionMethod" >
          <el-option
            v-for="item in formInline.divisionMethodList"
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
      <el-form-item label="频道：">
        <el-select v-model="formInline.channel" >
          <el-option
            v-for="item in formInline.channelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用业务：">
        <el-select v-model="formInline.suitBusiness" >
          <el-option
            v-for="item in formInline.suitBusinessList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人：">
        <el-input v-model="formInline.creater" size="small"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-date-picker
          v-model="formInline.createTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="small" >搜索</el-button>
        <el-button @click="createRecommend" size="small" >创建分成规则</el-button>
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
        prop="rulesName"
        label="规则名称"
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
        prop="suitBusiness"
        label="适用业务"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="divideType"
        label="分成类型"
        width="120" align="center" >
      </el-table-column>
      <el-table-column
        prop="secondaryType"
        label="二级类型"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="divisionMethod"
        label="分成方式"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="specificDivide"
        label="具体分成"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="creater"
        label="创建人"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleStop(scope.$index, scope.row)">停用</el-button>
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
  name: 'divdeIntoRulesList',
  data () {
    return {
      formInline: {
        rulesName: '',
        divisionMethod: '0',
        divisionMethodList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '按比例'
        }, {
          value: '2',
          label: '按金额'
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
        suitBusiness: '0',
        suitBusinessList:[{
          value: '0',
          label: '课程'
        }, {
          value: '1',
          label: '文章'
        }, {
          value: '2',
          label: '出版物'
        }],
        creater: '',
        createTime: '',
        state: '0',
        stateList: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '使用中'
        }, {
          value: '2',
          label: '停用'
        }]
      },
      tableData: [{
        id: '10001',
        rulesName: '美国留学',
        platform: 'PC',
        channel: '语培',
        suitBusiness: '课程',
        divideType: '用户等级',
        secondaryType: '一星用户',
        divisionMethod: '按比例',
        specificDivide: '4/6',
        state: '使用中',
        creater: 'thl',
        createTime: '2018-8-31' 
      }, {
        id: '10001',
        rulesName: '美国留学',
        platform: 'PC',
        channel: '语培',
        suitBusiness: '课程',
        divideType: '用户等级',
        secondaryType: '一星用户',
        divisionMethod: '按比例',
        specificDivide: '4/6',
        state: '使用中',
        creater: 'thl',
        createTime: '2018-8-31' 
      }, {
        id: '10001',
        rulesName: '美国留学',
        platform: 'PC',
        channel: '语培',
        suitBusiness: '课程',
        divideType: '用户等级',
        secondaryType: '一星用户',
        divisionMethod: '按比例',
        specificDivide: '4/6',
        state: '使用中',
        creater: 'thl',
        createTime: '2018-8-31' 
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