<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">成员管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="5">
              <el-form-item label="成员ID：" label-width="80px">
                  <el-input placeholder="请输入成员ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="成员名称：" label-width="100px">
                  <el-input placeholder="请输入成员名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="角色类型：" label-width="100px">
                    <el-select v-model="region" placeholder="空" style="width: 100px;">
                        <el-option label="空" :value="0" :key="0"></el-option>
                        <el-option label="运营人员" :value="1" :key="1"></el-option>
                        <el-option label="运维人员" :value="2" :key="2"></el-option>
                        <el-option label="机构院校" :value="3" :key="3"></el-option>
                        <el-option label="个人" :value="4" :key="4"></el-option>
                        <el-option label="会员" :value="5" :key="5"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="状态：" label-width="80px">
                    <el-select v-model="region" placeholder="全部" style="width: 100px;">
                        <el-option label="全部" :value="0" :key="0"></el-option>
                        <el-option label="正常" :value="1" :key="1"></el-option>
                        <el-option label="禁用" :value="2" :key="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="primary"  @click="onDisableClik()">新建成员</el-button>
              <el-button size="small" type="primary">查询</el-button>
              <el-button size="small" type="primary" @click="onDelClick2()">清除</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column prop="role_id" label="成员ID" align="center"></el-table-column>
                <el-table-column prop="username" label="成员名称" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column prop="email" label="邮件" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == 1">正常</div>
                        <div v-if="scope.row.status == 2">禁用</div>
                    </template>
                </el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status == 1" @click="onDelClick1(scope.row.role_id,scope.row.status)" type="danger" size="small">禁用</el-button>
                        <el-button v-if="scope.row.status == 2" @click="onDelClick1(scope.row.role_id,scope.row.status)" type="danger" size="small">解禁</el-button>
                        <el-button @click="onDisableClik1(scope.$index)" type="danger" size="small">编辑</el-button>
                        <el-button @click="onDelClick(scope.row.role_id)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <!-- 分页 -->
        <el-col :span='18' style="float: right;margin-right: 100px;">
        <el-row :gutter="20" v-if="tableData.length" class="pagina-tion">
        <el-col :span="11">
            <el-pagination background layout="prev, pager, next, jumper" 
            :total="total"
            :page-size="20"></el-pagination>
        </el-col>
        <el-col :span="8">
            <el-button size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary" @click="">批量删除</el-button>
            <!-- <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button> -->
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onDel">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用窗口 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">请确认是否继续禁用</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onjin">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 解禁窗口 -->
        <el-dialog v-model="isDialogShow4" size="small" :visible.sync="isDialogShow4">
            <p style="font-size: 30px;">请确认是否继续解禁</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow4 = false">取 消</el-button>
                <el-button type="primary" @click="onjin">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新建成员 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">新建成员</p>
            <el-form label-position="left" :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="自动生成" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="成员名称：" label-width="100px">
                        <el-input placeholder="请输入成员名称" v-model="addname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="密码：" label-width="100px">
                        <el-input placeholder="请输入密码" v-model="addpass"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="确认密码：" label-width="100px">
                        <el-input placeholder="请输入确认密码" v-model="addque"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="手机号：" label-width="100px">
                        <el-input placeholder="请输入手机号" v-model="addiphone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="工号：" label-width="100px">
                        <el-input placeholder="请输入工号" v-model="addgong"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="邮箱：" label-width="100px">
                        <el-input placeholder="请输入邮箱" v-model="addemail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="角色类型：" label-width="100px">
                  <el-select v-model="region_jiao" @change="choose(region_jiao)" placeholder="空" style="width: 100px;">
                      <el-option v-for="(item) in option_jiao" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="角色名称：" label-width="100px">
                  <el-select v-model="region_jiaoname" @change="choose1(region_jiaoname)" placeholder="空" style="width: 100px;">
                      <el-option v-for="(item) in option_jiaoname" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="ondisable">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 清除窗口 -->
        <el-dialog v-model="isDialogShow3" size="small" :visible.sync="isDialogShow3">
            <p style="font-size: 30px;">请确认是否继续清除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow3 = false">取 消</el-button>
                <el-button type="primary" @click="onqing">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { memberList,memberStatus,memberCreate,memberDelete,memberUpdate,memberClear,codeRole } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      region_jiao: '',
      option_jiao: [{
        value: '0',
        label: '空'
      }, {
        value: '1',
        label: '运维类型'
      }, {
        value: '2',
        label: '运营类型'
      }],
      region_jiaoname: '',
      option_jiaoname: [],
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isDialogShow3: false,
      isDialogShow4: false,
      tableData: [],
      total: null,
      addname: '',
      addpass: '',
      addque: '',
      addiphone: '',
      addgong: '',
      addemail: '',
      typejin: '',
      id: '',
      choosenItem: [],
      choosenItem1: []
    }
  },
  methods: {
    choose (value) {
      this.choosenItem = this.option_jiao.filter(item => item.value === value)[0];
      console.log('choose', this.choosenItem)
    },
    choose1 (value) {
      this.choosenItem1 = this.option_jiaoname.filter(item => item.id === value)[0];
      console.log('choose', this.choosenItem1)
    },
    onEditClick (index) {
      this.$router.replace({ path: '/institutionsEditors' })
    },
    onDisableClik1 (index) {
      // 编辑成员弹窗
      this.addname = this.tableData[index].username
      this.addpass = this.tableData[index].password
      this.addiphone = this.tableData[index].phone
      this.addgong = this.tableData[index].employeeNumber
      this.addemail = this.tableData[index].email
      this.isDialogShow2 = true
    },
    ondisable () {
      // 编辑成员接口
      var data = {'username': this.addname, 'password': this.addpass, 'email': this.addemail, 'affairsRoles': this.addgong, 'phone': this.addiphone, 'affairsRoles': this.choosenItem.label, 'roleId': this.choosenItem.value, 'channel': this.choosenItem1.id, 'channelName': this.choosenItem1.name}
      memberUpdate(data).then(res => {
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
    onDisableClik () {
      // 新建成员弹窗
      this.isDialogShow2 = true
    },
    ondisable () {
      // 新建成员接口
      var data = {'username': this.addname, 'password': this.addpass, 'email': this.addemail, 'affairsRoles': this.addgong, 'phone': this.addiphone, 'affairsRoles': this.choosenItem.label, 'roleId': this.choosenItem.value, 'channel': this.choosenItem1.id, 'channelName': this.choosenItem1.name}
      memberCreate(data).then(res => {
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
    onDelClick (id) {
      // 删除成员弹窗
      this.isDialogShow = true
      this.id = id
    },
    onDel () {
      // 删除成员接口
      var data = {'id': this.id}
      memberDelete(data).then(res => {
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
    onDelClick1 (id,type) {
      if (type === 1) {
        //禁用
        this.isDialogShow1 = true
        this.typejin = type
        this.id = id
      } else if (type === 2) {
        // 解禁
        this.isDialogShow4 = true
        this.typejin = type
        this.id = id
      }
    },
    onjin () {
      var data = {'id': this.id}
      memberStatus(data).then(res => {
        console.log('data', res)
        if (res.success) {
          if (this.type === 1) this.isDialogShow1 = false
          else if (this.type === 2) this.isDialogShow4 = false
        //   window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDelClick2 () {
      // 清除
      this.isDialogShow3 = true
    },
    onqing () {
      memberClear().then(res => {
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
    },
    postData () {
      memberList().then(res => {
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
      // 角色名称
      codeRole().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_jiaoname = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    //   // 频道
    //   codeSource().then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.option_pin = res.result
    //     } else {
    //       this.$message(res.message)
    //     }
    //   }).catch(error => {
    //     console.log(`请求错误`)
    //   })
    //   // 渠道
    //   codeChannel().then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.option_qu = res.result
    //     } else {
    //       this.$message(res.message)
    //     }
    //   }).catch(error => {
    //     console.log(`请求错误`)
    //   })
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
