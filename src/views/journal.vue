<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">日志管理</p>
        </el-col>
        <el-form :inline="true" class="demo-form-inline" label-width="150px" size="mini">
              <el-form-item label="操作者ID：" label-width="100px">
                  <el-input placeholder="请输入操作者ID"></el-input>
              </el-form-item>
              <el-form-item label="操作者名称：" label-width="100px">
                  <el-input placeholder="请输入操作者名称"></el-input>
              </el-form-item>
              <el-form-item label="操作类型：" label-width="100px">
                  <el-select v-model="region" placeholder="全部" style="width: 80px;">
                      <el-option label="全部" :value="0" :key="0"></el-option>
                      <el-option label="删除" :value="1" :key="1"></el-option>
                      <el-option label="编辑" :value="2" :key="2"></el-option>
                      <el-option label="创建" :value="3" :key="3"></el-option>
                      <el-option label="登录" :value="4" :key="4"></el-option>
                    </el-select>
              </el-form-item>
                <el-form-item>
                    <span style="width: 83px;font-size: 14px;color: #606266;float: left;line-height: 30px;text-align: right;padding-right: 12px;">操作时间：</span>
                    <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="float: left;"></el-date-picker>
                </el-form-item>
              <el-button size="small" type="primary">搜索</el-button>
              <el-button size="small" type="primary" @click="onDelClick()">一键清除</el-button>
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
        <el-table :data="tableData" stripe width="100%" border>
            <el-table-column prop="operationDate" label="操作时间" align="center"></el-table-column>
            <el-table-column prop="operationMemo" label="操作信息" align="center"></el-table-column>
            <el-table-column prop="operation" label="操作类型" align="center"></el-table-column>
            <el-table-column prop="userId" label="操作者ID" align="center"></el-table-column>
            <el-table-column prop="userName" label="操作者名称" align="center"></el-table-column>
        </el-table>
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
            <p style="font-size: 30px;">请确认是否继续逻辑一键删除</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="onDel">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import { logsDelete,logsList } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      isDialogShow: false,
      isDialogShow1: false,
      isDialogShow2: false,
      tableData: []
    }
  },
  methods: {
    onEditClick (index) {
      this.$router.replace({ path: '/institutionsEditors' })
    },
    onDisableClik (index) {
      this.isDialogShow1 = true
    },
    onDelClick () {
      this.isDialogShow = true
    },
    onDel () {
      logsDelete().then(res => {
        console.log('data', res)
        if (res.success) {
          this.isDialogShow = false
          this.$message(res.message)
        } else {
          this.$message(res.message)
        }
      }).catch(error => {
        console.log(`请求错误`)
      })
    },
    postData () {
      logsList().then(res => {
        console.log('data', res)
        if (res.success) {
          if (res.result.modelData.length > 0) this.tableData = res.result
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
