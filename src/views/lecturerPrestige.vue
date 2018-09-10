<template>
  <section class="member-content">
    <h3 class="content-title">讲师声望值规则</h3>
    <div class="create-gz"><el-button size="small" type="primary" @click="add()">新建规则</el-button></div>
    <el-table :data="data" style="width: 100%" border v-loading="loading">
      <el-table-column prop="currentid" width="215" label="NO" align="center"></el-table-column>
      <el-table-column prop="behaiver" label="行为" width="215" align="center"></el-table-column>
      <el-table-column prop="number" label="占百分比" width="215" align="center"></el-table-column>
      <el-table-column prop="variety" label="分值变化" width="215" align="center"></el-table-column>
      <el-table-column label="操作" width="215" align="center">
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
export default {
  name: 'lecturerPrestige',
  data () {
    return {
      data: [
        {currentid: '001', behaiver: '发布课程&出版物 ', number: '40%', variety: '增加'},
        {currentid: '002', behaiver: '发布课程&出版物 ', number: '50%', variety: '增加'},
        {currentid: '003', behaiver: '发布课程&出版物 ', number: '10%', variety: '增加'}
      ],
      loading: true,
      currentNum: 4,
      timer: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.clearTime()
    })
  },
  methods: {
    add() {
      let pageNum = this.currentNum ++
      this.data.push({currentid: `00${pageNum}`, behaiver: '发布课程&出版物 ', number: '20%', variety: '增加'})
    },
    clearAll() {
      this.data = []
      this.currentNum = 1
    },
    clearTime() {
      this.timer = setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    handleDelete(index, row) {
      this.data.splice(index, 1)
      this.num = 1
    }
    }
  }
</script>
<style scoped>
@import '../assets/style/common_title.css';
</style>