<template>
  <section class="course-detail" style="overflow:hidden;margin-left:260px;">
    <h3>课程详情</h3>
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
                    <el-select placeholder="全部" v-model="categorySigns">
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
                <el-select v-model="label">
                  <el-option
                  v-for="(item, index) in labelValue"
                  :label="item.label"  
                  :value="item.value">
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
                                :value="item.value" v-for="(item, index) in courseend"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="课程价格">
                  <el-col :span="12">
                      <el-input v-model="price" placeholder="人民币"></el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input v-model="dollarsPrice" placeholder="美元"></el-input>
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
                <el-upload class="upload-demo" 
                action="https://jsonplaceholder.typicode.com/posts/">
                <el-button 
                size="small"
                type="primary"
                :on-change="handleChange"
                :file-list="fileList3" 
                style="position:absolute;right:0;top:0;" class="handle-load">点击上传</el-button>
              </el-upload>
            </div>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="7">
              <el-form-item label="上课时间">
                  <el-date-picker
                  v-model="beginTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="small">
                </el-date-picker>
              </el-form-item>
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
                  <el-date-picker 
                    value-format="yyyy-MM-dd HH:mm:ss" 
                    type="datetime"
                    size="small"
                    v-model="nextCouresTime"
                    width="100%">
                  </el-date-picker>
                </el-form-item>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <el-form-item label="课程状态">
                <el-select v-model="isSerial">
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
                <el-button type="primary" size="medium" @click="hanldeladdCourse()">创建</el-button>
                <el-button type="primary" size="medium" @click="dialogVisible = true">冻结</el-button>
                <el-button type="primary" size="medium">删除</el-button>
                <el-button type="primary" size="medium" @click="returnBlack()">取消</el-button>
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
      <el-dialog title="冻结编辑提示窗口" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="课程ID">
              <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="课程标题">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="发布用户名">
                <el-input type="text" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="冻结原因">
              <el-input type="textarea" size="small" v-model="downMemo"></el-input>
            </el-form-item>
        </el-form>
        <span>提示：冻结后该课程在前端无法显示</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="openFreeze()">确 定</el-button>
        </span>
    </el-dialog>
    </section>
</template>
<script>
import {addCourse,searchCourseDetail,jdCourse} from '@/api/url.js'
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
      fileList3:[],
      dollarsPrice: '',
      price: '',
      id: '',
      realName: '',
      downMemo: '',
      dialogVisible: false,
      options: [
        {value: 1, label: '托福'},
        {value: 2, label: 'GRE'}
      ],
      label: '',
      courseBiao: '',
      label:'',
      labelValue: [
        {value: 1, label: '语法'},
        {value: 2, label: '词汇'}
      ],
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
      isSerial: '',
      editStatusAttr: [],
      upDownValue: '',
      liveStatusValue: '',
      statusValue: '',
      isSerialValue: '',
      classHour: '',
      categorySigns: '',
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
      courseend: [
        {value: 1, label: '全部'},
        {value: 2, label: '1V1'},
        {value: 3, label: '公开课'},
        {value: 4, label: 'VIP课'},
        {value: 5, label: '精品课'}
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
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3)
    },
    onSubmit () {
      console.log('submit!')
    },
    returnBlack() {
      this.$router.push('courseList')
    },
    openFreeze() {
      jdCourse({
        ids: [6],
        upDown: 3,
        downMemo: this.downMemo
      }).then(res => {
          setTimeout(() => {
            this.dialogVisible = false
          },200)
      }).catch(error => {

      })
    },
    hanldeladdCourse() {
        addCourse({
            title: this.title,
            userId: this.id,
            categorySigns: this.categorySigns,
            label: [2],
            featuresArr: this.featuresArr,
            couresModel: this.couresModel,
            teachModel: this.teachModel,
            price: this.price,
            dollarsPrice: this.dollarsPrice,
            number: this.number,
            memo: this.memo,
            coverImage: this.coverImage,
            videoName: this.directory.videoName,
            video: this.video,
            beginTime: this.beginTime,
            directory: [
              {
                name: this.directory.name,
                videoName: this.videoName,
                video: this.video
              }
            ],
            nextCouresTime: this.nextCouresTime,
            profession: 1,
            isSerial: this.isSerial
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
        searchCourseDetail({id:this.id}).then(res => {
            console.log(res)
            // this.r = res.dat.result
            // const r = res.result
            this.memo = res.result.memo
            this.realName = res.result.realName
            this.title = res.result.title
            this.number = res.result.number
            this.nextCouresTime = res.result.nextCouresTime
            this.price = res.result.price
            this.dollarsPrice = res.result.dollarsPrice
            this.coverImage = res.result.coverImage
            this.profession = res.result.profession
            this.isSerial = res.result.isSerial
            this.beginTime = res.result.beginTime
            this.labelValue = res.result.labelValue
            this.label = res.result.label
            this.categorySigns = res.result.categorySigns
            this.isSerialValue = res.result.isSerialValue
            this.tabledata3.push(res.result.editStatusAttr)

            // let { liveStatusValue, statusValue, classHour, upDownValue } = r.editStatusAttr
            //     r.liveStatusValue = liveStatusValue
            //     r.statusValue = statusValue
            //     r.classHour = classHour
            //     r.upDownValue = upDownValue
            //     this.courseDateGroup = r
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
  .edite-active h3, .course-detail h3 {
      height: 30px;
      line-height: 30px;
      border-bottom: solid 1px #ebeef5;
      margin-bottom: 20px;
      font-weight: 600;
  }
</style>
