<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">机构院校审核管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="机构/院校名称：">
                  <el-input placeholder="请输入机构/院校名称"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号：">
                  <el-input placeholder="请输入联系人手机号"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名：">
                  <el-input placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="状态：" label-width="80px">
                  <el-select v-model="region" placeholder="正常" style="width: 80px;">
                      <el-option label="正常" :value="0" :key="0"></el-option>
                      <el-option label="禁用" :value="1" :key="1"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="所属国家：" label-width="100px">
                  <el-select v-model="region" placeholder="中国" style="width: 100px;">
                      <el-option label="中国" :value="0" :key="0"></el-option>
                      <el-option label="澳大利亚" :value="1" :key="1"></el-option>
                      <el-option label="美国" :value="2" :key="2"></el-option>
                      <el-option label="英国" :value="3" :key="3"></el-option>
                      <el-option label="马拉西亚" :value="4" :key="4"></el-option>
                      <el-option label="新加坡" :value="5" :key="5"></el-option>
                      <el-option label="俄罗斯" :value="6" :key="6"></el-option>
                    </el-select>
              </el-form-item>
                <el-form-item label="类型：" label-width="80px">
                <el-select v-model="region" placeholder="机构" style="width: 100px;">
                    <el-option label="机构" :value="0" :key="0"></el-option>
                    <el-option label="院校" :value="1" :key="1"></el-option>
                </el-select>
                </el-form-item>
              <el-form-item label="审核状态：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="未通过" :value="1" :key="1"></el-option>
                      <el-option label="已审核" :value="2" :key="2"></el-option>
                      <el-option label="待审核" :value="3" :key="3"></el-option>
                    </el-select>
              </el-form-item>
              <el-button size="small" type="primary">搜索</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="selection" label="全部" width="55"></el-table-column>
                <el-table-column prop="id" label="机构院校id" align="center"></el-table-column>
                <el-table-column prop="title" label="机构院校名称" align="center"></el-table-column>
                <el-table-column prop="countryName" label="所属国家" align="center"></el-table-column>
                <el-table-column prop="mobile" label="联系人手机号" align="center"></el-table-column>
                <el-table-column prop="linkName" label="联系人姓名" align="center"></el-table-column>
                <el-table-column prop="typeName" label="类别" align="center"></el-table-column>
                <el-table-column prop="verifyStatusName" label="审核状态" align="center"></el-table-column>
                <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" show-overflow-tooltip align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="onExamineClick(scope.row.id)" type="danger" size="small">审核</el-button>
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
            <!-- <el-button size="small" type="primary" @click="">批量删除</el-button> -->
            <!-- <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button> -->
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
        <!-- 机构院校审核详情页 -->
        <el-dialog v-model="isDialogShow" size="small" :visible.sync="isDialogShow">
            <p style="font-size: 30px;">机构院校审核详情页</p>
            <el-form :inline="true" class="demo-form-inline" id="dialog" label-width="95px" size="mini">
        <el-col :span="10">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※类型：</p>
            <el-form-item>
                <el-input placeholder="请输入机构院校类型" disabled v-model="leixing"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="机构院校id：" >
                <el-input placeholder="请输入机构院校id" disabled v-model="yuanxiaoid"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="15">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※名称：</p>
            <el-form-item>
                <el-input placeholder="请输入用户姓名" disabled v-model="name"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="15">
            <p style="width: 83px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※联系人：</p>
            <el-form-item>
                <el-input placeholder="请输入联系人姓名" disabled v-model="lianxiren"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="15">
            <p style="width: 110px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※联系人手机号：</p>
            <el-form-item>
                    <el-input placeholder="请输入用户手机号" disabled v-model="shouji"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="联系电话：" >
                <el-input placeholder="请输入用户电话" disabled v-model="dianhua"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="邮箱：" >
                <el-input placeholder="请输入邮箱" disabled v-model="youxiang"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="全球排名：" >
                <el-input placeholder="请输入院校在全球排名" disabled v-model="paiming"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="15">
            <p style="width: 93px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※所属国家：</p>
            <el-form-item>
                <el-input placeholder="请输入所在国家" disabled v-model="guojia"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="15">
            <p style="width: 110px;font-size: 14px;color: #606266;float: left;color: #C13232;line-height: 30px;text-align: right;padding-right: 12px;">※机构院校性质：</p>
            <el-form-item>
                <el-input placeholder="请输入机构院校性质" disabled v-model="yuanxiaoxingzhi"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="联系地址：" >
                <el-input placeholder="请输入用户城市、省份、区域" style="width: 400px;" disabled v-model="dizhi"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="机构院校类型：" label-width="120px">
                <el-input placeholder="请输入机构院校类型" style="width: 400px;" disabled v-model="yuanxiaoleixing"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="官网：" >
                <el-input placeholder="如果机构院校有官网的，可输入URL" style="width: 400px;" disabled v-model="guanwang"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="机构院校介绍：" label-width="120px">
                <el-input type="textarea" :rows="5" placeholder="请输入机构院校介绍" style="width: 400px;" disabled v-model="yuanxiaojieshao"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20" style="margin-bottom: 20px;">
            <div style="width: 120px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">机构院校logo：</div>
            <i class="el-icon-picture"></i>
        </el-col>
        <el-col :span="10">
            <el-form-item label="创立时间：" >
                <el-input placeholder="请输入机构院校创立年月日" disabled v-model="chuanglishijian"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="注册时间：" >
                <el-input placeholder="请输入注册时间" disabled v-model="zhuceshijian"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="法人：" >
                <el-input placeholder="请输入机构院校法人" disabled v-model="faren"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="审核状态：" >
                <el-input placeholder="请输入审核状态" disabled v-model="shenhezhuangtai"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="创建人员：" >
                <el-input placeholder="请输入创建人员" disabled v-model="chuangjianrenyuan"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20" style="margin-left: 10px;margin-top: 20px;">
                <el-form-item label="不通过原因：" label-width="100px">
                    <el-input type="textarea" v-model="yuanyin" placeholder="请录入不通过原因" :rows="5" style="width: 600px;"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
        <p style="color: #fff;">———————————————————————————————</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onExamine(1)" type="primary">通过</el-button>
                <el-button @click="onExamine(2)" type="primary">不通过</el-button>
                <el-button @click="isDialogShow = false" type="primary">取消</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { institudeVerifyList,institudeVerifyDetail,institudeVerifyVerify } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      tableData: [],
      total: '',
      leixing: '',
      yuanxiaoid: '',
      name: '',
      lianxiren: '',
      shouji: '',
      dianhua: '',
      youxiang: '',
      paiming: '',
      guojia: '',
      yuanxiaoxingzhi: '',
      dizhi: '',
      yuanxiaoleixing: '',
      guanwang: '',
      yuanxiaojieshao: '',
      chuanglishijian: '',
      zhuceshijian: '',
      faren: '',
      shenhezhuangtai: '',
      chuangjianrenyuan: '',
      yuanyin: ''
    }
  },
  methods: {
    onExamineClick (id) {
      // 审核弹窗
      var data = {'id': id}
      institudeVerifyDetail(data).then(res => {
        console.log('data', res)
        if (res.success) {
          this.leixing = res.result.typeName
          this.yuanxiaoid = res.result.id
          this.name = res.result.title
          this.lianxiren = res.result.linkName
          this.shouji = res.result.mobile
          this.dianhua = res.result.tel
          this.youxiang = res.result.email
          this.paiming = res.result.worldRanking
          this.guojia = res.result.countryName
          this.yuanxiaoxingzhi = res.result.academyNature
          this.dizhi = res.result.address
          this.yuanxiaoleixing = res.result.academyClasses
          this.guanwang = res.result.schoolWebsite
          this.yuanxiaojieshao = res.result.description
          this.chuanglishijian = res.result.schooTime
          this.zhuceshijian = res.result.createdAt
          this.faren = res.result.legalPerson
          this.shenhezhuangtai = res.result.verifyStatusName
          this.chuangjianrenyuan = res.result.adminIdName
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
      this.isDialogShow = true
    },
    onExamine (type) {
      // 审核机构院校
      if (type === 1) {
        // 通过
        var data = {'id': this.yuanxiaoid, 'verifyStatus': 2}
      } else if (type === 2) {
        // 不通过
        var data = {'id': this.yuanxiaoid, 'verifyStatus': 2, 'verifyStatusMemo': this.yuanyin}
      }
      institudeVerifyVerify(data).then(res => {
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
      institudeVerifyList().then(res => {
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
    //   // 国家列表
    //   codeCountry().then(res => {
    //     console.log('data', res)
    //     if (res.success) {
    //       this.option_guo = res.result
    //     } else {
    //       this.$message(res.message)
    //     }
    //   }).catch(error => {
    //     console.log(`请求错误`)
    //   })
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
.personnel #dialog i{
    display: inline-block;
    width: 400px;
    height: 300px;
    float: left;
    background: url(../assets/main-icon.png);
    background-size: 100% 100%;
    border: 1px solid #eee;
}
</style>
