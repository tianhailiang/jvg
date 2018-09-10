<template>
  <section class="help-content">
    <h3 >帮助栏目列表</h3>
    <el-row :gutter="20">
      <el-form label-width="100px" class="demo-ruleForm" size="small">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="栏目名称">
                  <el-input type="text"></el-input>
              </el-form-item></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="创建人">
                  <el-input type="text"></el-input>
              </el-form-item></div></el-col></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="所属频道">
                <el-select v-model="suoshu">
                  <el-option 
                  :label="item.label" 
                  :value="item.value"
                  v-for="(item, index) in suoshudata"></el-option>
                </el-select>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="渠道">
                  <el-select v-model="qudao">
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
                    <el-date-picker type="date" v-model="form.date2" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="5">
                    <el-time-picker type="fixed-time" v-model="form.date1" placeholder="选择时间" style="width: 100%;"></el-time-picker>
                  </el-col>
                  <div class="btn-group">
                    <el-button size="small" type="primary">搜索</el-button>
                    <el-button size="small" type="primary" @click="dialogFormVisible = true">创建栏目</el-button>
                  </div>
              </el-form-item>
          </el-col>
      </el-form>
    </el-row>
    <el-table :data="tableData3" border>
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="栏目名称" width="175" prop="name" align="center"></el-table-column>
      <el-table-column prop="name" label="渠道" width="175" align="center"></el-table-column>
      <el-table-column prop="name" label="所属频道" width="175" align="center"></el-table-column>
      <el-table-column prop="name" label="创建时间" width="175" align="center"></el-table-column>
      <el-table-column prop="name" label="创建人" width="175" align="center"></el-table-column>
      <el-table-column label="操作" width="170" align="center">
        <template slot-scope="scope">
            <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row :gutter="20" class="page-content">
        <el-col :span="11">
            <el-pagination layout="prev, pager, next, jumper" :total="100"></el-pagination>
        </el-col>
        <el-col :span="8">
            <el-button size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="5">
            <el-button size="small" type="primary">批量删除</el-button>
        </el-col>
    </el-row>
    <!-- 创建栏目 -->
    <el-dialog title="创建栏目" :visible.sync="dialogFormVisible">
        <el-form :model="form" size="small">
          <el-form-item label="栏目ID" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建人" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="栏目名称" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="10" :offset="3"><div class="grid-content bg-purple-dark">
                  <el-form-item label="渠道">
                      <el-select placeholder="" v-model="value">
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
                      <el-select v-model="suoshutwo">
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
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </section>
</template>
<script>
  export default {
    name: 'helpSectionList',
    data () {
      return {
        tableData3: [{name: '李四'}],
        qdData: [
          {value: '选项一',label: 'APP'},
          {value: '选项二',label: 'PC'},
          {value: '选项三',label: 'WAP'},
          {value: '选项四',label: '全部'}
        ],
        form: {
          date1: '',
          date2: ''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        value: '',
        qudao: '',
        suoshu: '',
        suoshutwo: '',
        qudaodate: [
          {value: '选项一',label: 'APP'},
          {value: '选项二',label: 'PC'},
          {value: '选项三',label: 'WAP'},
          {value: '选项四',label: '全部'}
        ],
        suoshudata: [
          {value: '选项1',label: '留学'},
          {value: '选项2',label: '移民'},
          {value: '选项3',label: '语培'},
          {value: '选项4',label: '院校直通'},
          {value: '选项5',label: '全部'}
        ]
      }
    }
  }
</script>
<style scoped>
.help-content{
  overflow: hidden;
}
.page-content{
  margin-top:30px;
}
.help-content > h3{
  height: 30px;
  line-height: 30px;
  border-bottom: solid 1px #ccc;
  text-indent: 20px;
  margin-bottom: 15px;
}
.btn-group {
  display: inline-block;
  margin-left: 20px;
}
</style>