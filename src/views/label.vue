<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">标签列表</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="标签ID：" label-width="80px">
                  <el-input placeholder="请输入标签ID"></el-input>
              </el-form-item>
              <el-form-item label="语种：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="中文" :value="1" :key="1"></el-option>
                      <el-option label="英语" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="留学" :value="1" :key="1"></el-option>
                      <el-option label="语培" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="课程" :value="1" :key="1"></el-option>
                      <el-option label="照片" :value="2" :key="2"></el-option>
                      <el-option label="文章" :value="3" :key="3"></el-option>
                      <el-option label="出版物" :value="4" :key="4"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="类型：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="热搜" :value="1" :key="1"></el-option>
                      <el-option label="分类" :value="2" :key="2"></el-option>
                      <el-option label="特征" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">创建时间：</span>
                    <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary" @click="onEditClick('1')">新建</el-button>
              <el-button size="small" type="primary" @click="onDisableClik">排序</el-button>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="id" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="signs" label="标签语种" align="center"></el-table-column>
                <el-table-column prop="professionName" label="标签频道" align="center"></el-table-column>
                <el-table-column prop="category" label="标签类别" align="center"></el-table-column>
                <el-table-column prop="name" label="标签名称" align="center"></el-table-column>
                <el-table-column prop="userName" label="创建人" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type == 1">课程</div>
                        <div v-if="scope.row.type == 2">照片</div>
                        <div v-if="scope.row.type == 3">文章</div>
                        <div v-if="scope.row.type == 4">出版物</div>
                        <div v-if="scope.row.type == 5">圈子</div>
                        <div v-if="scope.row.type == 6">问答</div>
                        <div v-if="scope.row.type == 7">讲师标签</div>
                        <div v-if="scope.row.type == 8">院校</div>
                        <div v-if="scope.row.type == 9">话题</div>
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="标签级别" align="center"></el-table-column>
                <el-table-column prop="userId" label="创建人ID" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onEditClick1(scope.row.id)" type="danger" size="small">编辑</el-button>
                        <el-button @click="onDelClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
        <!-- 标签排序 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p class="personnel-title">标签排序</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
                <el-col :span="7">
                  <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region_pin" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_pin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
              <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region_xing" placeholder="分类" style="width: 80px;">
                      <el-option label="分类" :value="1" :key="1"></el-option>
                      <el-option label="热搜" :value="2" :key="2"></el-option>
                      <el-option label="能力标签" :value="3" :key="3"></el-option>
                      <el-option label="授课语言-地方语言" :value="4" :key="4"></el-option>
                      <el-option label="授课语言-民族语言" :value="5" :key="5"></el-option>
                      <el-option label="授课语言-国家语言" :value="6" :key="6"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="类型：" label-width="80px">
                  <el-select v-model="region_lei" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_lei" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click="onPaiSou" size="small" type="primary">搜索</el-button>
            </el-col>
            </el-form>
            <p style="font-size: 20px;">———————————————————————————————</p>
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData1" stripe width="100%" border>
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button @click="onPai(scope.$index, 1)" v-show="scope.$index != tableData1.length-1" type="primary" size="small" class="el-icon-sort-down" circle>降序</el-button>
                        <el-button @click="onPai(scope.$index, 2)" v-show="scope.$index != 0" type="primary" size="small" class="el-icon-sort-up" circle> 升序</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onPaiQue">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 标签添加/编辑 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p class="personnel-title">标签添加/编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="100px" size="mini">
                <el-col :span="10">
                    <el-form-item label="当前序列：" >
                        <el-input placeholder="请输入当前序列" disabled v-model="addxv"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="标签ID：" >
                        <el-input placeholder="请输入用户姓名" disabled v-model="addid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※标签名称：</p>
                  <el-form-item>
                      <el-input placeholder="请输入标签名称" v-model="addname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※标签语种：</p>
                  <el-form-item>
                  <el-select v-model="region_yu" @change="choose(region_yu)" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_yu" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※频道：</p>
                  <el-form-item>
                  <el-select v-model="region_addpin" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_addpin" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※类别：</p>
                  <el-form-item>
                  <el-select v-model="region_ye" placeholder="分类" style="width: 80px;">
                      <el-option label="分类" :value="1" :key="1"></el-option>
                      <el-option label="热搜" :value="2" :key="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              <el-col :span="10">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※类型：</p>
                  <el-form-item>
                  <el-select v-model="region_addxing" placeholder="全部" style="width: 80px;">
                      <el-option label="课程" :value="1" :key="1"></el-option>
                      <el-option label="照片" :value="2" :key="2"></el-option>
                      <el-option label="文章" :value="3" :key="3"></el-option>
                      <el-option label="出版物" :value="4" :key="4"></el-option>
                      <el-option label="圈子" :value="5" :key="5"></el-option>
                      <el-option label="问答" :value="6" :key="6"></el-option>
                      <el-option label="讲师标签" :value="7" :key="7"></el-option>
                      <el-option label="院校" :value="8" :key="8"></el-option>
                      <el-option label="话题" :value="9" :key="9"></el-option>
                    </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="10">
                    <el-form-item label="创建人：" label-width="80px">
                        <el-input placeholder="请输入创建人" disabled v-model="addchuang"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="创建人ID：">
                        <el-input placeholder="请输入创建人ID" disabled v-model="addchuangid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="标签级别：">
                  <el-select v-model="region_jibie" placeholder="一级" style="width: 80px;">
                      <el-option label="一级" :value="0" :key="0"></el-option>
                      <el-option label="二级" :value="1" :key="1"></el-option>
                      <el-option label="三级" :value="2" :key="2"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="10">
                  <el-form-item label="平台/用户：">
                  <el-select v-model="region_ping" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="平台" :value="1" :key="1"></el-option>
                      <el-option label="自定义" :value="2" :key="2"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
            </el-form>
            <p style="font-size: 20px;">———————————————————————————————</p>
             <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">提 交</el-button>
                <el-button v-if="addid == null" type="primary" @click="onAdd">确 定</el-button>
                <el-button v-if="addid != null" type="primary" @click="onedit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { labelList,labelDelete,labelSort,labelSortQuery,labelCrate,labelDetail,labelUpdate,codeChannel,codeAffairs } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: [],
      tableData1: [],
      laid: '',
      region_yu: '',
      option_yu: [{
        value: '1',
        label: '全部'
      }, {
        value: '2',
        label: '中文'
      }, {
        value: '3',
        label: '英语'
      }],
      region_ye: '',
      option_ye: [],
      region_addpin: '',
      option_addpin: [],
      region_pin: '',
      option_pin: [],
      region_lei: '',
      option_lei: [],
      region_xing: '',
      choosenItem: [],
      region_addxing: '',
      data: {},
      addname: '',
      addxv: '',
      addid: '',
      addchuang: '',
      addchuangid: '',
      region_jibie: '',
      region_ping: ''
    }
  },
  methods: {
    choose (value) {
      this.choosenItem = this.option_yu.filter(item => item.value === value)[0];
      console.log('choose', this.choosenItem)
    },
    onEditClick () {
      // 新建标签
      this.isDialogShow2 = true
    },
    onEditClick1 (id) {
      // 取标签详情
      var data = {'id': id}
      labelDetail(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.addid = res.result.id
          this.addxv = res.result.sort
          this.addname = res.result.name
          this.region_ye = res.result.signs
          this.region_addpin = res.result.profession
          this.region_lei = res.result.category
          this.addchuangid = res.result.userId
          this.addchuang = res.result.userName
          this.region_addxing = res.result.type
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      this.isDialogShow2 = true
    },
    onedit () {
      // 编辑标签
      var data = {'id': this.addid, 'sort': 9,'name': this.addname, 'languages': this.choosenItem.label, 'profession': this.region_addpin, 'classes': this.region_ye, 'type': this.region_addxing, 'userId': 0, 'userName': 'hhhhhhh'}
      labelUpdate(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow2 = false
          window.location.reload()
          this.addid = ''
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onAdd () {
      // 新建标签
      var data = {'sort': 9,'name': this.addname, 'signs': this.choosenItem.label, 'profession': this.region_addpin, 'classes': this.region_ye, 'type': this.region_addxing, 'userId': 0, 'userName': 'hhhhhhh'}
      labelCrate(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow2
          window.location.reload()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDisableClik () {
      // 排序弹框
      this.isDialogShow1 = true
    },
    onPai (index,type) {
      // 排序
      if (type === 1) {
        // 降序
        if (index === 0) {
          this.data = {'firstId': this.tableData1[index].id, 'secondId': this.tableData1[index+1].id}
        } else {
          this.data = {'firstId': this.tableData1[index+1].id, 'secondId': this.tableData1[index-1].id}
        }
      } else if (type === 2) {
        // 升序
        if (index === this.tableData1.length-1) {
          this.data = {'firstId': this.tableData1[index-1].id, 'secondId': this.tableData1[index].id}
        } else {
          this.data = {'firstId': this.tableData1[index-1].id, 'secondId': this.tableData1[index+1].id}
        }
      }
      this.onPaiQue()
    },
    onPaiQue () {
      // 排序方法
      labelSort(this.data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.onPaiSou()
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onPaiSou () {
      // 排序搜索
      this.tableData1 = []
      var data = {'profession': this.region_pin, 'classes': this.region_xing, 'type': this.region_lei}
      labelSortQuery(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData1 = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDelClick (id) {
      // 删除弹框
      this.isDialogShow = true
      this.laid = id
    },
    onDel () {
      var data = {'id': [this.laid]}
      labelDelete(data).then(res => {
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
      labelList().then(res => {
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
      // 类别
      codeAffairs().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_lei = res.result
          this.option_ye = res.result
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
