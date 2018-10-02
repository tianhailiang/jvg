<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">标签关系</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="标签名称：" label-width="100px">
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
              <el-form-item>
                  <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">创建时间：</span>
                  <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
              </el-form-item>
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary" @click="onDisableClik">新建关系</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column label="一级类目" align="center">
                    <template slot-scope="scope">
                        <el-button @click="onDisableClik" type="text" size="small">{{scope.row.firstName}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="secondName" label="二级类目" align="center"></el-table-column>
                <el-table-column prop="thirdName" label="三级类目" align="center"></el-table-column>
                <el-table-column prop="languagesName" label="语种" align="center"></el-table-column>
                <el-table-column prop="professionName" label="频道" align="center"></el-table-column>
                <el-table-column prop="type" label="类别" align="center">
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
                <el-table-column prop="collegesNature" label="类型" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onDelClick" type="danger" size="small">删除</el-button>
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
                <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 标签关系编辑 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p class="personnel-title">标签关系编辑</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
                <el-col :span="10">
                <el-form-item label="语种：" label-width="80px">
                  <el-select v-model="region_yu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_yu" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="频道：" label-width="80px">
                  <el-select v-model="region_pin" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_pin" :key="item.value" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region_ye" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_ye" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <!-- <el-col :span="2">
                  <el-button size="small" type="primary">搜索</el-button>
                </el-col> -->
            </el-form>
            <p style="font-size: 20px;">———————————————————————————————</p>
            <!-- <div style="float: right;"> -->
            <el-table :data="tableDatak" stripe width="100%" border>
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="name" label="标签名称" align="center"></el-table-column>
                <el-table-column width="250" label="下一级" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.level == 1" @click="onNext(scope.$index)" type="primary" size="small">二级</el-button>
                        <el-button v-if="scope.row.level != 1" @click="onNextThree(scope.$index)" type="primary" size="small">三级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-show="isTabShow">
            <p style="width: 83px;font-size: 14px;color: #606266;line-height: 30px;text-align: right;padding-right: 12px;">级别：二级</p>
            <el-table  :data="tableDatak2" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="name" label="标签名称" align="center"></el-table-column>
                <el-table-column width="250" label="下一级" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button @click="onNextThree(scope.$index)" type="primary" size="small">三级</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="onshowaddtow">添加二级</el-button>
            </div>
            <div v-show="isTabShow1">
            <p style="width: 83px;font-size: 14px;color: #606266;line-height: 30px;text-align: right;padding-right: 12px;">级别：三级</p>
            <el-table  :data="tableDatak3" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="标签名称" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="推荐状态" align="center"></el-table-column>
                <el-table-column prop="collegesId" label="推荐顺序" align="center" width="100">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入标签级别"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button @click="onNextThree(scope.$index)" type="primary" size="small">推荐</el-button>
                        <el-button @click="onNextThree(scope.$index)" type="primary" size="small">撤销</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="isDialogShow1 = false">添加三级</el-button>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span> -->
        </el-dialog>
        <!-- 标签列表选择页 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p class="personnel-title">标签列表选择页</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
                <el-col :span="10">
                <el-form-item label="标签名称：" label-width="80px">
                    <el-input placeholder="请输入标签名称" v-model="yename"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="语种：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="yeyu"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="频道：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="yepin"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="标签级别：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="yebiao"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="类别：" label-width="80px">
                        <el-input placeholder="自动生成" disabled v-model="yelei"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" type="primary" @click="isDialogShow2 = false">搜索</el-button>
                </el-col>
            </el-form>
            <p style="font-size: 20px;">———————————————————————————————</p>
            <!-- <div style="float: right;"> -->
            <el-table :data="tableDatay" stripe width="100%" border>
                <el-table-column type="selection" label="操作" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="标签ID" align="center"></el-table-column>
                <el-table-column prop="name" label="标签名称" align="center"></el-table-column>
            </el-table>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow1 = false">确 定</el-button>
            </span> -->
        </el-dialog>
    </section>
</template>
<script>
import { labelRelationshipList,labelShipDelete,labelRecommendationOrCancellation,labelLevelOneList,labelLevelOneToThirdList,labelRelationship,codeChannel,codeAffairs } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      region_yu: '',
      option_yu: [{
        value: '0',
        label: '空'
      }, {
        value: '1',
        label: '中文'
      }, {
        value: '2',
        label: '英文'
      }],
      region_pin: '',
      option_pin: [],
      region_ye: '',
      option_ye: [],
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isTabShow: false,
      isTabShow1: false,
      tableData: [],
      tableDatak: [],
      tableDatak2: [],
      tableDatak3: [],
      tableDatay: [],
      name: '',
      yename: '',
      yeyu: '',
      yepin: '',
      yebiao: '',
      yelei: ''
    }
  },
  methods: {
    onshowaddtow () {
      // 显示标签列表选择页
      this.isDialogShow2 = true
    },
    onaddtow () {
      // 添加二级
      var data = {'level': 2}
      labelLevelOneList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableDatay = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onNextThree (index) {
      // 显示三级标签
      var data = {'level': 3, 'languages': this.tableDatak[index].languages, 'type': this.tableDatak[index].level, 'profession': this.tableDatak[index].profession, 'name': this.tableDatak[index].name}
      labelLevelOneToThirdList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableDatak3 = res.result
          this.isTabShow1 = true
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onNext (index) {
      // 显示二级标签
      var data = {'level': 2, 'languages': this.tableDatak[index].languages, 'type': this.tableDatak[index].level, 'profession': this.tableDatak[index].profession, 'name': this.tableDatak[index].name}
      labelLevelOneToThirdList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableDatak2 = res.result
          this.isTabShow = true
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onEditClick (index) {
      this.isDialogShow1 = true
    },
    onDisableClik () {
      // 新建标签关系一级
      var data = {'level': 1}
      labelLevelOneToThirdList(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableDatak = res.result
          this.isDialogShow1 = true
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    onDisable () {
      // 新建标签关系接口
      var data = {'id': 5, 'labelid': 6}
      labelRelationship(data).then(res => {
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
    onDelClick () {
      this.isDialogShow = true
    },
    postData () {
      labelRelationshipList().then(res => {
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
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      // 业务
      codeAffairs().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_ye = res.result
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
