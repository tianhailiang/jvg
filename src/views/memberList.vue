<template>
  <section class="member-content">
    <h3 class="content-title">会员列表</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="会员名称">
                  <el-input type="text" size="small" v-model="userName"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="当前状态">
                  <el-select placeholder="" v-model="status" size="small">
                      <el-option
                      :label="item.label"
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in teacher"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="会员等级">
                <el-col :span="10">
                  <el-input type="text" v-model="minLevel" style="width: 100%;" size="small"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="10">
                  <el-input type="text" v-model="maxLevel" style="width: 100%;" size="small"></el-input>
                </el-col>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6">
            <div class="grid-content">
                <el-form-item label="是否VIP">
                    <el-radio-group v-model="vip">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
          </el-col>
      </el-form>
    </el-row>
    <!--  -->
    <div class="vip-content">
        <span>累计会员<strong>5000</strong></span>
        <el-button size="small" type="primary" @click="getMenberData()">搜索</el-button>
    </div>
    <!--  -->
    <el-table :data="memberListdata" style="width: 100%" border v-loading="loading" element-loading-text="努力奔跑中...">
        <el-table-column prop="currentid" type="selection" width="50" label="" align="center"></el-table-column>
        <el-table-column prop="id" width="70" label="会员ID" align="center"></el-table-column>
        <el-table-column prop="userName" label="会员名称" width="120" align="center"></el-table-column>
        <el-table-column prop="vipName" label="是否VIP" width="98" align="center"></el-table-column>
        <el-table-column prop="type" label="会员等级" width="120" align="center"></el-table-column>
        <el-table-column prop="statusName" label="当前状态" width="120" align="center"></el-table-column>
        <el-table-column prop="startTime" label="会员加入时间" width="120" align="center"></el-table-column>
        <el-table-column prop="totalIntegral" label="会员积分" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="openvipdetail(scope.$index, scope.row)">{{scope.row.totalIntegral}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="会员个数" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger">编辑</el-button>
                <el-button size="small" type="danger">冻结</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--  -->
    <div class="row-container" v-if="memberListdata.length">
      <el-pagination layout="prev, pager, next, jumper" background :total="total2" :page-size="20"></el-pagination>
      <el-button size="small" type="primary">确定</el-button>
    </div>
    <!-- 会员积分详情弹窗 -->
    <el-dialog title="会员积分详情弹窗" :visible.sync="dialogFormVisible" class="modal">
      <el-form size="small" :inline="true">
          <el-form-item label="会员ID" :label-width="formLabelWidth">
              <el-input :disabled="true" v-model="id"></el-input>
          </el-form-item>
          <el-form-item label="会员姓名" :label-width="formLabelWidth">
            <el-input :disabled="true" v-model="userName"></el-input>
          </el-form-item>
          <el-form-item label="开通频道" :label-width="formLabelWidth">
            <el-input :disabled="true" v-model="typeName"></el-input>
          </el-form-item>
      </el-form>
      <!--  -->
      <el-table :data="dataGood" style="width: 100%" border size="medium">
        <el-table-column prop="id" type="selection" width="45" label="NO" align="center"></el-table-column>
        <el-table-column prop="behaviourName" label="行为" width="100" align="center"></el-table-column>
        <el-table-column prop="number" width="189" label="获得积分" align="center"></el-table-column>
        <el-table-column prop="createdAt" width="150" label="活动日期" align="center"></el-table-column>
        <el-table-column prop="addordown" label="积分增减" width="150" align="center"></el-table-column>
      </el-table>
      <!--  -->
      <div class="row-container" v-if="dataGood.length" style="margin:20px 0;">
        <el-pagination 
        layout="prev, pager, next, jumper" 
        background 
        :total="total"
        :page-size="20"></el-pagination>
        <el-button size="small" type="primary">确定</el-button>
      </div>
      <el-form size="small" :inline="true">
        <el-form-item label="手动调整积分" :label-width="formLabelWidth">
            <el-input type="text" v-model="manualIntegral"></el-input>
        </el-form-item>
        <el-form-item label="初始化积分" :label-width="formLabelWidth">
          <el-input type="text" v-model="initializeIntegral"></el-input>
        </el-form-item>
        <el-form-item label="积分总数" :label-width="formLabelWidth">
          <el-input type="text" :disabled="true" v-model="totalIntegral"></el-input>
        </el-form-item>
    </el-form>
      <!--  -->
      <div class="row-container">
          <el-button size="small" type="primary" @click="updateIntegral()">提交</el-button>
          <el-button size="small" type="primary">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'memberList',
  data () {
    return {
      status: '',
      dataGood: [],
      initializeIntegral: '',
      manualIntegral: '',
      teacher: [
        {value: '1', label: '全部'},
        {value: '2', label: '使用中'},
        {value: '3', label: '已过期'}
      ],
      vip: '',
      id: '',
      maxLevel: '',
      minLevel: '',
      userName: '',
      status: '',
      loading: false,
      userId: '',
      memberListdata: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      totalIntegral: '',
      typeName: '',
      total: null,
      total2: null
    }
  },
  created() {
    this.getMenberData()
  },
  methods: {
    handleSizeChange() {

    },
    getMenberData() {
      axios.post(this.$store.state.api.memberList, {
        userName: this.userName,
        minLevel:	this.minLevel,
        maxLevel:	this.maxLevel,
        status:this.status,
        pageNo:1,
        pageSize:20
      }).then((res) => {
        console.log(res)
        this.memberListdata = res.data.result.modelData
        this.total2 = res.data.result.total
      }).catch((err) => {
        console.log(`请求出现错误`)
      })
    },
    openvipdetail(index, row) {
      this.dialogFormVisible = true
      this.totalIntegral = row.totalIntegral
      this.id = row.id
      this.userName = row.userName
      this.typeName = row.typeName
      this.userId = row.userId
      axios.post(this.$store.state.api.searchIntegral, {
        id:row.id
      }).then(res => {
        console.log(res)
        this.dataGood = res.data.result.modelData
        this.total = res.data.result.total
      })
    },
    updateIntegral() {
      this.dialogFormVisible = false
      axios.post(this.$store.state.api.updateIntegral, {
        userId :this.userId,
        initializeIntegral: this.initializeIntegral,
        manualIntegral: this.manualIntegral
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }).catch(error => {

      })
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
.vip-content{
  text-align:right;
  margin-right: 30px;
  margin-bottom: 30px;
}
.vip-content strong {
  margin: 0 120px 0 10px;
  display: inline-block;
  font-size: 20px;
}
.member-content{
  margin-left:260px;
}
</style>