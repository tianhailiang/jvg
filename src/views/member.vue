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
              <el-button size="small" type="primary" @click="onDelClick">清除</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column prop="collegesId" label="成员ID" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="成员名称" align="center"></el-table-column>
                <el-table-column prop="country" label="角色类型" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column prop="phone" label="邮件" align="center"></el-table-column>
                <el-table-column prop="registertime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="logintime" label="状态" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onDelClick1" type="danger" size="small">禁用</el-button>
                        <el-button @click="onDisableClik(scope.$index)" type="danger" size="small">编辑</el-button>
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
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用窗口 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">请确认是否继续禁用</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新建成员 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">新建成员</p>
            <el-form label-position="left" :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="成员名称：" label-width="100px">
                        <el-input placeholder="请输入成员名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="密码：" label-width="100px">
                        <el-input placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="确认密码：" label-width="100px">
                        <el-input placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="手机号：" label-width="100px">
                        <el-input placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="角色类型：" label-width="100px">
                  <el-select v-model="region" placeholder="空" style="width: 100px;">
                      <el-option label="空" :value="0" :key="0"></el-option>
                      <el-option label="运营人员" :value="1" :key="1"></el-option>
                      <el-option label="运维人员" :value="2" :key="2"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="角色名称：" label-width="100px">
                  <el-select v-model="region" placeholder="空" style="width: 100px;">
                      <el-option label="空" :value="0" :key="0"></el-option>
                      <el-option label="财务运营" :value="1" :key="1"></el-option>
                      <el-option label="普通运维" :value="2" :key="2"></el-option>
                      <el-option label="广告运营" :value="3" :key="3"></el-option>
                      <el-option label="审核运营" :value="4" :key="4"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: [{
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }, {
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        collegesNature: '私立研究型大学',
        state: '正常',
        country: '美国',
        category: '院校'
      }]
    }
  },
  methods: {
    onEditClick (index) {
      this.$router.replace({ path: '/institutionsEditors' })
    },
    onDisableClik (index) {
      this.isDialogShow2 = true
    },
    onDelClick () {
      this.isDialogShow = true
    },
    onDelClick1 () {
      this.isDialogShow1 = true
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
