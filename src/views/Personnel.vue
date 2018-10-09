<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">人员管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline personnel" label-width="150px" size="mini">
              <el-form-item label="用户/联系人名称：">
                  <el-input placeholder="请输入用户/联系人名称" v-model="qu_name"></el-input>
              </el-form-item>
              <el-form-item label="用户/联系人手机：">
                  <el-input placeholder="请输入用户/联系人手机" v-model="qu_iphone"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称：">
                  <el-input placeholder="请输入用户昵称" v-model="qu_nick"></el-input>
              </el-form-item>
              <el-form-item label="频道：" label-width="55px">
                  <el-select v-model="region_pin_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="性别：" label-width="55px">
                  <el-select v-model="region_xing_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_xing_qu" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="认证：" label-width="55px">
                  <el-select v-model="region_ren_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_ren_qu" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="用户角色：" label-width="95px">
                  <el-select v-model="region_role_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_role" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="状态：" label-width="55px">
                  <el-select v-model="region_tai_qu" placeholder="正常" style="width: 80px;">
                      <el-option v-for="(item) in option_tai" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-button size="small" type="primary" @click="queryClik">搜索</el-button>
              <el-button @click="onshowuser" size="small" type="primary">新增用户</el-button>
        </el-form>

        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="用户ID" width="80" align="center"></el-table-column>
                <el-table-column prop="realName" label="用户/联系人姓名" width="90" align="center"></el-table-column>
                <el-table-column prop="mobile" label="用户/联系人手机" width="120" align="center"></el-table-column>
                <el-table-column prop="typeName" label="角色" width="50" align="center"></el-table-column>
                <el-table-column prop="sexName" label="性别" width="40" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="用户注册时间" width="100" align="center"></el-table-column>
                <el-table-column prop="lastTimeStr" label="最近登录时间" width="100" align="center"></el-table-column>
                <el-table-column prop="statusName" label="状态" width="50" align="center"></el-table-column>
                <el-table-column prop="approveStatusName" label="认证" width="70" align="center"></el-table-column>
                <el-table-column prop="registeredChannelName" label="注册频道" width="80" align="center"></el-table-column>
                <el-table-column width="250" align="center" label="操作" show-overflow-tooltip fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onshowuser1(scope.$index,scope.row.id)" type="danger" size="small">编辑</el-button>
                        <el-button v-if="scope.row.status == 1" @click="onDisableClik(scope.$index,scope.row.status)" type="danger" size="small">禁用</el-button>
                        <el-button v-if="scope.row.status == 2" @click="onDisableClik(scope.$index,scope.row.status)" type="danger" size="small">解禁</el-button>
                        <el-button @click="onDelClick(scope.$index)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <!-- 分页 -->
        <el-col :span='24' style="float: right;">
        <el-row :gutter="20" v-if="tableData.length" class="pagina-tion">
        <el-col :span="11">
            <el-pagination background layout="prev, pager, next, jumper" 
            :total="total"
            :page-size="20"
            @current-change="handleCurrentChange"></el-pagination>
        </el-col>
        <el-col :span="8">
            <el-button size="small" type="primary" @click="onfen">确定</el-button>
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary" @click="onDelClick1">批量删除</el-button>
            <!-- <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button> -->
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onDel">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 批量删除窗口 -->
        <el-dialog v-model="isDialogShow4" size="small" :visible.sync="isDialogShow4">
            <p style="font-size: 30px;">请确认批量删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow4 = false">取 消</el-button>
                <el-button type="primary" @click="onDel1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 解禁窗口 -->
        <el-dialog v-model="isDialogShow3" size="small" :visible.sync="isDialogShow3">
            <p style="font-size: 30px;">请确认要解禁此人员</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow3 = false">取 消</el-button>
                <el-button type="primary" @click="onDisable">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用编辑窗口 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <el-form >
                <el-form-item label="用户/联系人名称：">
                    <el-input auto-complete="off" placeholder="xxxxxx" disabled v-model="realName"></el-input>
                </el-form-item>
                <el-form-item label="用户/联系人手机：">
                    <el-input auto-complete="off" placeholder="13912xxxx34" disabled v-model="mobile"></el-input>
                </el-form-item>
                <el-form-item label="禁用原因：">
                    <el-input type="textarea" placeholder="请录入禁用原因" :rows="5" v-model="yuanyin"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：禁用后该用户将无法登陆平台</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onDisable">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 用户添加编辑 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">用户添加编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
            <el-col :span="10">
              <el-form-item   label="用户类型：" label-width="95px">
                  <el-select id="region_user" v-model="region_user" @change="choose(region_user)" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_user" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※登录密码：</p>
              <el-form-item>
                  <el-input placeholder="请输入用户登录密码" v-model="appmi"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="用户id：">
                  <el-input placeholder="自动生成" disabled v-model="appid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※用户姓名：</p>
              <el-form-item>
                  <el-input placeholder="请输入用户姓名" v-model="appname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="用户昵称：" >
                  <el-input placeholder="请输入用户昵称" v-model="appni"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※手机号：</p>
              <el-form-item>
                  <el-col :span="8">
                  <el-select v-model="region_iphone" placeholder="+86" style="width: 80px;float: left;">
                      <el-option v-for="(item) in option_iphone" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  </el-col>
                  <el-col :span="15">
                      <el-input placeholder="请输入用户手机号" v-model="appiphone"></el-input>
                  </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系电话：" >
                  <el-input placeholder="请输入用户电话" v-model="appgu"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="邮箱：" >
                  <el-input placeholder="请输入邮箱" style="width: 250px;" v-model="appemail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属国家：">
                  <el-select v-model="region_country" @change="choose(region_country)" placeholder="中国" style="width: 100px;">
                      <el-option v-for="(item) in option_country" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别：" style="display: inline-block;">
                  <el-radio-group v-model="radio" size="mini">
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
                  </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="所在位置：" >
                  <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;" v-model="appwei"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件类型：">
                  <el-select v-model="region_zheng" placeholder="身份证" style="width: 100px;">
                      <el-option v-for="(item) in option_zheng" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件号：" >
                  <el-input placeholder="请输入证件号码" v-model="appzheng"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="注册频道：">
                  <el-select v-model="region_pin" placeholder="留学" style="width: 100px;">
                      <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="注册渠道：">
                  <el-select v-model="region_qu" placeholder="PC" style="width: 100px;">
                      <el-option v-for="(item) in option_qu" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="所属机构/院校：" label-width="120px">
                  <el-select v-model="region_jigou" placeholder="新加坡国立大学" style="width: 150px;">
                      <el-option v-for="(item) in option_jigou" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="认证状态：">
                  <el-input v-if="appxin == 1" placeholder="未认证" disabled></el-input>
                  <el-input v-else placeholder="未认证" v-model="appren"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="禁用状态：">
                  <el-select v-model="region_tai" placeholder="正常" style="width: 100px;">
                      <el-option v-for="(item) in option_tai" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
        </el-form>
        <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onnewuser">提 交</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">取 消</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { userList,userUpdate,userDelete,userFrozen,userFrozenQuery,userDetail,codeCountry,codeSource,codeChannel,codeRole } from '@/api/url.js'
