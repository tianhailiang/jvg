<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      推荐位编辑
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="ID：" :label-width="formLabelWidth">
        {{$route.params.id}}
      </el-form-item>
      <el-form-item label="推荐位名称：">
        <el-input v-model="name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="渠道：">
        <el-select v-model="platform" size="small" style="width:160px">
          <el-option
            v-for="item in platformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="channel" size="small" style="width:160px">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select v-model="type" size="small" style="width:160px"
        @change="onTypeChange">
          <el-option
            v-for="item in typeList"
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
      @selection-change="handleSelectionChange" border>
      <el-table-column
        type="index"
        label="NO"
        width="55" align="center">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="推荐物ID"
        width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="推荐位内容"
        width="800" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center" width="120" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="remove(scope.$index, scope.row)">X</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="vue-btn-box" >
      <el-button type="primary" @click="add()" >添加推荐物</el-button>
    </div>
    <div class="btn-box" >
      <el-button type="primary" @click="btnSure" >确定</el-button>
    </div>
    <!-- 课程推荐列表 -->
    <RecommendedCourseList :dialogFormVisible.sync="dialogFormVisible1" :dialogForm="dialogForm1" />
    <!-- 文章推荐列表窗口 -->
    <RecommendedArticleList :dialogFormVisible.sync="dialogFormVisible2" :dialogForm="dialogForm2" v-on:select-list="onSelectList"/>
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
  name: 'recommendedBitDetail',
  data () {
    return {
      formLabelWidth: '80px',
      id: null,
      name: '',
      platform: null,
      platformList: [{
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
      dialogFormVisible1: false,
      dialogForm1: {
        platformName: '',
        channelName : ''
      },
      dialogFormVisible2: false,
      dialogForm2: {
        platformName: '',
        channelName : ''
      },
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
  created () {
    axios.post('common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      axios.post('operation-management/arrposid/detail.json', {
        id: this.$route.params.id
      })
      .then(res => {
        this.name = res.data.result.name
        this.platform = res.data.result.source
        this.channel = res.data.result.channel
        this.type = res.data.result.type
        this.tableData = res.data.result.productList
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    add () {
      if (this.type == 1) {
        this.dialogFormVisible1 = true
        this.dialogForm1.platformName = this.platformList[this.platform-1].label
        this.dialogForm1.channelName = this.channelList[this.channel-1].name
      } else if (this.type == 2) {
        this.dialogFormVisible2 = true
        this.dialogForm2.platformName = this.platformList[this.platform-1].label
        this.dialogForm2.channelName = this.channelList[this.channel-1].name
      }
      // } else if (row.type == 1) {
      //   this.dialogFormVisible1 = true
      //   this.dialogForm1 = row
      // } else if (row.type == 3) {
      //   this.dialogFormVisible3 = true
      //   this.dialogForm3 = row
      // } else if (row.type == 4) {
      //   this.dialogFormVisible4 = true
      //   this.dialogForm4 = row
      // } else if (row.type == 5) {
      //   this.dialogFormVisible5 = true
      //   this.dialogForm5 = row
      // }
    },
    remove (index, row) {
      this.tableData.splice(index, 1)
    },
    onSelectList ($event) {
      /* 先初始化去重 */
      this.tableData.forEach((item, index, arr) => {
        $event.forEach((eitem, eindex, earr) => {
          if (eitem.productId === item.productId) {
            earr.splice(eindex, 1)
          }
        })
      })
      this.tableData = [...$event, ...this.tableData]
    },
    onTypeChange (val) {
      this.tableData = []
    },
    btnSure () {
      if (!this.name) {
        this.$message({
          type: 'warning',
          message: '推荐位名称不能为空'
        })
        return false
      }
      axios.post('operation-management/arrposid/update.json', {
        id: this.$route.params.id,
        name: this.name,
        source: this.platform,
        channel: this.channel,
        type: this.type,
        productList: this.tableData 
      })
      .then(res => {
        
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .btn-box{
    display: flex;
    justify-content: center;
    height:80px;
    align-items: center
  }
</style>