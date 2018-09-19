<template>
    <section class="advert-container" style="overflow:hidden;margin-left:260px;">
      <h3>广告列表</h3>
      <el-row :gutter="20">
        <el-form class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="ID">
                    <el-input placeholder=""></el-input>
                </el-form-item>
            </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="名称">
                    <el-input placeholder=""></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="广告类型">
                    <el-select v-model="advertvalue">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        v-for="(item, index) in advert"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form-item label="状态">
                    <el-select v-model="advertactive">
                        <el-option 
                        :label="item.label"
                        :value="item.value"
                        v-for="(item, index) in options"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="所有权">
                    <el-select v-model="suoyou">
                        <el-option 
                        :label="item.label"  
                        :value="item.value"
                        v-for="(item, index) in suoyoudata"></el-option>
                    </el-select>
                </el-form-item>
            </div></el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="联系方式">
                        <el-input placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="渠道">
                        <el-select v-model="qudaoval">
                            <el-option 
                            :label="items.label"
                            :value="items.value" v-for="(items, index) in qudaovalData"></el-option>
                        </el-select>
                    </el-form-item>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">
                        <el-form-item label="业务频道">
                            <el-select placeholder="全部" v-model="values">
                                <el-option
                                v-for="items in options2"
                                :key="items.values"
                                :label="items.label"
                                :value="items.values">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="7"><div class="grid-content bg-purple advert_purple">
                            <el-form-item label="广告位模板">
                                <el-select placeholder="全部" v-model="value">
                                    <el-option
                                    v-for="item in advertsData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg_purple">
                          <el-form-item label="购买人名称">
                              <el-input placeholder=""></el-input>
                          </el-form-item>
                      </div>
                  </el-col>
            </el-form>
      </el-row>
      <!--  -->
       <el-row :gutter="20" class="row-bg">
          <el-form class="demo-form-inline" label-width="80px" size="mini">
          <div class="btn-planes">
              <el-row>
                  <el-button type="primary" size="small" @click="searchAdvertList()">搜索</el-button>
                  <el-button type="primary" size="small">添加广告</el-button>
              </el-row>
            </div>
        </el-form>
        </el-row>
        <el-table :data="advertData" border v-loading="loading" element-loading-text="努力奔跑中...">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="id" label="广告位ID" width="90" align="center">
              <template slot-scope="scope">
                <el-button size="mini">{{scope.row.id}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="广告名称" width="90" align="center"></el-table-column>
            <el-table-column prop="typeName" label="广告位类型" width="110" align="center"></el-table-column>
            <el-table-column prop="ownershipName" label="所有权" width="90" align="center"></el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="100" align="center"></el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="100" align="center"></el-table-column>
            <el-table-column prop="sourceName" label="渠道" width="90" align="center"></el-table-column>
            <el-table-column prop="channelName" label="业务频道" width="90" align="center"></el-table-column>
            <el-table-column prop="upDownName" label="状态" width="100" align="center"></el-table-column>
            <el-table-column prop="linkName" label="购买人名称" width="100" align="center"></el-table-column>
            <el-table-column prop="phone" label="购买人联系方式" width="80" align="center"></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="advertFreezeCopy(scope.$index, scope.row)">冻结</el-button>
                    <el-button size="mini" type="danger" class="btn-default" @click="removeAdvertlist(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row :gutter="20" v-if="advertData.length" style="margin:30px 0;">
            <el-col :span="11">
                <el-pagination 
                background 
                layout="prev, pager, next, jumper" 
                :total="total"
                :page-size="20"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"></el-pagination>
            </el-col>
            <el-col :span="6">
                <el-button size="small" type="primary">确定</el-button>
            </el-col>
            <el-col :span="5">
                <el-button size="small" type="primary">批量删除</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = true">批量冻结</el-button>
            </el-col>
        </el-row>
    </section>
  </template>
<script>
export default {
  name: 'advertListCopy',
  data () {
    return {
      options: [
        {value: '1', label: '使用中'},
        {value: '2', label: '冻结'},
        {value: '3', label: '未使用'},
        {value: '4', label: '全部'}
      ],
      options2: [
        {values: '1', label: '移民'},
        {values: '2', label: '语培'},
        {values: '3', label: '院校直通'},
        {values: '4', label: '留学'}
      ],
      advertvalue: '',
      advert: [
        {value: '1', label: '全部'},
        {value: '2', label: '轮播'},
        {value: '3', label: '单页'},
      ],
      suoyoudata: [
        {value: '1', label: '全部'},
        {value: '2', label: '平台'},
        {value: '3', label: '用户'}
      ],
      advertData: [],
      value: '',
      values: '',
      advertactive: '',
      suoyou: '',
      qudaoval: '',
      loading: false,
      total: null,
      advertsData: [
        {value: '1', label: '全部'},
        {value: '2', label: '留学首页'},
        {value: '3', label: '问答详情'}
      ],
      qudaovalData: [
        {value: '1', label: '全部'},
        {value: '2', label: 'APP'},
        {value: '3', label: 'PC'},
        {value: '4', label: 'WAP'}
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.searchAdvertList()
    },
    searchAdvertList() {
      this.loading = true
      axios.post(this.$store.state.api.searchAdvertList).then(res => {
        console.log()
        this.advertData = res.data.result.modelData
        this.total = res.data.result.total
        this.loading = false
      })
    },
    removeAdvertlist(index, rows) {
      axios.post(this.$store.state.api.removeAdvertlist, {id: [rows.id]}).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '删除失败'
        });   
      })
    },
    advertFreezeCopy(index, rows) {
      axios.post(this.$store.state.api.advertFreezeCopy,{id: [rows.id]}).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '冻结成功!'
        })
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '冻结失败'
        })
      })
    }
  }
}
</script>
<style scoped>
.advert-container .bg_purple .el-input--mini{position: absolute;}
.advert-container .bg_purple .el-form-item__label{width:auto !important;}
.btn-planes{margin-bottom: 20px;text-align: right;padding-right:100px;}
.btn-default{ display: block; margin: 10px 0;}
.advert-container h3{ height:30px; line-height: 30px; border-bottom:solid 1px #dcdfe6;margin-bottom:20px;}
</style>
