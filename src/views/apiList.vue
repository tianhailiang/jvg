<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">API管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-form-item label="ID：" label-width="80px">
                <el-input placeholder="请输入ID"></el-input>
            </el-form-item>
            <el-form-item label="名称：" label-width="80px">
                <el-input placeholder="请输入名称" v-model="qu_name"></el-input>
            </el-form-item>
            <el-form-item label="渠道：" label-width="80px">
                <el-select v-model="region_qu_qu" placeholder="全部" style="width: 80px;">
                    <el-option v-for="(item) in option_qu" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务频道：" label-width="100px">
                <el-select v-model="region_pin_qu" placeholder="全部" style="width: 80px;">
                    <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面名称：" label-width="100px">
                <el-button @click="isDialogShow4 = true">点击选择页面</el-button>
            </el-form-item>
            <el-form-item label="状态：" label-width="80px">
                <el-select v-model="region_zhaung" placeholder="全部" style="width: 80px;">
                    <el-option v-for="(item) in option_zhuang" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-button size="small" type="primary" @click="queryClik">搜索</el-button>
            <el-button size="small" type="primary" @click="onDisableClik">追加</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="id" label="APIId" align="center"></el-table-column>
                <el-table-column prop="name" label="API名称" align="center"></el-table-column>
                <el-table-column prop="pageUrl" label="APIURL" align="center"></el-table-column>
                <el-table-column prop="sourceName" label="渠道名称" align="center"></el-table-column>
                <el-table-column prop="channelName" label="频道名称" align="center"></el-table-column>
                <el-table-column prop="statusName" label="状态名称" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.statusName == '正常'" @click="onDongShow(scope.row.id)" type="danger" size="small">冻结</el-button>
                        <el-button v-if="scope.row.statusName == '冻结'" @click="onDongShow(scope.row.id)" type="danger" size="small">解冻</el-button>
                        <el-button v-if="scope.row.statusName == '删除'" type="danger" size="small">查看</el-button>
                        <el-button v-if="scope.row.statusName != '删除'" @click="onDelClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
            <el-button size="small" type="primary" @click="onDongShow1">批量冻结</el-button>
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
        <!-- 冻结/解冻窗口 -->
        <el-dialog v-model="isDialogShow3" size="small" :visible.sync="isDialogShow3">
            <p style="font-size: 30px;">请确认是否继续冻结/解冻</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onDong">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onDel">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 批量冻结窗口 -->
        <el-dialog v-model="isDialogShow5" size="small" :visible.sync="isDialogShow5">
            <p style="font-size: 30px;">请确认是否继续批量冻结</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow5 = false">取 消</el-button>
                <el-button type="primary" @click="onDong1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 批量删除窗口 -->
        <el-dialog v-model="isDialogShow6" size="small" :visible.sync="isDialogShow6">
            <p style="font-size: 30px;">请确认是否继续批量删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow6 = false">取 消</el-button>
                <el-button type="primary" @click="onDel1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 选择页面 -->
        <el-dialog v-model="isDialogShow4" size="small" :visible.sync="isDialogShow4">
            <p style="font-size: 30px;">选择页面</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="名称：" label-width="100px">
                        <el-input placeholder="请输入API名称" v-model="ye_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="渠道：" label-width="80px">
                        <el-select v-model="region_qu_ye" placeholder="全部" style="width: 80px;">
                            <el-option v-for="(item) in option_qu" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务频道：" label-width="100px">
                        <el-select v-model="region_pin_ye" placeholder="全部" style="width: 80px;">
                            <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-button size="small" @click="isDialogShow4 = false">取 消</el-button>
                <el-button size="small" type="primary" @click="queryClik1">搜 索</el-button>
                </el-col>
            </el-form>
            <p >————————————————————————————————————————————</p>
            <el-table  :data="tableDatak" stripe width="100%" border>
                <el-table-column prop="id" label="页面ID" align="center"></el-table-column>
                <el-table-column prop="name" label="页面名称" align="center"></el-table-column>
                <el-table-column prop="name" label="页面URL" align="center"></el-table-column>
                <el-table-column prop="name" label="渠道" align="center"></el-table-column>
                <el-table-column prop="name" label="业务频道" align="center"></el-table-column>
                <el-table-column type="selection" label="操作" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
        </el-dialog>
        <!-- 添加API -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">添加API</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="自动生成" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="API名称：" label-width="100px">
                        <el-input placeholder="请输入API名称" v-model="name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="APIURL：" label-width="100px">
                        <el-input placeholder="请输入APIURL" v-model="url"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="渠道：" label-width="80px">
                        <el-select v-model="region_qu" placeholder="全部" style="width: 80px;">
                            <el-option v-for="(item) in option_qu" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务频道：" label-width="100px">
                        <el-select v-model="region_pin" placeholder="全部" style="width: 80px;">
                            <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onDisable">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 编辑API -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">编辑API</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="API名称：" label-width="100px">
                        <el-input placeholder="请输入API名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="APIURL：" label-width="100px">
                        <el-input placeholder="请输入APIURL"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="渠道：" label-width="80px">
                        <el-input placeholder="请输入渠道" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="业务频道：" label-width="100px">
                        <el-input placeholder="请输入业务频道" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面名称：" label-width="100px">
                        <el-input placeholder="请输入页面名称" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="页面URL：" label-width="100px">
                        <el-input placeholder="请输入页面URL" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">提 交</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { apiDelete,apiList,apiCreate,apiStatus,apiStatusBatch,apiUpdate,codeChannel,codeSource } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      region_pin: '',
      option_pin: [],
      region_qu: '',
      option_qu: [],
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isDialogShow3: false,
      isDialogShow4: false,
      isDialogShow5: false,
      isDialogShow6: false,
      tableData: [],
      total: '',
      name: '',
      url: '',
      id: '',
      apiname: '课程',
      qu_name: '',
      region_qu_qu: '',
      region_pin_qu: '',
      region_zhaung: '',
      option_zhuang: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '正常'
      }, {
        value: '2',
        label: '冻结'
      }, {
        value: '3',
        label: '删除'
      }],
      tableDatak: [],
      ye_name: '',
      region_qu_ye: '',
      region_pin_ye: '',
      multipleSelection: [],
      allpi: [],
      pageNo: ''
    }
  },
  methods: {
    handleCurrentChange(val) {
      // 分页监听
      this.pageNo = val
      this.onfen()
    },
    handleSelectionChange (val) {
      // 表格监听
      this.multipleSelection = val
      console.log('val',val)
    },
    onfen () {
      // 分页按钮
      var data = {'name': this.qu_name, 'source': this.region_qu_qu, 'channel': this.region_pin_qu, 'pageId': '20', 'status': this.region_zhaung, 'pageNo': this.pageNo, 'pageSize': 20}
      apiList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDongShow1 () {
      // 批量冻结弹框
      if (this.multipleSelection.length === 0) {
        this.$message('请在列表勾选')  
        return false
      }
      this.allpi = []
      for (var i = 0;i < this.multipleSelection.length;i++) {
        this.allpi.push(this.multipleSelection[i].id)
      }
      this.isDialogShow5 = true
    },
    onDong1 () {
      // 批量冻结
      var data = {'allApi': this.allpi}
      apiStatusBatch(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow5 = false
          window.location.reload()
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
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
      this.isDialogShow6 = true
    },
    onDel1 () {
      // 批量删除
      var data = {'allApi': this.allpi}
      apiDelete(data).then(res => {
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
    onDongShow (id) {
      // 冻结/解冻
      this.id = id
      this.isDialogShow3 = true
    },
    onDong () {
      // 冻结/解冻接口
      var data = {'id': this.id}
      apiStatus(data).then(res => {
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
    onEditClick (index) {
      this.isDialogShow2 = true
    },
    onDisableClik () {
      // 追加API
      this.isDialogShow1 = true
    },
    onDisable () {
      // 追加API
      var data = {'name': this.name, 'uri': this.url, 'source': this.region_qu, 'channel': this.region_pin}
      apiCreate(data).then(res => {
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
    },
    onDelClick (id) {
      // 删除弹窗
      this.id = id
      this.isDialogShow = true
    },
    onDel () {
      // 批量删除\删除接口
      var data = {'allApi': [this.id]}
      apiDelete(data).then(res => {
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
    queryClik () {
      // 搜索按钮
      var data = {'name': this.qu_name, 'source': this.region_qu_qu, 'channel': this.region_pin_qu, 'pageId': '20', 'status': this.region_zhaung}
      if (this.qu_name === '') {
        this.$message('请输入API名称内容')
        return false
      } else if (this.region_qu_qu === '') {
        this.$message('请选择API渠道分类')
        return false
      } else if (this.region_pin_qu === '') {
        this.$message('请选择API业务分类')
        return false
      } else if (this.region_zhaung === '') {
        this.$message('请选择API状态')
        return false
      } else if (this.tableDatak.length === 0) {
        this.$message('请选择API页面名称')
        return false
      }
      apiList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
        } else {
          this.$message(res.message)          
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    queryClik1 () {
      // 选择页面搜索
    //   var data = {'name': this.ye_name, 'source': this.region_qu_ye, 'channel': this.region_pin_ye}
    //   apiList(data).then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.tableDatak = res.result.modelData
    //     } else {
    //       this.$message(res.message)          
    //     }
    //   }).catch(error => {
    //     console.log(`请求错误`)
    //   })
    this.tableDatak[0] = '点过'
    this.isDialogShow4 = false
    },
    postData () {
      var data = {'source': 4, 'status': 1, 'channel': 1, 'name': this.apiname}
      apiList().then(res => {
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
      // 频道
      codeChannel().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_pin = res.result
          this.option_addpin = res.result
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
          this.option_addqu = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    }
  },
  mounted () {
    this.postData ()
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
