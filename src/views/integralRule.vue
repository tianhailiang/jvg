<template>
  <section class="member-content">
    <h3 class="content-title">会员积分规则</h3>
    <div class="create-gz"><el-button size="small" type="primary" >新建规则</el-button></div>
    <el-table :data="vipdata" size="medium" :header-cell-style="rowClass">
        <el-table-column prop="time" label="积分名称" align="center">
            <template slot-scope="scope">
              <el-autocomplete size="small" class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="积分值" align="center">
            <template slot-scope="scope">
                <el-form label-width="80px" class="customize">
                  <el-form-item label="">
                      <el-col :span="15">
                        <el-input type="text" size="small"></el-input>
                        <span class="minute">分/次</span>
                      </el-col>
                  </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="积分说明" align="center">
            <template slot-scope="scope">
              <span>每天最多1次</span>
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
    name: 'integralRule',
    data () {
      return {
        vipdata: [
          {time: '1个月', price: '300', operat: ''}
        ],
        state1: '',
        restaurants: []
      }
    },
    mounted() {
      this.restaurants = this.loadAll()
    },
    methods: {
      rowClass ({row, rowIndex}) {
        return 'background:#f5f7fa'
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      handleSelect(item) {
        console.log(item)
      },
      loadAll() {
        return [
          { "value": "三全鲜食", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡", "address": "长宁区新渔路144号" },
          { "value": "新旺角茶餐厅", "address": "长宁区新渔路144号" },
          { "value": "泷千家", "address": "天山西路438号" }
        ]
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