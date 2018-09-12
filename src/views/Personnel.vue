<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">人员管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline personnel" label-width="150px" size="mini">
          <el-col :span="6">
              <el-form-item label="用户/联系人名称：">
                  <el-input placeholder="请输入用户/联系人名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="用户/联系人手机：">
                  <el-input placeholder="请输入用户/联系人手机"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="用户昵称：">
                  <el-input placeholder="请输入用户昵称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="频道：" label-width="55px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="留学" :value="1" :key="1"></el-option>
                      <el-option label="语培" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="性别：" label-width="55px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="男" :value="0" :key="0"></el-option>
                      <el-option label="女" :value="1" :key="1"></el-option>
                      <el-option label="空" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="认证：" label-width="55px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="未认证" :value="1" :key="1"></el-option>
                      <el-option label="已认证" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-form-item label="用户角色：" label-width="95px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="普通个人" :value="1" :key="1"></el-option>
                      <el-option label="个人讲师" :value="2" :key="2"></el-option>
                      <el-option label="机构讲师" :value="3" :key="3"></el-option>
                      <el-option label="院校讲师" :value="4" :key="4"></el-option>
                      <el-option label="顾问" :value="5" :key="5"></el-option>
                      <el-option label="大咖" :value="6" :key="6"></el-option>
                      <el-option label="经纪人" :value="7" :key="7"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="2.5">
              <el-form-item label="状态：" label-width="55px">
                  <el-select v-model="region" placeholder="正常" style="width: 80px;">
                      <el-option label="正常" :value="0" :key="0"></el-option>
                      <el-option label="禁用" :value="1" :key="1"></el-option>
                    </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="3">
              <el-button size="small" type="primary">搜索</el-button>
              <el-button @click="onshowuser" size="small" type="primary">新增用户</el-button>
          </el-col>
        </el-form>

        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户ID" width="80" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户/联系人姓名" width="90" align="center"></el-table-column>
                <el-table-column prop="phone" label="用户/联系人手机" width="120" align="center"></el-table-column>
                <el-table-column prop="userClassify" label="角色" width="50" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="40" align="center"></el-table-column>
                <el-table-column prop="registertime" label="用户注册时间" width="100" align="center"></el-table-column>
                <el-table-column prop="logintime" label="最近登录时间" width="100" align="center"></el-table-column>
                <el-table-column prop="state" label="状态" width="50" align="center"></el-table-column>
                <el-table-column prop="authentication" label="认证" width="70" align="center"></el-table-column>
                <el-table-column prop="channel" label="注册频道" width="80" align="center"></el-table-column>
                <el-table-column width="250" align="center" label="操作" show-overflow-tooltip fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onshowuser" type="danger" size="small">编辑</el-button>
                        <el-button @click="onDisableClik(scope.$index)" type="danger" size="small">禁用</el-button>
                        <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <div style="height:30px"></div>

        <el-col :span="18" style="text-align: center;">
            <el-col :span="12">
                <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            </el-col>
            <el-col :span="3">
                <el-button size="small" type="primary">确定</el-button>
            </el-col>
            <el-col :span="3" style="float: right;">
                <el-button @click="onDelClick" size="small" type="primary">批量删除</el-button>
            </el-col>
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用编辑窗口 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <el-form >
                <el-form-item label="用户/联系人名称：">
                    <el-input auto-complete="off" placeholder="xxxxxx" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户/联系人手机：">
                    <el-input auto-complete="off" placeholder="13912xxxx34" disabled></el-input>
                </el-form-item>
                <el-form-item label="禁用原因：">
                    <el-input type="textarea" placeholder="请录入禁用原因" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：禁用后该用户将无法登陆平台</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 用户添加编辑 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">用户添加编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
            <el-col :span="10">
              <el-form-item   label="用户类型：" label-width="95px">
                  <el-select v-model="region" placeholder="个人用户" style="width: 120px;">
                      <el-option label="普通个人" :value="0" :key="0"></el-option>
                      <el-option label="个人讲师" :value="1" :key="1"></el-option>
                      <el-option label="机构讲师" :value="2" :key="2"></el-option>
                      <el-option label="院校讲师" :value="3" :key="3"></el-option>
                      <el-option label="顾问" :value="4" :key="4"></el-option>
                      <el-option label="大咖" :value="5" :key="5"></el-option>
                      <el-option label="经纪人" :value="6" :key="6"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="用户id：">
                  <el-input placeholder="自动生成"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※用户姓名：</p>
              <el-form-item>
                  <el-input placeholder="请输入用户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="用户昵称：" >
                  <el-input placeholder="请输入用户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※手机号：</p>
              <el-form-item>
                  <el-col :span="8">
                  <el-select v-model="region" placeholder="+86" style="width: 80px;float: left;">
                      <el-option label="+86" :value="0" :key="0"></el-option>
                      <el-option label="+81" :value="1" :key="1"></el-option>
                  </el-select>
                  </el-col>
                  <el-col :span="15">
                      <el-input placeholder="请输入用户手机号"></el-input>
                  </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系电话：" >
                  <el-input placeholder="请输入用户电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="邮箱：" >
                  <el-input placeholder="请输入邮箱" style="width: 250px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属国家：">
                  <el-select v-model="region" placeholder="中国" style="width: 100px;">
                      <el-option label="中国" :value="0" :key="0"></el-option>
                      <el-option label="澳大利亚" :value="1" :key="1"></el-option>
                      <el-option label="美国" :value="2" :key="2"></el-option>
                      <el-option label="英国" :value="3" :key="3"></el-option>
                      <el-option label="马拉西亚" :value="4" :key="4"></el-option>
                      <el-option label="新加坡" :value="5" :key="5"></el-option>
                      <el-option label="俄罗斯" :value="6" :key="6"></el-option>
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
                  <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件类型：">
                  <el-select v-model="region" placeholder="身份证" style="width: 100px;">
                      <el-option label="身份证" :value="0" :key="0"></el-option>
                      <el-option label="护照" :value="1" :key="1"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件号：" >
                  <el-input placeholder="请输入证件号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="注册频道：">
                  <el-select v-model="region" placeholder="留学" style="width: 100px;">
                      <el-option label="留学" :value="0" :key="0"></el-option>
                      <el-option label="语培" :value="1" :key="1"></el-option>
                      <el-option label="后台添加" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="注册渠道：">
                  <el-select v-model="region" placeholder="PC" style="width: 100px;">
                      <el-option label="app-Andriod" :value="0" :key="0"></el-option>
                      <el-option label="app-ios" :value="1" :key="1"></el-option>
                      <el-option label="PC" :value="2" :key="2"></el-option>
                      <el-option label="WAP" :value="3" :key="3"></el-option>
                      <el-option label="小程序" :value="4" :key="4"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="所属机构/院校：" label-width="120px">
                  <el-select v-model="region" placeholder="新加坡国立大学" style="width: 150px;">
                      <el-option label="新加坡国立大学" :value="0" :key="0"></el-option>
                      <el-option label="宾夕法尼亚大学" :value="1" :key="1"></el-option>
                      <el-option label="墨尔本大学" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="认证状态：">
                  <el-input placeholder="未认证"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="禁用状态：">
                  <el-select v-model="region" placeholder="正常" style="width: 100px;">
                      <el-option label="正常" :value="0" :key="0"></el-option>
                      <el-option label="禁用" :value="1" :key="1"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
        </el-form>
        <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">提 交</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'personnel',
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: [{
        phone: '15200000001',
        sex: '男',
        userId: '15242',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        logintime: '2018-8-29 00:00:00',
        state: '正常',
        authentication: '已认证',
        channel: '留学'
      }, {
        phone: '15200000001',
        sex: '男',
        userId: '15242755275',
        userName: 'hhhh哈哈',
        userClassify: '人员',
        registertime: '2018-8-29 00:00:00',
        logintime: '2018-8-29 00:00:00',
        state: '正常',
        authentication: '已认证',
        channel: '留学'
      }, {
        phone: '15200000001',
        sex: '男',
        userId: '15242755275',
        userName: 'hhhh哈哈',
        userClassify: '人员',
        registertime: '2018-8-29 00:00:00',
        logintime: '2018-8-29 00:00:00',
        state: '正常',
        authentication: '已认证',
        channel: '留学'
      }, {
        phone: '15200000001',
        sex: '男',
        userId: '15242755275',
        userName: 'hhhh哈哈',
        userClassify: '人员',
        registertime: '2018-8-29 00:00:00',
        logintime: '2018-8-29 00:00:00',
        state: '正常',
        authentication: '已认证',
        channel: '留学'
      }]
    }
  },
  methods: {
    onEditClick (index) {
      this.$router.replace({ path: '/userEditors' })
    },
    onDelClick () {
      this.isDialogShow = true
    },
    onDisableClik (index) {
      this.isDialogShow1 = true
    },
    onshowuser () {
      this.isDialogShow2 = true 
    }
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
