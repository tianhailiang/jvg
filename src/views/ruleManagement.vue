<template>
  <section class="member-content" style="margin-left:260px;">
    <h3 class="content-title">VIP会员规则</h3>
    <el-form label-width="80px" style="display:inline-block;">
      <el-form-item label="频道">
        <el-select v-model="type" size="small">
            <el-option 
            :label="item.label" 
            :value="item.value"
            v-for="(item, index) in teacher"></el-option>
        </el-select>
        <el-button size="small" type="primary" @click="searchVipList()" style="margin-left:10px;">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="create-gz"><el-button size="small" type="primary" @click="addToviprule()">新建规则</el-button></div>
    <el-table :data="vipdata" size="medium" :header-cell-style="rowClass">
        <el-table-column label="会员时长" align="center">
            <template slot-scope="scope">
                  <el-input type="text" size="small" v-model="vipdata[scope.$index].timeLength"></el-input>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="会员价格" align="center">
            <template slot-scope="scope">
                <el-form label-width="80px" class="customize">
                  <el-form-item>
                        <el-col :span="11">
                          <el-input type="text" size="small" v-model="vipdata[scope.$index].price"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-input type="text" size="small" v-model="vipdata[scope.$index].price"></el-input>
                        </el-col>
                  </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column  label="频道" align="center">
          <template slot-scope="scope">
              <el-form label-width="80px" class="customize">
                <el-form-item>
                  <el-input type="text" size="small" prop="typeName" v-model="vipdata[scope.$index].typeName"></el-input>
                </el-form-item>
              </el-form>
          </template>
      </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="removeviprule(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="button-group">
        <el-button size="small" type="primary">保存</el-button>
        <el-button size="small" type="primary" @click="clearAllviprule()">清除</el-button>
    </div>
  </section>
</template>
<script>
  import {searchviplist, removeviprule,clearAllviprule,addToviprule} from '@/api/url.js'
export default {
  name: 'ruleManagement',
  data () {
    return {
      vipdata: [],
      type: '',
      typeName: '',
      teacher:[
        {value: '1', label: '全部'}, 
        {value: '2', label: '留学'},
        {value: '3', label: '语培'} 
      ]
    }
  },
  created() {
    // this.searchVipList()
  },
  methods: {
    rowClass ({row, rowIndex}) {
      return 'background:#f5f7fa'
    },
    searchVipList() {
      searchviplist({
        type:this.type
      }).then(res => {
        this.vipdata = res.result
      }).catch(error => {
        console.log('返回错误信息')
      })
    },
    removeviprule(index, row) {
      removeviprule({
        id: row.id
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.message
        })
      })
    },
    clearAllviprule() {
      clearAllviprule().then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.message
        })
      })
    },
    addToviprule() {
      addToviprule({
        name: "语培会员3个月",
        price: 100,
        dollarsPrice: 600,
        timeLength:90,
        type:1
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.message
        })
      })
    }
  }
}
</script>
<style scoped>
@import '../assets/style/common_title.css';
.create-gz{
  display: inline-block;
}
</style>