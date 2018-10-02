<template>
    <section class='chart-container'>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <p class="personnel-title">标签热度列表</p>
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
        </el-form>
        <el-col :span='24' style="margin-left: 10px;margin-bottom: 20px;">
            <!-- <div style="float: right;"> -->
            <el-table :data="tableData" stripe width="100%" border>
                <el-table-column type="index" label="NO" align="center" width="55"></el-table-column>
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
                <el-table-column prop="userId" label="创建人ID" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="hiaoqiaot" label="热度" align="center"></el-table-column>
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
    </section>
</template>
<script>
import { labelHotlList } from '@/api/url.js'
export default {
  data () {
    return {
      region: '',
      total: '',
      isDialogShow: false,
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
    postData () {
      labelHotlList().then(res => {
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
