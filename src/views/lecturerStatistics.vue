<template>
  <section class="member-content">
    <h3 class="content-title">讲师声望值统计</h3>
    <el-row :gutter="20">
      <el-form label-width="80px">
          <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="讲师姓名">
                  <el-input type="text" size="small"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="讲师分类">
                  <el-select placeholder="" v-model="defaultValue" size="small">
                      <el-option 
                      :label="item.label" 
                      :value="item.value"
                      :key="index"
                      v-for="(item, index) in teacher"></el-option>
                  </el-select>
              </el-form-item>
          </div></el-col>
      </el-form>
    </el-row>
    <!-- 表格统计 -->
    <el-table :data="data" style="width: 100%" border>
        <el-table-column prop="currentid" width="177" label="NO" align="center"></el-table-column>
        <el-table-column prop="teacherid" label="讲师ID" width="177" align="center"></el-table-column>
        <el-table-column prop="name" label="讲师姓名" width="177" align="center"></el-table-column>
        <el-table-column prop="type" label="讲师分类" width="177" align="center"></el-table-column>
        <el-table-column prop="typenum" label="讲师声望值" width="177" align="center"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="dialogFormVisible = true">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 弹出模态框 -->
    <el-dialog title="讲师声望值详细信息" :visible.sync="dialogFormVisible" class="modal">
        <el-form :model="form" size="small">
            <el-form-item label="讲师姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="讲师ID" :label-width="formLabelWidth">
                <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="讲师分类" :label-width="formLabelWidth">
                <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="data" style="width: 100%" border>
            <el-table-column prop="currentid" width="60" label="NO" align="center"></el-table-column>
            <el-table-column prop="currentid" width="160" label="行为" align="center"></el-table-column>
            <el-table-column prop="teacherid" label="行为次数/人数" width="160" align="center"></el-table-column>
            <el-table-column prop="teacherid" label="占百分比" width="100" align="center"></el-table-column>
            <el-table-column prop="teacherid" label="分值增加/减少" width="140" align="center"></el-table-column>
            <el-table-column prop="teacherid" label="得分" width="120" align="center"></el-table-column>
        </el-table>
        <div class="form-foot">
            <el-form :model="form" size="small">
                <el-form-item label="当前声望值" :label-width="formLabelWidth">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手动初始值" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <p>声望值得分=8分（20次X40%）+20分（100次X20%）+20分（200次X10%）+2.5分（50次X5%）+0.6分（30次X2%）+0.3分（10次X3%）+15分（300人X5%）+3分（100次X3%）+2分（100次X2%）-0.2分（5次X4%）-0.1分（5次X2%）-0.2分（5次X4%）=70.9分</p>
        </div>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    name: '',
    data () {
      return{
        teacher: [
          {label: '选项1', value: '个人讲师'}, 
          {label: '选项2', value: '机构讲师'}, 
          {label: '选项3', value: '院校讲师'}, 
          {label: '选项1', value: '顾问'}, 
          {label: '选项1', value: '个人大咖'},
          {label: '选项1', value: '院校大咖'}
        ],
        data: [
          {currentid: '001', teacherid: '1001', name: '40%', type: '顾问', typenum: '50%'},
          {currentid: '002', teacherid: '1002', name: '40%', type: '顾问', typenum: '80%'}
        ],
        form: {
          name: ''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        defaultValue: ''
      }
    }
  }
</script>
<style scoped>
  @import '../assets/style/common_title.css';
  .form-foot{
    margin-top:20px;
  }
  .modal .el-input{
    width: 70%;
  }
</style>