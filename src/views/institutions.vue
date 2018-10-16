<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">机构院校管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="机构/院校名称：">
                  <el-input placeholder="请输入机构/院校名称" v-model="qu_jigou"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号：">
                  <el-input placeholder="请输入联系人手机号" v-model="qu_iphone"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名：">
                  <el-input placeholder="请输入联系人姓名" v-model="qu_name"></el-input>
              </el-form-item>
              <el-form-item label="状态：" label-width="80px">
                  <el-select v-model="region_zhuang_qu" placeholder="正常" style="width: 80px;">
                      <el-option v-for="(item) in option_zhuang" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="所属国家：" label-width="100px">
                  <el-select v-model="region_guo_qu" placeholder="全部" style="width: 80px;">
                      <el-option v-for="(item) in option_guo" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="类别：" label-width="80px">
                  <el-select v-model="region_lei_qu" placeholder="全部" style="width: 100px;">
                      <el-option v-for="(item) in option_lei" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="机构院校性质：" label-width="120px">
                  <el-select v-model="region_jigouxing_qu" placeholder="全部" style="width: 120px;">
                      <el-option v-for="(item) in option_yuanxiao" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-form-item>
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">注册年份：</span>
                    <el-date-picker v-model="dataTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
              <el-button size="small" type="primary" @click="queryClik">搜索</el-button>
              <el-button @click="onEditClick(1)" size="small" type="primary">新增</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="id" label="机构院校id" width="90" align="center"></el-table-column>
                <el-table-column prop="title" label="机构院校名称" width="90" align="center"></el-table-column>
                <el-table-column prop="countryName" label="所属国家" width="90" align="center"></el-table-column>
                <el-table-column prop="mobile" label="联系人手机号" width="90" align="center"></el-table-column>
                <el-table-column prop="linkName" label="联系人姓名" width="90" align="center"></el-table-column>
                <el-table-column prop="typeName" label="类别" width="90" align="center"></el-table-column>
                <el-table-column prop="academyNature" label="机构院校性质" width="90" align="center"></el-table-column>
                <el-table-column prop="statusName" label="状态" width="90" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="注册时间" width="90" align="center"></el-table-column>
                <el-table-column width="250" label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onEditClick1(scope.row.id)" type="danger" size="small">编辑</el-button>
                        <el-button v-if="scope.row.status == 1" @click="onDisableClik(scope.$index,scope.row.id,scope.row.status)" type="danger" size="small">禁用</el-button>
                        <el-button v-if="scope.row.status == 2" @click="onDisableClik(scope.$index,scope.row.id,scope.row.status)" type="danger" size="small">解禁</el-button>
                        <el-button @click="onDelClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
        <!-- 批量删除窗口 -->
        <el-dialog v-model="isDialogShow3" size="small" :visible.sync="isDialogShow3">
            <p style="font-size: 30px;">请确认是否继续批量删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow3 = false">取 消</el-button>
                <el-button type="primary" @click="onDel1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用编辑窗口 -->
        <el-dialog v-model="isDialogShow1" size="small" :visible.sync="isDialogShow1">
            <el-form >
                <el-form-item label="机构院校名称：" >
                    <el-input auto-complete="off" placeholder="xxxxxx" disabled v-model="addname"></el-input>
                </el-form-item>
                <el-form-item label="机构院校ID：" >
                    <el-input auto-complete="off" placeholder="13912xxxx34" disabled v-model="addid"></el-input>
                </el-form-item>
                <el-form-item label="禁用/解禁原因：" >
                    <el-input type="textarea" placeholder="请录入禁用/解禁原因" :rows="5" v-model="jinyong"></el-input>
                </el-form-item>
            </el-form>
            <p style="font-size: 20px;">提示：禁用后该机构院校将无法登陆平台</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow1 = false">取 消</el-button>
                <el-button type="primary" @click="onDisable">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增/编辑机构院校 -->
        <el-dialog v-model="isDialogShow2" size="small" :visible.sync="isDialogShow2">
            <p style="font-size: 30px;">新增/编辑机构院校</p>
            <el-form :inline="true" class="demo-form-inline" label-width="95px" size="mini">
        <el-col :span="10">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※类型：</p>
            <el-form-item>
                <el-select v-model="region_jigou" placeholder="机构" style="width: 100px;">
                    <el-option label="机构" :value="1" :key="1"></el-option>
                    <el-option label="院校" :value="2" :key="2"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校id：">
                <el-input placeholder="请输入机构院校id" disabled v-model="addid"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※名称：</p>
            <el-form-item >
                <el-input placeholder="请输入用户姓名" v-model="addname"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※联系人：</p>
            <el-form-item >
                <el-input placeholder="请输入联系人姓名" v-model="addlian"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="18">
            <p style="width: 110px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※联系人手机号：</p>
            <el-form-item style="color: #C13232;">
                <el-col :span="8">
                <el-select v-model="region_qian" placeholder="+86" style="width: 80px;float: left;">
                    <el-option label="+86" :value="0" :key="0"></el-option>
                    <el-option label="+81" :value="1" :key="1"></el-option>
                </el-select>
                </el-col>
                <el-col :span="15">
                    <el-input placeholder="请输入用户手机号" v-model="addiphone"></el-input>
                </el-col>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="联系电话：">
                <el-input placeholder="请输入用户电话" v-model="addtel"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="邮箱：">
                <el-input placeholder="请输入邮箱" v-model="addemail"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="全球排名：">
                <el-input placeholder="请输入院校在全球排名" v-model="addpai"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <p style="width: 93px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※所属国家：</p>
            <el-form-item>
                <el-select v-model="region_guo" @change="choose(region_guo)" placeholder="中国" style="width: 100px;">
                    <el-option v-for="(item) in option_guo" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <p style="width: 110px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※机构院校性质：</p>
            <el-form-item>
                <el-select v-model="region_yuanxiao" @change="choose(region_yuanxiao)" placeholder="全部" style="width: 100px;">
                      <el-option v-for="(item) in option_yuanxiao" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="联系地址：">
                <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;" v-model="adddi"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="机构院校类型：" label-width="120px">
                <el-input placeholder="请输入机构院校类型" style="width: 400px;" v-model="addleixing"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="官网：">
                <el-input placeholder="如果机构院校有官网的，可输入URL" style="width: 400px;" v-model="addnetwork"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="机构院校介绍：" label-width="120px">
                <el-input type="textarea" :rows="5" placeholder="请输入机构院校介绍" style="width: 400px;" v-model="addjieshao"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20" style="">
            <p style="width: 110px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">机构院校logo：</p>
                <el-upload style="width: 178px;height: 178px;margin-bottom: 20px;" class="avatar-up-institutions" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-up-institutions-icon"></i>
                </el-upload>
        </el-col>
        <el-col :span="10">
            <el-form-item label="创立时间：">
                <el-input placeholder="请输入机构院校创立年月日" v-model="addchuangli"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="注册时间：">
                <el-input placeholder="请输入注册时间" disabled v-model="addzhuce"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="法人：">
                <el-input placeholder="请输入机构院校法人" v-model="addfaren"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="审核状态：">
                <el-input placeholder="请输入审核状态" disabled v-model="addzhuangtai"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="创建人员：">
                <el-input placeholder="请输入创建人员" disabled v-model="addchuangjian"></el-input>
            </el-form-item>
        </el-col>
        </el-form>
        <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="type == 1" @click="onadd">提 交</el-button>
                <el-button v-if="type != 1" @click="onEdit">提 交</el-button>
                <el-button type="primary" @click="isDialogShow2 = false">取 消</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { institudeDetail,institudeCreate,institudeUpdate,institudeDelete,institudeSet,institudeList,codeCountry,logourl } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      isDialogShow3: false,
      tableData: [],
      total: '',
      region_jigou: '',
      addid: '',
      addname: '',
      addlian: '',
      region_qian: '',
      addiphone: '',
      addtel: '',
      addemail: '',
      addpai: '',
      region_guo_qu: '',
      region_guo: '',
      option_guo: [],
      region_jigouxing_qu: '',
      region_yuanxiao: '',
      option_yuanxiao: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '语言培训'
      }, {
        value: '2',
        label: 'k12'
      }, {
        value: '3',
        label: '私立研究型大学'
      }],
      region_zhuang_qu: '',
      option_zhuang: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '正常'
      }, {
        value: '2',
        label: '禁用'
      }],
      region_lei_qu: '',
      option_lei: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '机构'
      }, {
        value: '2',
        label: '院校'
      }],
      adddi: '',
      addleixing: '',
      addnetwork: '',
      addjieshao: '',
      addchuangli: '',
      addzhuce: '',
      addfaren: '',
      addzhuangtai: '',
      addchuangjian: '',
      choosenItem: [],
      type: '',
      jinyong: '',
      qu_jigou: '',
      qu_iphone: '',
      qu_name: '',
      dataTime: '',
      pageNo: '',
      multipleSelection: '',
      allpi: [],
      imageUrl: '',
      type: ''
    }
  },
  methods: {
    choose (value) {
      this.choosenItem = this.option_yuanxiao.filter(item => item.value === value)[0];
      console.log('choose', this.choosenItem)
    },
    handleAvatarSuccess (res, file) {
      console.log('file', file.raw)
      // logourl().then(res => {
      //   console.log('resimg',res)
      // }).catch(error => {
      //   console.log(`请求错误`)
      // })
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log('imgurl', this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
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
    onfen () {
      // 分页按钮
      if (this.dataTime !== '') {
        var data = {'title': this.qu_jigou, 'mobile': this.qu_iphone, 'linkName': this.qu_name, 'status': this.region_zhuang_qu, 'countryId': this.region_guo_qu, 'type': this.region_lei_qu, 'academyNature': this.region_jigouxing_qu, 'regFrom': this.dataTime[0] + ' 00:00:00', 'regTo': this.dataTime[1] + ' 00:00:00', 'pageNo': this.pageNo, 'pageSize': 20}
      } else {
        var data = {'title': this.qu_jigou, 'mobile': this.qu_iphone, 'linkName': this.qu_name, 'status': this.region_zhuang_qu, 'countryId': this.region_guo_qu, 'type': this.region_lei_qu, 'academyNature': this.region_jigouxing_qu, 'pageNo': this.pageNo, 'pageSize': 20}
      }
      institudeList(data).then(res => {
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
    onDelClick1 () {
      // 批量删除弹窗
      if (this.multipleSelection.length === 0) {
        this.$message('请在列表勾选')  
        return false
      }
      this.allpi = []
      for (var i = 0;i < this.multipleSelection.length;i++) {
        this.allpi.push(this.multipleSelection[i].id)
      }
      this.isDialogShow3 = true
    },
    onDel1 () {
      // 批量删除接口
      var data = {'ids': this.allpi}
      institudeDelete(data).then(res => {
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
      // 查询按钮
      console.log('datatime', this.dataTime)
      if (this.dataTime !== '') {
        var data = {'title': this.qu_jigou, 'mobile': this.qu_iphone, 'linkName': this.qu_name, 'status': this.region_zhuang_qu, 'countryId': this.region_guo_qu, 'type': this.region_lei_qu, 'academyNature': this.region_jigouxing_qu, 'regFrom': this.dataTime[0] + ' 00:00:00', 'regTo': this.dataTime[1] + ' 00:00:00'}
      } else {
        var data = {'title': this.qu_jigou, 'mobile': this.qu_iphone, 'linkName': this.qu_name, 'status': this.region_zhuang_qu, 'countryId': this.region_guo_qu, 'type': this.region_lei_qu, 'academyNature': this.region_jigouxing_qu}
      }
      institudeList(data).then(res => {
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
    onEditClick1 (id) {
      // 编辑机构院校
      this.type = ''
      var data = {'id': id}
      institudeDetail(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.addid = id
          this.region_jigou = res.result.type
          this.addname = res.result.title
          this.addlian = res.result.linkName
          this.addiphone = res.result.mobile
          this.addtel = res.result.tel
          this.addemail = res.result.email
          this.addpai = res.result.worldRanking
          this.region_guo = res.result.countryName
          this.region_yuanxiao = res.result.academyClasses
          this.adddi = res.result.city
          this.addleixing = res.result.academyNature
          this.addnetwork = res.result.schoolWebsite
          this.addjieshao = res.result.description
          this.addzhuce = res.result.createdAt
          this.addchuangli = '2018-01-09 00:00:00'
          this.addfaren = res.result.legalPerson
          this.addzhuangtai = res.result.verifyStatus
          this.addchuangjian = 0
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      this.isDialogShow2 = true
    },
    onEdit () {
      // 编辑接口
      var data = {'id': this.addid, 'type': this.region_jigou, 'city': this.adddi, 'title': this.addname, 'linkName': this.addlian, 'mobile': this.addiphone, 'tel': this.addtel, 'email': this.addemail, 'worldRanking': this.addpai, 'academyNature': this.choosenItem.label, 'countryId': this.region_guo, 'schoolWebsite': this.addnetwork, 'description': this.addjieshao, 'schoolTime': this.addchuangli, 'legalPerson': this.addfaren}
      institudeUpdate(data).then(res => {
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
    onEditClick (type) {
      // 新建机构院校
      this.type = type
      this.addid = '自动生成'
      this.region_jigou = ''
      this.addname = ''
      this.addlian = ''
      this.addiphone = ''
      this.addtel = ''
      this.addemail = ''
      this.addpai = ''
      this.region_guo = ''
      this.region_yuanxiao = ''
      this.adddi = ''
      this.addleixing = ''
      this.addnetwork = ''
      this.addjieshao = ''
      this.addzhuce = '自动生成'
      this.addchuangli = '2018-01-09 00:00:00'
      this.addfaren = ''
      this.addzhuangtai = '未审核'
      this.addchuangjian = ''
      this.isDialogShow2 = true
    },
    onadd () {
      // 新建接口
      var data = {'type': this.region_jigou, 'city': this.adddi, 'title': this.addname, 'linkName': this.addlian, 'mobile': this.addiphone, 'tel': this.addtel, 'email': this.addemail, 'worldRanking': this.addpai, 'academyNature': this.choosenItem.label, 'countryId': this.region_guo, 'schoolWebsite': this.addnetwork, 'description': this.addjieshao, 'schoolTime': this.addchuangli, 'legalPerson': this.addfaren, 'schoolImage': this.imageUrl}
      console.log('data',data)
      institudeCreate(data).then(res => {
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
    onDisableClik (index, id, type) {
      if (type === 1) {
        // 禁用
        this.type = type
        this.addid = id
        this.addname = this.tableData[index].title
        this.addid = this.tableData[index].id
      } else if (type === 2) {
        // 解禁
        this.type = type
        this.addid = id
        this.addname = this.tableData[index].title
        this.addid = this.tableData[index].id
      }
      this.isDialogShow1 = true
    },
    onDisable () {
      if (this.type === 1) {
        // 禁用
        var data = {'id': this.addid, 'status': 2, 'statusMemo': this.jinyong}
      } else if (this.type === 2) {
        // 解禁
        var data = {'id': this.addid, 'status': 1, 'statusMemo': this.jinyong}
      }
      institudeSet(data).then(res => {
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
      this.addid = id
      this.isDialogShow = true
    },
    onDel () {
      // 删除接口
      var data = {'ids': this.addid}
      institudeDelete(data).then(res => {
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
      institudeList().then(res => {
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
      // 国家列表
      codeCountry().then(res => {
        console.log('data', res)
        if (res.success) {
          this.option_guo = res.result
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    //   // 频道
    //   codeChannel().then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.option_pin = res.result
    //       this.option_addpin = res.result
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
.shangchuan{
    width: 200px;
    height: 150px;
    border: 1px solid #eee;
    text-align: center;
    cursor: pointer;
}
.shangchuan i{
    font-style: normal;
    font-size: 40px;
    font-weight: bold;
    line-height: 150px;
}
.avatar-up-institutions {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-up-institutions:hover {
  border-color: #409EFF;
}
.avatar-up-institutions-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
