<template>
  <section class="advert-detail-content" style="overflow:hidden;margin-left:260px;">
    <section class="advert-detail_head">
      <h3>广告位信息</h3>
      <div class="detail_head">
          <el-row :gutter="20">
              <el-form class="demo-form-inline" label-width="80px" size="small">
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-button size="small" type="primary" @click="dialogFormVisible = true">选择广告位</el-button>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="创建人ID">
                        <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg_purple">
                      <el-form-item label="创建人名称" class="bg_purple_name">
                          <el-input placeholder="" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                  </el-col>
              </el-form>
          </el-row>
      </div>
      <el-row :gutter="20">
        <el-form class="demo-form-inline" label-width="80px" size="small">
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-form-item label="ID">
                    <el-input v-model="FormData.id" :disabled="true"></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="名称">
                  <el-input placeholder="" :disabled="true"></el-input>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
             <el-form-item label="广告类型">
                <el-input placeholder="" :disabled="true"></el-input>
              </el-form-item>  
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="所有权">
                <el-input placeholder="" :disabled="true"></el-input>
              </el-form-item>
          </div></el-col>
          <el-col :span="6">
              <div class="grid-content bg_purple">
                  <el-form-item label="图片尺寸">
                      <el-input placeholder="" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg_purple">
                    <el-form-item label="广告模板">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="轮播帧数">
                          <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
              </el-col>
          <el-col :span="6">
              <div class="grid-content bg_purple">
                  <el-form-item label="渠道">
                      <el-input placeholder="" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="业务频道">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="位置类型">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="创建时间">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <!-- <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="所有者ID">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="名称">
                        <el-input placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-col> -->
        </el-form>
        </el-row>
    </section>
    <!--  -->
  <el-row :gutter="20">
      <el-col :span="14">
          <section class="advert-detail_left" v-if="isBlock">
            <h3 style="margin-bottom:20px;">广告设置</h3>
            <el-form label-width="80px" size="small">
                <el-form-item label="轮播顺序">
                  <el-input v-model="FormData.sort"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="URL"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="12" style="padding-left:0;">
                        <el-input v-model="FormData.priceType" placeholder="人民币" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input v-model="FormData.priceType" placeholder="美金" style="width: 100%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <img :src="FormData.url" />
                    <el-upload class="upload-demo"
                    :show-file-list="false"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess">
                    <el-button size="small" type="primary" style="position:absolute;right:0;top:0;">点击上传</el-button>
                  </el-upload>
                </el-form-item>
                  <el-form-item>
                      <el-col :span="11">
                        <el-date-picker 
                        type="datetime" 
                        placeholder="开始时间" 
                        v-model="FormData.startTime"
                        value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                          <el-date-picker 
                          type="datetime" 
                          placeholder="结束时间" 
                          v-model="FormData.endTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="购买人名称">
                      <el-input v-model="FormData.linkName"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式">
                      <el-input v-model="FormData.phone"></el-input>
                  </el-form-item>
              </el-form>
              <p style="text-align:center;">PS：每个广告购买一次生产一条订单记录</p>
          </section>
          <section class="advert-detail_left" style="display:none;">
              <h3 style="margin-bottom:20px;">广告设置</h3>
              <el-form label-width="80px" size="small">
                  <el-form-item label="类目名称">
                      <el-col :span="12" style="padding-left:0;">
                          <el-select v-model="typeval">
                              <el-option 
                              :label="item.label"  
                              :value="item.value"
                              v-for="(item, index) in categoryName"></el-option>
                          </el-select>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="类目顺序">
                              <el-input type="text" style="width: 100%;" v-model="FormData.sort"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="">
                      <el-input placeholder="URL"></el-input>
                  </el-form-item>
                  <el-form-item label="">
                      <el-col :span="12" style="padding-left:0;">
                          <el-input placeholder="人民币" style="width: 100%;" v-model="FormData.priceType"></el-input>
                      </el-col>
                      <el-col :span="12">
                          <el-input placeholder="美金" style="width: 100%;" v-model="FormData.priceType"></el-input>
                      </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-col :span="11">
                      <el-date-picker 
                        type="datetime" 
                        placeholder="开始时间" 
                        v-model="FormData.startTime"
                        value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker 
                      type="datetime" 
                      placeholder="结束时间" 
                      v-model="FormData.endTime"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="购买人名称">
                      <el-input v-model="FormData.linkName"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式">
                     <el-input v-model="FormData.phone"></el-input>
                  </el-form-item>
                </el-form>
                <p style="text-align:center;">PS：每个广告购买一次生产一条订单记录</p>
            </section>
          <section class="advert-detail_left" style="display:none;">
              <h3 style="margin-bottom:20px;">广告设置</h3>
              <el-form label-width="80px" size="small">
                  <el-form-item label="列表顺序">
                    <el-input v-model="FormData.sort"></el-input>
                  </el-form-item>
                  <el-form-item label="">
                      <el-input placeholder="URL"></el-input>
                  </el-form-item>
                  <el-form-item label="">
                      <el-col :span="12" style="padding-left:0;">
                          <el-input type="text" v-model="FormData.priceType" placeholder="人民币" style="width: 100%;"></el-input>
                      </el-col>
                      <el-col :span="12">
                          <el-input type="text" v-model="FormData.priceType" placeholder="美金" style="width: 100%;"></el-input>
                      </el-col>
                  </el-form-item>
                  <el-form-item>
                      <img :src="FormData.url" />
                      <el-upload class="upload-demo" 
                        :show-file-list="false"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess">
                        <el-button size="small" type="primary"
                        style="position:absolute;right:0;top:0;">点击上传</el-button>
                      </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-col :span="11">
                      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" 
                      type="datetime"
                      placeholder="开始时间" style="width: 100%;" v-model="FormData.startTime"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="结束时间" style="width: 100%;" v-model="FormData.endTime"></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="购买人名称">
                      <el-input placeholder="" v-model="FormData.linkName"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式">
                      <el-input placeholder="" v-model="FormData.phone"></el-input>
                  </el-form-item>
                </el-form>
                <p style="text-align:center;">PS：每个广告购买一次生产一条订单记录</p>
            </section>
      </el-col>
      <el-col :span="6">
        <section class="advert-detail_right">
          <h3 style="margin-bottom:20px;">广告位模板</h3>
          <!-- <img :src="FormData.image" alt="" height="350" width="400"> -->
          <img src="https://temp.im/450x300/0ff/d00" alt="广告图片占位符">
        </section>
      </el-col>
  </el-row>
      <div class="btn-group">
          <el-row>
              <el-button size="medium" type="primary" @click="addAdvertsubmit()">提交</el-button>
              <el-button size="medium" type="primary">删除</el-button>
              <el-button size="medium" type="primary">取消</el-button>
            </el-row>
      </div>
  <!-- 选择广告位弹窗 -->
  <el-dialog title="请选择以下广告位" :visible.sync="dialogFormVisible" class="modal">
    <el-form size="small">
      <el-row :gutter="20">
        <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
            <el-form-item label="ID">
                <el-input type="text" v-model="advertData.id"></el-input>
            </el-form-item>
        </div></el-col>
        <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
            <el-form-item label="名称">
                <el-input type="text" v-model="advertData.name"></el-input>
            </el-form-item>
        </div></el-col>
        <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
            <el-form-item label="位置类型">
                <el-select size="small" v-model="advertData.tempFlag">
                    <el-option label="全部"  value="1"></el-option>
                    <el-option label="轮播"  value="2"></el-option>
                    <el-option label="单页"  value="3"></el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
            <el-form-item label="所有权">
                <el-select size="small" v-model="advertData.ownership">
                    <el-option label="全部"  value="1"></el-option>
                    <el-option label="平台"  value="2"></el-option>
                    <el-option label="用户"  value="3"></el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
            <el-form-item label="广告位类型">
                <el-select size="small" v-model="advertData.type">
                    <el-option label="全部"  value="1"></el-option>
                    <el-option label="轮播"  value="2"></el-option>
                    <el-option label="单页"  value="3"></el-option>
                </el-select>
            </el-form-item>
        </div></el-col>
        <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
              <el-form-item label="渠道">
                  <el-select size="small" v-model="advertData.channel">
                      <el-option label="全部"  value="1"></el-option>
                      <el-option label="WAP"  value="2"></el-option>
                      <el-option label="PC"  value="3"></el-option>
                      <el-option label="APP"  value="4"></el-option>
                  </el-select>
              </el-form-item>
            </div></el-col>
            <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                <el-form-item label="业务频道">
                    <el-select size="small" v-model="advertData.businessChannel">
                        <el-option label="全部"  value="1"></el-option>
                        <el-option label="留学"  value="2"></el-option>
                        <el-option label="语培"  value="3"></el-option>
                        <el-option label="院校直通"  value="4"></el-option>
                        <el-option label="移民"  value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col>
                <el-col :span="6" class="radio-goods"><div class="grid-content bg-purple">
                  <el-form-item label="广告位模板">
                      <el-select size="small" v-model="advertData.advertisingTemplate">
                          <el-option label="全部"  value="1"></el-option>
                          <el-option label="留学首页"  value="2"></el-option>
                          <el-option label="问答详情页"  value="3"></el-option>
                      </el-select>
                  </el-form-item>
                </div></el-col>
        </el-row>
        <div class="model-seacher">
            <el-button type="primary" size="small" @click="serachhandelClick()">搜索</el-button>
        </div>
    </el-form>
    <el-table :data="advertsdata" style="width: 100%" border size="medium">
        <el-table-column prop="currentid" width="65" label="NO" align="center"></el-table-column>
        <el-table-column prop="id" width="65" label="广告ID" align="center"></el-table-column>
        <el-table-column prop="name" width="110" label="广告位名称" align="center"></el-table-column>
        <el-table-column prop="advertisingTemplate" width="110" label="广告位模板" align="center"></el-table-column>
        <el-table-column prop="type" width="90" label="广告位类型" align="center"></el-table-column>
        <el-table-column prop="ownership" width="70" label="所有权" align="center"></el-table-column>
        <el-table-column prop="tempFlag" width="110" label="位置类型" align="center"></el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="100" align="center"></el-table-column>
        <el-table-column prop="channel" width="70" label="渠道" align="center"></el-table-column>
        <el-table-column prop="channelName" width="100" label="业务频道" align="center"></el-table-column>
        <el-table-column label="操作" width="110" align="center">
            <template slot-scope="scope">
            <el-button size="small" type="danger">选择</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="row-container" v-if="advertsdata.length" style="margin:30px 0;">
          <el-pagination 
          background layout="prev, pager, next, jumper" :total="total"></el-pagination>
          <el-button size="small" type="primary">确定</el-button>
      </div>
  </el-dialog>
  </section>
