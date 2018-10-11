<template>
  <section class="advert-space-detail" style="overflow:hidden; margin-left:260px;">
    <h3>广告位详情</h3>
      <el-row :gutter="20">
        <el-form class="demo-form-inline" label-width="80px" size="small">
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="ID">
                    <el-input v-model="dataForm.id" :disabled="true"></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="名称">
                  <el-input v-model="dataForm.addressTypeName"></el-input>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="所有权">
                    <el-select v-model="dataForm.ownership">
                      <el-option 
                      :label="item.label"  
                      :value="item.value"
                      v-for="(item, index) in suoyouData"></el-option>
                    </el-select>
              </el-form-item>  
          </div></el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="广告状态">
                        <el-select v-model="dataForm.upDown">
                          <el-option 
                          :label="item.label" 
                          :value="item.value" v-for="(item, index) in advertData"></el-option>
                        </el-select>
                  </el-form-item>  
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="业务频道">
                      <el-select v-model="dataForm.channel">
                        <el-option 
                        :label="item.label"  
                        :value="item.value" v-for="(item, index) in yewuData"></el-option>
                      </el-select>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="渠道">
                      <el-select v-model="dataForm.source">
                        <el-option 
                        :label="item.label"  
                        :value="item.value" v-for="(item, index) in channelData"></el-option>
                      </el-select>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="创建人名称">
                        <el-input v-model="dataForm.adminName" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="创建人ID">
                        <el-input v-model="dataForm.adminId" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-col>
        </el-form>
      </el-row>
      <!--  -->
      <el-row :gutter="20">
        <el-col :span="14">
          <section class="advert-detail_left" style="display:none;">
            <h3 style="margin-bottom:20px;">默认广告设置</h3>
            <el-form label-width="80px" size="small">
                <el-form-item label="创建时间">
                  <el-input type="text" :disabled="true" v-model="dataForm.createAt"></el-input>
                </el-form-item>
                <el-form-item label="图片尺寸">
                    <el-input type="text" v-model="dataForm.width" class="el-group" placeholder="宽"></el-input>
                    <el-input type="text" v-model="dataForm.height" class="el-group" placeholder="高"></el-input>
                  </el-form-item>
                <el-form-item label="广告位类型">
                    <el-select v-model="type">
                      <el-option 
                      :label="item.label"  
                      :value="item.value" v-for="(item, index) in advertdata"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="位置类型">
                    <el-select v-model="tempFlag">
                        <el-option 
                        :label="item.label" 
                        :value="item.value" v-for="(item, index) in adressdata"></el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="轮播帧数">
                    <el-input v-model="dataForm.NumberOfFrameFrames"></el-input>
                </el-form-item>
              <div class="add-commpontent">
                  <el-row>
                  <el-col :span="13" style="padding-right:10px;">
                      <el-form-item label="轮播帧数1">
                          <el-input type="text" placeholder="URL"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="4">
                      <el-input type="text" placeholder="人民币" size="small"></el-input>
                  </el-col>
                  </el-row>
              </div>
              <div class="add-commpontent">
                  <el-row>
                      <el-col :span="13" style="padding-right:10px;">
                          <el-form-item label="">
                              <el-button type="primary" icon="el-icon-plus" style="position:absolute;left:-76px;">添加</el-button>
                              <el-input type="text" placeholder="URL"></el-input>
                              <el-upload class="upload-demo upload-btn" action="">
                                  <el-button size="small" type="primary">上传</el-button>
                              </el-upload>
                          </el-form-item>
                      </el-col>
                      <el-col :span="4">
                          <el-input type="text" placeholder="美金" size="small"></el-input>
                      </el-col>
                  </el-row>
              </div>
            </el-form>
          </section>
          <section class="advert-detail_left" >
              <h3 style="margin-bottom:20px;">默认广告设置</h3>
              <el-form label-width="80px" size="small">
                  <el-form-item label="创建时间">
                    <el-input type="text" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="图片尺寸">
                      <el-input type="text" placeholder="宽*高(px)" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="广告位类型">
                        <el-select v-model="advertypeval">
                          <el-option 
                          :label="item.label"
                          :value="item.value" v-for="(item, index) in advertTypes"></el-option>
                        </el-select>
                    </el-form-item>
                  <el-form-item label="位置类型">
                    <el-select v-model="adressval">
                        <el-option 
                        :label="item.label"
                        :key="index"
                        :value="item.value" v-for="(item, index) in adressData"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="位置数">
                      <el-input placeholder="5"></el-input>
                  </el-form-item>
                <div class="commpont-group">
                    <div class="add-commpontent">
                      <el-row>
                        <el-col :span="13" style="padding-right:10px;">
                          <el-form-item label="第一条">
                            <el-input type="text" placeholder="URL"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-input type="text" placeholder="人民币" size="small"></el-input>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="add-commpontent">
                        <el-row>
                            <el-col :span="13" style="padding-right:10px;">
                                <el-form-item label="">
                                    <el-button type="primary" icon="el-icon-plus" style="position:absolute;left:-76px;">添加</el-button>
                                    <el-input type="text" placeholder="URL"></el-input>
                                    <el-upload class="upload-demo upload-btn" action="https://jsonplaceholder.typicode.com/posts/">
                                        <el-button size="small" type="primary">上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-input type="text" placeholder="美金" size="small"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </div>
              </el-form>
            </section>
          <section class="advert-detail_left" style="display:none;">
              <h3 style="margin-bottom:20px;">默认广告设置</h3>
              <el-form label-width="80px" size="small">
                  <el-form-item label="创建时间">
                    <el-input type="text" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="图片尺寸">
                      <el-input type="text" placeholder="宽" v-model="dataForm.width" style="width:45%"></el-input>
                      <el-input type="text" placeholder="高" v-model="dataForm.height" style="width:45%"></el-input>
                    </el-form-item>
                  <el-form-item label="广告位类型">
                      <el-select v-model="advertypeval">
                        <el-option 
                        :label="item.label"
                        :value="item.value" v-for="(item, index) in advertTypes"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="位置类型">
                      <el-select v-model="adressval">
                          <el-option 
                          :label="item.label"
                          :key="index" 
                          :value="item.value" v-for="(item, index) in adressData"></el-option>
                        </el-select>
                  </el-form-item>
                <div class="commpont-group">
                    <div class="add-commpontent">
                        <el-row>
                        <el-col :span="13" style="padding-right:10px;">
                            <el-form-item label="第一条">
                                <el-input type="text" placeholder="URL"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-input type="text" placeholder="人民币" size="small"></el-input>
                        </el-col>
                        </el-row>
                    </div>
                    <div class="add-commpontent">
                        <el-row>
                            <el-col :span="13" style="padding-right:10px;">
                                <el-form-item label="">
                                    <el-button type="primary" icon="el-icon-plus" style="position:absolute;left:-76px;">添加</el-button>
                                    <el-input type="text" placeholder="URL"></el-input>
                                    <el-upload class="upload-demo upload-btn" action="https://jsonplaceholder.typicode.com/posts/">
                                        <el-button size="small" type="primary">上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-input type="text" placeholder="美金" size="small"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="commpont-group">
                    <div class="add-commpontent">
                        <el-row>
                        <el-col :span="13" style="padding-right:10px;">
                            <el-form-item label="其他">
                                <el-input type="text" placeholder="URL"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-input type="text" placeholder="人民币" size="small"></el-input>
                        </el-col>
                        </el-row>
                    </div>
                    <div class="add-commpontent">
                        <el-row>
                            <el-col :span="13" style="padding-right:10px;">
                                <el-form-item label="">
                                    <el-button type="primary" icon="el-icon-plus" style="position:absolute;left:-76px;">添加</el-button>
                                    <el-input type="text" placeholder="URL"></el-input>
                                    <el-upload class="upload-demo upload-btn" action="https://jsonplaceholder.typicode.com/posts/">
                                        <el-button size="small" type="primary">上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-input type="text" placeholder="美金" size="small"></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </div>
              </el-form>
            </section>
        </el-col>
        <el-col :span="6">
          <section class="advert-detail_right" style="position:relative;">
            <h3 style="margin-bottom:20px;">广告位模板</h3>
            <!-- <el-button size="medium" type="primary" class="add-upload">上传广告位模板</el-button> -->
            <el-upload _style="position:absolute;top:46px;right:52px;"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            <img :src="dataForm.adsImg" alt="" height="350" width="400">
          </section>
        </el-col>
      </el-row>
      <div class="btn-group">
        <el-button size="medium" type="primary" @click="confirmAdvert()">确认</el-button>
        <el-button size="medium" type="primary">删除</el-button>
        <el-button size="medium" type="primary">取消</el-button>
      </div>
  </section>
