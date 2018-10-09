<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">实名认证管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="用户名称：">
                  <el-input placeholder="请输入用户名称" v-model="qu_name"></el-input>
              </el-form-item>
              <el-form-item label="用户手机号：">
                  <el-input placeholder="请输入用户手机号" v-model="qu_iphone"></el-input>
              </el-form-item>
              <el-form-item label="用户角色：">
                  <el-select v-model="region_role_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_role" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="用户id：">
                  <el-input placeholder="请输入用户id" v-model="qu_id"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称：">
                  <el-input placeholder="请输入用户昵称" v-model="qu_nick"></el-input>
              </el-form-item>
              <el-form-item label="审核状态：" >
                  <el-select v-model="region_shen_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_shen_qu" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-button size="small" type="primary" @click="queryClik">搜索</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
        <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" label="全部" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="用户id" align="center"></el-table-column>
                <el-table-column prop="realName" label="用户姓名" align="center"></el-table-column>
                <el-table-column prop="mobile" label="用户手机" align="center"></el-table-column>
                <el-table-column prop="typeName" label="角色" align="center"></el-table-column>
                <el-table-column prop="sexType" label="性别" align="center"></el-table-column>
                <el-table-column prop="idCode" label="证件号" align="center"></el-table-column>
                <el-table-column prop="approveStatusName" label="状态" align="center"></el-table-column>
                <el-table-column width="250" label="操作" align="center" show-overflow-tooltip fixed="right">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.approveStatus == 1" @click="onExamineClick(scope.row.id)" type="danger" size="small">审核</el-button>
                        <el-button v-if="scope.row.approveStatus == 2" @click="onRevokeClick(scope.row.id)" type="danger" size="small">撤销</el-button>
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
            <el-button size="small" type="primary" @click="onRevokeClick1">批量删除</el-button>
            <!-- <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button> -->
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
        <!-- 撤销窗口 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 20px;">请确认是否进行撤销处理</p>
            <el-form >
                <el-form-item label="禁用原因：">
                    <el-input type="textarea" v-model="cheyuan" placeholder="请录入禁用原因" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：撤销后该用户状态为未认证</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onche">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 批量撤销窗口 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 20px;">请确认是否进行批量撤销处理</p>
            <el-form >
                <el-form-item label="禁用原因：">
                    <el-input type="textarea" v-model="cheyuan_pi" placeholder="请录入禁用原因" :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：撤销后该用户状态为未认证</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow2 = false">取 消</el-button>
                <el-button type="primary" @click="onche1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 实名认证信息详情页 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <p style="font-size: 30px;">实名认证信息详情页</p>
            <el-form :inline="true" class="demo-form-inline" id="dialog" label-width="95px" size="mini">
            <el-col :span="10">
              <el-form-item label="用户类型：" label-width="95px">
                  <el-input placeholder="请输入用户类型" disabled v-model="detlei"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="用户id：">
                  <el-input placeholder="自动生成" disabled v-model="detid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※用户姓名：</p>
              <el-form-item style="color: #C13232;">
                  <el-input placeholder="请输入用户姓名" disabled v-model="detname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="用户昵称：" >
                  <el-input placeholder="请输入用户姓名" disabled v-model="detni"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
                <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※手机号：</p>
              <el-form-item style="color: #C13232;">
                      <el-input placeholder="请输入用户手机号" disabled v-model="detiphone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系电话：" >
                  <el-input placeholder="请输入用户电话" disabled v-model="dettel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" label-width="70px">
                  <el-input placeholder="请输入邮箱" disabled style="width: 240px;" v-model="detemail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别：" >
                  <el-input placeholder="请输入性别" disabled v-model="detsex"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属国家：">
                  <el-input placeholder="请输入所属国家" disabled v-model="detcou"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="所在位置：" >
                  <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;" disabled v-model="detwei"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件类型：">
                  <el-input placeholder="请输入证件类型" disabled v-model="detzheng"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="证件号：" >
                  <el-input placeholder="请输入证件号码" disabled v-model="detzhenghao"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="注册频道：">
                  <el-input placeholder="请输入注册频道" disabled v-model="detpin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="注册渠道：">
                  <el-input placeholder="请输入注册渠道" disabled v-model="detqu"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="所属机构/院校：" label-width="130px">
                  <el-input placeholder="请输入所属机构/院校" disabled v-model="detjiguo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="认证状态：">
                  <el-input placeholder="认证状态" disabled v-model="detren"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="禁用状态：">
                  <el-input placeholder="禁用状态" disabled v-model="detjin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" style="margin-left: 10px;"><div>证件照片：</div><img  alt=""><img  alt=""></el-col>
            <el-col :span="20" style="margin-left: 10px;margin-top: 20px;">
                <el-form-item label="不通过原因：" label-width="100px">
                    <el-input type="textarea" v-model="detyuan" placeholder="请录入不通过原因" :rows="5" style="width: 600px;"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ontong" type="primary">通过</el-button>
                <el-button @click="onweitong = false" type="primary">不通过</el-button>
                <el-button @click="isDialogShow1 = false" type="primary">取消</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { certificationList,certificationDetail,certificationVerify,certificationRevoke,codeRole } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: [],
      detlei: '',
      detid: '',
      detname: '',
      detni: '',
      detiphone: '',
      dettel: '',
      detemail: '',
      detsex: '',
      detcou: '',
      detwei: '',
      detzheng: '',
      detzhenghao: '',
      detpin: '',
      detqu: '',
      detjiguo: '',
      detren: '',
      detjin: '',
      detimgz: '',
      detimgf: '',
      detyuan: '',
      cheyuan: '',
      cheid: '',
      region_role_qu: '',
      option_role: [],
      region_shen_qu: '',
      option_shen_qu: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '申请中'
      }, {
        value: '2',
        label: '成功'
      }, {
        value: '3',
        label: '失败'
      }],
      qu_name: '',
      qu_iphone: '',
      qu_id: '',
      qu_nick: '',
      pageNo: '',
      multipleSelection: '',
      allpi: [],
      cheyuan_pi: ''
    }
  },
  methods: {
    handleSelectionChange (val) {
      // 表格监听
      this.multipleSelection = val
      console.log('val',val)
    },
    handleCurrentChange(val) {
      // 分页监听
      this.pageNo = val
      this.onfen()
    },
    onRevokeClick1 () {
      // 批量撤销
      if (this.multipleSelection.length === 0) {
        this.$message('请在列表勾选')  
        return false
      }
      this.allpi = []
      for (var i = 0;i < this.multipleSelection.length;i++) {
        this.allpi.push(this.multipleSelection[i].id)
      }
      this.isDialogShow2 = true
    },
    onche1 () {
      // 批量撤销认证通过
      var data = {'ids': this.allpi, 'approverMemo': this.cheyuan_pi}
      certificationRevoke(data).then(res => {
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
    onfen () {
      // 分页按钮
      var data = {'id': this.qu_id, 'realName': this.qu_name, 'mobile': this.qu_iphone, 'nikeName': this.qu_nick, 'approveStatus': this.region_shen_qu, 'type': this.region_role_qu, 'pageNo': this.pageNo, 'pageSize': 20}
      certificationList(data).then(res => {
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
    },
    queryClik () {
      // 查询按钮
      var data = {'id': this.qu_id, 'realName': this.qu_name, 'mobile': this.qu_iphone, 'nikeName': this.qu_nick, 'approveStatus': this.region_shen_qu, 'type': this.region_role_qu}
      certificationList(data).then(res => {
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
    },
    onExamineClick (id) {
      // 实名审核弹窗
      var data = {'id': id}
      certificationDetail(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.detlei = res.result.typeName
          this.detid = res.result.id
          this.detname = res.result.realName
          this.detni = res.result.nikeName
          this.detiphone = res.result.mobile
          this.dettel = res.result.tel
          this.detemail = res.result.email
          if (res.result.sex === 1) {
            this.detsex = '男'
          } else if (res.result.sex === 2) {
            this.detsex = '女'
          }
          this.detcou = res.result.nationality
          this.detwei = res.result.address
          this.detzheng = res.result.evidenceType
          this.detzhenghao = res.result.idCode
          this.detpin = res.result.registeredChannelName
          this.detqu = res.result.registeredSourceName
          this.detjiguo = res.result.shopId
          this.detren = res.result.approveStatusName
          this.detjin = res.result.statusName
          this.detimgz = res.result.codeZhengImg
          this.detimgf = res.result.codeFanImg
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      this.isDialogShow1 = true
    },
    ontong () {
      // 审核实名认证通过
      var data = {'id': this.id, 'approveStatus': 2, 'approverMemo': this.detyuan}
      certificationVerify(data).then(res => {
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
    onweitong () {
      // 审核实名认证不通过
      var data = {'id': this.id, 'approveStatus': 3, 'approverMemo': this.detyuan}
      certificationVerify(data).then(res => {
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
    onRevokeClick (id) {
      this.cheid = id
      this.isDialogShow = true
    },
    onche () {
      // 撤销认证通过
      var data = {'ids': [this.cheid], 'approverMemo': this.cheyuan}
      certificationRevoke(data).then(res => {
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
      certificationList().then(res => {
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
      // 角色
      codeRole().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_role = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    //   // 国家
    //   codeCountry().then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.option_country = res.result
    //     } else {
    //       this.$message(res.message)
    //     }
    //   }).catch(error => {
    //     console.log(`请求错误`)
    //   })
    //   // 频道
    //   codeSource().then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.option_pin = res.result
    //     } else {
    //       this.$message(res.message)
    //     }
    //   }).catch(error => {
    //     console.log(`请求错误`)
    //   })
    //   // 渠道
    //   codeChannel().then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.option_qu = res.result
    //     } else {
    //       this.$message(res.message)
    //     }
    //   }).catch(error => {
    //     console.log(`请求错误`)
    //   })
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
.personnel #dialog img{
    display: inline-block;
    width: 400px;
    height: 300px;
    float: left;
    background: url(../assets/main-icon.png);
    background-size: 100% 100%;
    border: 1px solid #eee;
}
</style>
