<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">权限管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="5">
              <el-form-item label="站点选择：" label-width="100px">
                  <el-select v-model="region_category" placeholder="管理后台（pc）" style="width: 150px;">
                      <el-option v-for="(item, index) in option_category" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="所属频道：" label-width="100px">
                  <el-select v-model="region_channel" placeholder="空" style="width: 80px;">
                      <el-option v-for="(item, index) in option_channel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="所属页面：" label-width="100px">
                  <el-select v-model="region_page" placeholder="空" style="width: 120px;">
                      <el-option v-for="(item, index) in option_page" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-button size="small" type="primary" @click="onDisableClik">追加父节点</el-button>
              <el-button size="small" type="primary" @click="onDisableClik1">追加子节点</el-button>
              <!-- <el-button size="small" type="primary" @click="onQuery">查询</el-button> -->
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <div style="float: left;" >
                <i id="icon_plus" :class="{'el-icon-plus': !isShowTab, 'el-icon-minus': isShowTab}" @click="onShow()" style="cursor: pointer;font-weight: 900;margin-left: 10px;margin-right: 10px;"></i>
                <span>课程管理</span>
            </div>
            <div style="float: right;margin-bottom: 20px;">
                <el-button type="danger" size="small">编辑</el-button>
                <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
            </div>
            <el-table v-show="isShowTab" :data="tableDatak" stripe width="100%" border>
                <el-table-column prop="name" label="节点" align="center"></el-table-column>
                <el-table-column prop="description" label="说明" align="center"></el-table-column>
                <el-table-column prop="uri" label="路径" align="center"></el-table-column>
                <el-table-column prop="isShow" label="菜单是否显示" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isShow == 1">是</div>
                        <div v-if="scope.row.isShow == 2">否</div>
                    </template>
                </el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small">编辑</el-button>
                        <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <div style="float: left;" >
                <i id="icon_plus" :class="{'el-icon-plus': !isShowTab1, 'el-icon-minus': isShowTab1}" @click="onShow1()" style="cursor: pointer;font-weight: 900;margin-left: 10px;margin-right: 10px;"></i>
                <span>文章管理</span>
            </div>
            <div style="float: right;margin-bottom: 20px;">
                <el-button type="danger" size="small">编辑</el-button>
                <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
            </div>
            <el-table v-show="isShowTab1" :data="tableDataw" stripe width="100%" border>
                <el-table-column prop="collegesId" label="节点" align="center"></el-table-column>
                <el-table-column prop="collegesName" label="说明" align="center"></el-table-column>
                <el-table-column prop="country" label="路径" align="center"></el-table-column>
                <el-table-column prop="phone" label="菜单是否显示" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small">编辑</el-button>
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
        <!-- 追加父节点 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">追加父节点</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="fuzhu"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="权限名称：" label-width="100px">
                        <el-input placeholder="请输入权限名称" v-model="fuName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="权限说明：" label-width="100px">
                        <el-input placeholder="请输入权限说明" v-model="fuExplain"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="ondisable">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 追加子节点 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">追加子节点</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="zizhu"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="权限名称：" label-width="100px">
                        <el-input placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="权限说明：" label-width="100px">
                        <el-input placeholder="请输入权限说明"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面URL：" label-width="100px">
                        <el-input placeholder="请输入页面URL"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-button @click="isDialogShow2 = false" type="primary">追加API关联关系</el-button>
            <p style="color: #fff;">———————————————————————————————</p>
            <el-table :data="tableDatakzi" stripe width="100%" border>
                <el-table-column prop="name" label="APIID" align="center"></el-table-column>
                <el-table-column prop="description" label="API名称" align="center"></el-table-column>
                <el-table-column prop="uri" label="APIURL" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="onDisable1">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { resourceList,resourceCreate,resourceUpdate,resourceChild,resourceUpdateChild,resourceSort,resourceDelete } from '../api/url.js'
export default {
  data () {
    return {
      region_category: '',
      option_category: [{
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
      region_channel: '',
      option_channel: [{
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
        value: '10',
        label: '普通个人中心'
      }, {
        value: '20',
        label: '个人讲师中心'
      }, {
        value: '30',
        label: '机构讲师中心'
      }, {
        value: '40',
        label: '院校大咖中心'
      }, {
        value: '50',
        label: '院校中心'
      }, {
        value: '60',
        label: '机构中心'
      }, {
        value: '70',
        label: '个人大咖中心'
      }, {
        value: '80',
        label: '顾问个人中心'
      }],
      radio: '1',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isShowTab: false,
      isShowTab1: false,
      labelData: [],
      tableDatak: [],
      tableDataw: [],
      tableDatakzi: [],
      fuzhu: '',
      fuName: '',
      fuExplain: '',
      zizhu: ''
    }
  },
  methods: {
    onEditClick (index) {
      this.$router.replace({ path: '/institutionsEditors' })
    },
    onDisableClik () { 
    //   var data = {'name': this.tableDatak[0].name, 'description': this.tableDatak[0].description, 'category': this.tableDatak[0].category}
      this.isDialogShow1 = true
    },
    ondisable () {
      // 追加父节点
      resourceCreate({'name': this.fuName,'description': this.fuExplain,'category': 0,'channel': 1,'page': 2}).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow1 = false
          this.fuzhu = res.result
          this.$message(res.message)
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onSub_fu () { 
      // 更新父节点
      resourceUpdate({'id': this.fuzhu,'description': this.fuExplain,'name': this.fuName}).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow1 = false
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDisableClik1 () { 
      if (this.fuzhu === null || this.fuzhu === '') {
        this.$message('请先选择追加父节点')
        return false
      }
      this.isDialogShow2 = true
    },
    onDisable1 () {
      // 追加子节点
      var data = {'parentId': this.fuzhu, 'name': this.fuName,'description': this.fuExplain}
      console.log(data)
      resourceChild(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.zizhu = res.data.result
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
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
    },
    onQuery () {
      
    },
    postData () {
      var data = {'category': 4, 'channel': this.region_channel, 'page': this.region_page}
      resourceList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableDatak = res.result
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.postData()
    })
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
