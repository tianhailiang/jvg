<template>
<section class='chart-container'>
    <el-row :gutter="24">
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">权限管理</p>
        </el-col>
    </el-row>
    <el-row :gutter="24">
        <el-form :inline="true" class="demo-form-inline" label-width="100px" size="small">
              <el-form-item label="站点选择：">
                  <el-select v-model="region_category" @change="choose(region_category)" placeholder="管理后台（pc）" style="width: 150px;">
                      <el-option v-for="(item, index) in option_category" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="所属频道：">
                  <el-select v-model="region_channel" @change="choose1(region_channel)" placeholder="空" style="width: 80px;">
                      <el-option v-for="(item, index) in option_channel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="所属页面：">
                  <el-select v-model="region_page" @change="choose2(region_page)" placeholder="空" style="width: 120px;">
                      <el-option v-for="(item,index) in option_page" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-button size="small" type="primary" @click="onDisableClik(1)">追加父节点</el-button>
              <!-- <el-button size="small" type="primary" @click="onDisableClik1">追加子节点</el-button> -->
              <!-- <el-button size="small" type="primary" @click="onQuery">查询</el-button> -->
        </el-form>
    </el-row>
    <el-row :gutter="24">
      <div v-if="tableDatak.length > 0">
        <el-col v-for="(item,index) in tableDatak" :span='24' style="margin-right: 5%;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <div style="float: left;text-align: left;" >
                <i id="icon_plus" :class="{'el-icon-plus': showIndex == -1 || index != showIndex, 'el-icon-minus': index == showIndex}" @click="onShow(index)" style="cursor: pointer;font-weight: 900;margin-left: 10px;margin-right: 10px;"></i>
                <span>{{item.name}}</span>
            </div>
            <div style="float: right;margin-bottom: 20px;text-align: left;">
                <el-button @click="onDisableClik1(item.id,item.channel,item.category)" type="danger" size="small">追加子节点</el-button>
                <el-button @click="onEditClick(item.id,item.name,item.description)" type="danger" size="small">编辑</el-button>
                <el-button @click="onDelClick(item.id)" type="danger" size="small">删除</el-button>
            </div>
            <el-table v-if="index == showIndex" :data="item.children" stripe width="100%" border style="margin-left: 10px;text-align: left;">
                <el-table-column prop="name" label="节点" align="center"></el-table-column>
                <el-table-column prop="description" label="说明" align="center"></el-table-column>
                <el-table-column prop="uri" label="路径" align="center"></el-table-column>
                <!-- <el-table-column prop="isShow" label="菜单是否显示" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isShow == 1">是</div>
                        <div v-if="scope.row.isShow == 2">否</div>
                    </template>
                </el-table-column> -->
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onEditClick1(scope.row, 1)" type="danger" size="small">编辑</el-button>
                        <el-button @click="onDelClick(scope.row.id)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
      </div>
      <div style="margin-right: 5%;margin-bottom: 20px;" v-else>暂无数据</div>
    </el-row>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onDel">确 定</el-button>
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
                <el-button v-if="type == 1" type="primary" @click="ondisable">提 交</el-button>
                <el-button v-if="type != 1" type="primary" @click="onSub_fu">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 追加子节点 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">追加子节点</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="fuzhu"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="权限名称：" label-width="100px">
                        <el-input placeholder="请输入权限名称" v-model="ziname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="权限说明：" label-width="100px">
                        <el-input placeholder="请输入权限说明" v-model="zishuo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面URL：" label-width="100px">
                        <el-input placeholder="请输入页面URL" v-model="ziurl"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-button @click="onshowAPI" type="primary">追加API关联关系</el-button>
            <p style="color: #fff;">———————————————————————————————</p>
            <el-table :data="tableDatakzi" stripe width="100%" border>
                <el-table-column prop="id" label="APIID" align="center"></el-table-column>
                <el-table-column prop="name" label="API名称" align="center"></el-table-column>
                <el-table-column prop="uri" label="APIURL" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onAPIDel(scope.row.id,scope.index)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button v-if="zitype == 1" type="primary" @click="onDisable11">提 交</el-button>
                <el-button v-if="zitype != 1" type="primary" @click="onDisable1">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 追加API关联关系 -->
        <el-dialog v-model="isDialogShow3" size="small" :visible.sync="isDialogShow3">
            <p style="font-size: 30px;">追加API关联关系</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="渠道：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="categoryzi"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="频道：" label-width="100px">
                        <el-input placeholder="自动生成" disabled v-model="channelzi"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="API名称：" label-width="100px">
                        <el-input placeholder="请输入API名称" v-model="namezi"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-button size="small" type="primary" @click="onAPI">搜 索</el-button>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <el-table :data="tableDatakzi" stripe width="100%" border @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="APIID" align="center"></el-table-column>
                <el-table-column prop="name" label="API名称" align="center"></el-table-column>
                <el-table-column prop="uri" label="APIURL" align="center"></el-table-column>
                <el-table-column type="selection" label="操作" width="55" align="center"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow3 = false">取 消</el-button>
                <el-button type="primary" @click="onTiAPI">提 交</el-button>
            </span>
        </el-dialog>
