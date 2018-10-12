<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">角色管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="4" style="margin-left: 10px;margin-bottom: 20px;">
              <el-button size="small" type="primary" @click="onshowadd">新建角色</el-button>
            </el-col>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column prop="id" label="角色ID" align="center"></el-table-column>
                <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="category" label="角色类型" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.category == 1">讲师</div>
                        <div v-if="scope.row.category == 2">个人</div>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="角色说明" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updatedAt" label="更新时间" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onshowup(scope.row)" type="danger" size="small">编辑</el-button>
                        <el-button @click="onDelClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
                <el-button type="primary" @click="onDelClick_sub">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加页面列表 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">添加页面</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="12">
                  <el-form-item label="渠道：" label-width="100px">
                  <el-select v-model="region_qu" placeholder="全部" >
                      <el-option v-for="(item) in option_qu" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属频道：" label-width="100px">
                  <el-select v-model="region_pin" placeholder="全部" >
                      <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属页面：" label-width="100px">
                  <el-select v-model="region_page" placeholder="全部" >
                      <el-option v-for="(item) in option_page" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onquan">添 加</el-button>
            </span>
        </el-dialog>
        <!-- 角色编辑 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">角色编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="addid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色名称：" label-width="100px">
                        <el-input placeholder="请输入角色名称" v-model="addname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色说明：" label-width="100px">
                        <el-input placeholder="请输入角色说明" v-model="addshou"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="角色类型：" label-width="100px">
                        <el-select v-model="region_jiao" placeholder="空" style="width: 160px;">
                            <el-option v-for="(item) in option_jiao" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-button size="small" type="primary" @click="isDialogShow1 = true">添加权限管理</el-button>
                    <el-button v-if="addid == ''" size="small" type="primary" @click="onDisableClik">提交</el-button>
                    <el-button v-if="addid != ''" size="small" type="primary" @click="onDisableClik1">提交</el-button>
                    <el-button size="small" type="primary" @click="isDialogShow2 = false">取 消</el-button>
                </el-col>
            </el-form>
            <p style="font-size: 20px;margin-bottom: 20px;">———————————————————————————————</p>
          <div class="clearfix" style="width: 100%;">
          <el-col v-for="(item,index) in tableDatak" :span='22' style="margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <div style="text-align: left;" >
                <i id="icon_plus" :class="{'el-icon-plus': showIndex == -1 || index != showIndex, 'el-icon-minus': index == showIndex}" @click="onShow(index)" style="cursor: pointer;font-weight: 900;margin-left: 10px;margin-right: 10px;"></i>
                <span style="font-weight: 900;font-size: 20px;">{{item.name}}</span>
            </div>
            <el-table v-if="index == showIndex" :data="item.children" stripe width="100%" border style="text-align: left;" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="节点" align="center"></el-table-column>
                <el-table-column type="selection" label="操作" width="55" align="center"></el-table-column>
            </el-table>
            <!-- </div> -->
          </el-col>
          </div>
            <div slot="footer" class="dialog-footer"></div>
        </el-dialog>
    </section>
</template>
<script>
import { roleList,roleDelete,roleCreate,roleUpdate,codeChannel,codeRole,resourceList } from '../api/url.js'
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
      tableData: [],
      tableDatak: [],
      roleid: '',
      region_qu: '',
      option_qu: [{
        value: '1',
        label: '用户pc管理'
      }, {
        value: '2',
        label: 'APP'
      }, {
        value: '3',
        label: 'WAP'
      }, {
        value: '4',
        label: '管理后台（pc）'
      }],
      region_pin: '',
      option_pin: [],
      region_fen: '',
      option_fen: [{
        value: '0',
        label: '空'
      }, {
        value: '1',
        label: '留学'
      }, {
        value: '2',
        label: '语培'
      }],
      region_page: '',
      option_page: [{
        value: '1',
        label: '普通个人中心'
      }, {
        value: '2',
        label: '个人讲师中心'
      }, {
        value: '3',
        label: '机构讲师中心'
      }, {
        value: '4',
        label: '院校大咖中心'
      }, {
        value: '5',
        label: '院校中心'
      }, {
        value: '6',
        label: '机构中心'
      }, {
        value: '7',
        label: '个人大咖中心'
      }, {
        value: '8',
        label: '顾问个人中心'
      }, {
        value: '9',
        label: '管理后台中心'
      }],
      region_jiao: '',
      option_jiao: [{
        value: '700',
        label: '院校机构管理人员'
      }, {
        value: '800',
        label: '普通个人'
      }, {
        value: '810',
        label: '个人讲师'
      }, {
        value: '820',
        label: '机构讲师（语培，留学）'
      }, {
        value: '830',
        label: '顾问（留学，移民）'
      }, {
        value: '840',
        label: '院校讲师（留学）'
      }, {
        value: '900',
        label: '运维人员'
      }, {
        value: '910',
        label: '运营人员'
      }, {
        value: '920',
        label: '财务人员'
      }, {
        value: '999',
        label: '超级管理员'
      }],
      addid: '',
      addname: '',
      addshou: '',
      category: '',
      showIndex: '-1',
      multipleSelection: [],
      rolequanxian: [],
      type: ''
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val',val)
      for (var i = 0;i < this.multipleSelection.length;i++) {
        this.rolequanxian.push({"'resourceId'": this.multipleSelection[i].id})
      }
    },
    onShow (index) {
      console.log(this.showIndex,index);
      if (index !== this.showIndex) {
        this.showIndex = index;
      } else {
        this.showIndex = '-1'
      }
    },
    onshowadd () {
      // 新建角色弹窗
      this.isDialogShow2 = true
    },
    onDisableClik () {
      // 新建角色
      console.log('roleAuthorities', this.rolequanxian)
      var data = {'name': this.addname, 'category': this.region_jiao, 'description': this.addshou, 'roleAuthorities': this.rolequanxian}
      roleCreate(data).then(res => {
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
    onshowup (item) {
      // 更新角色弹窗
      this.addid = item.id
      this.addname = item.name
      this.addshou = item.description
      this.region_jiao = item.category
      this.isDialogShow2 = true
    },
    onDisableClik1 () {
      // 更新角色
      console.log('roleAuthorities', this.rolequanxian)
      var data = {'id': this.addid, 'name': this.addname, 'category': this.region_jiao, 'description': this.addshou, 'roleAuthorities': this.rolequanxian}
      roleCreate(data).then(res => {
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
    onquan () {
      // 添加页面查询权限
    //   var data = {'category': this.region_qu, 'channel': this.region_pin, 'page': this.region_page}
      if (this.region_qu === '' || this.region_page === '') {
        this.$message('请先选择筛选条件')
        return false
      } else if (this.region_qu === '4' && this.region_page !== '9') {
        this.$message('您选择了管理后台站点，请选择所属页面为管理后台中心')
        return false
      }
      var data = {'category': 0, 'channel': 1, 'page': 2}
      resourceList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow1 = false
          this.tableDatak = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDelClick (id) { 
      // 删除按钮
      this.isDialogShow = true
      console.log('id', id)
      this.roleid = id
    },
    onDelClick_sub () { 
      // 确定删除方法
      roleDelete({id: this.roleid}).then(res => {
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
    postData () {
      roleList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result
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
      // // 角色
      // codeRole().then(res => {
      //   console.log('data', res)
      //   if (res.success) {
      //     this.option_jiao = res.result
      //   } else {
      //     this.$message(res.message)
      //   }
      // }).catch(error => {
      //   console.log(`请求错误`)
      // })
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
    width: 100%;
}
.personnel-title{
    font-size: 20px;
    font-weight: 700;
}
</style>
