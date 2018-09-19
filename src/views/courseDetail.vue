<template>
  <section class="course-detail" style="overflow:hidden;margin-left:260px;">
    <el-form label-width="80px" size="small">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="课程ID">
                    <el-input v-model="id" :disabled="true"></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="课程标题">
                    <el-input v-model="title"></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="讲师名称">
                    <el-input v-model="realName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!--  -->
       <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="课程分类">
                    <el-select placeholder="全部" v-model="categorySignsValue">
                        <el-option
                        v-for="item in options"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="课程标签">
                <el-select v-model="courseBiao">
                  <el-option
                  v-for="(item, index) in labelValue"
                  :label="item[0]"  
                  :value="item[1]">
                  </el-option>
                  <!-- <ul>
                    <li v-for="(item, index) in labelValue">
                      <span>{{item}}</span>
                    </li>
                  </ul> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="课程特色">
                    <el-col :span="8">
                        <el-input type="text" v-model="featuresArr[0]"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="text" v-model="featuresArr[1]"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="text" v-model="featuresArr[2]"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row> 
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="上课模式">
                    <el-col :span="12">
                        <el-select v-model="couresModel">
                            <el-option 
                            :label="item.label"  
                            :value="item.value" v-for="(item, index) in course"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-select v-model="teachModel">
                            <el-option 
                                :label="item.label"  
                                :value="item.value" v-for="(item, index) in course"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="课程价格">
                  <el-col :span="12">
                      <el-input v-model="price" :disabled=true placeholder="人民币"></el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input v-model="dollarsPrice" :disabled=true placeholder="美元"></el-input>
                  </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="限售人数">
                    <el-input v-model="number"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!--  -->
        <el-form-item label="课程封面">
          <img :src="coverImage" alt="" srcset="" height=200 width=300>
        </el-form-item>
        <el-form-item label="课程简介">
            <el-input type="textarea" v-model="memo"></el-input>
        </el-form-item>
        <el-form-item label="上传课件">
            <div class="upload-course">
                <el-input type="text" width="300" ></el-input>
                <el-upload action="">
                    <el-button size="small" type="primary" class="handle-load">点击上传</el-button>
                </el-upload>
            </div>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="7">
              <el-form-item label="上课时间">
                  <el-input type="text" v-model="beginTime"></el-input>
              </el-form-item>
          </el-col> 
          <el-col :span="5">
              <el-input type="text" size="small"></el-input>
          </el-col>
          <el-col :span="5">
              <el-input type="text" size="small"></el-input>
          </el-col>
        </el-row>
        <el-form-item label="课节">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="第一节">
                      <el-input type="text" v-model="directory.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-input type="text"></el-input>
                        <div class="upload-btn">
                          <el-upload action=""><el-button size="small" type="primary">点击上传</el-button></el-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form-item>
        <el-row :gutter="20">
            <el-col :span="7">
              <div class="grid-content bg-purple course-plane" style="position:relative;">
                <span class="course-time">下次课程更新时间</span>
                <el-form-item>
                    <el-input type="text" v-model="nextCouresTime"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <el-form-item label="课程状态">
                <el-select v-model="isSerialValue">
                    <el-option 
                    :label="item.label"  
                    :value="item.value" v-for="(item, index) in courseDate"></el-option>
                </el-select>
              </el-form-item>
            </div>
        </el-col>
        </el-row>
        <el-form-item label="所属频道">
            <el-select v-model="profession">
                <el-option 
                :label="item.label"
                :value="item.value" v-for="(item, index) in sshuData"></el-option>
            </el-select>
        </el-form-item>
        <!-- 按钮集合 -->
        <div class="center-box">
            <el-row>
                <el-button type="primary" size="medium" @click="hanldeladdCourse">创建</el-button>
                <el-button type="primary" size="medium">冻结</el-button>
                <el-button type="primary" size="medium">删除</el-button>
                <el-button type="primary" size="medium">取消</el-button>
            </el-row>
        </div>
        <!-- 编辑状态属性 -->
        <div class="edite-active">
            <h3>编辑状态属性</h3>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="销售状态">
                        <el-input size="small" :disabled="true" v-model="courseDateGroup.upDownValue"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="直播状态">
                        <el-input size="small" :disabled="true" v-model="courseDateGroup.liveStatusValue"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="直播时长">
                        <el-input size="small" :disabled="true" v-model="courseDateGroup.classHour"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="审核状态">
                        <el-input size="small" :disabled="true" v-model="courseDateGroup.statusValue"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <!--  -->
        <el-form-item label="课程统计">
            <el-table border style="width: 100%" size="small" :data="tabledata3">
                <el-table-column prop="browseNum" label="浏览数" width="180" align="center"></el-table-column>
                <el-table-column prop="transpondNum" label="转发数" width="180" align="center"></el-table-column>
                <el-table-column prop="shareNum" label="分享数" align="center"></el-table-column>
                <el-table-column prop="collectNum" label="收藏数" align="center"></el-table-column>
                <el-table-column prop="commentNum" label="评论数" align="center"></el-table-column>
                <el-table-column prop="thumpNum" label="点赞数" align="center"></el-table-column>
                <el-table-column prop="learningNumber" label="学生数" align="center"></el-table-column>
                <el-table-column prop="raveDegree" label="好评度" align="center"></el-table-column>
            </el-table>
        </el-form-item>
      </el-form>
    </section>
