<template>
  <section class="member-content" style="margin-left:260px;">
    <h3 class="content-title">讲师声望值统计</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="讲师姓名">
                  <el-input type="text" size="small" v-model="userName"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="讲师分类">
                  <el-select v-model="userType" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in teacher"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
          <el-button size="small" type="primary" @click="searchPrestige()">搜索</el-button>
      </el-form>
    </el-row>
    <!-- 表格统计 -->
    <el-table :data="Prestigedata" style="width: 100%" border>
        <el-table-column prop="currentid" width="177" label="NO" align="center"></el-table-column>
        <el-table-column prop="userId" label="讲师ID" width="177" align="center"></el-table-column>
        <el-table-column prop="userName" label="讲师姓名" width="177" align="center"></el-table-column>
        <el-table-column prop="userTypeName" label="讲师分类" width="190" align="center"></el-table-column>
        <el-table-column prop="value" label="讲师声望值" width="177" align="center"></el-table-column>
        <el-table-column label="操作" width="190" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="editDetail(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 弹出模态框 -->
    <el-dialog title="讲师声望值详细信息" :visible.sync="dialogFormVisible" class="modal">
        <el-form size="small">
            <el-form-item label="讲师姓名" :label-width="formLabelWidth">
                <el-input v-model="userName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="讲师ID" :label-width="formLabelWidth">
                <el-input v-model="userId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="讲师分类" :label-width="formLabelWidth">
                <el-input v-model="userTypeName" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="detailData" style="width: 100%" border size="small">
            <el-table-column prop="currentid" width="60" label="NO" align="center"></el-table-column>
            <el-table-column prop="currentid" width="140" label="行为" align="center"></el-table-column>
            <el-table-column prop="behaviorNumber" label="行为次数/人数" width="140" align="center"></el-table-column>
            <el-table-column prop="ratio" label="占百分比" width="84" align="center"></el-table-column>
            <el-table-column prop="type" label="分值增加/减少" width="130" align="center"></el-table-column>
            <el-table-column prop="score" label="得分" width="80" align="center"></el-table-column>
        </el-table>
        <div class="form-foot">
            <el-form size="small">
                <el-form-item label="当前声望值" :label-width="formLabelWidth">
                    <el-input v-model="value" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手动初始值" :label-width="formLabelWidth">
                    <el-input v-model="initialValue"></el-input>
                </el-form-item>
            </el-form>
            <p>声望值得分=8分（20次X40%）+20分（100次X20%）+20分（200次X10%）+2.5分（50次X5%）+0.6分（30次X2%）+0.3分（10次X3%）+15分（300人X5%）+3分（100次X3%）+2分（100次X2%）-0.2分（5次X4%）-0.1分（5次X2%）-0.2分（5次X4%）=70.9分</p>
            <el-button type="primary" class="btn-block" size="small" @click="dialogFormVisible = false">保存</el-button>
        </div>
    </el-dialog>
  </section>
</template>
<script>
  import {searchPrestige, searchdetail} from '@/api/url.js'
export default {
  name: 'lecturerStatistics',
  data () {
    return {
      teacher: [
        {value: '1', label: '个人讲师'},
        {value: '2', label: '机构讲师'}, 
        {value: '3', label: '院校讲师'}, 
        {value: '4', label: '顾问'}, 
        {value: '5', label: '个人大咖'},
        {value: '6', label: '院校大咖'}
      ],
      detailData: [],
      userName: '',
      userType: '',
      value: '',
      userId: '',
      initialValue: '',
      userTypeName: '',
      Prestigedata: [],
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.searchPrestige()
  },
  methods: {
    searchPrestige() {
      searchPrestige({
        // userName: this.userName,
        // userType: this.userType,
        userName: '李四',
        userType: 1,
        pageNo: 1,
        pageSize: 20
      }).then(res => {
        console.log(res)
        this.Prestigedata = res.result.modelData
      })
    },
    editDetail(index, row) {
      this.dialogFormVisible = true
      this.userId = row.userId
      // this.userName = row.userName
      this.userTypeName = row.userTypeName
      this.value = row.value
      searchdetail({
        userId: this.userId,
        pageNo: 1,
        pageSize: 20
      }).then(res => {
        this.detailData = res.result.modelData
        console.log(res)
      })
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
.form-foot{margin-top:20px;}
.modal .el-input{width: 70%;}
.btn-block{display: block;margin: auto;}
</style>