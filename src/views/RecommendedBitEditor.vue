<template>
  <div>
    <div class="nav" v-if="formInline.id">
      推荐位编辑
    </div>
    <div class="nav" v-else>
      推荐位新建
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：" :label-width="formLabelWidth" v-if="formInline.id">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="ID：" :label-width="formLabelWidth" v-else>
        <el-input v-model="formInline.id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="推荐位名称：" :label-width="formLabelWidth">
        <el-input v-model="formInline.recommendName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="渠道：" :label-width="formLabelWidth">
        <el-select v-model="formInline.platform" >
          <el-option
            v-for="item in formInline.platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      <el-form-item label="位置：" :label-width="formLabelWidth">
        <el-select v-model="formInline.position" >
          <el-option
            v-for="item in formInline.positionList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="formInline.type" >
          <el-option
            v-for="item in formInline.typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        label="推荐物ID"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="recommendContent"
        label="推荐位内容"
        width="600" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="160" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="remove(scope.$index, scope.row)">-</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="add(scope.$index, scope.row)">+</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-box" >
      <el-button type="primary" @click="btnSure" >确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommendedBitList',
  data () {
    return {
      formInline: {
        id: '',
        recommendName: '',
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
        }]
      },
      formLabelWidth: '100px',
      tableData: [{
        id: '10001',
        recommendContent: '你好啊'
      }, {
        id: '10001',
        recommendContent: '你好啊'
      }, {
        id: '10001',
        recommendContent: '你好啊'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleDelete (index, row) {

    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    add (index, row) {

    },
    remove (index, row) {
      this.tableData.splice(index, 1)
    },
    btnSure () {

    }
  },
  mounted () {
    if (this.$route.params.id == 0) {
      this.formInline.id = ''
    } else {
      this.formInline.id = this.$route.params.id
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
    justify-content: center;
    height:80px;
    align-items: center
  }
</style>