</template>
<script>
export default {
  name: 'courseDetail',
  data () {
    return {
      directory: {
        name: '',
        videoName: '',
        video: ''
      },
      featuresArr: [],
      dollarsPrice: '',
      price: '',
      id: '',
      realName: '',
      options: [
        {value: 1, label: '托福'},
        {value: 2, label: 'GRE'}
      ],
      label: '',
      courseBiao: '',
      labelValue: [],
      tabledata3: [],
      courseval: '',
      coursetagval: '',
      couresModel: '',
      profession: '',
      categorySigns: '',
      nextCouresTime: '',
      beginTime: '',
      number: '',
      coverImage: '',
      form: '',
      memo: '',
      title: '',
      teachModel: '',
      isSerial: 1,
      editStatusAttr: [],
      upDownValue: '',
      liveStatusValue: '',
      statusValue: '',
      isSerialValue: '',
      classHour: '',
      categorySignsValue: '',
      courseDateGroup: {
        upDown: 1,
        upDownValue: '',
        liveStatus: 1,
        status: 3,
        browseNum: 12,
        transpondNum: 1,
        shareNum: 2,
        collectNum: 4,
        commentNum: 3,
        thumpNum: '',
        learningNumber: 0,
        raveNumber: null,
        raveDegree: '0%'
      },
      course: [
        {value: 1, label: '直播'},
        {value: 2, label: '录播'},
        {value: 3, label: '全部'}
      ],
      sshuData: [
        {value: 1, label: '留学'},
        {value: 2, label: '语培'},
        {value: 3, label: '全部'}
      ],
      coursemodule: '',
      courseDate: [
        {value: 1, label: '已完结'},
        {value: 2, label: '未完结'},
      ],

    }
  },
  created() {
      this.searchCourseDetail()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    hanldeladdCourse() {
        axios.post(this.$store.state.api.addCourse, {
            "title": this.title,
            "userId": this.id,
            "categorySigns": this.categorySigns,
            "label": [2],
            "featuresArr": ["特色1","特色2","特色3"],
            "couresModel": this.couresModel,
            "teachModel": this.teachModel,
            "price": this.price,
            "dollarsPrice": this.dollarsPrice,
            "number": this.number,
            "memo": this.memo,
            "coverImage": this.coverImage,
            "videoName": this.directory.videoName,
            "video": this.video,
            "beginTime": this.beginTime,
            "directory": [
              {
                "name": this.directory.name,
                "videoName": this.videoName,
                "video": this.video
              }
            ],
            "nextCouresTime": this.nextCouresTime,
            "profession": 1
        }).then(res => {
            this.$message({
                type: 'success',
                message: '创建课程成功!'
            })
        }).catch( error => {
            console.log(`创建失败`)
        })
    },
    searchCourseDetail() {
        let routerParams = this.$route.params.id
        this.id = routerParams
        axios.post(this.$store.state.api.searchCourseDetail, {id:this.id}).then(res => {
            console.log(res.data)
            // this.r = res.data.result
            const r = res.data.result
            this.memo = res.data.result.memo
            this.realName = res.data.result.realName
            this.title = res.data.result.title
            this.number = res.data.result.number
            this.nextCouresTime = res.data.result.nextCouresTime
            this.price = res.data.result.price
            this.dollarsPrice = res.data.result.dollarsPrice
            this.coverImage = res.data.result.coverImage
            this.profession = res.data.result.profession
            this.isSerial = res.data.result.isSerial
            this.beginTime = res.data.result.beginTime
            this.labelValue = res.data.result.labelValue
            this.categorySignsValue = res.data.result.categorySignsValue
            this.isSerialValue = res.data.result.isSerialValue
            
            this.tabledata3.push(res.data.result.editStatusAttr)

            let { liveStatusValue, statusValue, classHour, upDownValue } = r.editStatusAttr
                r.liveStatusValue = liveStatusValue
                r.statusValue = statusValue
                r.classHour = classHour
                r.upDownValue = upDownValue
                this.courseDateGroup = r

            this.$message({
                type: 'success',
                message: '查询课程详情成功!'
            })
        }).catch(error => {

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
    border-top:solid 1px #ebeef5;
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
  .handle-load{
      display: inline-block;
      position: absolute;
      top:0;
      right: -95px;
  }
  .edite-active h3 {
      height: 30px;
      line-height: 30px;
      border-bottom: solid 1px #ebeef5;
      margin-bottom: 20px;
  }
</style>
