<template>
    <div class="personnel">
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">白名单管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-col :span="5">
              <el-form-item label="白名单ID：" label-width="100px">
                  <el-input placeholder="请输入白名单ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="白名单内容：" label-width="100px">
                  <el-input placeholder="请输入白名单内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="白名单分类：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="广告" :value="1" :key="1"></el-option>
                      <el-option label="宣传" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="审核状态：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="待审核" :value="1" :key="1"></el-option>
                      <el-option label="通过" :value="2" :key="2"></el-option>
                      <el-option label="不通过" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="状态：" label-width="80px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="正常" :value="1" :key="1"></el-option>
                      <el-option label="冻结" :value="2" :key="2"></el-option>
                    </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">创建时间：</span>
                    <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="small" type="primary" @click="onEditClick">添加</el-button>
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary" @click="onDelClick">一键清除</el-button>
            </el-col>
        </el-form>
        <el-col :span='18' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column prop="id" label="白名单ID" align="center"></el-table-column>
                <el-table-column prop="url" label="白名单内容" align="center"></el-table-column>
                <el-table-column prop="memo" label="白名单说明" align="center"></el-table-column>
                <el-table-column prop="typeName" label="白名单分类" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" align="center"></el-table-column>
                <!-- <el-table-column prop="" label="创建人" align="center"></el-table-column> -->
                <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
                <el-table-column prop="applyStatusName" label="审核状态" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status == 1" @click="onDisableClik(scope.$index,scope.row.status)" type="danger" size="small">冻结</el-button>
                        <el-button v-if="scope.row.status == 2" @click="onDisableClik(scope.$index,scope.row.status)" type="danger" size="small">解冻</el-button>
                        <el-button @click="onTong" type="danger" size="small">通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- </div> -->
        </el-col>
        <!-- <div style="height:30px"></div>

        <el-col :span="18" style="text-align: center;">
            <el-col :span="12">
                <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
            </el-col>
            <el-col :span="3">
                <el-button size="small" type="primary">确定</el-button>
            </el-col>
            <el-col :span="3" style="float: right;">
                <el-button size="small" type="primary">批量删除</el-button>
            </el-col>
        </el-col> -->
        <!-- 删除窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">请确认是否继续一键清除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onDel">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 解冻窗口 -->
        <el-dialog v-model="isDialogShow4" size="small" :visible.sync="isDialogShow4">
            <p style="font-size: 30px;">请确认是否解冻白名单</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow4 = false">取 消</el-button>
                <el-button type="primary" @click="onDisable">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 白名单添加 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">白名单添加</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="自动生成" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="白名单内容：" label-width="100px">
                        <el-input placeholder="请输入白名单内容" v-model="appcon"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="白名单分类：" label-width="100px">
                  <el-select v-model="region_fen" @change="choose(region_fen)" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_fen" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="白名单说明：" label-width="100px">
                        <el-input type="textarea" v-model="appming" placeholder="请录入白名单说明" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 白名单冻结 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">白名单冻结</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled v-model="appid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="白名单内容：" label-width="100px">
                        <el-input placeholder="请输入白名单内容" disabled v-model="appcon"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="10">
                  <el-form-item label="白名单分类：" label-width="100px">
                  <el-select v-model="region_fen" @change="choose(region_fen)" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_fen" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="20">
                    <el-form-item label="冻结原因：" label-width="100px">
                        <el-input type="textarea" v-model="appming" placeholder="请录入冻结原因" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="onDisable">冻 结</el-button>
            </span>
        </el-dialog>
        <!-- 白名单审核 -->
        <el-dialog v-model="isDialogShow3" size="small" :visible.sync="isDialogShow3">
            <p style="font-size: 30px;">白名单审核</p>
            <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini" style="width: 100%">
                <el-col :span="10">
                    <el-form-item label="ID：" label-width="80px">
                        <el-input placeholder="请输入ID" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="白名单内容：" label-width="100px">
                        <el-input placeholder="请输入白名单内容" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="白名单分类：" label-width="100px">
                    <el-input placeholder="请输入白名单内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="状态：" label-width="80px">
                    <el-input placeholder="请输入白名单内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="不通过原因：" label-width="100px">
                        <el-input type="textarea" placeholder="请录入不通过原因" :rows="5" style="width: 400px"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow3 = false">取 消</el-button>
                <el-button type="primary" @click="isDialogShow3 = false">通 过</el-button>
                <el-button type="primary" @click="isDialogShow3 = false">不 通 过</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { whiteDelete,whiteList,whiteCreate,whiteVerify,whiteUpdate,whiteFrozen,whiteUnfrozen } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      region_fen: '',
      option_fen: [{
        value: '0',
        label: '空'
      }, {
        value: '2',
        label: '广告'
      }, {
        value: '1',
        label: '宣传'
      }],
      region_dong: '',
      option_dong: [{
        value: '0',
        label: '空'
      }, {
        value: '2',
        label: '冻结'
      }],
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isDialogShow3: false,
      isDialogShow4: false,
      tableData: [],
      choosenItem: [],
      appcon: '',
      appming: '',
      appid: '',
      status: ''
    }
  },
  methods: {
    choose (value) {
      this.choosenItem = this.option_fen.filter(item => item.value === value)[0];
      console.log('choose', this.choosenItem)
    },
    onEditClick () {
      this.isDialogShow1 = true
    },
    onEdit () {
      // 添加白名单
      var data = {'url': this.appcon, 'type': this.choosenItem.value, 'memo': this.appming}
      whiteCreate(data).then(res => {
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
    onTong () {
      this.isDialogShow3 = true
    },
    onDisableClik (index,type) {
      if (type === 1) {
        this.isDialogShow2 = true
        this.appid = this.tableData[index].id
        this.appcon = this.tableData[index].url
        this.status = type
      } else if (type === 2) {
        this.isDialogShow4 = true
        this.appid = this.tableData[index].id
        this.status = type
      }
    },
    onDisable () {
      if (this.status === 1){
        // 白名单冻结
        var data = {'id': this.appid, 'status': 2, 'statusMemo': this.appming}
        whiteFrozen(data).then(res => {
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
      } else if (this.status === 2) {
        // 白名单解冻
        var data = {'id': this.appid, 'status': 1}
        whiteUnfrozen(data).then(res => {
          console.log('data', res)
          if (res.success) {
            this.isDialogShow4 = false
            window.location.reload()
          } else {
            this.$message(res.message)
          }
        }).catch(error => {
            console.log(`请求错误`)
        })
      }
    },
    onDelClick () {
      this.isDialogShow = true
    },
    onDel () {
      // 一键清除白名单
      whiteDelete().then(res => {
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
      whiteList().then(res => {
        console.log('data', res)
        if (res.success) {
          this.tableData = res.result.modelData
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
