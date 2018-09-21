<template>
  <section class="publing-detail" style="overflow:hidden;margin-left:260px;">
    <h3>出版物详情</h3>
    <el-form :model="form" label-width="80px" size="small">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="ID">
                    <el-input v-model="form.id" :disabled="true"></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="名称">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分类">
                  <el-input v-model="form.categorySignsValue"></el-input>
                  <!-- <el-select v-model="categorySignsValue">
                      <el-option 
                      :label="items.label"
                      :value="items.value"
                      v-for="(items, index) in typeList"></el-option>
                  </el-select> -->
              </el-form-item>
          </el-col>
        </el-row>
        <!--  -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="类型">
                    <el-select v-model="form.typeValue">
                        <el-option
                        :label="items.label"
                        :value="items.value"
                        v-for="(items, index) in typeData"></el-option>
                    </el-select>
                  </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="讲师名称">
                  <el-input v-model="form.realName"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="课程价格">
                <el-col :span="12">
                    <el-input v-model="form.price" :disabled=true placeholder="人民币"></el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="form.dollarsPrice" :disabled=true placeholder="美元"></el-input>
                </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  -->
        <el-form-item label="封面">
          <img :src="coverImage" alt="" srcset="" height=200 width=300>
        </el-form-item>
        <el-form-item label="出版物简介">
            <el-input type="textarea" v-model="form.memo"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="是否有样章">
          <div class="form-items" style="float:left;">
              <el-radio-group v-model="form.isSample">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
              </el-radio-group>
          </div>
          <div class="form-upload" style="width:350px;float:left;margin-left:20px;position:relative;">
              <el-input type="text" v-model="form.samplePdf"></el-input>
              <el-upload action="">
                <el-button size="small" type="primary" style="position:absolute;right:-90px;top:0;">点击上传</el-button>
              </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item>
                        <el-input type="text" v-model="originalPdf"></el-input>
                        <div class="upload-btn">
                          <el-upload action="">
                            <el-button size="small" type="primary" style="margin-top:5px;">点击上传</el-button>
                          </el-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form-item>
        <!-- 按钮集合 -->
        <div class="center-box">
            <el-row>
                <el-button type="primary" size="medium" @click="addPublishing()">创建</el-button>
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
                        <el-input v-model="form.upDownValue" size="small" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="审核状态">
                        <el-input v-model="form.statusValue" size="small" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <!--  -->
        <el-form-item label="统计">
          <el-table border style="width: 100%" :data=dataGroup>
            <el-table-column prop="browseNum" label="浏览数" width="180" align="center"></el-table-column>
            <el-table-column prop="transpondNum" label="转发数" width="180" align="center"></el-table-column>
            <el-table-column prop="shareNum" label="分享数" align="center"></el-table-column>
            <el-table-column prop="collectNum" label="收藏数" align="center"></el-table-column>
            <el-table-column prop="commentNum"label="评论数" align="center"></el-table-column>
            <el-table-column prop="thumpNum" label="点赞数" align="center"></el-table-column>
            <el-table-column prop="learningNumber" label="最近在读" align="center"></el-table-column>
            <el-table-column prop="raveDegree" label="好评度" align="center"></el-table-column>
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
        upDownValue: '',
        statusValue: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        resource: '',
        memo: '',
        id: '',
        realName: '',
        typeValue: '',
        isSample: 1,
        samplePdf: '',
        categorySignsValue: '',
        price: '',
        dollarsPrice: ''
      },
      originalPdf: '',
      coverImage: '',
      dataGroup: [],
      typeData: [
        {label: '全部', value: '1'},
        {label: '实体出版物 ', value: '2'},
        {label: '数字出版物', value: '3'}
      ],
      typeList: [
        {label: '全部', value: '1'},
        {label: '托福', value: '2'},
        {label: 'GRE', value: '3'}
      ]
    }
  },
  created() {
    // this.publishingDetail()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    publishingDetail() {
      let routerParams = this.$route.params.id
      this.form.id = routerParams
      axios.post(this.$store.state.api.searchPublishdetail, {
        id: this.form.id
      }).then((res) => {

        this.form.realName = res.data.result.realName
        this.form.title = res.data.result.title
        this.form.memo = res.data.result.memo
        this.form.price = res.data.result.price
        this.form.dollarsPrice = res.data.result.dollarsPrice
        this.form.typeValue = res.data.result.typeValue
        this.form.isSample = res.data.result.isSample
        this.form.upDownValue = res.data.result.editStatusAttr.upDownValue
        this.form.statusValue = res.data.result.editStatusAttr.statusValue
        this.form.samplePdf = res.data.result.samplePdf
        //
        this.categorySignsValue =  res.data.result.categorySignsValue
        this.coverImage = res.data.result.coverImage
        
        this.dataGroup.push(res.data.result.editStatusAttr)
         
        this.$message({
          type: 'success',
          message: '查询成功!'
        })
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '查询失败'
        })
      })
    },
    addPublishing() {
      axios.post(this.$store.state.api.addPublishing, {
        type: 1,
        isSample: this.form.isSample,
        title: this.form.title,
        categorySigns: this.categorySigns,
        // userId: 1,
        price: this.price,
        dollarsPrice: this.dollarsPrice,
        // "profession": 1,
        memo: this.form.memo,
        coverImage: this.coverImage,
        // "isSample": 1,
        samplePdf: this.samplePdf,
        originalPdf: this.originalPdf
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '创建失败'
        })
      })
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
  h3{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 15px;
  }
</style>