</template>
<script>
import { addvertlistcopy,searchadvertDetail } from '@/api/url.js'
export default {
  name: 'advertSpaceDetail',
  data () {
    return {
      advertdata:[
        {label: '轮播', value: '1'},
        {label: '单页', value: '2'},
        {label: '全部', value: '3'}
      ],
      tempFlag: '',
      adressval: '',
      advertTypes: [
        {label: '轮播', value: '1'},
        {label: '单页', value: '2'},
        {label: '全部', value: '3'}
      ],
      advertypeval: '',
      dialogImageUrl: '',
      dialogVisible: false,
      dataForm: {
        id: '',
        addressTypeName: '',
        ownership: '',
        adsImg: '',
        NumberOfFrameFrames: '',
        upDown: '',
        adminName: '',
        createAt: '',
        width: '',
        height: '',
        channel:'',
        source:''
      },
      type: '',
      adressdata:[
        {label: '固定', value: '1'},
        {label: '类目', value: '2'},
        {label: '列表', value: '3'},
        {label: '全部', value: '4'}
      ],
      channel : '',
      yewuData: [
        {label: '留学', value: '1'},
        {label: '语培', value: '2'},
        {label: '院校直通', value: '3'},
        {label: '移民', value: '4'},
        {label: '全部', value: '5'}
      ],
      advert: '',
      advertData: [
        {value: '1', label: '全部'},
        {value: '2', label: '冻结'},
        {value: '3', label: '未使用'},
        {value: '4', label: '使用中'}
      ],
      suoyouData:[
        {value: '1', label: '全部'},
        {value: '2', label: '平台'},
        {value: '3', label: '用户'}
      ],
      channelData: [
        {value: '1', label: '全部'},
        {value: '2', label: 'APP'},
        {value: '3', label: 'PC'},
        {value: '4', label: 'WAP'}
      ],
      adressData: [
        {value: '1', label: '全部'},
        {value: '2', label: '固定'},
        {value: '3', label: '列表'},
        {value: '4', label: '类目'}
      ]
    }
  },
  created() {
    this.searchadvertDetail()
  },
  computed: {
    setwidth() {
      return this.dataForm.width - this.dataForm.height
    }
  },
  methods: {
    confirmAdvert() {
      addvertlistcopy({
        name :'测试demo',
        type :1,
        upDown :this.dataForm.upDown,
        ownership :this.dataForm.ownership,
        addressType :this.dataForm.addressType,
        addressTypeName :this.dataForm.addressTypeName,
        createdAt :this.dataForm.createdAt,
        channel :this.dataForm.channel,
        // channelName:this.dataForm.channelName,
        channelName:'渠道名称',
        source:this.dataForm.source,
        sourceName:this.dataForm.sourceName,
        width: this.dataForm.width,
        height :this.dataForm.height,
        // framesNumber:this.dataForm.framesNumber,
        framesNumber:2,
        forceType:this.dataForm.forceType,
        autoReplace:this.dataForm.autoReplace,
        adminId:this.dataForm.adminId,
        adminName:this.dataForm.adminName,
        adsPrice :this.dataForm.adsPrice,
      }).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        })
      }).catch(error => {
        this.$message({
          type: 'info',
          message: '创建失败'
        })
      })
    },
    searchadvertDetail() {
      const _DEFAULT = this.$route.params.id
      this.dataForm.id = _DEFAULT
      searchadvertDetail({
        id: this.dataForm.id
      }).then(res => {
        this.dataForm.addressTypeName = res.result.addressTypeName
        this.dataForm.ownership = res.result.ownership
        // this.dataForm.createByName = res.result.createByName
        this.dataForm.adminId = res.result.adminId
        this.dataForm.adminName = res.result.adminName
        this.dataForm.adsImg = res.result.adsImg
        this.dataForm.NumberOfFrameFrames = res.result.NumberOfFrameFrames
        this.dataForm.upDown = res.result.upDown
        this.dataForm.createAt = res.result.createAt
        this.dataForm.width = res.result.width
        this.dataForm.height = res.result.height
        this.type = res.result.type
        this.channel = res.result.channel
        this.tempFlag = res.result.tempFlag
        // console.log(this.tempFlag)
      }).catch(error => {

      })
    },
    handleRemove(file, fileList) {
        console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>
.advert-detail_left{
  max-width:600px;
  min-width: 600px;
}
.advert-space-detail .btn-group{
  display: flex;
  justify-content: center;
  margin-top:40px;
}
.advert-space-detail .add-commpontent_elinput{
  display: flex;
}
.advert-space-detail .upload-btn{
  position: absolute;
  right:0;
  top:0;
}
.advert-space-detail .add-upload{
  display: block;
  margin:20px auto;
}
.advert-space-detail > h3{
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #dcdfe6;
}
.el-group{
  width:120px;
  margin-right:15px;
}
.advert-detail_right .el-upload--picture-card{
  background-color:transparent !important;
  border:none !important;
}
</style>