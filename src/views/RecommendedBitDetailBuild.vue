<template>
  <div class="vue-right-box">
    <div class="nav" v-if="formInline.id">
      推荐位编辑
    </div>
    <div class="nav" v-else>
      推荐位新建
    </div>
    <el-form :inline="true" :model="formInline" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：" v-if="formInline.id">
        {{formInline.id}}
      </el-form-item>
      <el-form-item label="ID：" v-else>
        <el-input v-model="formInline.id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="推荐位名称：">
        <el-input v-model="formInline.recommendName" size="small"></el-input>
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
      <el-form-item label="位置：">
        <el-select v-model="formInline.position" >
          <el-option
            v-for="item in formInline.positionList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：">
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
    <!-- 课程推荐列表 -->
    <RecommendedCourseList :dialogFormVisible.sync="dialogFormVisible1" :dialogForm="dialogForm1" />
    <!-- 文章推荐列表窗口 -->
    <RecommendedArticleList :dialogFormVisible.sync="dialogFormVisible2" :dialogForm="dialogForm2" />
    <!-- 留学达人推荐列表窗口 -->
    <RecommendedDarenList :dialogFormVisible.sync="dialogFormVisible3" :dialogForm="dialogForm3" />
    <!-- 语培达人推荐列表窗口 -->
    <RecommendedLanguageList :dialogFormVisible.sync="dialogFormVisible4" :dialogForm="dialogForm4" />
  </div>
</template>

<script>
import RecommendedArticleList from '@/components/RecommendedArticleList.vue'
import RecommendedCourseList from '@/components/RecommendedCourseList.vue'
import RecommendedDarenList from '@/components/RecommendedDarenList.vue'
import RecommendedLanguageList from '@/components/RecommendedLanguageList.vue'
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
      tableData: [{
        id: '10001',
        recommendContent: '你好啊',
        type: '1',
        platform: 'PC',
        channel: '语培'
      }, {
        id: '10001',
        recommendContent: '你好啊',
        type: '2',
        platform: 'PC',
        channel: '语培'
      }, {
        id: '10001',
        recommendContent: '你好啊',
        type: '3',
        platform: 'PC',
        channel: '语培'
      }, {
        id: '10001',
        recommendContent: '你好啊',
        type: '4',
        platform: 'PC',
        channel: '语培'
      }, {
        id: '10001',
        recommendContent: '你好啊',
        type: '5',
        platform: 'PC',
        channel: '语培'
      }],
      multipleSelection: [],
      dialogFormVisible1: false,
      dialogForm1: '',
      dialogFormVisible2: false,
      dialogForm2: '',
      dialogFormVisible3: false,
      dialogForm3: '',
      dialogFormVisible4: false,
      dialogForm4: '',
      dialogFormVisible5: false,
      dialogForm5: ''
    }
  },
  components: {
    RecommendedArticleList,
    RecommendedCourseList,
    RecommendedDarenList,
    RecommendedLanguageList
  },
  methods: {
    handleDelete (index, row) {
      
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    add (index, row) {
      if (row.type == 2) {
        this.dialogFormVisible2 = true
        this.dialogForm2 = row
      } else if (row.type == 1) {
        this.dialogFormVisible1 = true
        this.dialogForm1 = row
      } else if (row.type == 3) {
        this.dialogFormVisible3 = true
        this.dialogForm3 = row
      } else if (row.type == 4) {
        this.dialogFormVisible4 = true
        this.dialogForm4 = row
      } else if (row.type == 5) {
        this.dialogFormVisible5 = true
        this.dialogForm5 = row
      }
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