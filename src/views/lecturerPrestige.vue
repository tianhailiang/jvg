<template>
  <section class="member-content">
    <h3 class="content-title">讲师声望值规则</h3>
    <div class="create-gz"><el-button size="small" type="primary" @click="add()">新建规则</el-button></div>
    <el-table :data="teacherData" style="width: 100%" border v-loading="loading">
      <el-table-column prop="currentid" width="200" label="NO" align="center">
        <template slot-scope="scope">
          <el-button size="mini">{{scope.row.id}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="行为" width="230" align="center"></el-table-column>
      <el-table-column prop="name" label="行为次数/人数" width="130" align="center"></el-table-column>
      <el-table-column prop="ratio" label="占百分比" width="180" align="center"></el-table-column>
      <el-table-column prop="typeName" label="分值变化" width="145" align="center"></el-table-column>
      <el-table-column label="操作" width="205" align="center">
          <template slot-scope="scope">
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
  </el-table>
  <div class="button-group">
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" type="primary" @click="clearAll">清除</el-button>
  </div>
  </section>
</template>
<script>
import {addTeacher, clearAll, removeTeacher,searchTeacher} from '@/api/url.js'
export default {
  name: 'lecturerPrestige',
  data () {
    return {
      teacherData: [],
      loading: true
    }
  },
  created() {
    this.searchTeacher()
  },
  methods: {
    add() {
      addTeacher({
        name: "四大维度解锁Webpack前端工程化",
        behaviorNumber: 100,
        ratio: 0.98,
        type:1,
        typeName: '减少'
      }).then(res => {
        this.teacherData.push({
          name: "四大维度解锁Webpack前端工程化",
          behaviorNumber: 100,
          ratio: 0.98,
          type:1,
          typeName: '减少'
        })
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }).catch(error => {

      })
      // const _ADDDATA = {
      //   typeName: this.teacherData[0].typeName,
      //   ratio: this.teacherData[0].ratio,
      //   name: this.teacherData[0].name,
      // }
      // this.teacherData.push(_ADDDATA)
    },
    clearAll() {
      this.teacherData = []
      clearAll().then(res => {
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }).catch(error => {

      })
    },
    handleDelete(index, row) {
      this.teacherData.splice(index, 1)
      removeTeacher({
        id: row.id
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }).catch(error => {

      })
    },
    searchTeacher() {
      searchTeacher({
        pageNo: 1,
        pageSize: 20
      }).then(res => {
        console.log(res)
        this.teacherData = res.result.modelData
        this.loading = false
      }).catch(error => {

      })
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
.member-content{ margin-left:260px;}
</style>