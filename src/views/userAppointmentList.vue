<template>
  <section class="reservation-content">
    <h3 class="reservation-title">用户预约列表</h3>
    <el-row :gutter="20">
        <el-form label-width="80px">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                  <el-form-item label="活动名称">
                    <el-input type="text" size="small" v-model="Userform.title"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="预约人">
                      <el-input type="text" size="small" v-model="Userform.name"></el-input>
                    </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="意向国家">
                        <el-input type="text" size="small" v-model="Userform.countries"></el-input>
                      </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="是否回复">
                            <el-select placeholder="" v-model="Userform.replyStatus" size="small">
                                <el-option 
                                :label="item.label" 
                                :value="item.value"
                                :key="index"
                                v-for="(item, index) in value2Data"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                              <el-date-picker type="datetime" placeholder="开始时间" v-model="Userform.startTime" style="width: 100%;" size="small"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="datetime" placeholder="结束时间" v-model="Userform.endTime" style="width: 100%;" size="small"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </div>
                </el-col>
                <el-button size="small" type="primary" class="btn-search" @click="searchUser()">搜索</el-button>
        </el-form>
      </el-row>
      <!--  -->
      <el-table @selection-change="handleSelectionChange" :data="tabeldata" style="width: 100%" border size="medium"  v-loading="loading">
          <el-table-column type="selection" width="60" label="" align="center"></el-table-column>
          <el-table-column prop="title" width="160" label="活动名称" align="center"></el-table-column>
          <el-table-column prop="name" label="预约人" width="165" align="center"></el-table-column>
          <el-table-column prop="phone" label="预约人联系方式" width="140" align="center"></el-table-column>
          <el-table-column prop="countries" label="意向国家" width="140" align="center"></el-table-column>
          <el-table-column prop="emall" label="预约人邮箱" width="140" align="center"></el-table-column>
          <el-table-column prop="replyStatusName" label="回复状态" width="120" align="center"></el-table-column>
          <el-table-column label="操作" width="170" align="center">
              <template slot-scope="scope">
                  <el-button size="small" type="danger" @click="removeUser(scope.$index, scope.row)">删除</el-button>
                  <el-button size="small" type="danger" @click="openReplyModal(scope.$index, scope.row)">回复</el-button>
              </template>
          </el-table-column>
      </el-table>
      <div class="page-container" v-if="tabeldata.length">
          <el-pagination background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="20"
          :total="total"
          :current-page="pageNo"
          :page-sizes="[20, 30, 40, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" type="primary" class="remove" @click="userBatchDeletion()">批量删除</el-button>
    </div>
    <!-- 回复用户预约弹窗 -->
    <el-dialog title="回复提示窗口" :visible.sync="dialogShow" width="30%">
      <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动ID">
            <el-input type="text" size="small" v-model="id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
              <el-input type="text" size="small" :disabled="true" v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="回复内容">
            <el-input type="textarea" size="small" v-model="replyMemo"></el-input>
          </el-form-item>
      </el-form>
      <span>提示：用户重新申请审核</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="submitreplyUser()">确 定</el-button>               
      </span>
  </el-dialog>
  </section>
</template>
<script>
import {searchUser, replyUser,removeUser} from '@/api/url.js'
export default {
  name: 'userAppointmentList',
  data () {
    return {
      dialogShow: false,
      replyMemo: '',
      id: '',
      title: '',
      Userform: {
        title: '',
        name: '',
        endTime: '',
        startTime: '',
        countries: '',
        replyStatus: '',
      },
      value2Data: [
        {value: '1',label: '全部'},
        {value: '2',label: '已回复'},
        {value: '3',label: '未回复'}
      ],
      tabeldata: [],
      loading: false,
      pageNo: 1,
      pageSize: 20,
      multipleSelection: []
    }
  },
  created() {
    this.searchUser()
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val
      this.searchUser()
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${this.pageSize} 条`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    searchUser() {
      this.loading = true
      searchUser({
        // title: this.Userform.title,
        name: this.Userform.name,
        // endTime: this.Userform.endTime,
        // startTime: this.Userform.startTime,
        // countries: this.Userform.countries,
        // replyStatus: this.Userform.replyStatus,

      }).then(res => {
        // console.log(res)
        this.tabeldata = res.result.modelData
        this.total = res.result.total
        this.loading = false
      }).catch(error => {

      })
    },
    openReplyModal(index, row) {
      this.dialogShow = true
      this.id = row.id
      this.title = row.title
    },
    submitreplyUser() {
      replyUser({
        id:this.id,
        replyMemo: this.replyMemo
      }).then(res => {
        this.$message({
          type: 'success',
          message: res.data.message
        })
        this.dialogShow = false
        this.replyMemo = null
      }).catch(error => {

      })
    },
    userBatchDeletion() { //批量删除
      let defaultObj = []
      this.multipleSelection.forEach((item, index, array) => {
        defaultObj.push(item.id)
      })
      removeUser({ids:defaultObj}).then(res => {
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }).catch(error => {

      })
    },
    removeUser(index, row) { //删除
      removeUser({
        ids: [row.id]
      }).then(res => {
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
@import '../assets/style/common_reserva.css';
.reservation-content{
  margin-left: 260px;
}
.btn-search{
  margin-top:5px;
  margin-left: 20px;
}
</style>