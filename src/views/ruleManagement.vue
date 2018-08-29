<template>
  <section class="member-content">
    <h3 class="content-title">VIP会员规则</h3>
    <div class="create-gz"><el-button size="small" type="primary">新建规则</el-button></div>
    <el-table :data="vipdata" size="medium" :header-cell-style="rowClass">
        <el-table-column prop="time" label="会员时长" align="center">
            <template slot-scope="scope">
                <el-form label-width="80px" class="customize">
                  <el-form-item label="">
                    <el-input type="text" size="small"></el-input>
                  </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="会员价格" align="center">
            <template slot-scope="scope">
                <el-form label-width="80px" class="customize">
                  <el-form-item label="">
                        <el-col :span="11">
                          <el-input type="text" size="small" placeholder="人民币"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-input type="text" size="small" placeholder="美元"></el-input>
                        </el-col>
                  </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="button-group">
        <el-button size="small" type="primary">保存</el-button>
        <el-button size="small" type="primary">清除</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ruleManagement',
  data () {
    return {
      vipdata: [
        {time: '1个月', price: '300', operat: ''}
      ]
    }
  },
  methods: {
    rowClass ({row, rowIndex}) {
      return 'background:#f5f7fa'
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
</style>