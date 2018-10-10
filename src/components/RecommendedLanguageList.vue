<template>
  <el-dialog title="语培达人推荐列表" :visible.sync="dialogFormVisible" :before-close="handleClose"
  width="80%">
    <el-form :inline="true">
      <div >
        <el-form-item label="渠道：" >
          {{dialogForm.platformName}}
        </el-form-item>
        <el-form-item label="频道：" >
          {{dialogForm.channelName}}
        </el-form-item>
      </div>
      <el-form-item label="达人名称：" >
        <el-input v-model="realName" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="sex" size="small" >
          <el-option
          v-for="item in sexList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认证：">
        <el-select v-model="approveStatus" size="small" >
          <el-option
          v-for="item in approveStatusList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色：">
        <el-select v-model="type" size="small" >
          <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit(1)" size="small" >搜索</el-button>
      </el-form-item>
    </el-form>
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
        label="用户ID"
        align="center" width="80">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="用户/联系人姓名"
        width="130" align="center">
      </el-table-column>
      <el-table-column
        prop="typeValue"
        label="用户角色"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="sexValue"
        label="性别"
        width="60" align="center" >
      </el-table-column>
      <el-table-column
        prop="createdAtStr"
        label="用户注册时间"
        width="175" align="center" >
      </el-table-column>
      <el-table-column
        prop="lastTimeStr"
        label="最近登录时间"
        width="175" align="center" >
      </el-table-column>
      <el-table-column
        prop="statusValue"
        label="状态"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="approveStatusValue"
        label="认证"
        width="80" align="center" >
      </el-table-column>
      <el-table-column
        prop="registeredChannelValue"
        label="注册频道"
        width="120" align="center" >
      </el-table-column>
    </el-table>
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
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">确定</el-button>
      <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'recommendedLanguageList',
  props: ['dialogFormVisible', 'dialogForm'],
  data () {
    return {
      realName: '',
      sex: null,
      sexList: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '男'
      }, {
        value: 2,
        label: '女'
      }],
      approveStatus: 0,
      approveStatusList: [{
        value: 0,
        label: '全部'
      },
      {
        value: 1,
        label: '未认证'
      }, {
        value: 2,
        label: '已认证'
      }, {
        value: 3,
        label: '认证失败'
      }],
      type: null,
      typeList: [],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  watch: {
    dialogFormVisible (newVal, oldVal) {
      if (this.dialogFormVisible) {
        axios.post('/api/c/common/code/role/list.json')
          .then(res => {
            this.typeList = res.data.result
          })
          .catch(error => {
            console.log(error);
          })
        this.onSubmit()
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:dialogFormVisible', false)
    },
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('/api/c/operation-management/arrposid/language/list.json', {
        realName: this.realName,
        sex: this.sex,
        approveStatus: this.approveStatus,
        type: this.type,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        if (res.data.code == 'OK') {
          this.tableData = res.data.result.modelData
          this.total = res.data.result.total
          this.infoTotal = this.total
        }
      })
      .catch(error => {
        console.log(error)
      })
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
    },
    sure () {
      let productList = []
      this.multipleSelection.forEach((item, index) => {
        let productObj = {}
        productObj.productId = item.id
        productObj.productName = item.realName
        productList.push(productObj)
      })
      if (productList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请至少选中一个'
        })
        return false
      }
      this.$emit('update:dialogFormVisible', false)
      this.$emit('select-list', productList)
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
  .dialog-footer {
    display: flex;
    justify-content: center
  }
</style>
