<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">关注管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
            <el-form-item label="被关注id：">
                <el-input placeholder="请输入被关注id" v-model="qu_id"></el-input>
            </el-form-item>
            <el-form-item label="被关注名称：">
                <el-input placeholder="请输入被关注名称" v-model="qu_name"></el-input>
            </el-form-item>
            <el-form-item label="类别：" label-width="55px">
                <el-select v-model="region_lei_qu" placeholder="全部" style="width: 80px;">
                    <el-option v-for="(item) in option_lei" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
            </el-form-item>
            <el-button size="small" type="primary" @click="queryClik">搜索</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="index" label="NO" align="center"></el-table-column>
                <el-table-column prop="pUserId" label="被关注id" align="center"></el-table-column>
                <el-table-column prop="pUserName" label="被关注名称" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" align="center"></el-table-column>
                <el-table-column prop="userId" label="关注id" align="center"></el-table-column>
                <el-table-column prop="userName" label="关注名称" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="注册时间" align="center"></el-table-column>
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
            <!-- <el-button size="small" type="primary" @click="">批量删除</el-button> -->
            <!-- <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button> -->
        </el-col>
        </el-row>
        </el-col>
        <!-- 分页end -->
    </section>
</template>
<script>
import { fansList } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      tableData: [],
      total: '',
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
      }, {
        value: '3',
        label: '人员'
      }],
      qu_id: '',
      qu_name: '',
      pageNo: ''
    }
  },
  methods: {
    handleCurrentChange(val) {
      // 分页监听
      this.pageNo = val
      this.onfen()
    },
    onfen () {
      // 分页按钮
      var data = {'passiveUserId': parseInt(this.qu_id), 'passiveUserName': this.qu_name, 'type': this.region_lei_qu, 'pageNo': this.pageNo, 'pageSize': 20}
      fansList(data).then(res => {
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
      console.log('daa', parseInt(this.qu_id))
      if (isNaN(parseInt(this.qu_id)) && this.qu_id !== '') {
        this.$message('被关注id只能输入数字')
        return false
      }
      var data = {'passiveUserId': parseInt(this.qu_id), 'passiveUserName': this.qu_name, 'type': this.region_lei_qu}
      fansList(data).then(res => {
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
    postData () {
      fansList().then(res => {
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
</style>