export default {
  name: 'personnel',
  data () {
    return {
      region: '',
      region_user: '',
      option_user: [{
        value: '1',
        label: '普通'
      }, {
        value: '2',
        label: '个人讲师'
      }, {
        value: '3',
        label: '机构讲师'
      }, {
        value: '4',
        label: '顾问'
      }, {
        value: '5',
        label: '个人大咖'
      }, {
        value: '6',
        label: '学长'
      }, {
        value: '7',
        label: '个人讲师(海外)'
      }, {
        value: '8',
        label: '机构讲师(海外)'
      }, {
        value: '9',
        label: '院校讲师'
      }, {
        value: '10',
        label: '院校大咖'
      }],
      region_iphone: '',
      option_iphone: [{
        value: '1',
        label: '+86'
      }, {
        value: '2',
        label: '+81'
      }],
      region_country: '',
      option_country: [],
      region_zheng: '',
      option_zheng: [{
        value: '1',
        label: '身份证'
      }, {
        value: '2',
        label: '护照'
      }],
      region_pin_qu: '',
      region_pin: '',
      option_pin: [],
      region_qu: '',
      option_qu: [],
      region_role_qu: '',
      option_role: [],
      region_xing_qu: '',
      option_xing_qu: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }, {
        value: '3',
        label: '空'
      }],
      region_ren_qu: '',
      option_ren_qu: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '申请中'
      }, {
        value: '2',
        label: '成功'
      }, {
        value: '3',
        label: '失败'
      }],
      region_jigou: '',
      option_jigou: [{
        value: '1',
        label: '宾夕法尼亚'
      }, {
        value: '2',
        label: '墨尔本大学'
      }, {
        value: '3',
        label: '新加坡国立大学'
      }],
      region_tai_qu: '',
      region_tai: '',
      option_tai: [{
        value: '1',
        label: '正常'
      }, {
        value: '2',
        label: '禁用'
      }],
      radio: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isDialogShow3: false,
      isDialogShow4: false,
      tableData: [],
      total: null,
      id: '',
      type: '',
      realName: '',
      mobile: '',
      yuanyin: '',
      appid: '自动生成',
      appname: '',
      appni: '',
      appiphone: '',
      appgu: '',
      appemail: '',
      appwei: '',
      appzheng: '',
      appmi: '',
      appren: '未认证',
      appxin: 1,
      pageNo: '',
      qu_name: '',
      qu_iphone: '',
      qu_nick: '',
      multipleSelection: '',
      allpi: []
    }
  },
  methods: {
    choose (value) {
      this.choosenItem = this.option_country.filter(item => item.id === value)[0];
      console.log('choose', this.choosenItem)
    },
    handleSelectionChange (val) {
      // 表格监听
      this.multipleSelection = val
      console.log('val',val)
    },
    handleCurrentChange(val) {
      // 分页监听
      this.pageNo = val
      this.onfen()
    },
    onfen () {
      // 分页按钮
      var data = {'realName': this.qu_name, 'mobile': this.qu_iphone, 'nikeName': this.qu_nick, 'registeredChannel': this.region_pin_qu, 'sex': this.region_xing_qu, 'approveStatus': this.region_ren_qu, 'type': this.region_role_qu, 'status': this.region_tai_qu, 'pageNo': this.pageNo, 'pageSize':20}
      userList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
          this.total = res.result.total
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    queryClik () {
      // 查询按钮
      var data = {'realName': this.qu_name, 'mobile': this.qu_iphone, 'nikeName': this.qu_nick, 'registeredChannel': this.region_pin_qu, 'sex': this.region_xing_qu, 'approveStatus': this.region_ren_qu, 'type': this.region_role_qu, 'status': this.region_tai_qu}
      userList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
          this.total = res.result.total
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onEditClick (index) {
      this.$router.replace({ path: '/userEditors' })
    },
    onDelClick1 () {
      // 批量删除弹框
      if (this.multipleSelection.length === 0) {
        this.$message('请在列表勾选')  
        return false
      }
      this.allpi = []
      for (var i = 0;i < this.multipleSelection.length;i++) {
        this.allpi.push(this.multipleSelection[i].id)
      }
      this.isDialogShow4 = true
    },
    onDel1 () {
      // 批量删除人员
      var data = {'ids': this.allpi}
      userDelete(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow = false
          window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDelClick (index) {
      // 删除弹框
      this.isDialogShow = true
      this.id = this.tableData[index].id
    },
    onDel () {
      // 删除人员
      var data = {'ids': [this.id]}
      userDelete(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow = false
          window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDisableClik (index,type) {
      if (type === 1) {
        // 禁用
        this.id = this.tableData[index].id
        this.type = type
        this.realName = this.tableData[index].realName
        this.mobile = this.tableData[index].mobile
        this.isDialogShow1 = true
      } else if (type === 2) {
        // 解禁
        this.id = this.tableData[index].id
        this.type = type
        this.realName = this.tableData[index].realName
        this.mobile = this.tableData[index].mobile
        this.isDialogShow3 = true
      }
    },
    onDisable () {
      if (this.type === 1) {
        // 禁用接口
        var data = {'id': this.id, 'status': 2, 'disabledMemo': this.yuanyin}
        userFrozen(data).then(res => {
          console.log('data', res)
          if (res.success) {
            this.isDialogShow1 = false
            window.location.reload()
          } else {
            this.$message(res.message)
          }
        }).catch(error => {
          console.log(`请求错误`)
        })
      } else if (this.type === 2) {
        // 解禁接口
        var data = {'id': this.id, 'status': 1, 'disabledMemo': this.yuanyin}
        userFrozen(data).then(res => {
          console.log('data', res)
          if (res.success) {
            this.isDialogShow3 = false
            window.location.reload()
          } else {
            this.$message(res.message)
          }
        }).catch(error => {
          console.log(`请求错误`)
        })
      }
    },
    onshowuser () {
      // 新增用户
      this.isDialogShow2 = true 
    },
    onshowuser1 (index, id) {
      // 编辑用户
      var data = {'id': id}
      userDetail(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.appxin = 0
          this.appid = res.result.id
          this.appmi = 0
          this.region_user = res.result.typeName
          this.appname = res.result.realName
          this.appni = res.result.nikeName
          this.appiphone = res.result.mobile
          this.appgu = res.result.tel
          this.appemail = 0
          this.radio = res.result.sex
          this.region_country = res.result.nationality
          this.appwei = res.result.address
          this.region_zheng = 0
          this.appzheng = res.result.idCode
          this.region_pin = res.result.registeredChannelName
          this.region_qu = res.result.registeredSourceName
          this.region_jigou = res.result.shopIdName
          this.appren = res.result.approveStatusName
          this.region_tai = res.result.statusName
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      
      this.isDialogShow2 = true 
    },
    onnewuser () {
      // 新增追加
      if (this.option_iphone === 1) {
        var q = '+86'
      } else {
        var q = '+81'
      }
      var data = {'type': this.region_user, 'realName': this.appname, 'nikeName': this.appni, 'mobile': q + this.appiphone, 'password': this.appmi, 'tel': this.appgu, 'email': this.appemail, 'sex': this.radio, 'nationality': this.choosenItem.name, 'address': this.appwei, 'evidenceType': this.region_zheng, 'idCode': this.appzheng, 'registeredChannel': this.region_pin, 'registeredSource': this.region_qu, 'shopId': this.region_jigou, 'status': this.region_tai}
      console.log('dddddd',data)
      userUpdate(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow2 = false
          window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    postData () {
      userList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
          this.total = res.result.total
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // 国家
      codeCountry().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_country = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // 渠道
      codeSource().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_qu = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // 频道
      codeChannel().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_pin = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // 角色
      codeRole().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_role = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    }
  },
  mounted () {
    this.postData()
  }
}
</script>
<style scoped>
.personnel{
    margin-left: 10px;
}
.personnel-title{
    font-size: 20px;
    font-weight: 700;
}
</style>
