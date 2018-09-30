<template>
  <section class="advert-review-content" style="overflow:hidden;margin-left:260px;">
    <el-row :gutter="20">
      <el-form class="demo-form-inline" label-width="80px" size="small">
      <el-col :span="6">
        <div class="grid-content bg-purple">
            <el-form-item label="ID">
                <el-input v-model="dataGroup.id"></el-input>
            </el-form-item>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="名称">
              <el-input v-model="dataGroup.name"></el-input>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="广告类型">
              <el-select v-model="dataGroup.type">
                  <el-option
                  :label="item.label"
                  :value="item.value" v-for="(item, index) in adverttype"></el-option>
              </el-select>
            </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="审核状态">
              <el-select v-model="dataGroup.status">
                  <el-option 
                  :label="item.label"  
                  :value="item.value" v-for="(item, index) in shenhe"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="所有权">
              <el-select v-model="dataGroup.ownership">
                  <el-option 
                  :label="item.label"  
                  :value="item.value" v-for="(item, index) in total"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-form-item label="购买人名称">
          <el-input type="text" v-model="dataGroup.linkName"></el-input>
        </el-form-item>
    </div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">
      <el-form-item label="联系方式">
        <el-input type="text" v-model="dataGroup.phone"></el-input>
      </el-form-item>
  </div></el-col>
    </el-form>
    </el-row>
    <el-row :gutter="20"  class="row-bg">
      <el-form class="demo-form-inline" label-width="80px" size="small">
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="渠道">
              <el-select v-model="dataGroup.source">
                  <el-option :label="item.label"  :value="item.value" v-for="(item, index) in qudao"></el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">
          <el-form-item label="业务频道">
              <el-select placeholder="全部" v-model="dataGroup.channel">
                  <el-option
                    v-for="items in options2"
                    :key="items.value"
                    :label="items.label"
                    :value="items.value">
                  </el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <el-form-item label="广告模板">
              <el-select v-model="dataGroup.temp">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-button size="small" type="primary" @click="advertreviewList()">搜索</el-button>
    </div></el-col>
    </el-form>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tabeladvert" border v-loading="loading">
      <el-table-column type="selection" width="66"></el-table-column>
      <el-table-column prop="id" label="广告ID" width="65" align="center"></el-table-column>
      <el-table-column prop="name" label="广告名称" width="110" align="center"></el-table-column>
      <el-table-column prop="tempName" label="广告位模板" width="110" align="center"></el-table-column>
      <el-table-column prop="typeName" label="广告位类型" width="110" align="center"></el-table-column>
      <el-table-column prop="ownershipName" label="所有权" width="60" align="center"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="110" align="center"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="110" align="center"></el-table-column>
      <el-table-column prop="sourceName" label="渠道" width="80" align="center"></el-table-column>
      <el-table-column prop="channelName" label="业务频道" width="110" align="center"></el-table-column>
      <el-table-column prop="status" label="审核状态" width="100" align="center"></el-table-column>
      <el-table-column prop="phone" label="销售方" width="110" align="center"></el-table-column>
      <el-table-column prop="linkName" label="购买方" width="110" align="center"></el-table-column>
      <el-table-column prop="address" align="center" label="操作" show-overflow-tooltip width="150">
          <template slot-scope="scope">
              <el-button size="small" type="danger" @click="dialogVisible = true">不通过</el-button>
              <el-button size="small" type="danger">通过</el-button>
            </template>
      </el-table-column>
   </el-table>
   <!-- 分页 -->
    <el-row :gutter="20" v-if="tabeladvert.length" style="margin:30px 0;">
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
      <el-col :span="6">
          <el-button size="small" type="primary">确定</el-button>
      </el-col>
      <el-col :span="6">
          <el-button size="small" type="primary">批量删除</el-button>
          <el-button size="small" type="primary">批量通过</el-button>
      </el-col>
    </el-row>
    <el-dialog title="不通过编辑提示窗口" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="广告ID">
              <el-input type="text" size="small" :disabled="true" v-model="dataGroup.id"></el-input>
            </el-form-item>
            <el-form-item label="广告名称">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建用户">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="原因">
              <el-input type="textarea" size="small" v-model="dataGroup.statusMemo"></el-input>
            </el-form-item>
        </el-form>
        <span>提示：用户重新申请审核</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="openPassadvert()">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'advertReview',
  data () {
    return {
      options: [
        {value: '1', label: '留学首页'},
        {value: '2', label: '问答详情页'}
      ],
      options2: [
        {value: '1', label: '留学'},
        {value: '2', label: '语培'},
        {value: '3', label: '院校直通'},
        {value: '4', label: '移民'}
      ],
      val: '',
      temp: '',
      qudaoVal: '',
      dialogVisible: false,
      totalval: '',
      tabeladvert: [],
      total:null,
      pageSize: 20,
      pageNo: 1,
      adverttype: [
        {value: '1', label: '单页'},
        {value: '2', label: '轮播'},
        {value: '3', label: '全部'}
      ],
      val3: '',
      total:[
        {value: '1', label: '全部'},
        {value: '2', label: '平台'},
        {value: '3', label: '用户'}
      ],
      shenhe: [
        {value: '1', label: '通过'},
        {value: '2', label: '待审核'},
        {value: '3', label: '不通过'}
      ],
      qudao: [
        {value: '1', label: '全部'},
        {value: '2', label: 'WAP'},
        {value: '3', label: 'APP'},
        {value: '4', label: 'PC'}
      ],
      loading: false,
      dataGroup: {
        id: '',
        name: '',
        source: '',
        channel: '',
        status: 1,
        linkName: '',
        phone: '',
        name: '',
        type: '',	
        ownership: '',
        temp: '',
        statusMemo: ''
      }
    }
  },
  // async created() {
  //   await this.advertreviewList()
  // },
  methods: {
    advertreviewList() {
      axios.post(this.$store.state.api.advertreviewList, {
        // id: this.dataGroup.id,
        // name: this.dataGroup.name,
        // source: this.dataGroup.source,
        // channel: this.dataGroup.channel,
        // status: this.dataGroup.status,
        // linkName: this.dataGroup.linkName,
        // phone: this.dataGroup.phone,
        // type: this.dataGroup.type,	
        // ownership: this.dataGroup.ownership,
        // source: this.dataGroup.source
        pageSize:this.pageSize,
        pageNo: this.pageNo
      }).then(res => {
        console.log(res.data)
        this.tabeladvert = res.data.result.modelData
        this.total = res.data.result.total
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '查询失败'
        })
      })
    },
    openPassadvert() {
      axios.post(this.$store.state.api.passadvert, {
        id: this.dataGroup.id,
        statusMemo: this.dataGroup.statusMemo
      }).then(res => {
        this.dialogVisible = false
      }).catch(error => {

      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNo = val
      console.log(val)
      this.advertreviewList()
    }
  }
}
</script>
<style>
.advert-review-content .el-form-item .el-form-item__label{
  min-width:80px !important;
}
</style>
