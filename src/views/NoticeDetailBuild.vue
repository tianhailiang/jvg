<template>
  <div class="vue-right-box">
    <div class="vue-nav">
      通知详情（新建）
    </div>
    <el-form :inline="true" style="border:1px solid #dcdcdc">
      <el-form-item label="频道：" :label-width="formLabelWidth">
        <el-select v-model="channel" size="small">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知范围：" :label-width="formLabelWidth">
        <el-select v-model="rolesId" size="small">
          <el-option
            v-for="item in rolesIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型：" :label-width="formLabelWidth">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth"
      style="display:block;margin-right:0">
        <el-input v-model="name" size="small" style="min-width:1002px"></el-input>
      </el-form-item>
      <el-form-item label="内容关键词：" :label-width="formLabelWidth"
      style="display:block;margin-right:0">
        <el-input v-model="contents" size="small" style="min-width:1002px"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:44px">
        <el-radio-group v-model="isAuto" size="small"
        @change="onChange">
          <el-radio label="1">不自动</el-radio>
          <el-radio label="2">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送时间：" :label-width="formLabelWidth" v-if="isAuto == 2">
        <el-date-picker
          v-model="sendTime"
          type="datetime"
          placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"
          size="small">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template v-if="rolesId == 2" >
      <div class="part-top">
        选择部分推送用户
      </div>
      <el-form :inline="true" style="border:1px solid #dcdcdc">
        <el-form-item label="用户/联系人名称：" label-width="150px">
          <el-input v-model="realName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：">
          <el-input v-model="nikeName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="sex" size="small">
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认证：" :label-width="formLabelWidth">
          <el-select v-model="approveStatus" size="small">
            <el-option
              v-for="item in approveStatusList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色：">
          <el-select v-model="userType" size="small">
            <el-option
              v-for="item in userTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit(1)" type="primary" >搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange" border
        v-if="total > 0">
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
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户/联系人手机"
          width="130" align="center">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="角色"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="sexName"
          label="性别"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="createdAtStr"
          label="用户注册时间"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="lastTimeStr"
          label="最近登录时间"
          width="110" align="center" >
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="状态"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="approveStatusName"
          label="认证"
          width="100" align="center" >
        </el-table-column>
        <el-table-column
          prop="registeredChannelName"
          label="注册频道"
          width="100" align="center" >
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total" style="text-align:center;margin-top:20px" v-if="total > 0">
      </el-pagination>
      <div class="vue-info" v-if="infoTotal == 0">
        没有搜索到相关内容
      </div>
    </template>
    <div class="btn-box" >
      <el-button @click="sureBtn" type="primary" >确定</el-button>
      <!-- <el-button @click="cancel" type="primary" >取消</el-button> -->
    </div>
  </div>

</template>

<script>
export default {
  name: 'noticeDetailBuild',
  data () {
    return {  
      formLabelWidth: '100px',
      adminId: null,
      adminName: '',
      createdAt: '',
      channel: null,
      channelList: [],
      rolesId: 1,
      rolesIdList:[{
        value: 1,
        label: '全部'
      }, {
        value: 2,
        label: '部分用户'
      }, {
        value: 3,
        label: 'VIP'
      }, {
        value: 4,
        label: '会员'
      }],
      type: 0,
      typeList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '公告'
      }, {
        value: 2,
        label: '广告'
      }, {
        value: 3,
        label: '审核'
      }, {
        value: 4,
        label: '运营'
      }],
      name: '',
      contents: '',
      isAuto: null,
      sendTime: '',
      userList: [],
      realName: '',
      nikeName: '',
      sex: null,
      sexList: [{
        value: null,
        name: '全部'
      }, {
        value: 1,
        name: '男'
      }, {
        value: 2,
        name: '女'
      }],
      approveStatus: 0,
      approveStatusList: [{
        value: 0,
        name: '全部'
      }, {
        value: 1,
        name: '申请中'
      }, {
        value: 2,
        name: '成功'
      }, {
        value: 3,
        name: '失败'
      }],
      userType: 1,
      userTypeList: [],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      infoTotal: 1
    }
  },
  created () {
    axios.post('/api/c/common/code/channel/list.json', {
    })
    .then(res => {
      this.channelList = res.data.result
    })
    .catch(error => {
      console.log(error)
    })
    axios.post('/api/c/common/code/role/list.json')
    .then(res => {
      this.userTypeList = res.data.result
    })
    .catch(error => {
      console.log(error);
    })
  },
  methods: {
    onChange () {
      if (this.isAuto == 1) {
        this.sendTime = ''
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.userList = this.multipleSelection.map((item, index) => {
        return item.id
      })
    },
    onSubmit (origin) {
      if (origin == 1) {
        this.currentPage = 1
      }
      axios.post('/api/c/user/user/list.json', {
        realName: this.realName,
        nikeName: this.nikeName,
        registeredChannel: this.channel,
        sex: this.sex,
        approveStatus: this.approveStatus,
        type: this.userType,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      .then(response => {
        this.tableData = response.data.result.modelData
        this.total = response.data.result.total
        this.infoTotal = this.total
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.onSubmit()
    },
    sureBtn () {
      if (!this.channel) {
        this.$message({
          type: 'warning',
          message: '频道不能为空'
        })
        return false
      }
      if (!this.name) {
        this.$message({
          type: 'warning',
          message: '标题不能为空'
        })
        return false
      }
      if (!this.contents) {
        this.$message({
          type: 'warning',
          message: '内容关键词不能为空'
        })
        return false
      }
      if (this.isAuto == null) {
        this.$message({
          type: 'warning',
          message: '请选择自动或者不自动'
        })
        return false
      }
      axios.post('/api/c/operation-management/notice/update.json', {
        id: '',
        channel: this.channel,
        rolesId: this.rolesId,
        type: this.type,
        name: this.name,
        contents: this.contents,
        isAuto: this.isAuto,
        startTime: this.sendTime,
        userList: this.userList
      })
      .then(res => {
        if(res.data.code == 'OK') {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          setTimeout(function() {
            this.$router.push({name: 'noticeDetail', params: {id: res.data.result.id}})
          }.bind(this),500)
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    cancel () {
      
    }
  }
}
</script>

<style scoped>
  .part-top {
    height:40px;
    line-height: 40px;
    font-size: 16px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
</style>
