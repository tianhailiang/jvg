<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">角色管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="4" style="margin-left: 10px;margin-bottom: 20px;">
              <el-button size="small" type="primary" @click="onDisableClik">新建角色</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column prop="collegesId" label="角色ID" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="country" label="角色类型" align="center"></el-table-column>
                <el-table-column prop="phone" label="角色说明" align="center"></el-table-column>
                <el-table-column prop="registertime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="logintime" label="更新时间" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onDisableClik(scope.$index)" type="danger" size="small">编辑</el-button>
                        <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 角色编辑 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">角色编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色名称：" label-width="100px">
                        <el-input placeholder="请输入角色名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色说明：" label-width="100px">
                        <el-input placeholder="请输入角色说明"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
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
                <el-col :span="10">
                    <el-form-item label="站点选择：" label-width="100px">
                        <el-select v-model="region" placeholder="管理后台（pc）" style="width: 150px;">
                            <el-option label="管理后台（pc）" :value="0" :key="0"></el-option>
                            <el-option label="用户前端（pc）" :value="1" :key="1"></el-option>
                            <el-option label="APP" :value="2" :key="2"></el-option>
                            <el-option label="WAP" :value="3" :key="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="所属频道：" label-width="100px">
                        <el-select v-model="region" placeholder="空" style="width: 80px;">
                            <el-option label="空" :value="0" :key="0"></el-option>
                            <el-option label="留学" :value="1" :key="1"></el-option>
                            <el-option label="语培" :value="2" :key="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="所属页面：" label-width="100px">
                        <el-select v-model="region" placeholder="空" style="width: 120px;">
                            <el-option label="空" :value="0" :key="0"></el-option>
                            <el-option label="普通个人中心" :value="1" :key="1"></el-option>
                            <el-option label="个人讲师中心" :value="2" :key="2"></el-option>
                            <el-option label="机构讲师中心" :value="3" :key="3"></el-option>
                            <el-option label="院校大咖中心" :value="4" :key="4"></el-option>
                            <el-option label="院校中心" :value="5" :key="5"></el-option>
                            <el-option label="机构中心" :value="6" :key="6"></el-option>
                            <el-option label="个人大咖中心" :value="7" :key="7"></el-option>
                            <el-option label="顾问个人中心" :value="8" :key="8"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-button size="small" type="primary" @click="isDialogShow1 = false">提 交</el-button>
                    <el-button size="small" type="primary" @click="isDialogShow1 = false">取 消</el-button>
                </el-col>
            </el-form>
            <p style="font-size: 20px;margin-bottom: 20px;">———————————————————————————————</p>
            <el-col :span='10' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
                <div style="float: left;" >
                    <i id="icon_plus" :class="{'el-icon-plus': !isShowTab, 'el-icon-minus': isShowTab}" @click="onShow()" style="cursor: pointer;font-weight: 900;margin-left: 10px;margin-right: 10px;"></i>
                    <span>课程管理</span>
                </div>
                <el-table v-show="isShowTab" :data="tableData" stripe width="100%" border>
                    <el-table-column prop="collegesId" label="节点" align="center"></el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <el-col :span="10">
                                <el-checkbox v-model="checked">选择</el-checkbox>
                            </el-col>
                        </template>
                    </el-table-column>
                </el-table>
            <!-- </div> -->
            </el-col>
            <el-col :span='10' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
                <div style="float: left;" >
                    <i id="icon_plus" :class="{'el-icon-plus': !isShowTab1, 'el-icon-minus': isShowTab1}" @click="onShow1()" style="cursor: pointer;font-weight: 900;margin-left: 10px;margin-right: 10px;"></i>
                    <span>文章管理</span>
                </div>
                <el-table v-show="isShowTab1" :data="tableData" stripe width="100%" border>
                    <el-table-column prop="collegesId" label="节点" align="center"></el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <el-col :span="10">
                                <el-checkbox v-model="checked">选择</el-checkbox>
                            </el-col>
                        </template>
                    </el-table-column>
                </el-table>
            <!-- </div> -->
            </el-col>
            <div slot="footer" class="dialog-footer"></div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      region: '',
      checked: true,
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isShowTab: false,
      isShowTab1: false,
      tableData: [{
        phone: '15200000001',
        collegesId: '15242',
        collegesName: 'hhhh哈哈',
        userName: 'hhhh哈哈',
        userClassify: '普通个人',
        registertime: '2018-8-29 00:00:00',
        logintime: '2018-8-29 00:00:00',
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
        logintime: '2018-8-29 00:00:00',
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
        logintime: '2018-8-29 00:00:00',
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
        logintime: '2018-8-29 00:00:00',
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
      this.isDialogShow1 = true
    },
    onDelClick () {
      this.isDialogShow = true
    },
    onShow () {
      if (this.isShowTab) {
        this.isShowTab = false
      } else {
        this.isShowTab = true
      }
    },
    onShow1 () {
      if (this.isShowTab1) {
        this.isShowTab1 = false
      } else {
        this.isShowTab1 = true
      }
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
