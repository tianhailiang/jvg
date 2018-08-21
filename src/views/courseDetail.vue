<template>
  <section class="course-detail">
    <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row :gutter="20">
            <el-col :span="5">
                <el-form-item label="课程ID">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="课程标题">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="讲师名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!--  -->
        <el-row :gutter="20">
            <el-col :span="5">
                <el-form-item label="课程分类">
                    <el-select placeholder="全部" v-model="value">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="课程标签">
                    <el-select placeholder="全部">
                        <el-option label="全部"  value="shanghai"></el-option>
                        <el-option label="语法" value="beijing"></el-option>
                        <el-option label="词汇" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="课程特色">
                    <el-col :span="8">
                        <el-input type="text"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="text"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input type="text"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <!--  -->
        <el-row :gutter="20">
            <el-col :span="5">
                <el-form-item label="上课模式">
                    <el-col :span="12">
                        <el-select placeholder="全部">
                            <el-option label="全部"  value="shanghai"></el-option>
                            <el-option label="直播" value="beijing"></el-option>
                            <el-option label="录播" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-select placeholder="全部">
                            <el-option label="全部"  value="shanghai"></el-option>
                            <el-option label="直播" value="beijing"></el-option>
                            <el-option label="录播" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="课程价格">
                  <el-col :span="12">
                      <el-input v-model="form.name" :disabled=true placeholder="人民币"></el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input v-model="form.name" :disabled=true placeholder="美元"></el-input>
                  </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="限售人数">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <!--  -->
        <el-form-item label="课程封面">
          <img src="https://imgsa.baidu.com/news/q%3D100/sign=df2ed05edc09b3deedbfe068fcbf6cd3/1ad5ad6eddc451da08ab7bddbbfd5266d01632a2.jpg" alt="" srcset="" height=200 width=300>
        </el-form-item>
        <el-form-item label="课程简介">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传课件">
            <div class="upload-course">
                <el-input type="text" width="300"></el-input>
                <el-upload><el-button size="small" type="primary">点击上传</el-button></el-upload>
            </div>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="5">
              <el-form-item label="上课时间">
                  <el-input type="text"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="5">
              <el-input type="text" size="mini"></el-input>
          </el-col>
          <el-col :span="5">
              <el-input type="text" size="mini"></el-input>
          </el-col>
        </el-row>
        <!--  -->
        <el-form-item label="课节">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="第一节">
                      <el-input type="text"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-input type="text"></el-input>
                        <div class="upload-btn">
                          <el-upload><el-button size="small" type="primary">点击上传</el-button></el-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="第二节">
                      <el-input type="text"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-input type="text"></el-input>
                        <div class="upload-btn">
                            <el-upload>
                                <el-button size="small" type="primary">点击上传</el-button>
                              </el-upload>
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
                    <el-input type="text"></el-input>
                </el-form-item>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <el-form-item label="课程状态">
                <el-select>
                    <el-option label="已完结"  value="shanghai"></el-option>
                    <el-option label="未完结" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div></el-col>
        </el-row>
        <el-form-item label="所属频道">
            <el-select placeholder="所属频道">
                <el-option label="全部"  value="全部"></el-option>
                <el-option label="留学" value="留学"></el-option>
                <el-option label="语培" value="语培"></el-option>
            </el-select>
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
        <!-- 编辑状态属性 -->
        <div class="edite-active">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="销售状态">
                        <el-input type="text" size="mini" placeholder="已上架" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="直播状态">
                        <el-input type="text" size="mini" placeholder="直播中" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="直播时长">
                        <el-input type="text" size="mini" placeholder="1小时" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="审核状态">
                        <el-input type="text" size="mini" :disabled="true" placeholder="待审核"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <!--  -->
        <el-form-item label="课程统计">
            <el-table border style="width: 100%" size="mini">
            <el-table-column
              prop="date"
              label="浏览数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="转发数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="分享数">
            </el-table-column>
            <el-table-column
            prop="address"
            label="收藏数">
          </el-table-column>
          <el-table-column
          prop="address"
          label="评论数">
        </el-table-column>
        <el-table-column
        prop="address"
        label="点赞数">
      </el-table-column>
      <el-table-column
      prop="address"
      label="学生数">
    </el-table-column>
    <el-table-column
    prop="address"
    label="好评度">
  </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </section>
</template>
<script>
    export default {
      data() {
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
          options:[
            {value: '选项1',label: '托福'},
            {value: '选项2',label: 'GRE'}
           ],
          value: ''
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
  </script>
  <style>
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
  </style>