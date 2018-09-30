<template>
  <section class="help-content">
    <h3 >帮助栏目列表</h3>
    <el-row :gutter="20">
      <el-form label-width="100px" class="demo-ruleForm" size="small">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="栏目名称">
                  <el-input type="text" v-model="helpData.name"></el-input>
              </el-form-item></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="创建人">
                  <el-input type="text" v-model="helpData.adminName"></el-input>
              </el-form-item></div></el-col></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="所属频道" >
                <el-select v-model="helpData.channel">
                  <el-option 
                  :label="item.label" 
                  :value="item.value"
                  v-for="(item, index) in suoshudata"></el-option>
                </el-select>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="渠道">
                  <el-select v-model="helpData.source">
                    <el-option 
                    :label="items.label" 
                    :value="items.value"
                    v-for="(items, index) in qudaodate"></el-option>
                  </el-select>
              </el-form-item>  
          </div></el-col>
          <el-col :span="20">
              <el-form-item label="创建时间">
                  <el-col :span="5">
                    <el-date-picker type="date" v-model="helpData.createdFrom" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="5">
                    <el-time-picker type="fixed-time" v-model="helpData.createdTo" placeholder="选择时间" style="width: 100%;"></el-time-picker>
                  </el-col>
                  <div class="btn-group">
                    <el-button size="small" type="primary" @click="searchHelp()">搜索</el-button>
                    <el-button size="small" type="primary" @click="dialogFormVisible = true">创建栏目</el-button>
                  </div>
              </el-form-item>
          </el-col>
      </el-form>
    </el-row>
    <el-table :data="tableData3" border v-loading="loading">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="栏目名称" width="175" prop="name" align="center"></el-table-column>
      <el-table-column prop="source" label="渠道" width="175" align="center"></el-table-column>
      <el-table-column prop="channelName" label="所属频道" width="175" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="175" align="center"></el-table-column>
      <el-table-column prop="adminName" label="创建人" width="175" align="center"></el-table-column>
      <el-table-column label="操作" width="170" align="center">
        <template slot-scope="scope">
            <el-button size="small" type="danger" @click="removeMore()">删除</el-button>
            <el-button size="small" type="danger" @click="openedithelp(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row :gutter="20"  class="page-content" v-if="tableData3.length">
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
        <el-col :span="8">
            <el-button size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary" @click="removeHelpCenter()">批量删除</el-button>
        </el-col>
    </el-row>
    <!-- 创建栏目 -->
    <el-dialog title="创建栏目" :visible.sync="dialogFormVisible">
        <el-form size="small">
          <el-form-item label="栏目ID" :label-width="formLabelWidth">
            <el-input auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建人" :label-width="formLabelWidth">
              <el-input auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="栏目名称" :label-width="formLabelWidth">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="10" :offset="3"><div class="grid-content bg-purple-dark">
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
              <el-col :span="10"><div class="grid-content bg-purple-dark">
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edithelp()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 栏目排序 -->
      <el-dialog title="栏目排序" :visible.sync="isShow">
        <el-form size="small">
            <el-row :gutter="22">
              <el-col :span="9"><div class="grid-content bg-purple-dark">
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
              <el-col :span="9"><div class="grid-content bg-purple-dark">
                  <el-form-item label="所属频道">
                      <el-select v-model="channel">
                        <el-option 
                        :label="item.label" 
                        :value="item.value"
                        v-for="(item, index) in suoshudata"></el-option>
                      </el-select>
                  </el-form-item>
              </div></el-col>
              <el-button @click="sorthelp()" type="primary" size="small" class="search-quest">搜索</el-button>
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
    name: 'helpSectionList',
    data () {
      return {
        tableData3: [],
        sortData: [
          {name: '测试demo'}
        ],
        qdData: [
          {value: '1',label: 'APP'},
          {value: '2',label: 'PC'},
          {value: '3',label: 'WAP'},
          {value: '4',label: '全部'}
        ],
        helpData: {
          name: '',
          source:1,
          channel:1,
          type:1,
          createdFrom:'',
          createdTo:'',
          adminName: '',
        },
        dialogFormVisible: false,
        isShow: false,
        formLabelWidth: '120px',
        name: '',
        source:1,
        channel:1,
        type:1,
        loading: false,
        total: null,
        pageSize: 20,
        pageNo: 0,
        qudaodate: [
          {value: '1',label: 'APP'},
          {value: '2',label: 'PC'},
          {value: '3',label: 'WAP'},
          {value: '4',label: '全部'}
        ],
        suoshudata: [
          {value: '1',label: '留学'},
          {value: '2',label: '移民'},
          {value: '3',label: '语培'},
          {value: '4',label: '院校直通'},
          {value: '5',label: '全部'}
        ]
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        console.log(val)
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.searchHelp()
      },
      searchHelp() {
        axios.post(this.$store.state.api.searchHelp, {
          // id:this.helpData.id,
          name:this.helpData.name,
          source:this.helpData.source,
          channel:this.helpData.channel,
          type:this.helpData.type,
          createdFrom:this.helpData.createdFrom,
          createdTo:this.helpData.createdTo,
          adminName: this.helpData.adminName,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }).then(res => {
          console.log(res.data)
          this.tableData3 = res.data.result.modelData
          this.total = res.data.result.total
          this.$message({
            type: 'success',
            message: '查询成功!'
          })
        }).catch(error => {

        })
      },
      addHelpCenter() {
        axios.post(this.$store.state.api.addHelpCenter, {
          source:2,
          channel:2,
          type:1,
          name: 'demo',
          languages:"zh"
        }).then(res => {
          // console.log(res)
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
          this.dialogFormVisible = false
        }).catch(error => {

        })
      },
      removeHelpCenter() {
        axios.post(this.$store.state.api.removeHelpCenter, {
          idList: [2]
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(error => {

        })
      },
      removeMore() {
        axios.post(this.$store.state.api.removeMore).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(error => {

        })
      },
      sorthelp() { //排序
        axios.post(this.$store.state.api.sorthelp, {
          thisId: 3,
          aimId: 4
        }).then(res => {
          console.log(res)
        })
      },
      openedithelp(index, row) { //编辑
        this.dialogFormVisible = true
        this.name = row.name
      },
      edithelp() { //编辑
        axios.post(this.$store.state.api.edithelp, {
          id:3,
          source: 1,
          channel: 1,
          type: 1,
          name: this.name,
          languages: 'zh'
        }).then(res => {
          this.dialogFormVisible = false
          this.name = ''
          this.channel = 1,
          this.source = 1
          console.log(res)
        }).catch(error => {
          
        })
      }
    }
  }
</script>
<style scoped>
.help-content{
  overflow: hidden;
  margin-left: 260px;
}
.page-content{
  margin-top:30px;
}
.help-content > h3{
  height: 30px;
  line-height: 30px;
  border-bottom: solid 1px #ccc;
  text-indent: 10px;
  margin-bottom: 15px;
  font-weight: bold;
}
.btn-group {
  display: inline-block;
  margin-left: 20px;
}
.search-quest{ margin-top:32px;}
</style>