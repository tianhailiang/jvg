<template>
    <section class="help-content">
      <h3>帮助问题列表</h3>
      <el-row :gutter="20">
        <el-form label-width="100px" class="demo-ruleForm" size="small">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="栏目名称">
                  <el-select v-model="questData.channel">
                    <el-option :value="value">全部</el-option>
                    <el-option :value="value">栏目一</el-option>
                  </el-select>
                </el-form-item></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="问题内容">
                    <el-input type="text" v-model="questData.title"></el-input>
                </el-form-item></div></el-col></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="所属频道">
                    <el-select v-model="questData.channel">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        v-for="(item, index) in suoshudata"></el-option>
                    </el-select>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="渠道">
                        <el-select v-model="questData.source">
                            <el-option 
                            :label="items.label"
                            :value="items.value"
                            v-for="(items, index) in qudaodate"></el-option>
                          </el-select>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="创建人">
                    <el-input type="text" v-model="questData.adminName"></el-input>
                </el-form-item></div></el-col>
            <el-col :span="18">
                <el-form-item label="创建时间">
                    <el-col :span="5">
                      <el-date-picker type="date" v-model="questData.createdFrom" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="5">
                      <el-time-picker type="fixed-time" v-model="questData.createdTo" placeholder="选择时间" style="width: 100%;"></el-time-picker>
                    </el-col>
                    <div class="btn-group">
                      <el-button size="small" type="primary" @click="searchquestion()">搜索</el-button>
                      <el-button size="small" type="primary" @click="dialogFormVisible = true">创建问题</el-button>
                    </div>
                </el-form-item>
            </el-col>
        </el-form>
      </el-row>
      <el-table :data="tableData3" border v-loading="loading">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column width="135" label="栏目名称"  prop="helpCategoryName" align="center"></el-table-column>
        <el-table-column prop="title" label="问题内容" width="130" align="center"></el-table-column>
        <el-table-column prop="details" label="问题答案" width="125" align="center"></el-table-column>
        <el-table-column prop="sourceName" label="渠道" width="120" align="center"></el-table-column>
        <el-table-column prop="channelName" label="所属频道" width="120" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="120" align="center"></el-table-column>
        <el-table-column prop="adminName" label="创建人" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
          <template slot-scope="scope">
              <el-button size="small" type="danger">删除</el-button>
              <el-button size="small" type="danger" @click="openeditquestion(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row :gutter="20" class="page-content" v-if="tableData3.length">
          <el-col :span="11">
              <el-pagination background layout="prev, pager, next, jumper" :total="total"></el-pagination>
          </el-col>
          <el-col :span="8">
              <el-button size="small" type="primary">确定</el-button>
          </el-col>
          <el-col :span="5">
              <el-button size="small" type="primary" @click="removequestion()">批量删除</el-button>
          </el-col>
      </el-row>
      <!-- 创建栏目 -->
      <el-dialog title="创建问题" :visible.sync="dialogFormVisible">
          <el-form size="small">
            <el-form-item label="栏目ID" :label-width="formLabelWidth">
              <el-input :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建人" :label-width="formLabelWidth">
                <el-input :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                  <el-input :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="栏目名称" :label-width="formLabelWidth">
                  <el-select v-model="helpCategoryId">
                      <el-option label="全部" :value="value"></el-option>
                  </el-select>
              </el-form-item>
              <el-row :gutter="22">
                <el-col :span="7" :offset="5"><div class="grid-content bg-purple-dark" style="margin-left:-16px;">
                    <el-form-item label="渠道">
                        <el-select v-model="source">
                                <el-option 
                                :label="items.label"
                                :value="items.value"
                                v-for="(items, index) in qudaodate"></el-option>
                        </el-select>
                    </el-form-item>
                </div></el-col>
                <el-col :span="7"><div class="grid-content bg-purple-dark">
                    <el-form-item label="所属频道">
                        <el-select v-model="channel">
                                <el-option 
                                :label="item.label" 
                                :value="item.value"
                                v-for="(item, index) in suoshudata"></el-option>
                        </el-select>
                    </el-form-item>
                </div></el-col>
              </el-row>
              <el-form-item label="问题内容" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="title"></el-input>
              </el-form-item>
              <el-form-item label="问题答案" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="details"></el-input>
              </el-form-item>
              <el-form-item label="默认顺序" :label-width="formLabelWidth">
                <el-input type="text" :disabled="true" v-model="sortVal"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editquestion()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 栏目排序 -->
        <el-dialog title="帮助中心问题排序" :visible.sync="isShow">
            <el-form size="small">
                <el-row :gutter="22">
                  <el-col :span="7"><div class="grid-content bg-purple-dark">
                      <el-form-item label="渠道">
                          <el-select placeholder="" v-model="source">
                            <el-option 
                              v-for="(items, index) in qdData" 
                              :key=index
                              :label="items.label"
                              :value="items.label">
                            </el-option>
                          </el-select>
                      </el-form-item>
                  </div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple-dark">
                      <el-form-item label="所属频道">
                          <el-select v-model="channel">
                            <el-option 
                            :label="item.label" 
                            :value="item.value"
                            v-for="(item, index) in suoshudata"></el-option>
                          </el-select>
                      </el-form-item>
                  </div></el-col>
                  <el-col :span="7"><div class="grid-content bg-purple-dark">
                      <el-form-item label="栏目名称">
                          <el-select v-model="helpCategoryId">
                            <el-option 
                            :label="item.label" 
                            :value="item.value"
                            v-for="(item, index) in Column"></el-option>
                          </el-select>
                      </el-form-item>
                  </div></el-col>
                  <el-button @click="sortquestion()" type="primary" size="small" class="search-quest">搜索</el-button>
                </el-row>
            </el-form>
            <el-table :data="sortData" border>
              <el-table-column label="序号" width="210" prop="name" align="center"></el-table-column>
              <el-table-column label="名称" width="215" prop="name" align="center"></el-table-column>
              <el-table-column prop="name" label="操作" width="210" align="center"></el-table-column>
            </el-table>
          </el-dialog>
    </section>
  </template>
  <script>