</template>
<script>
import { searchCommerDetail, searchadvertising, addAdvertlist} from '@/api/url.js'
export default {
  name: 'advertDetail',
  data () {
    return {
      dialogFormVisible: false,
      value: '',
      advertsdata: [],
      isBlock: true,
      FormData: {
        startTime: '',
        endTime: '',
        linkName: '',
        phone: '',
        id: '',
        categorId: '',
        url: 'http://cdn6.jjl.cn/assets/img/logo_red-326a8e4bf5.png',
        price:'',
        priceType: '',
        sort: '',
        image: '',
        source: '',
        name: ''
      },
      fileList3:[],
      phone: '',
      advertData: {
        id: '',
        name: '',
        channel: '',
        tempFlag: '',
        ownership: '',
        businessChannel: '',
        type: '',
        advertisingTemplate: ''
      },
      categoryName: [
        {label: '托福', value: '1'},
        {label: 'GRE', value: '2'},
      ],
      total: null,
      typeval: ''
    }
  },
  created() {
    this.searchCommerDetail()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw))
      this.FormData.url = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addAdvertsubmit() { // 添加广告 
      addAdvertlist({
        // adsTempId: this.FormData.adsTempId,
        sort:	this.FormData.sort,
        categorId: this.FormData.categorId,
        url: this.FormData.url,
        // price:this.FormData.price,
        priceType: this.FormData.priceType,
        startTime: this.FormData.startTime,
        endTime: this.FormData.endTime,
        linkName: this.FormData.linkName,
        source: this.FormData.source,
        phone: this.FormData.phone,
        name:this.FormData.name,
        adsTempId:1,
        price: 19.00,
        source: 1
        // source: this.FormData.source
      }).then(res => {
        console.log(res)
        // setTimeout(function() {
        //   // window.location.reload()
        // }, 500)
      }).catch(error => {

      })
    },
    searchCommerDetail() { // 查询广告详情
      const DEFAULT = this.$route.params.id
      searchCommerDetail({
        id: DEFAULT
      }).then(res => {
        this.FormData.id = DEFAULT
        this.FormData.startTime = res.result.startTime
        this.FormData.endTime = res.result.endTime
        this.FormData.linkName = res.result.linkName
        this.FormData.phone = res.result.phone
        this.FormData.startTime = res.result.startTime
        this.FormData.image = res.result.image
        // console.log(res)
      }).catch(error => {

      })
    },
    serachhandelClick() { // 查询选择广告位列表
      searchadvertising({
        // id:	this.advertData.id,
        // name: this.advertData.name,
        // tempFlag: this.advertData.tempFlag,
        // ownership: this.advertData.ownership,
        // businessChannel: this.advertData.businessChannel,
        // channel: this.advertData.channel,
        // type: this.advertData.type,
        // advertisingTemplate: this.advertData.advertisingTemplate,
        pageNo:	1,
        pageSize: 20
      }).then(res => {
          console.log(res)
          this.advertsdata = res.result.modelData
      }).catch(error =>{

      })
    },
  }
}
</script>
<style>
.detail_head{margin-bottom:20px;border-bottom:solid 1px #ccc;}
.advert-detail_head .bg_purple .el-input--mini{position:absolute;}
.advert-detail_head .bg_purple .el-form-item__label,.advert_purple .el-form-item__label{width:auto!important;}
.advert-detail-content .money-input{float:left;}
.advert-detail-content .btn-group{margin-right:50px;height:90px;text-align:right;}
.model-seacher,.row-container{display:flex;margin-bottom:20px;justify-content:flex-end;}
.bg_purple .bg_purple_name .el-input--small{position:absolute;}
.advert-detail_head > h3{ height: 30px; line-height: 30px;margin-bottom: 15px; border-bottom:solid 1px #dcdfe6;}
</style>