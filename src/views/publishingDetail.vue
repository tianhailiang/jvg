<template>
  <section class="publing-detail" style="overflow:hidden">
    <el-form :model="form" label-width="80px" size="small">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="ID">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分类">
                  <el-select v-model="typeval">
                      <el-option 
                      :label="items.label"
                      :value="items.value"
                      v-for="(items, index) in typeList"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <!--  -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="类型">
                    <el-select v-model="types">
                        <el-option
                        :label="items.label"
                        :value="items.value"
                        v-for="(items, index) in typeData"></el-option>
                    </el-select>
                  </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="讲师名称">
                  <el-input v-model="form.name"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="课程价格">
                <el-col :span="12">
                    <el-input v-model="form.name" :disabled=true placeholder="人民币"></el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="form.name" :disabled=true placeholder="美元"></el-input>
                </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  -->
        <el-form-item label="封面">
          <img src="https://imgsa.baidu.com/news/q%3D100/sign=df2ed05edc09b3deedbfe068fcbf6cd3/1ad5ad6eddc451da08ab7bddbbfd5266d01632a2.jpg" alt="" srcset="" height=200 width=300>
        </el-form-item>
        <el-form-item label="出版物简介">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="是否有样章">
          <div class="form-items" style="float:left;">
              <el-radio-group v-model="radio2">
                  <el-radio :label="3">是</el-radio>
                  <el-radio :label="6">否</el-radio>
              </el-radio-group>
          </div>
          <div class="form-upload" style="width:350px;float:left;margin-left:20px;position:relative;">
              <el-input type="text" placeholder="正式初版物上传"></el-input>
              <el-upload action=""><el-button size="small" type="primary" style="position:absolute;right:-90px;top:0;">点击上传</el-button></el-upload>
          </div>
        </el-form-item>
        <el-form-item label="">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item>
                        <el-input type="text" placeholder="正式初版物上传"></el-input>
                        <div class="upload-btn">
                          <el-upload action=""><el-button size="small" type="primary">点击上传</el-button></el-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form-item>
        <!-- 按钮集合 -->
        <div class="center-box">
            <el-row>
                <el-button type="primary" size="medium">创建</el-button>
                <el-button type="primary" size="medium">冻结</el-button>
                <el-button type="primary" size="medium">删除</el-button>
                <el-button type="primary" size="medium">取消</el-button>
            </el-row>
        </div>
        <div class="edite-active">
            <h2 class="edeit-lines">编辑状态属性</h2>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="销售状态">
                        <el-input type="text" size="small" placeholder="已上架" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="审核状态">
                        <el-input type="text" size="small" :disabled="true" placeholder="待审核"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <!--  -->
        <el-form-item label="统计">
            <el-table border style="width: 100%" :data=dataGroup>
            <el-table-column prop="date" label="浏览数" width="180" align="center"></el-table-column>
            <el-table-column prop="name" label="转发数" width="180" align="center"></el-table-column>
            <el-table-column prop="address" label="分享数" align="center"></el-table-column>
            <el-table-column prop="address" label="收藏数" align="center"></el-table-column>
          <el-table-column
          prop="address"
          label="评论数" align="center">
        </el-table-column>
        <el-table-column
        prop="address"
        label="点赞数" align="center">
      </el-table-column>
      <el-table-column
      prop="address"
      label="最近在读" align="center">
    </el-table-column>
    <el-table-column
    prop="address"
    label="好评度" align="center">
  </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </section>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      radio2: 3,
      types: '',
      typeval: '',
      dataGroup: [
        {date: '101', name: '50', type: '4500', address: '40%', active: '80%'},
        {date: '101', name: '50', type: '4500', address: '40%', active: '80%'},
        {date: '101', name: '50', type: '4500', address: '40%', active: '80%'},
        {date: '101', name: '50', type: '4500', address: '40%', active: '80%'}
      ],
      typeData: [
        {label: '全部', value: '选项1'},
        {label: '词汇', value: '选项2'},
        {label: '语法', value: '选项3'}
      ],
      typeList: [
        {label: '全部', value: '选项1'},
        {label: '托福', value: '选项2'},
        {label: 'GRE', value: '选项3'}
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
  <style scoped>
  .center-box{
    display: flex;
    justify-content: center;
  }
  .edite-active{
    border-top:solid 1px #ccc;
    margin-top: 30px;
    padding-top: 15px;
  }
  .upload-btn{
    position:absolute;
    right: -90px;
    top: -4px;
  }
  .course-time{
    position:absolute;
    left: 12px;
  }
  .course-detail .course-plane .el-form-item__content{
    margin-left:135px !important;
  }
  .upload-course .el-input__inner{
    width:80% !important;
  }
  .upload-course{
    position:relative;
    max-width: 480px;
  }
  .upload-course .el-upload{
    position:absolute;
    top: 0;
    right: 0;
  }
  .edeit-lines {
    margin-bottom: 15px;
    font-size:18px;
    text-indent: 14px;
  }
</style>
