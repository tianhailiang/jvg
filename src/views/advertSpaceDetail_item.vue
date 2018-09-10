<template>
    <section class="advert-space-detail" style="overflow:hidden;">
        <el-row :gutter="20">
          <el-form class="demo-form-inline" label-width="80px" size="small">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                  <el-form-item label="ID">
                      <el-input placeholder="" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-form-item label="名称">
                    <el-input placeholder=""></el-input>
                </el-form-item>  
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                  <el-form-item label="所有权">
                    <el-select v-model="syVal">
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
                        <el-select v-model="advert">
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
                        <el-select v-model="yewu">
                            <el-option 
                            :label="item.label"  
                            :value="item.value" v-for="(item, index) in yewuData"></el-option>
                          </el-select>
                      </el-form-item>
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="创建人名称">
                          <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
              </el-col>
              <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-form-item label="创建人ID">
                          <el-input placeholder="" :disabled="true"></el-input>
                      </el-form-item>
                  </div>
              </el-col>
          </el-form>
          </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
            <section class="advert-detail_left">
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
                <div class="commpont-group">
                    <div class="add-commpontent">
                        <el-row>
                        <el-col :span="13" style="padding-right:10px;">
                            <el-form-item label="第二条">
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
            <section class="advert-detail_right">
              <h3 style="margin-bottom:20px;">广告位模板</h3>
              <el-button size="medium" type="primary" class="add-upload">上传广告位模板</el-button>
              <img src="https://imgsa.baidu.com/news/q%3D100/sign=1136fe85adec08fa200017a769ee3d4d/342ac65c103853431dc7dd1b9e13b07eca808884.jpg" alt="" height="350" width="400">
            </section>
          </el-col>
        </el-row>
        <div class="btn-group">
            <el-button size="medium" type="primary">确认</el-button>
            <el-button size="medium" type="primary">删除</el-button>
            <el-button size="medium" type="primary">取消</el-button>
        </div>
    </section>
</template>
<script>
export default {
    name: '',
    data () {
        return {
            advertypeval: '',
            advertTypes:[
                {value: '选项1', label: '轮播'},
                {value: '选项2', label: '单页'},
                {value: '选项3', label: '全部'}
            ],
            adressval: '',
            adressData: [
                {value: '选项1', label: '类目'},
                {value: '选项2', label: '固定'},
                {value: '选项3', label: '列表'},
                {value: '选项4', label: '全部'}
            ],
            syVal: '',
            suoyouData:[
                {value: '选项1', label: '全部'},
                {value: '选项2', label: '平台'},
                {value: '选项3', label: '用户'}
            ],
            advert: '',
            advertData: [
                {value: '选项1', label: '全部'},
                {value: '选项2', label: '冻结'},
                {value: '选项3', label: '未使用'},
                {value: '选项4', label: '使用中'}
            ],
            yewu: '',
            yewuData: [
                {value: '选项1', label: '全部'},
                {value: '选项2', label: '留学'},
                {value: '选项3', label: '语培'},
                {value: '选项4', label: '院校直通'},
                {value: '选项5', label: '移民'}
            ],
        }
    }
}
</script>
<style scoped>
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
</style>