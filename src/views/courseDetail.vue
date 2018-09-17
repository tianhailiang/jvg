<template>
  <section class="course-detail" style="overflow:hidden;margin-left:260px;">
    <el-form ref="form" label-width="80px" size="small">
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
                    <el-input v-model="realName" :disabled="true"></el-input>
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
                        :key="item.value"
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
                        :label="item.label"  
                        :value="item.value" v-for="(item, index) in coursetag"></el-option>
                    </el-select>
                  </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="课程特色">
                    <el-col :span="8">
                        <el-input type="text" v-model="featuresArr"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="text" v-model="featuresArr"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="text" v-model="featuresArr"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <!--  -->
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
                <el-input type="text" width="300"></el-input>
                <el-upload action="">
                    <el-button size="small" type="primary" class="handle-load">点击上传</el-button>
                </el-upload>
            </div>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="5">
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
        <!--  -->
        <el-form-item label="课节">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="第一节">
                      <el-input type="text" v-model="directory"></el-input>
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
                <el-form-item label="">
                    <el-input type="text" v-model="nextCouresTime"></el-input>
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
            </div></el-col>
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
                        <el-input type="text" size="small" placeholder="已上架" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="直播状态">
                        <el-input type="text" size="small" placeholder="直播中" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="直播时长">
                        <el-input type="text" size="small" placeholder="1小时" :disabled="true"></el-input>
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
        <el-form-item label="课程统计">
            <el-table border style="width: 100%" size="small">
                <el-table-column prop="date" label="浏览数" width="180" align="center"></el-table-column>
                <el-table-column prop="name" label="转发数" width="180" align="center"></el-table-column>
                <el-table-column prop="address" label="分享数" align="center"></el-table-column>
                <el-table-column  prop="address" label="收藏数" align="center"></el-table-column>
                <el-table-column prop="address" label="评论数" align="center"></el-table-column>
                <el-table-column prop="address" label="点赞数" align="center"></el-table-column>
                <el-table-column prop="address" label="学生数" align="center"></el-table-column>
                <el-table-column prop="address" label="好评度" align="center"></el-table-column>
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
        {value: '1', label: '托福'},
        {value: '2', label: 'GRE'}
      ],
      value: '',
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
      label: '',
      isSerial: 1,
      course: [
        {value: '1', label: '直播'},
        {value: '2', label: '录播'},
        {value: '3', label: '全部'}
      ],
      coursetag: [
        {value: '1', label: '词汇'},
        {value: '2', label: '语法'},
        {value: '3', label: '全部'}
      ],
      sshuData: [
        {value: '1', label: '留学'},
        {value: '2', label: '语培'},
        {value: '3', label: '全部'}
      ],
      coursemodule: '',
      courseDate: [
        {value: '1', label: '已完结'},
        {value: '2', label: '未完结'},
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    hanldeladdCourse() {
        axios.post(this.$store.state.api.addCourse, {
            "title": this.title,
            "userId": 1,
            "categorySigns": "tuofu",
            "label": [2],
            "featuresArr": ["特色1","特色2","特色3"],
            "couresModel": 1,
            "teachModel": 2,
            "price": 100,
            "dollarsPrice": 50,
            "number": 50,
            "memo": "课程简介课程简介课程简介",
            "coverImage": "image.png",
            "videoName": "课件一",
            "video": "https://www.xxx.xxx/url/abc.mp4",
            "beginTime": "2018-08-12 08:00:00",
            "directory": [
                {"name": "第一节 复习", "videoName": "课件", "video": "https://www.xxx.xxx/url/abc.mp4"}
            ],
            "nextCouresTime": "2018-08-13 08:00:00",
            "profession": 1
        }).then(res => {
            console.log(res)
        }).catch( error => {
            console.log(`创建失败`)
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