export default {
  name: 'helpProblemList',
    data () {
      return {
        questData: {
          title: '',
          channel: 1,
          createdFrom: '',
          createdTo: '',
          adminName: '',
          source: 1
        },
        loading: false,
        total: null,
        tableData3: [],
        isShow: false,
        qudaodate: [
          {value: '1',label: 'APP'},
          {value: '2',label: 'PC'},
          {value: '3',label: 'WAP'}
        ],
        title:'',
        details: '',
        channel:1,
        source:1,
        helpCategoryId: 1,
        qudaoTwo: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        suoshutwo: '',
        sortVal: 20,
        value: '',
        suoshudata: [
          {value: '1',label: '留学'},
          {value: '2',label: '移民'},
          {value: '3',label: '语培'},
          {value: '4',label: '院校直通'},
          {value: '5',label: '全部'}
        ],
        datahelp:[],
        qdData: [
          {value: '1',label: 'APP'},
          {value: '2',label: 'PC'},
          {value: '3',label: 'WAP'},
          {value: '4',label: '全部'}
        ],
        Column: [
          {value: '1',label: '全部'},
          {value: '2',label: '栏目一'}
        ],
        sortData: [
          {name:123}
        ]
    }
  },
  created() {
    this.searchquestion()
  },
  methods: {
    searchquestion() {
      axios.post(this.$store.state.api.searchquestion, {
        // id:1001,
        // helpCategoryId:1,
        title:this.questData.title,
        source:this.questData.source,
        channel:this.questData.channel,
        createdFrom: this.questData.createdFrom,
        createdTo:this.questData.createdTo,
        adminName:this.questData.adminName,
      }).then(res => {
        // console.log(res)
        this.$message({
            type: 'success',
            message: '查询成功!'
        })
        this.tableData3 = res.data.result.modelData
        this.total = res.data.result.total
      }).catch(error => {

      })
    },
    addquestion() { //创建问题
      axios.post(this.$store.state.api.addquestion, {
        source: 0,
        channel: 0,
        helpCategoryId: 22,
        title: this.title,
        details: this.details
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        this.dialogFormVisible = false
      })
    },
    removequestion() { //批量删除
      axios.post(this.$store.state.api.removequestion, {
        idList: [33]
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(error => {

      })
    },
    sortquestion() { //排序
      axios.post(this.$store.state.api.sortquestion, {
        thisId: 4,
        aimId: 5
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '排序成功!'
        })
      })
    },
    openeditquestion(index, row) {
      this.title = row.title,
      this.details = row.details
      this.dialogFormVisible = true
    },
    editquestion() { // 编辑问题
      axios.post(this.$store.state.api.editquestion, {
        id: 1,
        source: 1,
        channel: 1,
        helpCategoryId: 10,
        title: this.title,
        details: this.details
      }).then(res => {
        console.log(res)
      }).catch(error => {

      })
    }
  }
}
  </script>
<style scoped>
@import '../assets/style/common_title.css';
.search-quest{ margin-top:32px;}
.help-content{overflow:hidden; margin-left:260px;}
.page-content{margin:30px 0;}
.btn-group{display:inline-block;margin-left:20px;}
.help-content>h3{margin-bottom:15px;height:30px;border-bottom:solid 1px #ccc;text-indent:20px;line-height:30px;}
</style>