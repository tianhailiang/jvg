<template>
  <section class="member-content" style="margin-left:260px;">
    <h3 class="content-title">会员积分规则</h3>
    <div class="create-gz"><el-button size="small" type="primary" @click="addrule()">新建规则</el-button></div>
    <el-table :data="vipData" size="medium" :header-cell-style="rowClass">
        <el-table-column label="积分名称" align="center">
            <template slot-scope="scope">
              <el-input type="text" size="small" v-model="vipData[scope.$index].name"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="integral" label="积分值" align="center">
            <template slot-scope="scope">
                <el-form label-width="80px" class="customize">
                  <el-form-item label="">
                      <el-col :span="15">
                        <el-input type="text" size="small" v-model="vipData[scope.$index].name"></el-input>
                        <span class="minute">分/次</span>
                      </el-col>
                  </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="memo" label="积分说明" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="removerule(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="button-group">
        <el-button size="small" type="primary">保存</el-button>
        <el-button size="small" type="primary" @click="clearAllvip()">清除</el-button>
    </div>
  </section>
</template>
<script>
import {clearAllvip, viprulelist, addrule, removerule} from '@/api/url.js'
export default {
    name: 'integralRule',
    data () {
      return {
        vipData: [],
        state1: '',
        restaurants: [],
        name: ''
      }
    },
    created() {
      this.viprulelist()
    },
    methods: {
      rowClass ({row, rowIndex}) {
        return 'background:#f5f7fa'
      },
      viprulelist() {
        viprulelist({
          pageNo:1,
          pageSize:20
        }).then(res => {
          // console.log(res)
          this.vipData = res.result.modelData
        }).catch(error => {

        })
      },
      removerule(index, row) {
        removerule({
          id: row.id
        }).then(res => {
          this.viprulelist()
          this.$message({
            type: 'success',
            message: res.data.message
          })
        }).catch(error => {

        })
      },
      addrule() {
        addrule({
          name: "签到积分2222",
          integral: 1,
          number:1,
          memo: "每天最多1次"
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: res.data.message
          })
        }).catch(error => {

        })
      },
      clearAllvip() {
        clearAllvip().then(res => {
          this.$message({
            type: 'success',
            message: res.data.message
          })
        })
      }
    }
  }
</script>
<style scoped>
@import '../assets/style/common_title.css';
.minute{
  position: absolute;
  margin-left: 10px;
}
</style>