<template>
  <section class="advert-container" style="overflow:hidden;margin-left:260px;">
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
      <el-col :span="8"><div class="grid-content bg-purple">
          <el-form-item label="位置类型">
              <el-select placeholder="全部" v-model="values4">
                  <el-option 
                  v-for="items in areatype"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="广告类型">
              <el-select placeholder="全部" v-model="values3">
                  <el-option 
                  v-for="items in adverttypes"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="广告状态">
              <el-select v-model="advertval">
                  <el-option
                  :label="items.label"
                  :value="items.value"
                  :key="index" v-for="(items, index) in advertoption"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="所有权">
              <el-select placeholder="全部" v-model="values2">
                  <el-option 
                  v-for="items in options4"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
    </el-form>
    </el-row>
    <!--  -->
    <el-row :gutter="20"  class="row-bg">
        <el-form class="demo-form-inline" label-width="80px" size="small">
        <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="渠道">
                <el-select placeholder="全部" v-model="values1">
                    <el-option
                    v-for="items in options3"
                    :key="items.value"
                    :label="items.label"
                    :value="items.value"></el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
            <el-form-item label="业务频道">
                <el-select placeholder="全部" v-model="values">
                    <el-option
                    v-for="(items, index) in options2"
                    :key="index"
                    :label="items.label"
                    :value="items.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="广告位模板">
                <el-select placeholder="全部" v-model="value5">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
      </el-form>
      </el-row>
      <div class="btn-planes">
        <el-row>
            <el-button type="primary" size="medium" @click="searchAdvert()">搜索</el-button>
            <el-button type="primary" size="medium" @click="openaddAdvert()">创建广告位</el-button>
            <el-button type="primary" size="medium" @click="isShow = true">一键替换</el-button>
          </el-row>
      </div>
    <el-table :data="advertTableData" style="width: 100%" border v-loading="loading" element-loading-text="努力奔跑中...">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="广告位ID" width="65" align="center" prop="id">
          <template slot-scope="scope">
            <el-button size="mini" @click="openaddAdvertdetail(scope.$index, scope.row)">{{scope.row.id}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="广告位名称" width="120" align="center"></el-table-column>
        <el-table-column prop="advertisingTemplate" label="广告位模板" width="120" align="center"></el-table-column>
        <el-table-column prop="type" label="广告位类型" width="100" align="center"></el-table-column>
        <el-table-column prop="upDown" label="广告位状态" width="120" align="center"></el-table-column>
        <el-table-column prop="ownership" label="所有权" width="80" align="center"></el-table-column>
        <el-table-column prop="addressType" label="位置类型" width="80" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="120" align="center"></el-table-column>
        <el-table-column prop="source" label="渠道" width="80" align="center"></el-table-column>
        <el-table-column prop="channelName" label="业务频道" width="100" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="batchAdvertfreeze(scope.$index, scope.row)">解冻</el-button>
                <el-button size="mini" type="danger" @click="advertFreeze(scope.$index, scope.row)">冻结</el-button>
                <el-button size="mini" type="danger" @click="removeAdvert(scope.$index, scope.row)" style="margin:10px 0">删除</el-button>
              </template>
        </el-table-column>
    </el-table>
      <!-- 分页 -->
      <el-row :gutter="20" style="margin:30px 0;" v-if="advertTableData.length">
          <el-col :span="11">
              <el-pagination
              background 
              layout="total, sizes, prev, pager, next, jumper"
              :page-size="20"
              :total="total"
              :current-page="pageNo"
              :page-sizes="[20, 30, 40, 50]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"></el-pagination>
          </el-col>
          <el-col :span="5">
              <el-button size="small" type="primary">确定</el-button>
          </el-col>
          <el-col :span="5">
              <el-button size="small" type="primary">批量删除</el-button>
              <el-button size="small" type="primary">批量冻结</el-button>
          </el-col>
      </el-row>
      <!-- 删除模态框 -->
      <!-- <el-dialog title="删除提示窗口" :visible.sync="dialogVisible" width="30%">
            <span>请确认是否继续删除</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog> -->
    <el-dialog title="一键替换" :visible.sync="isShow">
            <el-row :gutter="20">
                <el-form label-width="80px">
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="开始时间">
                        <el-input type="text" size="small" v-model="forceStartTime"></el-input>
                    </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="结束时间">
                        <el-input type="text" size="small" v-model="forceEndTime"></el-input>
                    </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="">
                        <el-checkbox-group v-model="form.autoReplace">
                            <el-checkbox label="自动定时替换" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form-item label="所有权">
                        <el-select size="small" v-model="ownership">
                            <el-option 
                            :label="item.label"
                            :value="item.value"
                            :key="index" v-for="(item, index) in totaleval"></el-option>
                        </el-select>
                    </el-form-item>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="业务频道" >
                                <el-select size="small" v-model="channel">
                                    <el-option 
                                    :label="items.label"
                                    :value="items.value"
                                    :key="index" v-for="(items, index) in options2"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                </div></el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purole">
                        <el-form-item label="广告模板">
                            <el-select size="small" v-model="source">
                                <el-option 
                                :label="items.label"
                                :value="items.value"
                                :key="index"
                                v-for="(items, index) in options6"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="渠道">
                            <el-select size="small" v-model="defalutVal">
                                <el-option 
                                    :label="items.label"
                                    :value="items.value"
                                    :key="index"
                                    v-for="(items, index) in options5"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                </el-form>
            </el-row>
            <div class="dialog-content">
                <div class="dialog-main_1">
                    <h3>替换内容</h3>
                    <el-form label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-form-item label="">
                                <el-input type="text" placeholder="URL" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="15">
                            <el-form-item label="">
                                    <el-input type="text" size="small" v-model="forceUrl"></el-input>
                                    <el-upload class="upload-demo upload-btn uploade-cust" action="">
                                        <el-button size="small" type="primary">上传</el-button>
                                    </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="isShow = false">取 消</el-button>
              <el-button type="primary" @click="replaceAdvert()">确认替换</el-button>
            </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'advertList',
  data () {
    return {
      options: [
        {value: '1', label: '使用中'},
        {value: '2', label: '冻结'},
        {value: '3', label: '未使用'},
        {value: '4', label: '全部'}
      ],
      options: [
        {value: '1', label: '问答详情'},
        {value: '2', label: '留学首页'},
        {value: '3', label: '全部'}
      ],
      advertoption: [
        {value: '1', label: '使用中'},
        {value: '2', label: '冻结'},
        {value: '3', label: '未使用'},
        {value: '4', label: '全部'}
      ],
      options2: [
        {value: '1', label: '全部'},
        {value: '2', label: '移民'},
        {value: '3', label: '语培'},
        {value: '4', label: '院校直通'},
        {value: '5', label: '留学'}
      ],
      options3: [
        {value: '1', label: '全部'},
        {value: '2', label: 'PC'},
        {value: '3', label: 'APP'},
        {value: '4', label: 'WAP'}
      ],
      options4: [
        {value: '1', label: '全部'},
        {value: '2', label: '用户'},
        {value: '3', label: '平台'}
      ],
      options5: [
        {label: "全部", value: '4'},
        {label: "PC", value: '1'},
        {label: "WAP", value: '2'},
        {label: "APP", value: '3'}
      ],
      totaleval: [
        {label: '全部', value:'1'},
        {label: '用户', value:'2'},
        {label: '平台', value:'3'}
      ],
      adverttypes: [
        {label: '轮播', value:'1'},
        {label: '单页', value:'2'},
        {label: '全部', value:'3'}
      ],
      areatype: [
        {label: '列表', value:'1'},
        {label: '固定', value:'2'},
        {label: '全部', value:'3'},
        {label: '类目', value:'4'}
      ],
      source: '',
      advertTableData: [],
      total: null,
      loading: false,
      currentId: '',
      forceUrl: '',
      value: '',
      dialogVisible: false,
      isShow: false,
      defalutVal: '',
      advertval: '',
      forceEndTime: '',
      forceStartTime: '',
      channel: '',
      ownership: '',
      values: '',
      values1: '',
      values2: '',
      values3: '',
      values4: '',
      value5: '',
      options6: [
        {label: '全部', value: '1'},
        {label: '留学首页', value: '2'},
        {label: '问答详情页', value: '3'}
      ],
      pageNo: 0,
      pageSize: 20,
      form: {
        autoReplace: 1
      }
    }
  },
  async created() {
    // await this.searchAdvert()
  },
  methods: {
    searchAdvert() {
      this.loading = true
      axios.post(this.$store.state.api.searchAdvert,{
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then(res => {
        this.total = res.data.result.total
        this.advertTableData = res.data.result.modelData
        this.loading = false
      }).catch(error => {

      })
    },
    batchAdvertfreeze(index, row) {
      axios.post(this.$store.state.api.advertisingfreeze, {
        id: row.id
      }).then(res => {
        console.log(res)
      }).catch(error => {

      })
    },
    removeAdvert(index, rows) {
      axios.post(this.$store.state.api.removeAdvert, {id: [rows.id]}).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(error => {

      })
    },
    advertFreeze(index, rows) {
      axios.post(this.$store.state.api.advertFreeze,{id: [rows.id]}).then(res => {
        console.log(res)
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '已取消冻结'
        });
      })
    },
    replaceAdvert() {
      this.isShow = true
      axios.post(this.$store.state.api.replaceAdvert, {
        forceStartTime: this.forceStartTime,
        forceEndTime: this.forceEndTime,
        forceUrl: this.forceUrl,
        ownership: 1,
        channel: 1,
        source: 1,
        autoReplace: 1
      }).then(res => {
        this.$message({
          type: 'success',
          message: '替换成功!'
        });
        console.log(res)
        this.isShow = false
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '替换失败'
        });
      })
    },
    openaddAdvert() { //添加广告位
      // this.$router.push({name: 'advertSpaceDetail', params:{id: rows.id}})
    },
    openaddAdvertdetail(index, rows) {
      this.$router.push({name: 'advertSpaceDetail', params:{id: rows.id}})
      // this.$router.push({ name: 'advertSpaceDetail', params: {id: this.id} })
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(val)
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.searchAdvert()
    },

  }
}
</script>
<style scoped>
.advert-container .btn-planes{
  margin-bottom: 20px;
  margin-left:20px;
}
.dialog-content .uploade-cust{
    position: absolute;
    right: 0;
    top: 0;
}
.dialog-main_2 h3{
    margin-bottom: 15px;
}
</style>
