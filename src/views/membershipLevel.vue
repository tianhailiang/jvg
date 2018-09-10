<template>
  <section class="member-content">
    <h3 class="content-title">会员等级规则</h3>
    <div class="create-gz"><el-button size="small" type="primary" @click="addmemberData">新建规则</el-button></div>
    <el-table :data="vipdata" size="medium" :header-cell-style="rowClass" style="cursor:default;">
        <el-table-column label="会员等级" align="center" prop="price">
            <template slot-scope="scope">
                <el-form label-width="80px" class="customize">
                  <el-form-item>
                    <el-input type="text" v-model="val" size="small"></el-input>
                  </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="积分值区间" align="center">
            <template slot-scope="scope">
              <el-form label-width="80px" class="customize">
                <el-form-item>
                  <el-col :span="11">
                    <el-input type="text" size="small" placeholder="1000"></el-input>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-input type="text" size="small" placeholder="9000"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
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
  name: 'membershipLevel',
  data () {
    return {
      vipdata: [
        {time: '1个月', price: '300', operat: ''},
        {time: '3个月', price: '400', operat: ''},
        {time: '1个月', price: '120', operat: ''}
      ],
      val: ''
    }
  },
  methods: {
    rowClass ({row, rowIndex}) {
      return 'background:#f5f7fa'
    },
    handleDelete(index, row) {
      this.vipdata.splice(index, 1)
    },
    addmemberData() {
      this.vipdata.push(11)
    },
    clearAll() {
      this.vipdata = []
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
</style>