</section>
</template>
<script>
import { resourceList,resourceCreate,resourceUpdate,resourceChild,resourceUpdateChild,resourceSort,resourceDelete,apiList,apiDelete } from '../api/url.js'
export default {
  data () {
    return {
      isShowTabIndex: 0,
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
      radio: '1',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isDialogShow3: false,
      isShowTab: false,
      isShowTab1: false,
      labelData: [],
      tableDatak: [],
      tableDataw: [],
      tableDatakzi: [],
      fuzhu: '',
      fuName: '',
      fuExplain: '',
      zizhu: '',
      id: '',
      type: '',
      showIndex: '-1',
      channelzi: '',
      categoryzi: '',
      namezi: '',
      multipleSelection: [],
      ziname: '',
      zishuo: '',
      ziurl: '',
      zitype: '',
      category_qu_view: '',
      channel_qu_view: '',
      page_qu_view: ''
    }
  },
  methods: {
    choose (value) {
      this.category_qu_view = value
      var data = {'category': this.category_qu_view, 'channel': this.channel_qu_view, 'page': this.page_qu_view}
      resourceList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          if (res.result.length > 0) {
            this.tableDatak = res.result
          } else {
            this.tableDatak = []
          }
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    choose1 (value) {
      this.channel_qu_view = value
      var data = {'category': this.category_qu_view, 'channel': this.channel_qu_view, 'page': this.page_qu_view}
      resourceList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          if (res.result.length > 0) {
            this.tableDatak = res.result
          } else {
            this.tableDatak = []
          }
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    choose2 (value) {
      this.page_qu_view = value
      var data = {'category': this.category_qu_view, 'channel': this.channel_qu_view, 'page': this.page_qu_view}
      resourceList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          if (res.result.length > 0) {
            this.tableDatak = res.result
          } else {
            this.tableDatak = []
          }
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val',val)
    },
    onZiShow (id) {

    },
    onDisableClik (type) { 
      if (type === 1) {
        // 追加父节点
        if (this.region_category === '' || this.region_page === '') {
          this.$message('请先选择筛选条件')
          return false
        } else if (this.region_category === '4' && this.region_page !== '9') {
          this.$message('您选择了管理后台站点，请选择所属页面为管理后台中心')
          return false
        }
      }
      this.type = type
      this.isDialogShow1 = true
    },
    onEditClick (id, name, description) {
      this.fuzhu = id
      this.fuName = name
      this.fuExplain = description
      this.isDialogShow1 = true
    },
    ondisable () {
      if (this.type === 1) {
        // 追加父节点
        if (this.fuName.length > 8) {
          this.$message('父节点的名称长度不能超过8个字符')
          return false
        }
        resourceCreate({'name': this.fuName,'description': this.fuExplain,'category': parseInt(this.region_category),'channel': parseInt(this.region_channel),'page': parseInt(this.region_page)}).then(res => {
          console.log('data', res)
          if (res.success) {
            this.isDialogShow1 = false
            this.fuzhu = res.result
            window.location.reload()
          } else {
            this.$message(res.message)          
          }
        }).catch(error => {
          console.log(`请求错误`)
        })
      }
    },
    onSub_fu () { 
      // 更新父节点
      if (this.fuName.length > 8) {
        this.$message('父节点的名称长度不能超过8个字符')
        return false
      }
      var data = {'id': this.fuzhu,'description': this.fuExplain,'name': this.fuName}
      resourceUpdate(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow1 = false
          // window.location.reload()
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDisableClik1 (id, channel, category) { 
      // 追加子节点
      if (id === null || id === '') {
        this.$message('请先选择追加父节点')
        return false
      }
      this.channelzi = channel
      this.categoryzi = category
      this.fuzhu = id
      this.isDialogShow2 = true
    },
    onDisable1 () {
      // 追加子节点
      if (this.ziname.length > 8) {
        this.$message('子节点的名称长度不能超过8个字符')
        return false
      }
      var apiid = []
      for (var i = 0;i < this.tableDatakzi.length;i++) {
        apiid.push({"'apiId'": this.tableDatakzi[i].id})
      }
      var data = {'parentId': this.fuzhu, 'name': this.ziname, 'description': this.zishuo, 'uri': this.ziurl, 'apiAuthorities': apiid}
      console.log(data)
      resourceChild(data).then(res => {
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
    onEditClick1 (item, type) {
      // 编辑子节点
      this.ziname = item.name
      this.zishuo = item.description
      this.ziurl = item.uri
      this.channelzi = item.channel
      this.categoryzi = item.category
      this.fuzhu = item.parentId
      this.zizhu = item.id
      this.zitype = type
      this.isDialogShow2 = true
    },
    onDisable11 () {
      // 更新子节点
      if (this.ziname.length > 8) {
        this.$message('子节点的名称长度不能超过8个字符')
        return false
      }
      var apiid = []
      for (var i = 0;i < this.tableDatakzi.length;i++) {
        apiid.push({"'apiId'": this.tableDatakzi[i].id})
      }
      var data = {'id': this.zizhu, 'name': this.ziname, 'description': this.zishuo, 'uri': this.ziurl, 'apiAuthorities': apiid}
      console.log(data)
      resourceUpdateChild(data).then(res => {
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
    onshowAPI () {
      // 追加API关联关系显示
      this.isDialogShow3 = true
    },
    onAPI () {
      // 查询API列表
      var data = {'name': this.namezi, 'source': this.categoryzi, 'channel': this.channelzi}
      apiList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableDatakzi = res.result.modelData
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onTiAPI () {
      // 追加API关联关系提交按钮
      this.tableDatakzi = []
      for (var i = 0;i < this.multipleSelection.length;i++) {
        this.tableDatakzi.push(this.multipleSelection[i])
      }
      this.isDialogShow3 = false
    },
    onAPIDel (id, index) {
      // 删除API
      console.log('apiid', id)
      var data = {'allApi': [id]}
      apiDelete(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableDatakzi.splice(index, 1)
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDelClick (id) {
      // 删除节点
      this.id = id
      this.isDialogShow = true
    },
    onDel () {
      // 删除接口
      var data = {'id': this.id}
      resourceDelete(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow = false
          window.location.reload()
        } else {
          if (/system.resource.existing.child.nodes/.test(res.message)) {
            this.$message('父节点下面有子节点不能删除')
          } else {
            this.$message(res.message)   
          }    
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onShow (index) {
      console.log(this.showIndex,index);
      if (index !== this.showIndex) {
        this.showIndex = index;
      } else {
        this.showIndex = '-1'
      }
    },
    onQuery () {
      
    },
    postData () {
      var data = {'category': 0, 'channel': 1, 'page': 2}
      resourceList().then(res => {
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
